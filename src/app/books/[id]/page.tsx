"use client"

import EditPage from "@/components/edit"
import { useParams } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default function EditBookPage() {

  const params = useParams();
  const bookId = Number(params.id);

  if (isNaN(bookId)) {
    return <div>Invalid book ID. . .</div>
  }

  return (
    <EditPage id={bookId}/>
  )
}