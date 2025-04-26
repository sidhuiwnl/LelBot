import Sidebar from "@/app/components/Sidebar";
import {DocumentProvider} from "@/app/dashboard/context/document-context";
import {SelectDocumentProvider} from "@/app/dashboard/context/select-document";

type Props = {
    children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
    return(
        <div className="flex w-full h-screen">
            <DocumentProvider initialDocument={[]}>
                <SelectDocumentProvider>
                    <Sidebar/>
                    <main className="p-2">
                        {children}
                    </main>
                </SelectDocumentProvider>

            </DocumentProvider>
        </div>
    )
}