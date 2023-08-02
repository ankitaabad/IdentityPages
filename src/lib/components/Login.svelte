<script>
	import Palette from "./Palette.svelte";

  export let r
  console.log(r)
  let s1 = `https://logo.clearbit.com/${r.domain}`
  let s2 = r.src
  let colors = r.colors
  function swap(){
  [s1, s2] = [s2, s1]
  }
</script>
<svelte:head>

</svelte:head>
<!-- <lottie-player src="./lottie.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop controls autoplay></lottie-player> -->
<div class="flex w-full">
  <!-- <div class="w-full"></div> -->
  <!-- style="font-family:{r?.fonts?.[0]} ;" -->
  <div class="w-full" >
    <!-- <div class="flex w-full">{r.domain}</div> -->
    <div class="flex flex-col mx-auto  rounded-md p-6">
      <img src={s2} alt="" class="h-24 self-center ">
      <label for="" class="mt-2">Email</label>
      <input class="input rounded-md" title="Email" type="text" placeholder="Email"  />
      <label for="" class="mt-2">Password</label>
      <input class="input rounded-md" title="Password" type="text" placeholder="Password" />
      <button class="btn bg-blue-600 rounded-md text-white text-xl  mt-5" style="background-color: rgba({colors[0]});">Login</button>
    </div> 
  </div>
  <!-- <div class="w-1/3">
    <img src={s2} class="h-24 self-center " on:click={swap}/>
 
  </div> -->
<!-- <Palette colors= {colors}></Palette> -->
</div>

<!-- <hr class="mt-4"> -->

<!-- style="color:{r?.button?.textColor} ;background-color:{r?.button?.bgColor}" -->