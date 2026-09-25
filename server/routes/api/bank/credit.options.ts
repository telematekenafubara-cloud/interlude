import { defineHandler } from "nitro";
import { corsOptions } from "../../../lib/cors";
export default defineHandler(() => corsOptions());
