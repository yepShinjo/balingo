import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    // later replace with database types
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export const UserProgress = ({ 
    activeCourse, 
    hearts, 
    points, 
    hasActiveSubscription }: Props) => {
    return (
        <div className="flex justify-between pl-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image 
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={54}
                        height={54}
                    />
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500 text-xl">
                    <Image src="/points.svg" height={50} width={50} alt="points" className="mr-2"
                    />
                    {points}
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500 text-xl">
                    <Image src="/heart.svg" height={40} width={40} alt="hearts" className="mr-2"
                    />
                    {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke[3]" /> : hearts}
                </Button>
            </Link>

        </div>
    )
}