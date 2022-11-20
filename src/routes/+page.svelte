<script lang="ts">
    let url: string;

    const goTo = (() => {
        window.location.href = window.location.href + `${url}`;
    });
</script>

<div class="flex flex-col justify-center items-center h-screen">
        <h1 class="text-7xl">Welcome to Mastodon Status!</h1>
        <span>To see the status of an instance, just type its short URL (like, for example, <code>home.social</code> or <code>mastodon.social</code>) in the box below.</span>
        <input class="justify-self-center text-center caret-[rgba(255,255,255,.3)] w-3/4 font-extrabold text-8xl bg-gradient-to-r bg-[rgba(255,255,255,0.05)] rounded-full p-4" bind:value={url}  on:keypress={({key}) => {
            if (key === "Enter") goTo();
        }}  type="url"/>
        <div class="h-[20vh]"/>
</div>