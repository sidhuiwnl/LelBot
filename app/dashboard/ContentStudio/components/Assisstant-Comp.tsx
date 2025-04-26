import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Button} from "@/components/ui/button";



export default function AssisstantComp(){
    return (
        <div className="mt-2">
            <Tabs defaultValue="account">
                <TabsList className="w-full">
                    <TabsTrigger value="account">Crawl</TabsTrigger>
                    <TabsTrigger value="password">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <input
                        type="text"
                        id="website"
                        placeholder="Enter the website to crawl"
                        className="p-2 border border-neutral-700 rounded-lg placeholder:text-sm mt-3 outline text-sm"
                    />
                    <Button className="bg-white text-black ml-2">Add</Button>

                </TabsContent>
                <TabsContent value="password" >Change your password here.</TabsContent>
            </Tabs>
        </div>


    )
}