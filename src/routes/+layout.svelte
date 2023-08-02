<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
</script>
<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap" rel="stylesheet">

</svelte:head>
<slot />
<style>
  * {
  font-family: 'Barlow', sans-serif;
}
</style>