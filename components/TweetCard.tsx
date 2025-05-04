"use client";

import { useEffect, useRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Smile, Italic } from "lucide-react";
import { useTweet } from "@/app/dashboard/ContentStudio/context/chat-tweet-context";

export default function TweetCard() {
    const { state, dispatch } = useTweet();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-grow textarea on content change
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [state.content]);

    return (
        <div className="flex flex-col p-4 w-[500px] rounded-lg border border-neutral-800">
            <div className="flex space-x-4 w-full">
                <div className="w-11 h-10 rounded-full bg-neutral-600">
                    <img
                        src="/ghib-me.png"
                        alt="me"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex space-x-2">
                        <h1 className="text-sm font-bold text-white">Sidharth</h1>
                        <p className="text-sm text-neutral-400">@sidharth_b26649</p>
                    </div>

                    <textarea
                        ref={textareaRef}
                        placeholder="What's happening?"
                        className="mt-2 w-full bg-transparent text-sm text-white placeholder:text-neutral-500 resize-none outline-none overflow-hidden"
                        value={state.content}
                        onChange={(e) =>
                            dispatch({ type: "SET_TWEET", payload: e.target.value })
                        }
                    />

                    <hr className="border-t border-neutral-800 mt-2" />

                    <ToggleGroup type="multiple" className="mt-3">
                        <ToggleGroupItem value="B" className="text-xl mr-2 rounded-sm">B</ToggleGroupItem>
                        <ToggleGroupItem value="I" className="text-xl mr-2 rounded-sm"><Italic /></ToggleGroupItem>
                        <ToggleGroupItem value="S" className="text-xl mr-2 rounded-sm"><Smile /></ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    );
}
