"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
