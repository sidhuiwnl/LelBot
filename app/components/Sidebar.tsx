"use client"

import {FileText,Plus} from "lucide-react";
import {useState} from "react";

interface File {
    name: string,
    description: string,
}

export default function Sidebar() {
    const [documents,setDocuments] = useState<File[]>([])

    function handleAddDocument(){
        setDocuments((prev : File[]) => [...prev,{
            name : "Untitled document",
            description : "The document you want to add",
        }])
    }
    return (
        <div className="flex flex-col  p-4 w-[300px] border-r border-neutral-800">
            <h1>LelBot</h1>
            <div className="flex flex-col space-y-4 mt-10">
                <label>Main Content</label>

            </div>
            <div className="mt-20 w-full">
                <div className="flex flex-row items-center justify-between  gap-2">
                    <h1>Documents</h1>
                    <button
                        onClick={handleAddDocument}
                    className="hover:cursor-pointer"
                    >
                        <Plus size={18}/>
                    </button>
                </div>
            </div>

                {documents.map((document, i) => (
                    <ul key={i} className="flex flex-row space-x-2 mt-10">
                        <FileText size={18}/>
                        <p className="text-sm">{document.name}</p>
                    </ul>
                ))}

        </div>
    )
}