"use client"

import {FileText,Plus} from "lucide-react";
import {useDocument} from "@/app/dashboard/context/document-context";
import Link from "next/link";
import {useSelectDocument} from "@/app/dashboard/context/select-document";

interface File {
    id: number;
    title: string,
   content: string,
}

export default function Sidebar() {

    const { document,dispatch } = useDocument();
    const { selectDocument } = useSelectDocument()

    function addContentDoc(){
        const nextId = document?.length > 0
            ? Math.max(...document?.map(doc => doc.id)) + 1
            : 1;

        dispatch({
            type : "ADD_NEW_DOCUMENT",
            payload : {
                id : nextId,
                title : "Unnamed Content",
                content : "This is the content",
            }
        })
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
                    onClick={addContentDoc}
                    className="hover:cursor-pointer"
                    >
                        <Plus size={18}/>
                    </button>
                </div>
            </div>

                {document?.map((document, i) => (
                    <Link
                        onClick={() => selectDocument(document.id)}
                        href={`/dashboard/${document.id}`}
                        key={i} className="flex flex-row space-x-2 mt-10">
                        <FileText size={18}/>
                        <p className="text-sm">{document.title}</p>
                    </Link>
                ))}

        </div>
    )
}