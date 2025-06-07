"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, FileX, Inbox, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { error } from "console"

interface BookProps {
    params: {
        id: number
        title: string
        description: string
        genre: string
        isRead: boolean
    }
}

export default function Home({ params }: BookProps) {
    const movie_list = {}
    if (Object.keys(movie_list).length === 0) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-6 bg-white">
                    <h1 className="font-bold tracking-tight text-3xl mb-6 text-center text-gray-800">Your Movie List</h1>
                    <Card className="h-64 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl text-center">
                      <h2 className="text-lg text-gray-500 mb-4">The list is empty...</h2>
                      <FolderOpen className="w-12 h-12 mb-4 text-gray-500" />
                    </Card>
                <Button className="w-32 mx-auto">Add a movie</Button>
                </Card>
            </div>
        );
        
    }

    return (
        <div>
            <h1>hi</h1>
        </div>
    )
}