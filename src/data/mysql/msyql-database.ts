import mysql from 'mysql2/promise';

interface Options {
  host: string;
  user: string;
  database: string;
  password?: string;
}
 
export class MysqlDatabase {
  static async connect(options: Options) {
    try {
      const connection = await mysql.createConnection(options);
      console.log('Connected to MySQL database');
      return connection;
    } catch (error) {
      console.error('Error connecting to MySQL database:', error);
      throw error;
    }
  }
}