"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, FileX, Inbox, FolderOpen, Trash, PencilIcon, Car } from "lucide-react";
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
    id: number
    title: string
    description: string
    genre: string
    isRead: boolean
    year: number
    rating: number
}

interface editPageProps {
    id: number
}

export default function ViewPage({ id }: editPageProps) {

    const [books, setBooks] = useState<BookProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(id)
        fetch(`/api/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error("Failed to fetch books", error)
                setIsLoading(false)
            })
    }, [id])


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

    if (!books) {
        alert("Failed to fetch data. . .")
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

    return (
        <motion.div
            className="pl-90 pr-90 bg-gray-50 min-h-screen flex items-center justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <div className="w-full max-w-8xl shadow-xl rounded-2xl p-8 bg-white">
                <motion.div whileHover={{ scale: 1.01 }}>
                    <Card>

                        <span className="bg-white text-black px-2 rounded-xl">
                            {books.title}
                        </span>

                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="bg-white text-black px-2 rounded-xl">
                                    {books.isRead ? "Readed" : "To Read"}
                                </span>
                                <span className="bg-white text-gray-700 border px-2 py- rounded-xl">
                                    {books.genre}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    {books.year || "N/A"}
                                </span>
                                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-xl">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    {books.rating ?? "N/A"}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Link href={`/books/${books.id}`}>
                                    <Button size="sm" variant="outline" className="p-2">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button size="sm" variant="destructive" className="p-2" onClick={() => alert("Do you want to remove this book ?")}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div>
                                {/* Description */}
                                <Card className="text-gray-500 mt-auto h-31 whitespace-normal p-5 break-words line-clamp-4 overflow-hidden mt-7">
                                    {books.description}
                                </Card>
                            </div>

                            {/* Image */}
                            <Card className="mt-auto h-100 bg-white flex items-center justify-center text-gray-400 mt-3">
                                img
                            </Card>

                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
