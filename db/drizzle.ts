import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

const sql = neon(process.env.DATABASE_URL!)
// allow us to actually use drizzle (so i dont have to write raw SQL)
const db = drizzle(sql, { schema })

export default db