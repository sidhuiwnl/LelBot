"use client"

import {useRef,useEffect} from "react";
import {useDocument} from "@/app/dashboard/context/document-context";
import {useSelectDocument} from "@/app/dashboard/context/select-document";


type Props = {
    id : string
}

export default function TextEditor({ id  }: Props) {

    const editorRef = useRef<HTMLDivElement | null>(null);
    const {dispatch } = useDocument();
    const { getSelectedDocument } = useSelectDocument()

    const selectedDoc   = getSelectedDocument();



    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML.trim() === "") {
            editorRef.current.innerHTML = `
            <h1 style="font-size: 1.5rem; font-weight: bold;">${selectedDoc?.title}</h1>
            <p><br></p>
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

            dispatch({
                type: "CHANGE_TITLE",
                payload: { id: selectedDoc.id, title },
            });

            dispatch({
                type: "CHANGE_CONTENT",
                payload: { id: selectedDoc.id, content },
            });

            console.log("Auto-saved", { title, content });
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedDoc, dispatch]);

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