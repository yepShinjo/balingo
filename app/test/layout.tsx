type Props = {
    children: React.ReactNode
}

console.log("Layout Loaded"); // This will log on the server

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
