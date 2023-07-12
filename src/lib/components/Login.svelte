<script>
  export let r
  console.log(r)
  let s1 = `https://logo.clearbit.com/${r.domain}`
  let s2 = r.src
  function swap(){
  [s1, s2] = [s2, s1]
  }
</script>

<div class="flex w-full border-2">
  <div class="w-1/3"></div>
  <div class="w-1/3" style="font-family:{r?.fonts?.[0]} ;">
    <div class="flex w-full">{r.domain}</div>
    <div class="flex flex-col mx-auto  border-2 border-blue-600 rounded-md p-6">
      <img src={s1} alt="" class="h-24 self-center ">
      <label for="" class="mt-2">Email</label>
      <input class="input rounded-md" title="Email" type="text" placeholder="Email" />
      <label for="" class="mt-2">Password</label>
      <input class="input rounded-md" title="Password" type="text" placeholder="Password" />
      <button class="btn bg-blue-600 rounded-md text-white  mt-5" >Login</button>
    </div> 
  </div>
  <div class="w-1/3">
    <img src={s2} class="h-24 self-center " on:click={swap}/>
 
  </div>
</div>

<hr class="mt-4">

<!-- style="color:{r?.button?.textColor} ;background-color:{r?.button?.bgColor}" -->