<script>
  import { LightSwitch } from '@skeletonlabs/skeleton';
	let src = '';
	let logo = '';
	let frameSrc = '';
	const updateFrameSrc = async () => {
		console.log('inside updateFrameSRC');
		frameSrc = src;
		const result = await fetch(`/analyze?url=${src}`);
		const a = await result.json();
		logo = a;
	};
	const frameLoaded = () => {
		console.log('Frame is loaded');
	};
	function iframeRef(frameRef) {
		return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<LightSwitch></LightSwitch>
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
