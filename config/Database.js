import { Sequelize } from "sequelize";

const db = new Sequelize("db_tomohonloka", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
