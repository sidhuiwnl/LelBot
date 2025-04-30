import Sidebar from "@/app/components/Sidebar";
import {DocumentProvider} from "@/app/dashboard/ContentStudio/context/document-context";
import {SelectDocumentProvider} from "@/app/dashboard/ContentStudio/context/select-document";
import AssistantSidebar from "@/app/dashboard/ContentStudio/components/AssistantSidebar";
import {Button} from "@/components/ui/button";
import {ClipboardList} from "lucide-react";

type Props = {
    children: React.ReactNode;
}
export default function ContentStudioLayout({ children }: Props) {
    return(
        <div className="flex w-screen h-screen">
            <DocumentProvider initialDocument={[]}>
                <SelectDocumentProvider>
                    <Sidebar/>
                    <main className="p-2 h-screen w-full">
                        <div className="flex justify-end">
                            <Button className="rounded-full shadow-md mt-3">
                                <ClipboardList />
                            </Button>
                        </div>
                        {children}
                    </main>
                    <AssistantSidebar/>
                </SelectDocumentProvider>
            </DocumentProvider>
        </div>
    )
}