"use client"

import {useRef,useEffect} from "react";
import {useDocument} from "@/app/dashboard/ContentStudio/context/document-context";
import {useSelectDocument} from "@/app/dashboard/ContentStudio/context/select-document";




export default function TextEditor() {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { dispatch } = useDocument();
    const { getSelectedDocument } = useSelectDocument();
    const selectedDoc = getSelectedDocument();

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML.trim() === "") {
            editorRef.current.innerHTML = `
            <h1 class="text-2xl font-bold mb-0">${selectedDoc?.title || "Untitled"}</h1>
            <p contenteditable="true">${selectedDoc?.content || "Main content goes here..."}</p>


            `;
        }

    }, [selectedDoc]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!editorRef.current || !selectedDoc) return;

            const children = editorRef.current.children;
            const title = children[0]?.textContent || "Untitled";
            const content = Array.from(children)
                .slice(1)
                .map((child) => child.innerHTML)
                .join("\n");

            dispatch({ type: "CHANGE_TITLE", payload: { id: selectedDoc.id, title } });
            dispatch({ type: "CHANGE_CONTENT", payload: { id: selectedDoc.id, content } });

            console.log("Auto-saved", { title, content });
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedDoc, dispatch]);

    return (
        <div className="w-3xl mx-auto min-h-screen p-10 flex flex-col">
            <h1 className="mb-2 text-2xl font-semibold">Document</h1>
            <div
                ref={editorRef}
                contentEditable
                className="flex-1 bg-neutral-100 text-black rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
                suppressContentEditableWarning={true}
                style={{ whiteSpace: 'pre-wrap', outline: "none" }}
            />
        </div>
    );
}
