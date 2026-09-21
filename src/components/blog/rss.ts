// Feed RSS de un idioma del blog (lo consumen los agregadores y las
// automatizaciones de redes: publicar un post = una entrada nueva aquí).
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { listPosts, postHref, T, type Lang } from "./blog";

export async function blogFeed(context: APIContext, lang: Lang) {
	const t = T[lang];
	const base = import.meta.env.BASE_URL;
	const posts = await listPosts(lang);
	return rss({
		title: t.rssTitle,
		description: t.description,
		site: context.site ?? "https://docs.tredops.com",
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postHref(post, base),
			categories: post.data.tags,
			author: post.data.author,
		})),
		customData: `<language>${lang}</language>`,
	});
}
