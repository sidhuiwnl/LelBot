"use client"

import {createContext,useState,useContext,ReactNode} from "react";
import {Document} from "@/app/dashboard/context/document-context";
import {useDocument} from "@/app/dashboard/context/document-context";


type DocumentContextType = {
    selectDocument: (id: number) => void;
    getSelectedDocument: () => Document | null;
}

const DocumentContext = createContext<DocumentContextType | null>(null);


export function SelectDocumentProvider({children}: {children: ReactNode}) {
    const [selectedDocumentId,setSelectedDocument] = useState<number | null>(null);

    const { document } = useDocument();

    const selectDocument = (id : number) => {
        setSelectedDocument(id);
    }

    const getSelectedDocument = () => {
        return document?.find(doc  => doc.id === selectedDocumentId) || null;
    };

    return (
        <DocumentContext.Provider value={{ selectDocument,getSelectedDocument }}>
            {children}
        </DocumentContext.Provider>
    )

}

export function useSelectDocument() {
    const context = useContext(DocumentContext);
    if (!context) {
        throw new Error("useSelectDocument must be used within a SelectDocumentProvider");
    }
    return context;
}