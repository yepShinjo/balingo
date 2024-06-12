import { Button } from "@/components/ui/button"
import { NotebookText } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string
    description: string

}

export const UnitBanner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="w-full rounded-lg bg-orange-400 p-5 text-white flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
                <p className="text-lg ">
                    {description}
                </p>
            </div>
            <Link href="/lesson">
                <Button
                    size="lg"
                    variant="secondary"
                    className="hidden lg:flex"
                >
                    <NotebookText/>
                    Lanturang
                </Button>
            </Link>
        </div>
    )
}