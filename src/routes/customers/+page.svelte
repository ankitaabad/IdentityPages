<script>

	import { LightSwitch } from "@skeletonlabs/skeleton";
  const urls = ["https://us.swann.com/login.php"]

</script>
<LightSwitch />
{#each urls  as url}
  <iframe src={url} frameborder="0"></iframe>
{/each}

<div>Hello</div>