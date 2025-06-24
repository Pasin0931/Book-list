"use client"

import CreateBook from "@/components/create"

interface PageProps {
    params: {
        id: string
    }
}

export default function CreateBookPage() {
    return (
        <CreateBook />
    )
}
