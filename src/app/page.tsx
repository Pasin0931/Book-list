"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, FileX, Inbox, FolderOpen, Trash, PencilIcon } from "lucide-react";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Star, Calendar, Pencil } from "lucide-react"
import { error } from "console"
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
    }
}

export default function Home({ params }: BookProps) {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
    }, [])

    // Is Loading --------------------------------------------------------------------------------
    if (isLoading) {
        return (
            <div className="p-9 bg-gray-50 min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-8xl shadow-xl rounded-2xl p-8 bg-white">
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
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button className="w-32">Add Book</Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button className="w-32" variant="destructive">Clear Session</Button>
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

                        {books.map((book: any, index: number) => ( //------------------------------------------ Book
                            <motion.div
                                key={book.id}
                                className="p-6 rounded-xl shadow-md bg-gray-100"
                                initial={{ opacity: 0, y: 80 }}
                                animate={{ opacity: 1, y: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.01 }}>

                                <Link href={`/books/${book.id}/view/`}>

                                    {/* Contents */}
                                    <div>
                                        <h2 className="text-5xl text-lg font-bold text-black truncate max-w-full mb-2">{book.title}</h2>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="bg-white text-black px-2 rounded-xl">
                                                    {book.isRead ? "Readed" : "To Read"}
                                                </span>
                                                <span className="bg-white text-gray-700 border px-2 py- rounded-xl">
                                                    {book.genre}
                                                </span>
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
                                                <Button size="sm" variant="destructive" className="p-2" onClick={() => alert("Do you want to remove this book ?")}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <Card className="text-gray-500 mt-auto h-31 whitespace-normal p-5 break-words line-clamp-4 overflow-hidden mt-7">
                                            {book.description}
                                        </Card>
                                    </div>

                                    {/* Image */}
                                    <Card className="mt-auto h-100 bg-white flex items-center justify-center text-gray-400 mt-3">
                                        img
                                    </Card>

                                </Link>

                            </motion.div>
                        ))}

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

            </motion.div>
        </motion.div>
    );
}