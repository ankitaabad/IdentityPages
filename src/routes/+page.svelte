<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';


	let src = '';
	let logo = '';
	let frameSrc = '';
	let time = 0;
  let colors = []
	const updateFrameSrc = async () => {
		console.log('inside updateFrameSRC');
		frameSrc = src;
		const t = performance.now();
		const result = await fetch(`/analyze?url=${src}`);
		const a = await result.json();

		const t1 = performance.now();
		time = Math.round((t1 - t)/1000)
		logo = a.src;
    colors = a.colors
	};
	const frameLoaded = () => {
		console.log('Frame is loaded');
	};
	function iframeRef(frameRef) {
		return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<LightSwitch />
<div class="flex justify-center mt-4 mx-4">
	<input type="text" bind:value={src} class="input rounded-md" placeholder="Enter Domain" />
	<button
		on:click={updateFrameSrc}
		on:load={frameLoaded}
		class="btn bg-blue-600 rounded-md text-white ml-3">Generate</button
	>
</div>
<div class="flex justify-center mt-10">
	<img src={logo}  width="100px" />
</div>
<div class="flex justify-center">
	<label for="" class="label" class:hidden={time === 0}>took {time } sec to fetch</label>
</div>
<!-- {#if colors.length> 0}
palette
{#each colors as color }

<div style="background-color: rgba( {color[0]},{color[1]},{color[2]},{color[3]}) ;">color</div>
  
{/each}
  
{/if} -->
