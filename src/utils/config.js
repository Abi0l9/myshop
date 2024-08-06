require("dotenv").config();

const PORT = process.env.PORT;
const DB = process.env.DB;
const SECRET = process.env.SECRET;

module.exports = {
  PORT, DB, SECRET
}