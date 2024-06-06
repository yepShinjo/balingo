## everysingle component and page created in the app folder is also a server component 

Folder structure :

(marketing)
contains signup page

(main)
contains the actual app from the default route (which is /learn) and others
    | learn |
    this is the default route


## migration error

### nuke database
go to 
website neon.tech -> project -> triple dot on Balingo -> setting -> delete

then, create new database -> dashboard -> copy connection string and paste it back into DATABASE_URL inside .env -> go to terminal -> npm run db:push -> npm run db:seed