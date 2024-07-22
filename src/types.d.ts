import schema from "./db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Article = InferSelectModel<typeof schema.>;
