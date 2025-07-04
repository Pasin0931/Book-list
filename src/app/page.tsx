"use client"

import { Button } from "@/components/ui/button"
import { FolderOpen } from "lucide-react";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Star, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface BookProps {
    params: {
        id: number
        title: string
        description: string
        genre: string
        isRead: boolean
        year: number
        rating: number
        image: string
    }
}

export default function Home({ params }: BookProps) {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [imgError, setImgError] = useState(false)

    const fetchBooks = async () => {
        fetch("/api/books")
            .then(res => res.json())
            .then(data => {
                setBooks(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error("Failed to fetch books", error)
                setIsLoading(false)
            })
    }

    const deleteBook = async (id: number) => {
        try {

            if (!confirm("Do you want to delete this book from collection ?")) {
                return console.log("Canceled deleting book")
            }

            const response = await fetch(`/api/books/${id}`, { method: "DELETE" })
            if (response.ok) {
                fetchBooks()
            }
            alert("Book Deleted")

        } catch (error) {
            console.error("Error deleting books", error)
        }
    }

    const clearSession = async () => {
        try {

            if (books.length === 0) {
                return alert("Your collection is already empty")
            }

            if (!confirm("Do you want to clear this book session ?")) {
                return console.log("Canceled clearing book session")
            }

            const response = await fetch(`/api/books/`, { method: "DELETE" })
            if (response.ok) {
                fetchBooks()
            }
            alert("Session cleared")

        } catch (error) {
            console.error("Error clearing all books", error)
        }
    }

    // ---------------------------------------------------------------------------------------------

    useEffect(() => {
        fetchBooks()
    }, [])

    // Is Loading --------------------------------------------------------------------------------
    if (isLoading) {
        return (
            <div className="p-9 bg-gray-50 min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-8 bg-white">
                    <div>
                        <h1 className="font-bold tracking-tight text-3xl text-center text-gray-800">Your Book Collection</h1>
                        <p className="text-slate-600 tracking-tight text-center mb-6">Discover, track, and enjoy your favorite book</p>
                    </div>

                    <Card className="p-8">
                        <div className="flex justify-center items-center h-40">
                            <h1 className="text-xl text-gray-500">Loading . . .</h1>
                        </div>
                    </Card>

                    <div className="flex justify-center mt-6 gap-3">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                className="w-32">
                                Add Book
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                className="w-32"
                                variant="destructive">
                                Clear Session
                            </Button>
                        </motion.div>
                    </div>
                </Card>
            </div>
        )
    }

    // No Book --------------------------------------------------------------------------------
    if (books.length === 0) {
        return (
            <motion.div
                className="p-6 bg-gray-50 min-h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}>

                <motion.div
                    className="w-full max-w-2xl shadow-xl rounded-2xl p-6 bg-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}>

                    <div>
                        <h1 className="font-bold tracking-tight text-3xl text-center text-gray-800">Your Book Collection</h1>
                        <p className="text-slate-600 tracking-tight text-center mb-6">Discover, track, and enjoy your favorite book</p>
                    </div>

                    <motion.div
                        className="h-64 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl text-center"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}>
                        <h2 className="text-lg text-gray-500 mb-4">Your list is empty...</h2>
                        <FolderOpen className="w-12 h-12 mb-4 text-gray-500" />
                    </motion.div>

                    <div className="flex justify-center mt-6 gap-3">
                        <Link href={'/create'}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button
                                    className="w-32">
                                    Add Book
                                </Button>
                            </motion.div>
                        </Link>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                className="w-32"
                                variant="destructive"
                                onClick={() => clearSession()}>
                                Clear Session
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // Have Book --------------------------------------------------------------------------------
    return (
        <motion.div
            className="p-9 bg-gray-50 min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}>

            <motion.div
                className="w-full max-w-8xl shadow-xl rounded-2xl p-8 bg-white"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>

                <div>
                    <h1 className="font-bold tracking-tight text-3xl text-center text-gray-800">Your Book Collection</h1>
                    <p className="text-slate-600 tracking-tight text-center mb-6">Discover, track, and enjoy your favorite book</p>
                </div>

                <Card className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-2">

                        {books.map((book: any, index: number) => ( //-------------------------------------------------------------------------------------- Book
                            <motion.div
                                key={book.id}
                                className="p-6 rounded-xl shadow-md bg-gray-100"
                                initial={{ opacity: 0, y: 80 }}
                                animate={{ opacity: 1, y: 1 }}
                                transition={{ delay: index * 0.005 }}
                                whileHover={{ scale: 1.01 }}>

                                {/* Contents */}
                                <div>
                                    <h2 className="text-2xl font-bold text-black truncate max-w-full mb-3">{book.title}</h2>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`px-2 rounded-xl ${book.isRead ? "bg-black text-white" : "bg-white text-black"}`}>
                                                {book.isRead ? "Readed" : "To Read"}
                                            </span>
                                            <span className="bg-white text-gray-700 border px-2 py- rounded-xl">
                                                {book.genre}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                {book.year || "N/A"}
                                            </span>
                                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-xl">
                                                <Star className="w-4 h-4 fill-yellow-500" />
                                                {book.rating ?? "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Link href={`/books/${book.id}`}>
                                                <Button size="sm" variant="outline" className="p-2">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button size="sm" variant="destructive" className="p-2" onClick={() => deleteBook(book.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <Link href={`/books/${book.id}/view`}>
                                                <Button size="sm" variant="outline">
                                                    <h1>View Content</h1>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <Card className="text-gray-500 mt-auto h-27 whitespace-normal pl-4 py-2 break-words line-clamp-4 overflow-hidden mt-6">
                                        {book.description}
                                    </Card>
                                </div>

                                {/* Image */}
                                <Card className="mt-auto h-120 bg-white flex items-center justify-center text-gray-400 mt-3">
                                    {imgError || !book.image ? (
                                        <span>N/A</span>
                                    ) : (
                                        <img
                                            src={book.image}
                                            alt="Book cover"
                                            className="object-cover h-full rounded-xl"
                                            onError={() => setImgError(true)}
                                            onLoad={() => setImgError(false)}
                                        />
                                    )}
                                </Card>

                            </motion.div>
                        ))}

                    </div>
                </Card>

                <div className="flex justify-center mt-6 gap-3">
                    <Link href={'/create'}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                className="w-32">
                                Add Book
                            </Button>
                        </motion.div>
                    </Link>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                            className="w-32"
                            variant="destructive"
                            onClick={() => clearSession()}>
                            Clear Session
                        </Button>
                    </motion.div>
                </div>

            </motion.div>
        </motion.div>
    );
}