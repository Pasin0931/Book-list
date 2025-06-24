"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface BookProps {
  id: number
  title: string
  description: string
  genre: string
  isRead: boolean
  rating: number
  year: number
  image: string
}

interface editPageProps {
  id: number
}

export default function EditPage({ id }: editPageProps) {

  const currentYear = new Date().getFullYear()

  const [books, setBooks] = useState<BookProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [title, setTitle] = useState(books?.title)
  const [description, setDescription] = useState(books?.description)
  const [genre, setGenre] = useState(books?.genre)
  const [year, setYear] = useState<number | undefined>(books?.year)
  const [rating, setRating] = useState<number | undefined>(books?.rating)
  const [isRead, setIsRead] = useState(false)
  const [image, setImage] = useState(books?.image)
  const [loading, setLoading] = useState(false)

  const [imgError, setImgError] = useState(false)

  const handleSubmit = async () => {

    if (!title || !description || !genre) {
      return alert("Please fill in { title, description, genre } fields.")
    }

    setLoading(true)

    const newBook = { title, description, genre, year, rating, isRead, image }

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook)
      })

      if (response.ok) {

        window.location.href = "/"

      } else {
        return alert("Failed to update book.")
      }
    } catch (error) {
      return console.error("Error updating book", error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    console.log(id)
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setTitle(data.title)
        setDescription(data.description)
        setGenre(data.genre)
        setYear(data.year)
        setRating(data.rating)
        setImage(data.image)
        setIsRead(data.isRead)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Failed to fetch books", error)
        setIsLoading(false)
      })
  }, [id])

  useEffect(() => {
    if (image) {
      setImgError(false)
    }
  }, [image])

  // Is Loading --------------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="bg-white text-white">
        <h1>Loading. . . .</h1>
      </div>
    )
  }

  // No book -----------------------------------------------------------------------------------
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

  // Have book
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
            <h1 className="text-3xl font-bold text-gray-800">Editing "{books.title}"</h1>

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
                onChange={(e) => {

                  if (e.target.value === "") {
                    return setYear(undefined)
                  }

                  const thisYear = parseInt(e.target.value, 10)

                  if (thisYear <= currentYear && thisYear >= 1450) {
                    setYear(thisYear)
                  } else if (thisYear < 1450) {
                    setYear(1450)
                  } else if (thisYear > currentYear) {
                    setYear(currentYear)
                  }
                }}
                min={1450}
                max={currentYear}
                step={1}
              />
              <Input
                type="number"
                placeholder="Rating"
                value={rating ?? ""}
                onChange={(e) => {
                  const thisRating = parseFloat(e.target.value)
                  if (thisRating <= 10 && thisRating >= 0) {
                    setRating(thisRating)
                  } else if (thisRating > 10) {
                    setRating(10)
                  } else if (thisRating < 0) {
                    setRating(0)
                  }
                }}
                min={0}
                max={10}
                step={0.1}
              />
              <Input
                placeholder="Image URL"
                value={image ?? ""}
                onChange={(e) => { setImage(e.target.value) }}
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
              {imgError || !image ? (
                <span>N/A</span>
              ) : (
                <img
                  src={image}
                  alt="Book cover"
                  className="object-cover h-full rounded-xl"
                  onError={() => setImgError(true)}
                  onLoad={() => setImgError(false)}
                />
              )}
            </Card>
          </div>

        </div>
      </Card>

    </motion.div>

  )
}
