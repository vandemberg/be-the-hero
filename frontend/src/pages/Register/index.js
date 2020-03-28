import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from './../../services/api';

import logoImg from './../../assets/logo.svg';

import './styles.css';

export default () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('ongs', payload)
      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert(`erro no cadastro`);
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos a sua ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome da ONG"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Whatsapp"
            type="text"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <input
              placeholder="Cidade"
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)} />

            <input
              placeholder="UF"
              type="text"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}
