import TextEditor from "@/app/dashboard/components/text-editor";

type Props = {
    params : Promise<{ id : string}>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <div>
            <TextEditor id={id}/>
        </div>
    )
}