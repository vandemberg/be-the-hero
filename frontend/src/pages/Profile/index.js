import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi';

import api from './../../services/api';

import './styles.css';
import logoImg from './../../assets/logo.svg';

export default function() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  useEffect(() => {
    api.get('/profile', { headers: { Authorization: ongId } })
      .then((response) => {
        setIncidents(response.data);
      }).catch((err) => {
        alert('Erro ao pegar os casos');
      })
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`,{ headers: { Authorization: ongId } })
      setIncidents([...incidents.filter(incident => incident.id !== id)]);
    } catch(e) {
      alert('Erro ao deletar caso');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt=""/>
        <span> Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={() => { handleLogout() }}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1> Casos cadastrados </h1>

      <ul>
        {incidents.map(incident => {
          return (
            <li key={incident.key}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

              <button type="button" onClick={() => { handleDelete(incident.id)} }>
                <FiTrash size={20} color="#a8a8b3" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
