import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../styles/TodoList.module.css';
import Headers from '../components/Header';

const TodoList = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [perfil, setPerfil] = useState(null);
  const tokenauth = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tarefasResponse, perfilResponse] = await Promise.all([
          axios.get('http://localhost:8000/tarefas', {
            headers: { 'Authorization': `Bearer ${tokenauth}` },
          }),
          axios.get('http://localhost:8000/users', {
            headers: { 'Authorization': `Bearer ${tokenauth}` },
          }),
        ]);

        setTarefas(tarefasResponse.data);

        if (Array.isArray(perfilResponse.data) && perfilResponse.data.length > 0) {
          setPerfil(perfilResponse.data[0]);
        } else {
          setPerfil({ id: null });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  }, [tokenauth]);

  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (novaTarefa.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/tarefas', {
          tarefa: novaTarefa,
        }, {
          headers: { 'Authorization': `Bearer ${tokenauth}` },
        });
        
        setTarefas(prevTarefas => [...prevTarefas, response.data]);
        setNovaTarefa('');
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tarefas/${id}`, {
        headers: { 'Authorization': `Bearer ${tokenauth}` },
      });
      setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const userId = perfil ? perfil.id : null;

  const links = [
    { path: `/perfil/${userId}`, label: "Perfil" },
  ];

  return (
    <div>
      <Headers links={links}/>
      <div className={style.todocontainer}>
        <h2>Lista de Tarefas</h2>
        <form onSubmit={adicionarTarefa}>
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Adicione uma nova tarefa"
            required
          />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              {tarefa.tarefa}
              <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;