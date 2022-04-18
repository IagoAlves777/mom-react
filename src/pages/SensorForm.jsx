import React, { useState } from 'react';
import { producer } from '../service/broker';
import './SensorForm.css';

const SensorForm = () => {
  const [tipo, setTipo] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [value, setValue] = useState('');
  const [id, setId] = useState(0);
  const [sensor, setSensor] = useState(false);

  const saveTopic = (topic, id) => {
    const listSensor = localStorage.getItem('listSensor')
      ? JSON.parse(localStorage.getItem('listSensor'))
      : [];

    listSensor.push(`${topic}-${id}`);

    localStorage.setItem('idSensor', id.toString());
    localStorage.setItem('listSensor', JSON.stringify(listSensor));
  };

  const getIdSensor = () => {
    const idSensor = localStorage.getItem('idSensor');
    if (idSensor === null) {
      return 0;
    }
    return Number(idSensor) + 1;
  };

  const getTopic = (id, tipo) => {
    return (
      localStorage.getItem('listSensor') &&
      JSON.parse(localStorage.getItem('listSensor')).includes(`${tipo}-${id}`)
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (Number(max) < Number(min)) {
      alert('O valor máximo deve ser maior que o valor mínimo');
    } else {
      setId(getIdSensor());
      setSensor(true);
    }
  };

  const handleValue = e => {
    e.preventDefault();

    if (!getTopic(id, tipo)) {
      saveTopic(tipo, id);
    }

    let message;
    if (Number(value) > Number(max)) {
      message = 'alto';
    } else if (Number(value) < Number(min)) {
      message = 'baixo';
    } else {
      message = 'normal';
    }

    producer({
      id,
      tipo,
      value,
      message,
    });
  };

  return (
    <div className="sensor">
      {sensor ? (
        <div className="sensor-send">
          <div className="infos">
            <span>{`Tipo de sensor: ${tipo}`}</span>
            <span>{`Valor mínimo: ${min}`}</span>
            <span>{`Valor máximo: ${max}`}</span>
            <span>{value && `Valor corrente: ${value}`}</span>
          </div>
          <form onSubmit={handleValue}>
            <div className="field-group">
              <div className="form-field">
                <label>{`Digite o valor da ${tipo}:`}</label>
                <input
                  type="text"
                  name="value"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </div>
            </div>
            <button className="button-submit" type="submit">
              <span>Enviar</span>
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <span className="title">Defina o tipo de sensor:</span>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="temperatura"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Temperatura</label>
            </div>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="umidade"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Umidade</label>
            </div>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="velocidade"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Velocidade</label>
            </div>
          </div>

          <div className="field-group">
            <span className="title">Defina os valores:</span>
            <div className="form-field">
              <label>Mínimo:</label>
              <input
                type="text"
                name="min"
                value={min}
                onChange={e => setMin(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Máximo:</label>
              <input
                type="text"
                name="max"
                value={max}
                onChange={e => setMax(e.target.value)}
              />
            </div>
          </div>

          <button className="button-submit" type="submit">
            <span>Enviar</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SensorForm;
