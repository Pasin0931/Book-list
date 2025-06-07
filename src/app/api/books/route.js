import { NextResponse } from "next/server"
import { booksDB } from "@/lib/db"

// GET
export async function GET() {
    try {
        const books = booksDB.getAllBooks()
        return NextResponse.json(books)
    } catch (error) {
        console.error("Error fetching books:", error)
        return NextResponse.json({error: "Error fetching books"}, {status: 500})
    }
}

// POST
export async function POST(request) {
    try {
        const { title, description, genre, isRead } = await request.json()
        if (!title.trim() || !description.trim() || !genre.trim() || isRead === null) {
            return NextResponse.json({error: "All elements are required"}, {status: 404})
        }
        const res = booksDB.createBook( title, description, genre, isRead )
        if (res.changes > 0) {
            const newBook = booksDB.getBookById(res.lastInsertRowid)
            return NextResponse.json(newBook, {status: 201})
        } else {
            return NextResponse.json({error: "Failed to create note"}, {status: 500})
        }
    } catch (error) {
        console.error("Error creating book: ", error)
        return NextResponse.json({error: "Failed to create book"}, {status: 500})
    }
}