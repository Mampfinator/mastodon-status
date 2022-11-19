export function load({url}: {url: URL}) {
    const instanceUri = url.searchParams.get("instance") ?? "mastodon.social";
    return {
        instanceUri
    }
}
