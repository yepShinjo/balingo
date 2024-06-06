import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="h-12 w-12 text-muted-foreground animate-spin"/>
    </div>
  )
}

export default loading
