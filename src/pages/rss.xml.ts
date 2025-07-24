import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params, request, site }) => {
    const blogPost = await getCollection('blog')

    return rss({
        // ex. use your stylesheet from "public/rss/styles.xsl"
        // stylesheet: '/styles/rss.xsl',
        // `<title>` field in output xml
        title: 'Abraham’s Blog',
        // `<description>` field in output xml
        description: 'A single blog about me...',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: site ?? '',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPost.map(({ data, slug }) => ({
            title: data.title,
            pubDate: data.date,
            description: data.description,
            link: `post/${slug}`
        })),
        // (optional) inject custom xml
        customData: `<language>es-mx</language>`
    })
}
