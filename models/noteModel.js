const pool = require('../config/db');

class Note {
    static async findAll() {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query('SELECT * FROM notes');
            return rows;
        } finally {
            if (conn) conn.end();
        }
    }

    static async findById(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query('SELECT * FROM notes WHERE id = ?', [id]);
            return rows[0];
        } finally {
            if (conn) conn.end();
        }
    }

    static async findBySubTitle(title) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(`SELECT * FROM notes WHERE title LIKE ?`, [`%${title}%`]);
            return rows;
        } finally {
            if (conn) conn.end();
        }
    }

    static async create(noteData) {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query('INSERT INTO notes(title, body) VALUES (?, ?)', [noteData.title, noteData.body]);
            return { id: result.insertId, ...noteData };
        } finally {
            if (conn) conn.end();
        }
    }

    static async update(id, noteData) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query('UPDATE notes SET title = ?, body = ? WHERE id = ?', [noteData.title, noteData.body, id]);
            return { id, ...noteData };
        } finally {
            if (conn) conn.end();
        }
    }

    static async delete(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query('DELETE FROM notes WHERE id = ?', [id]);
            return true;
        } finally {
            if (conn) conn.end();
        }
    }
}

module.exports = Note;
