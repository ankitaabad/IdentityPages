<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let src = '';
	let logo = '';
	let frameSrc = '';
	let time = 0;

	// vision api displays
	let timeVision = 0;
	let clearbitLogo = '';
	let visionApiLogos = [''];
	let locale = '';
	let firstButtonStyling = null;
	let firstInputStyling = null;
	let visionColors = [];

	let colors = [];
	const updateFrameSrc = async () => {
		console.log('inside updateFrameSRC');
		frameSrc = src;
		// const t = performance.now();
		// const result = await fetch(`/analyze?url=${src}`);
		// const a = await result.json();

		// const t1 = performance.now();
		// time = Math.round((t1 - t) / 1000);
		// logo = a.src;

		// calling Nathan's backend
		const tBeginVision = performance.now();

		const visionApiResp = await fetch(`https://idx-poc.onrender.com/process?url=${src}`);
		const visionBody = await visionApiResp.json();

		const tEndVision = performance.now();
		timeVision = Math.round((tEndVision - tBeginVision) / 1000);

		clearbitLogo =
			visionBody.Data && visionBody.Data.clearbitLogo ? visionBody.Data.clearbitLogo : '';
		visionApiLogos =
			visionBody.Data && visionBody.Data.visionLogos ? visionBody.Data.visionLogos : [];
		locale = visionBody.Data && visionBody.Data.locale ? visionBody.Data.locale : 'default';
		firstButtonStyling =
			visionBody.Data && visionBody.Data.firstButtonStyling
				? visionBody.Data.firstButtonStyling
				: null;
		firstInputStyling =
			visionBody.Data && visionBody.Data.firstInputStyling
				? visionBody.Data.firstInputStyling
				: null;
		visionColors = visionBody.Data && visionBody.Data.colors ? visionBody.Data.colors : [];

		clearbitLogo = 'data:image/png;base64,' + clearbitLogo;
		// colors = a.colors;
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
	<img src={logo} width="100px" />
</div>
<div class="flex justify-center">
	<label for="" class="label" class:hidden={time === 0}>took {time} sec to fetch</label>
</div>
<!-- {#if colors.length> 0}
palette
{#each colors as color }

<div style="background-color: rgba( {color[0]},{color[1]},{color[2]},{color[3]}) ;">color</div>
  
{/each}
  
{/if} -->

<div class="mt-10"><p3>Clearbit Logo response: </p3></div>
<img src={clearbitLogo} width="100px" />

<div class="mt-10"><p3>Vision API Logo responses: </p3></div>
{#if visionApiLogos.length > 0}
	{#each visionApiLogos as visionLogo}
		<img src={visionLogo} width="100px" />
	{/each}
{/if}

<div class="mt-10"><p3>Detected locale: {locale}</p3></div>

<div class="mt-10"><p3>Input styling: </p3></div>

{#if firstInputStyling}
	<div
		style="width: 50%;
		height: 50px;
		font-weight: bold;
		padding: 5px;
		background-color: {firstInputStyling.color};"
	>
		Color
	</div>
	<div
		style="width: 50%;
		height: 50px;
		font-weight: bold;
		padding: 5px;
		background-color: {firstInputStyling.backgroundColor};"
	>
		Background color
	</div>
	<div class="mt-10">Detected font: {firstInputStyling.font}</div>
	<div class="mt-10">Detected font family: {firstInputStyling.fontFamily}</div>
{/if}

<div class="mt-10"><p3>Input styling: </p3></div>

{#if firstButtonStyling}
	<div
		style="width: 50%;
		height: 50px;
		font-weight: bold;
		padding: 5px;
		background-color: {firstButtonStyling.color};"
	>
		Color
	</div>
	<div
		style="width: 50%;
		height: 50px;
		font-weight: bold;
		padding: 5px;
		background-color: {firstButtonStyling.backgroundColor};"
	>
		Background color
	</div>
	<div class="mt-10">Detected font: {firstButtonStyling.font}</div>
	<div class="mt-10">Detected font family: {firstButtonStyling.fontFamily}</div>
{/if}

<div class="mt-10">
	<label for="" class="label" class:hidden={timeVision === 0}
		>Vision API took {timeVision} sec to fetch</label
	>
</div>
