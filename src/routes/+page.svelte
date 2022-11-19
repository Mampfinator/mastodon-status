<script lang="ts">
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { apiData, responseTime, client, activityData, makeClient } from "../stores";
	import Activity from "../components/Activity.svelte";
	import InfoCard from "../components/InfoCard.svelte";
	import MailTo from "../components/MailTo.svelte";
    export let data: PageData;

    makeClient(`${data.instanceUri}/api`);


    const fetchData = (async () => {
        const start = Date.now();

        const data = await client.getInstance();
        const activities = await client.getActivities();
        const time = Date.now() - start;
        activityData.set(activities);
        responseTime.set(time);
        apiData.set(data);
    })();

    

</script>

{#await fetchData}
    <p class="">Fetching data from status API! Please allow up to 5 seconds for this process...</p>
{:then _} 
    <div class="flex flex-row flex-nowrap items-center justify-items-center gap-3 h-screen">
        <div class="flex flex-col items-center justify-items-center gap-3">
            <InfoCard>
                <h2 class="text-center">Welcome to <a class="hover:underline" href={$apiData.uri}>{$apiData.title}</a></h2>
                <span>If you're seeing this, this instance is healthy and running without issues!</span>
                <span>If you think this is wrong, contact me on GitHub!</span>
            </InfoCard>
            <InfoCard>
                <h2>Configuration Info</h2>

                <h3>Contact</h3>
                <span><a href={$apiData.contact_account.url}>@{$apiData.contact_account.username}</a> or <MailTo email={$apiData.email}/></span>
            </InfoCard>
        </div>
        <InfoCard>
            <h2 class="text-center">Stats</h2>
            <ul class="flex flex-row gap-3 justify-center">
                <li class="flex-grow"><span class="text-green-400">{$apiData.stats.user_count}</span> registered users</li>
                <li class="flex-grow"><span class="text-green-400">{$apiData.stats.status_count}</span> published posts</li>
                <li class="flex-grow"><span class="text-green-400">{$apiData.stats.domain_count}</span> federation partners</li>
                <li class="flex-grow">RTT: <span class="{$responseTime > 500 ? "text-red-400" : "text-green-400"}">{$responseTime}</span>ms</li>
            </ul>
            <Activity class=""/>
        </InfoCard>
    </div>
{:catch error}
    <p>
        {console.log(error)}
        An error occured! This is usually a pretty good indicator that something is horribly wrong.
        If the error persists, try and reach out to the site host with the following: 
        <span>{error}</span>
    </p>
{/await}