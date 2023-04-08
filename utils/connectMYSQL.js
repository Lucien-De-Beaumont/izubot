const mysql = require("mysql2/promise");

const db = mysql.createPool({
    connectionLimit: 10,
    host: "mysql-heroicacademy.alwaysdata.net",
    user: "308596_izubot",
    password: "izubot!",
    database: "heroicacademy_heroicacademy",
    charset: "utf8mb4",
});

module.exports = db;