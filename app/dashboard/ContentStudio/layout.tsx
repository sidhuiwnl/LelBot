import Sidebar from "@/app/components/Sidebar";
import {DocumentProvider} from "@/app/dashboard/ContentStudio/context/document-context";
import {SelectDocumentProvider} from "@/app/dashboard/ContentStudio/context/select-document";
import AssistantSidebar from "@/app/dashboard/ContentStudio/components/AssistantSidebar";

type Props = {
    children: React.ReactNode;
}
export default function ContentStudioLayout({ children }: Props) {
    return(
        <div className="flex w-full h-screen relative">
            <DocumentProvider initialDocument={[]}>
                <SelectDocumentProvider>
                    <Sidebar/>
                    <main className="p-2 h-screen relative">
                        {children}
                    </main>
                    <AssistantSidebar/>
                </SelectDocumentProvider>
            </DocumentProvider>
        </div>
    )
}