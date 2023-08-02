<script>
  export let colors
</script>
<div class="flex mr-5 mt-5">

{#each colors as color}
<div class="w-12 h-12 border-2 rounded-full" style="background-color:rgba({color}) ;"></div>
  
{/each}
</div>