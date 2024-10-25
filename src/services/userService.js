import db from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UserService {

  async login(fields) {
    const user = await db.query('SELECT * FROM users WHERE email = ?', [fields.email]);

    if (!user.length) {
      throw new Error('Usuário não encontrado.');
    }

    const isMatch = await bcrypt.compare(fields.password, user[0].userpassword);
    if (!isMatch) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign({ id: user[0].id, username: user[0].username, email: user[0].email }, 'secret_key', { expiresIn: '1d' });
 
    return { token };
  }

  async getAllUsers(id) {
    return await db.query('SELECT * FROM users WHERE id = ?',[id]);
  }

  async getUserById(id) {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }

  async insertUsers(fields) {
    if (!fields.username || !fields.email || !fields.password) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(fields.password, saltRounds);

    try {
      const result = await db.query(
        `INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)`,
        [fields.username, fields.email, password]
      );
      return { id: result.insertId, ...fields };
    } catch (error) {
      console.error('Erro ao inserir registro:', error);
      throw new Error('Erro ao inserir registro');
    }
  }

  async updateUserById(id, fields) {
    if (!fields.username || !fields.email) {
      throw new Error('Os campos username e email são obrigatórios.');
    }

    let password;
    if (fields.password) {
      const saltRounds = 10;
      password = await bcrypt.hash(fields.password, saltRounds);
    }

    try {
      const result = await db.query(
        `UPDATE users SET username = ?, email = ?, userpassword = ? WHERE id = ?`,
        [fields.username, fields.email, password || db.query('SELECT userpassword FROM users WHERE id = ?', [id]), id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado.');
      }

      return { id, ...fields };
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw new Error('Erro ao atualizar registro');
    }
  }

  async deleteUserById(id) {
    try {
      const result = await db.query(
        `DELETE FROM users WHERE id = ?`, [id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Usuário não encontrado.');
      }

      return { msg: 'Usuário deletado' };
    } catch (error) {
      console.error('Erro ao apagar registro:', error);
      throw new Error('Erro ao apagar registro');
    }
  }
}

export default UserService;