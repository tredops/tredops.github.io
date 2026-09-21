import type { APIContext } from "astro";
import { blogFeed } from "../../../components/blog/rss";

export const GET = (context: APIContext) => blogFeed(context, "es");
