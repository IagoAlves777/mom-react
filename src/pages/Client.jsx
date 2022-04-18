import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';

import './Client.css';

const Client = () => {
  const [message, setMessage] = useState({});
  const [topic, setTopic] = useState('');

  const destinations = JSON.parse(localStorage.getItem('listSensor'));

  useEffect(() => {
    if (topic) {
      const client = Stomp.client('ws://localhost:61614/stomp');
      const headers = { login: 'admin', password: 'admin' };

      client.connect(headers, error => {
        if (error.command === 'ERROR') {
          console.error(error.headers.message);
        } else {
          console.log('client connected');

          client.subscribe(`/topic/${topic}`, (message, headers) => {
            const msg = JSON.parse(message.body);
            console.log(msg);
            setMessage({ type: msg.tipo, message: msg.message, value: msg.value });
          });
        }
      });
    }
  }, [topic]);

  return (
    <div className="client">
      <div className="list-topic">
        <span className="title">Lista de tópicos:</span>
        {!!destinations ? (
          <ul>
            {destinations.map((destination, index) => (
              <li
                className={`list-topic-item${topic === destination ? '-selected' : ''}`}
                key={index}
                onClick={() => setTopic(destination)}
              >
                <span>{destination}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <span>Cliente preparado para receber mensagens</span>
          </div>
        )}
      </div>

      <div className="message">
        {topic && message.value ? (
          <div className="topic">
            <span className="type">{message.type}</span>
            <span className="value">{message.value}</span>
            <span
              className={`message${message.message === 'alto' ? '-high' : '-low'}`}
            >{`O valor está ${message.message}`}</span>
          </div>
        ) : (
          <span className="wait">Aguardando nova mensagem</span>
        )}
      </div>
    </div>
  );
};

export default Client;
