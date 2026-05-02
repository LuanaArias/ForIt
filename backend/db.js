const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db", (error) => {
    if (error){
        console.error("No se pudo conectar a la DB", error);
    } else {
        console.log("DB conectada");
    }
});

db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    userId TEXT,
    completed INTEGER DEFAULT 0,
    createdAt TEXT )`
);

module.exports = db;