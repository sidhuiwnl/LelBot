"use client"

import {useContext, createContext, ReactNode,useReducer,Dispatch} from "react";

type Action =
    | { type : "CHANGE_TITLE", payload : {
        id : number,
        title : string,
    } }
    | { type : "CHANGE_CONTENT", payload : {
        id : number,
        content : string,
    } }
    | {
    type : "ADD_NEW_DOCUMENT", payload : {
        id : number,
        title : string,
        content : string,
    }
}




export type Document = {
    id : number,
    title : string;
    content : string;
}


type DocumentContextType = {
    document : Document[] | []
    dispatch : Dispatch<Action>
}


function reducer(state :Document[], action :Action) : Document[]{
    switch(action.type){
        case "CHANGE_TITLE":
            return state.map((doc) =>
                doc.id === action.payload.id ? { ...doc, title: action.payload.title } : doc
            );
        case "CHANGE_CONTENT":
            return state.map((doc,) =>
                doc.id === action.payload.id ? { ...doc, content: action.payload.content } : doc
            );
        case "ADD_NEW_DOCUMENT":
            return [...state,action.payload];

        default:
            return state;
    }
}

const DocumentContext = createContext<DocumentContextType | null>(null);

export const useDocument = () => {
    const context = useContext(DocumentContext);

    if (!context) {
        throw new Error("useDocument");
    }
    return context;
}

export const DocumentProvider = ({ children,initialDocument } : { children : ReactNode,initialDocument : Document[]}) => {
    const[document,dispatch] = useReducer(reducer, initialDocument);
    return (
        <DocumentContext.Provider value={ { document ,dispatch}}>
            {children}
        </DocumentContext.Provider>
    )
}

