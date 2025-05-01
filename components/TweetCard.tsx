import {ToggleGroup,ToggleGroupItem} from "@/components/ui/toggle-group";
import {Smile,Italic} from "lucide-react";


export default function TweetCard() {
    return (
        <div className="flex flex-col p-4 w-[500px] rounded-lg border border-neutral-800">
            <div className="flex space-x-4 w-full">
                <div className="w-11 h-10 rounded-full overflow-hidden bg-neutral-600">
                    <img
                        src="/ghib-me.png"
                        alt="me"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col w-full">

                    <div className="flex space-x-2">
                        <h1 className="text-sm font-bold text-white">Sidharth</h1>
                        <p className="text-sm text-neutral-400">@sidharth_b26649</p>
                    </div>
                    <textarea
                        rows={4}
                        placeholder="What's happening?"
                        className="mt-2 w-full bg-transparent text-sm text-white placeholder:text-neutral-500 resize-none outline-none"
                    />
                    <hr className="border-t border-neutral-800"/>
                    <ToggleGroup type="multiple" className="mt-3">
                        <ToggleGroupItem value="B" className="text-xl mr-2 rounded-sm">B</ToggleGroupItem>
                        <ToggleGroupItem value="I" className="text-xl mr-2 rounded-sm"><Italic/></ToggleGroupItem>
                        <ToggleGroupItem value="S" className="text-xl mr-2 rounded-sm"><Smile/></ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    );
}
