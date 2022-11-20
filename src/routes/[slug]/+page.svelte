<script lang="ts">
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { apiData, responseTime, activityData } from "../../stores";
	import Activity from "../../components/Activity.svelte";
	import InfoGroup from "../../components/InfoGroup.svelte";
	import InfoCard from "../../components/InfoCard.svelte";
	import MailTo from "../../components/MailTo.svelte";
	import { Client } from "../../client";
    export let data: PageData;

    const {instanceUri} = data;
    const client = new Client(instanceUri);

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
    <p class="">Fetching data from <code>{client.baseUrl}</code> status API! Please allow up to 5 seconds for this process...</p>
{:then _} 
    <div class="flex flex-col lg:flex-row flex-nowrap items-center justify-items-center place-content-evenly gap-3 h-screen">
        <InfoGroup>
            <InfoCard>
                <h2 class="text-center text-2xl"><a class="hover:underline" href={$apiData.uri}>{$apiData.title}</a> is <span class="text-green-400">Online</span></h2>
                <div class="flex flex-row justify-center">
                    <hr class="w-3/4"/>
                </div>
                <span>If you're seeing this, this instance is healthy and running without issues!</span>
                <span>If you think this is wrong, contact me on GitHub!</span>
            </InfoCard>
            <InfoCard>
                <h2 class="text-xl text-center">Configuration Info</h2>
                <div class="flex flex-row justify-center">
                    <hr class="w-3/4"/>
                </div>
            </InfoCard>
            <InfoCard>
                <h3 class="text-xl text-center">Contact</h3>
                <div class="flex flex-row justify-center">
                    <hr class="w-3/4"/>
                </div>
                <span><a href={$apiData.contact_account.url}>@{$apiData.contact_account.username}</a> or <MailTo email={$apiData.email}/></span>
            </InfoCard>
        </InfoGroup>
        <InfoGroup>
            <InfoCard>
                <h2 class="text-center text-2xl">Stats</h2>
                <div class="flex flex-row justify-center">
                    <hr class="w-1/2"/>
                </div>
                <ul class="flex flex-row gap-3 justify-center mt-3">
                    <li class="flex-grow"><span class="text-green-400">{$apiData.stats.user_count}</span> registered users</li>
                    <li class="flex-grow"><span class="text-green-400">{$apiData.stats.status_count}</span> published posts</li>
                    <li class="flex-grow"><span class="text-green-400">{$apiData.stats.domain_count}</span> federation partners</li>
                    <li class="flex-grow">RTT: <span class="{$responseTime > 500 ? "text-red-400" : "text-green-400"}">{$responseTime}</span>ms</li>
                </ul>
                <Activity/>
            </InfoCard>
        </InfoGroup>
    </div>
{:catch error}
    <p>
        {console.log(error)}
        An error occured! This is usually a pretty good indicator that something is horribly wrong.
        If the error persists, try and reach out to the site host with the following: <br/>
        <span>{error}</span>
    </p>
{/await}