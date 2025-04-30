"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/app/dashboard/ContentStudio/context/document-context";
import { useRef, useState } from "react";
import {getWebsiteHtml} from "@/lib/website-data";
import Chat from "@/app/dashboard/ContentStudio/components/Chat";

export default function AssistantComp() {
    const { dispatch } = useDocument();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleWebsiteData(formData: FormData) {
        const websiteLink = formData.get("website") as string;

        if (!websiteLink) return;

        try {
            setLoading(true)
            const data = await getWebsiteHtml(websiteLink);


            dispatch({
                type: "ADD_NEW_DOCUMENT",
                payload: {
                    id: 1,
                    title: "",
                    content: data as string,
                },
            });

            formRef.current?.reset();
        } catch (error) {
            console.error("Error scraping website:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-2">
            <Tabs defaultValue="crawl">
                <TabsList className="w-full">
                    <TabsTrigger value="crawl">Crawl</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="crawl">
                    <form action={handleWebsiteData} ref={formRef} className="flex items-center gap-2 mt-3">
                        <input
                            type="text"
                            name="website"
                            id="website"
                            placeholder="Enter website URL"
                            className="p-2 border border-neutral-700 rounded-lg placeholder:text-sm outline-none text-sm flex-1"
                        />
                        <Button type="submit" className="bg-white text-black hover:text-black hover:bg-white hover:cursor-pointer" disabled={loading}>
                            {loading ? "Adding..." : "Add"}
                        </Button>
                    </form>
                </TabsContent>

                <TabsContent value="chat">
                    <Chat/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
