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

export default function CreateBook() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [year, setYear] = useState<number | undefined>()
    const [rating, setRating] = useState<number | undefined>()
    const [isRead, setIsRead] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {

        if (!title || !description || !genre) {
            return alert("Please fill in all required fields.")
        }

        setLoading(true)

        const newBook = { title, description, genre, year, rating, isRead }

        try {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook)
            })

            if (response.ok) {

                window.location.href = "/"

            } else {
                alert("Failed to create book.")
            }
        } catch (error) {
            console.error("Error creating book", error)
        } finally {
            setLoading(false)
        }

    }

    return (

        <motion.div
            className="px-10 py-12 bg-gray-50 min-h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-full max-w-5xl p-8 rounded-2xl shadow-xl bg-white">
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="w-full md:w-2/4 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">New Book</h1>

                        <div className="space-y-3">
                            <Input
                                placeholder="Book Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                className="h-50"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                placeholder="Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Year"
                                value={year ?? ""}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                            />
                            <Input
                                type="number"
                                placeholder="Rating"
                                value={rating ?? ""}
                                onChange={(e) => setRating(parseFloat(e.target.value))}
                            />
                            <label className="flex items-center space-x-2 text-sm ml-3 pt-1">
                                <input
                                    type="checkbox"
                                    checked={isRead}
                                    onChange={() => setIsRead(!isRead)}
                                />
                                <span>Mark as Read</span>
                            </label>
                        </div>

                        <div className="mt-5 flex justify-center gap-4">
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="rounded-xl px-6"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                    onClick={() => window.location.href = "/"}
                                >
                                    Cancel
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/4">
                        <Card className="h-160 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
                            <span>Image Placeholder</span>
                        </Card>
                    </div>

                </div>
            </Card>

        </motion.div>

    )
}
