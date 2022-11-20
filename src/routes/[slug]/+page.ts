export function load({params: {slug}}: {params: {slug: string}}) {
    const instanceUri =  slug ?? "mastodon.social";
    return {
        instanceUri
    }
}
