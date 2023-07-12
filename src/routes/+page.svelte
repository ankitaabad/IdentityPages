<script>
	import { browser } from '$app/environment';
	import Login from '$lib/components/Login.svelte';
	import { LightSwitch, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount, tick } from 'svelte';
	const domains = ['safebridge.net','britbox.com','pelmorex.com','mapegy.com','antstack.com', 'loginradius.com', 'skeleton.dev','pptr.dev','playwright.dev'];
	const selectedDomains = [];
	let result = [];
	let colorThief;

	if (browser) {
		colorThief = new ColorThief();
	}

	let src = '';
	let svgHtml = '';
	let logo = '';
	let fonts = [];
	let logoImage;
	let svgImage;
	let frameSrc = '';
	let time = 0;
	let colors = [];
	let fetchResult = [];
	function selectDomainsFromCheckbox() {
		fetchResult = [];
		console.log('inside select domains');
		selectedDomains.forEach((domain, i) => {
			if (domain.checked === true) {
				fetchResult.push(domains[i]);
			}
		});
		console.log({ fetchResult });
	}
	function selectDomainsFromInputBox() {
		fetchResult = [src];
		console.log('inside select domains');

		console.log({ fetchResult });
	}
	function getLogoFromCheckBox() {
		selectDomainsFromCheckbox();
		updateFrameSrc();
	}
	function getLogoFromInputBox() {
		selectDomainsFromInputBox();
		updateFrameSrc();
	}
	const updateFrameSrc = async () => {
    result = null
		console.log('inside updateFrameSRC');
		frameSrc = src;
		const t = performance.now();

		const promises = fetchResult.map(async (d) => {
			const result = await fetch(`/analyze?url=${d}`);
			const a = await result.json();
			return a;
		});
		result = await Promise.all(promises);
		return;
		const t1 = performance.now();
		time = Math.round((t1 - t) / 1000);
		logo = a.src;
		fonts = a.fonts;
		svgHtml = a.svgHtml;
		svgImage.innerHTML = a.svgHtml;
		await tick();
		// setTimeout(() => {
		//   const colors = colorThief.getColor(logoImage);
		// 	console.log({ colors });
		// }, 4000);
		if (logoImage.complete) {
			console.log('inside complete');
		} else {
			console.log('inside else');
			logoImage.addEventListener('load', function () {
				console.log('inside event');
				const colors = colorThief.getColor(logoImage);

				console.log({ colors });
			});
		}
	};

	const frameLoaded = () => {
		console.log('Frame is loaded');
	};
	function iframeRef(frameRef) {
		return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
	}
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"
	></script>
</svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<LightSwitch />
<div class="flex justify-center mt-4 mx-4">
	<input type="text" bind:value={src} class="input rounded-md" placeholder="Enter Domain" />
	<button
		on:click={getLogoFromInputBox}
		on:load={frameLoaded}
		class="btn bg-blue-600 rounded-md text-white ml-3">Generate</button
	>
</div>

<div class="space-y-2 mx-4 mt-4">
	{#each domains as domain, i}
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" bind:this={selectedDomains[i]} />
			<p>{domain}</p>
		</label>
	{/each}
</div>
<button
	on:click={getLogoFromCheckBox}
	on:load={frameLoaded}
	class="btn bg-blue-600 rounded-md text-white ml-3 mt-3">Generate</button
>
<div class="flex flex-col justify-center">
	{#each fonts as font}
		<div>{font}</div>
	{/each}
</div>

<div class="flex justify-center mt-10">
	<img src={logo} bind:this={logoImage} width="100px" />
	<!-- <div bind:this={svgImage}>svg should come here</div> -->
</div>
<div class="flex justify-center">
	<label for="" class="label" class:hidden={time === 0}>took {time} sec to fetch</label>
</div>
{#if result === null}
<div class="flex justify-center">

	<ProgressRadial />
</div>
{:else}
	{#each result as r}
		<Login {r} />
	{/each}
{/if}

<!-- {#await updateFrameSrc()}
	<ProgressRadial />
{:then result}
	{#each result as r}
		<Login {r} />
	{/each} j
{/await} -->
<!-- {#if colors.length> 0}
palette
{#each colors as color }

<div style="background-color: rgba( {color[0]},{color[1]},{color[2]},{color[3]}) ;">color</div>
  
{/each}
  
{/if} -->
