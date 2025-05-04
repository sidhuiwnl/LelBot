import {BotIcon, ArrowUpIcon,Check,X} from "lucide-react";
import {useState} from "react";
import {useDocument} from "@/app/dashboard/ContentStudio/context/document-context";
import {useChat} from "@ai-sdk/react";
import {Button} from "@/components/ui/button";
import {useTweet} from "@/app/dashboard/ContentStudio/context/chat-tweet-context";

export default function Chat() {
    const { document } = useDocument();
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<{ id: number; title: string; content: string }[]>([]);

    const { dispatch } = useTweet()

    const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit } = useChat();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleInputChange(e);


        const shouldShow = /@\w*$/.test(value);
        setShowSuggestion(shouldShow);
    };

    const match = input.match(/@(\w*)$/);
    const searchTerm = match?.[1]?.toLowerCase() || "";

    const filteredDocs = document.filter((doc) => {
        return doc.title.toLowerCase().includes(searchTerm);
    });


    const handleSelect = (doc: { id: number; title: string, content: string }) => {

        const newInput = input.replace(/@\w*$/, `@${doc.title} `);

        handleInputChange({
            target: {
                value: newInput
            }
        } as never);

        setShowSuggestion(false);


        setSelectedDocs(prev => [...prev, doc]);
    };

    const handleTweet = (text : string) => {
        if (!text) {
            return;
        }
        dispatch({
            type : "SET_TWEET",
            payload: text
        })
    }




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        let processedMessage = input;



        selectedDocs.forEach(doc => {
            if (processedMessage.includes(`@${doc.title}`)) {

                const contentReference = `\n\n[DOCUMENT: ${doc.title}]\n${doc.content}\n[END DOCUMENT]\n\n`;

                processedMessage = processedMessage.replace(`@${doc.title}`, contentReference);
            }
        });





        originalHandleSubmit(e, {
                body: {
                    messages: [
                        ...messages,
                        {
                            role: 'user',
                            content: processedMessage
                        }
                    ]
                }

        });




        setSelectedDocs([]);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] p-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-2">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <BotIcon color="gray" />
                        <p className="text-sm mt-3 p-2 text-center text-gray-400">
                            To chat with the context to create your perfect content to
                            showcase
                        </p>
                    </div>
                ) : (
                    messages.map(message => (

                        <div
                            key={message.id}
                             className={`whitespace-pre-wrap ${
                                 message.role === "user" ? "p-2 rounded-md mb-2 bg-neutral-800  text-sm" : " p-2 text-sm "
                             }`}
                        >
                            {message.role === 'user' ? 'User: ' : 'AI: '}
                            {message.parts.map((part, i) => {

                                switch (part.type) {
                                    case 'text':
                                        return (
                                            <>
                                                <div
                                                key={`${message.id}-${i}`}
                                                className="text-white text-sm ">
                                                {part.text}
                                                </div>
                                                { message.role !== 'user' && (
                                                    <div className="flex flex-row justify-end">
                                                        <Button className="cursor-pointer">
                                                            Reject
                                                            <X color="red"/>
                                                        </Button>
                                                        <Button
                                                            variant="default"
                                                            className="text-sm cursor-pointer"
                                                            onClick={() => handleTweet(part.text)}
                                                        >
                                                            Apply
                                                            <Check color="green"/>
                                                        </Button>
                                                    </div>
                                                )}
                                            </>

                                        )
                                }
                            })}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative flex flex-row items-center space-x-3">
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Enter message"
                    className="w-full p-3 border border-neutral-700 rounded-lg placeholder:text-sm text-sm outline-none focus:outline-none"
                />
                <button type="submit" className="hover:cursor-pointer">
                    <ArrowUpIcon color="gray" />
                </button>

                {showSuggestion && filteredDocs.length > 0 && (
                    <div className="absolute bottom-14 left-0 border border-neutral-800 shadow-md rounded-md w-full z-50">
                        {filteredDocs.map((doc) => (
                            <div
                                key={doc.id}
                                className="px-4 py-2 hover:bg-neutral-800 cursor-pointer text-sm"
                                onClick={() => handleSelect(doc)}
                            >
                                {doc.title}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}