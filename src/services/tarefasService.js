import db from '../models/database.js'


class TarefasService {
  async getAllTarefas(id) {
    return await db.query('SELECT * FROM tarefas WHERE user_id = ?', [id]);
  }

  async getTarefaById(id, user_id) {
    return await db.query('SELECT * FROM tarefas  WHERE id = ? AND user_id = ?', [id, user_id]);
  }

  async insertTarefas(fields, user_id) {

    if (!fields.tarefa) {
      throw new Error('Todos campos sao obrigatórios.');
    }

    try {
      const result = await db.query(`INSERT INTO tarefas (user_id, tarefa) VALUES (?, ?)`, [user_id, fields.tarefa]);
      return { id: result.insertId, ...fields };
    } catch (error) {
      console.error('Erro ao inserir registro:', error);
      throw new Error('Erro ao inserir registro');
    }
  }

  async updateTarefasById(fields, id, user_id) {
    if (!fields.tarefa) {
      throw new Error('Todos campos sao obrigatórios.');
    }

    try {
      const result = await db.query(
        `UPDATE tarefas SET tarefa = ? WHERE id = ? AND user_id = ?`,
        [fields.tarefa, id, user_id]
      );
  
      if (result.affectedRows === 0) {
        throw new Error('Tarefa não encontrado.');
      }
  
      return { id, ...fields };
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw new Error('Erro ao atualizar registro');
    }
  }

  async deleteTarefaById(id, user_id){
    try{
      const result = await db.query(
        `DELETE FROM tarefas WHERE id = ? AND user_id = ?`, [id, user_id]);
  
      if (result.affectedRows === 0) {
        throw new Error('Tarefa não encontrado.');
      }
  
      return {'msg':'Tarefa deletado'};
      
    } catch (error) {
      console.error('Erro ao apagar registro:', error);
      throw new Error('Erro ao apagar registro');
    }
  }

}

export default TarefasService;