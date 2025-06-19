"use client"

import EditPage from "@/components/edit"
import ViewPage from "@/components/view"
import { Edit } from "lucide-react"
import { useParams } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default function View() {

  const params = useParams();
  const bookId = Number(params.id);

  if (isNaN(bookId)) {
    return <div>Invalid book ID. . .</div>
  }

  return (
    <ViewPage id={bookId}/>
  )
}