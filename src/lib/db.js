import Database from 'better-sqlite3'
import path from 'path'

let db = null

export function getDB() {
    if (!db) {
        const dbPath = path.join(process.cwd(), "books.db")

        db = new Database(dbPath)
        db.pragma("journal_mode = WAL")
        db.exec(`
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                genre TEXT,
                isRead BOOLEAN DEFAULT 0
            )
        `)
        console.log("Data base initialized successful")
    }
    return db
}

export function closeDB() {
    if (db) {
        db.close()
        db = null
    }
}

export function deleteAllBooks() {
    const db = getDB()
    db.prepare("DELETE FROM books").run()
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'books'").run()
}

export const booksDB = {

    // Create a new Note ----------------------------------- C
    createBook(title, description = "", genre = "", isRead = false) {
        const db = getDB()
        const stmt = db.prepare(`INSERT INTO books (title, description, genre, isRead)
            VALUES(?, ?, ?, ?)`)

        return stmt.run(title, description, genre, isRead ? 1 : 0)
    },


    // Update a note ---------------------------------------- U
    updateBook(id, title, description, genre, isRead) {
        const db = getDB()
        const stmt = db.prepare(`
            UPDATE books 
            SET title = ?, description = ?, genre = ?, isRead = ? 
            WHERE id = ?
        `)
        return stmt.run(title, description, genre, isRead ? 1 : 0, id)
    },

    // Read a note ------------------------------------------- R

    // Get all notes
    getAllBooks() {
        const db = getDB()
        return db.prepare("SELECT * FROM books ORDER BY id DESC").all()
    },

    // Get by Id
    getBookById(id) {
        const db = getDB()
        return db.prepare("SELECT * FROM books WHERE id = ?").get(id)
    },

    // searchNote(query) {
    //     const db = getDB()
    //     return db.prepare(`
    //         SELECT * FROM books
    //         WHERE title LIKE ? OR content LIKE ?
    //         ORDER BY updateAt DESC`).all(`%${query}`, `%${query}`)
    // },

    // Delete a book ------------------------------------------ D
    deleteBook(id) {
        const db = getDB()
        const stmt = db.prepare("DELETE FROM books WHERE id=?")
        return stmt.run(id)
    },

}