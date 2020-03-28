import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from './../../services/api';

import logoImg from './../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      value,
    };


    await api.post('/incidents', payload, { headers: { Authorization: ongId } });

    history.push('/profile');
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontra um <strong>hero</strong> para resolver isso.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <textarea
            placeholder="Descrição"
            type="email"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <input
            placeholder="Valor em reais"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)} />

          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}
