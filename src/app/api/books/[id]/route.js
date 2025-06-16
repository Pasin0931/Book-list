import { NextResponse } from "next/server";
import { booksDB } from "@/lib/db"

export async function GET(request, { params }) {
    try {

        const { id } = await params
        const book = await booksDB.getBookById(id)
        
        if(!book) {
            return NextResponse.json({ error: "Book not found" }, {status: 404})
        }

        return NextResponse.json(book)

    } catch(error) {

        console.error(error)
        return NextResponse.json({error: "Failed to fetch Book"}, {status: 500})

    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const { title, description, genre, isRead } = await request.json()

        if (!title || title.trim() == "") {
            return NextResponse.json({ error: "Title is required" }, { staus: 400 })
        }

        const result = await booksDB.updateBook(Number.parseInt(id), title.trim(), description || "", genre || "", isRead)

        if (result.changes > 0) {
            const updateBook = booksDB.getBookById(Number.parseInt(id))
            return NextResponse.json(updateBook)
        } else {
            return NextResponse.json({ error: "Book not Found" }, { status: 404 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to update Book" }, { status: 500 })
    }
}

export async function DELETE(request, {params}) {
    try {

        const { id } = await params
        const result = await booksDB.deleteBook(Number.parseInt(id))

        if (result.changes > 0) {

            return NextResponse.json({message: "Book Deleted"}, result, {status: 404})
            
        } else {
            return NextResponse.json({error: "Book not found"}, {status: 404})
        }

    } catch (error) {
        return NextResponse.json({error: "Failed to update Book"}, {status: 500})
    }
}

