"use client"

import {useState,useRef,useEffect} from "react";




export default function TextEditor(){

    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML.trim() === "") {
            editorRef.current.innerHTML = "<p><br></p>";
        }
    }, []);

    return (
        <div className="w-4xl mx-auto h-screen p-10">
            <h1 className="mb-2">Document</h1>
            <div
                ref={editorRef}
                contentEditable
                className="bg-neutral-100 text-black h-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
                suppressContentEditableWarning={true}
                style={{ whiteSpace: 'pre-wrap',outline : "none" }}
            ></div>

        </div>
    )
}