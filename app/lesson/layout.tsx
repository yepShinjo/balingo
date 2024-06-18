import LessonPage from "./page"

type Props = {
    children: React.ReactNode
}

// as always, layout for every path. this case, /lesson
const LessonLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        </div>
    )
}

export default LessonLayout