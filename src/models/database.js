import mysql from 'mysql2/promise';

class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.config);
      console.log('Conectado ao banco de dados como ID ' + this.connection.threadId);
    }
    return this.connection;
  }

  async query(sql, params = []) {
    const connection = await this.connect();
    const [results] = await connection.execute(sql, params);
    return results;
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('Conexão fechada.');
      this.connection = null;
    }
  }
}

const dbConfig = {
    host: 'host',
    user: 'user',
    password: 'senha',
    database: 'db',
  };
  
const db = new Database(dbConfig);
  
export default db;