# Here are some explanation about components used in this project

### cn


we uses cn inside this component. means we have "default" class that we define inside the sidebar component. if we want to add more class property, we can also do that inside this file.


sidebar.tsx have
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className,

mobile-sidebar.tsx (which contain the sidebar.tsx) can add more class property aside the one that has been defined inside sidebar.tsx


    <Sidebar className="mr-1" />

therefore the entirety of the class property will be

    "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col mr-1"