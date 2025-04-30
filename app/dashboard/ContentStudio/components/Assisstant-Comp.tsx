"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/app/dashboard/ContentStudio/context/document-context";
import { useRef, useState } from "react";
import {getWebsiteHtml} from "@/lib/website-data";

export default function AssistantComp() {
    const { dispatch } = useDocument();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleWebsiteData(formData: FormData) {
        const websiteLink = formData.get("website") as string;

        if (!websiteLink) return;

        try {
            setLoading(true);
            //
            // const response = await fetch("/api/scrape", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ url: websiteLink }),
            // });
            //
            // if (!response.ok) {
            //     console.error("Failed to fetch website data");
            //     return;
            // }
            //
            // const data = await response.json();

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
            <Tabs defaultValue="account">
                <TabsList className="w-full">
                    <TabsTrigger value="account">Crawl</TabsTrigger>
                    <TabsTrigger value="password">Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
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

                <TabsContent value="password">
                    Chat functionality coming soon.
                </TabsContent>
            </Tabs>
        </div>
    );
}
