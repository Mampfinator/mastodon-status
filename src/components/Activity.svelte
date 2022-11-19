<script lang="ts">
    import type {ChartData} from "chart.js";
    import {Line} from "svelte-chartjs";
    import {activityData} from "../stores";

    let data: ChartData;

    activityData.subscribe((rawActivities => {
        console.log(rawActivities);

        const labels: string[] = [];
        const postData: number[] = [];
        const loginData: number[] = [];
        const registrationData: number[] = [];

        let totalPosts = 0;
        let totalLogins = 0;
        let totalRegistrations = 0;

        for (const {week, statuses: posts, logins, registrations} of rawActivities) {
            totalPosts += Number(posts);
            totalLogins += Number(logins);
            totalRegistrations += Number(registrations);

            postData.push(totalPosts);
            loginData.push(totalLogins);
            registrationData.push(totalRegistrations);
        }

        data = {
            datasets: [
                {
                    label: "Posts",
                    data: postData,
                },
                {
                    label: "Logins",
                    data: loginData,
                },
                {
                    label: "Registrations",
                    data: registrationData,
                }
            ],
            labels: new Array(12).fill(""),
        }
    }));

</script>


<div>
    <Line
        data={data}
    />

</div>