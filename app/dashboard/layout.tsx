import Sidebar from "@/app/components/Sidebar";
import Contentbar from "@/app/dashboard/components/Contentbar";

type Props = {
    children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
    return(
        <div className="flex h-screen">
            <Sidebar/>
            <main className="p-2">
                {children}
            </main>
            <Contentbar/>
        </div>
    )
}