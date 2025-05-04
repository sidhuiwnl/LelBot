
"use client"
import { useContext,createContext,Dispatch,useReducer} from "react";

type TweetState = {
    content : string,
}

type Action =
    | { type : "SET_TWEET", payload : string }
    | { type : "CLEAR_TWEET" }

type TweetContextType = {
    state: TweetState,
    dispatch: Dispatch<Action>,
}

const TweetContext = createContext<TweetContextType | undefined>(undefined)

function reducer(state : TweetState,action : Action) : TweetState {
    switch (action.type) {
        case  "SET_TWEET":
            return {...state, content: action.payload}
        case "CLEAR_TWEET":
            return {
                ...state,content : ""
            }
        default:
            return state;
    }
}

export const TweetProvider = ({children }: {children: React.ReactNode}) => {
    const [ state,dispatch ] = useReducer(reducer, {
        content : ""
    })

    return (
        <TweetContext.Provider value={{ state, dispatch }}>
            {children}
        </TweetContext.Provider>
    )
}


export function useTweet() {
    const context = useContext(TweetContext);
    if (!context) throw new Error("useTweet must be used within TweetProvider");
    return context;
}