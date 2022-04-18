import React, { useState } from 'react';
import { producer } from '../service/broker';
import { Button, Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './SensorForm.css';

const SensorForm = () => {
  const [tipo, setTipo] = useState('');
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
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
            <Button variant="outline-primary">Enviar</Button>
          </form>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h1 className="title">Sensor:</h1>
          <Form.Select
            aria-label="Default select example"
            onChange={e => setTipo(e.target.value)}
          >
            <option> Selecione</option>
            <option value="temperatura">Temperatura (graus)</option>
            <option value="umidade">Umidade (g/Kg)</option>
            <option value="velocidade">Velocidade (km/h)</option>
          </Form.Select>
          <div className="field-group">
            <span className="title">Defina os valores:</span>
            <div className="form-field">
              <label>Mínimo:</label>
              <RangeSlider
                value={min}
                onChange={changeEvent => setMin(changeEvent.target.value)}
              />
              <label>Máximo:</label>
              <input
                type="text"
                name="max"
                value={max}
                onChange={e => setMax(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline-primary">Enviar</Button>
        </Form>
      )}
    </div>
  );
};

export default SensorForm;
