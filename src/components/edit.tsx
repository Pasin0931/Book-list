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
  rating: number
  year: number
}

interface editPageProps {
  id: number
}

export default function EditPage({ id }: editPageProps) {

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
      className="p-9 bg-gray-50 min-h-screen flex items-center justify-center"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <div className="w-full max-w-8xl shadow-xl rounded-2xl p-8 bg-white">
        <motion.div whileHover={{ scale: 1.01 }}>
          <Card>
            {books.title}
            {books.description}
            {books.genre}
            {books.isRead }
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
