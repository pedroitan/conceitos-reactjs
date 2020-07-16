import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Repo ${Date.now()}`,
        url: 'https://github.com/pedroitan/conceitos-reactjs',
        techs: ['ReactJs', 'NodeJS'],
      });
      
      setRepositories([...repositories, response.data]);
    } catch(err) {
      console.error(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const results = repositories.filter(repository => repository.id !== id);

      setRepositories(results);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            <h2>{repository.title}</h2>
            <a href={repository.url} target="_blank">LINK REPO</a>
            Techs:[{repository.techs.map(tech => <p key={tech}>'{tech}',</p>)}]
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}