"use client"

import {useRef, useEffect, useState, useCallback} from "react";
import {useDocument} from "@/app/dashboard/ContentStudio/context/document-context";
import {useSelectDocument} from "@/app/dashboard/ContentStudio/context/select-document";

export default function TextEditor() {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { getSelectedDocument } = useSelectDocument();
    const selectedDoc = getSelectedDocument();

    const [saveStatus, setSaveStatus] = useState<string>("");
    const { dispatch } = useDocument();

    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML.trim() === "") {
            editorRef.current.innerHTML = `
            <h1 class="text-2xl font-bold mb-0">${selectedDoc?.title || "Heading"}</h1>
            <p contenteditable="true">${selectedDoc?.content || "Main content"}</p>
            `;
        }
    }, [selectedDoc]);

    const saveCurrentDocument = useCallback(() => {
        setSaveStatus("Writing...");


        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }


        timeoutRef.current = setTimeout(() => {
            if(!editorRef.current || !selectedDoc) return;

            const children = editorRef.current.children;
            const title = children[0]?.textContent || "Untitled";
            const content = Array.from(children)
                .slice(1)
                .map((child) => child.innerHTML)
                .join("\n");

            dispatch({
                type: "CHANGE_TITLE",
                payload: {
                    id: selectedDoc.id,
                    title: title,
                }
            });
            dispatch({
                type: "CHANGE_CONTENT",
                payload: {
                    id: selectedDoc.id,
                    content: content
                }
            });
            setSaveStatus("Saved");


            setTimeout(() => setSaveStatus(""), 2000);
        }, 1000);
    }, [selectedDoc, dispatch]);


    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="w-3xl mx-auto min-h-screen p-10 flex flex-col">
            <div className="relative">
                {saveStatus && (
                    <div className="absolute top-2 right-2 text-black text-xs font-medium bg-white px-2 py-1 rounded shadow">
                        {saveStatus}
                    </div>
                )}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={saveCurrentDocument}
                    className="flex-1 bg-neutral-100 text-black rounded-lg border border-gray-300 px-4 py-2 focus:outline-none min-h-[400px]"
                    suppressContentEditableWarning={true}
                    style={{ whiteSpace: 'pre-wrap', outline: "none" }}
                />
            </div>
        </div>
    );
}