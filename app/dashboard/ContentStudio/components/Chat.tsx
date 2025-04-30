import {BotIcon,ArrowUpIcon} from "lucide-react";
import {useState} from "react";
import {useDocument} from "@/app/dashboard/ContentStudio/context/document-context";


type MessageType = {
    role : "USER" | "BOT",
    content : string
}



export default function Chat() {
    const { document } = useDocument();
    const [showSuggestion,setShowSuggestion] = useState(false);
    const[messages, setMessages] = useState<MessageType[]>([]);

    const[input, setInput] = useState("");


    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages((prev) =>
            [
                ...prev,
                {
                    role : "USER",
                    content : input
                }
            ]
        );
        setInput("");
        setShowSuggestion(false);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "USER", content: input },
                {
                    role: "BOT",
                    content: `You mentioned: ${
                        match?.[1]
                            ? document
                            .find((doc) =>
                                doc.title.toLowerCase().includes(searchTerm)
                            )?.title || "nothing"
                            : "nothing"
                    }`,
                },
            ]);
        }, 500);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        const shouldShow = /@\w*$/.test(value);
        setShowSuggestion(shouldShow);
    };

    const match = input.match(/@(\w*)$/);
    const searchTerm = match?.[1]?.toLowerCase() || "";

    const filteredDocs = document.filter((doc) => {
        return doc.title.toLowerCase().includes(searchTerm)
    })

    const handleSelect = (doc: { id: number; title: string }) => {
        // Replace the @ trigger with the selected document title
        const newInput = input.replace(/@\w*$/, `@${doc.title} `);
        setInput(newInput);
        setShowSuggestion(false);
    };



    return (
        <div className="flex flex-col h-[calc(100vh-60px)] p-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-2">
                { messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <BotIcon color="gray" />
                        <p className="text-sm mt-3 p-2 text-center text-gray-400">
                            To chat with the context to create your perfect content to
                            showcase
                        </p>
                    </div>
                ) : (
                    messages.map((msg,idx) =>  (
                        <div
                        key={idx}
                        className={`p-2 rounded-md text-sm max-w-[70%] ${
                            msg.role === "USER"
                             ? "ml-auto bg-neutral-800 text-white"
                             : "mr-auto bg-white text-black"   
                        }`}
                        >
                            { msg.content}
                        </div>
                    ))
                )}
            </div>

            <div
                className=" relative  flex flex-row items-center space-x-3">
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Enter message"
                    className="w-full p-3 border border-neutral-700 rounded-lg placeholder:text-sm text-sm outline-none focus:outline-none"
                />
                <button onClick={handleSend} className="hover:cursor-pointer">
                    <ArrowUpIcon color="gray" />
                </button>


                {showSuggestion && filteredDocs.length > 0 && (
                    <div className="absolute bottom-14 left-0  border  border-neutral-800 shadow-md rounded-md w-full z-50">
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
            </div>
        </div>
    );
}
