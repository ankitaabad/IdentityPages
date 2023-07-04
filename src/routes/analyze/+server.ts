import { json } from "@sveltejs/kit";
import puppeteer from 'puppeteer'


/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
  console.time("start")
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  console.timeEnd("start")
console.log({url: url.searchParams.get('url')})
  


  await page.goto(url.searchParams.get('url'))
  // wait until <meta property="og:title"> has a truthy value for content attribute

const result = await page.$$('img')
const images = []
const promises = result.map(async handle => {
  const rect = await (await handle.getProperty('clientLeft')).jsonValue()
  const imageSrc = await (await handle.getProperty('src')).jsonValue()
images.push({imageSrc,rect})
  console.log({imageSrc,rect})
})
await Promise.all(promises)
images.sort((a,b) => {
  if(!a.rect){
    a.rect = {x:23333,y:122222}
  }
if(!b.rect){
    b.rect = {x:23333,y:122222}
  }

  return (a.rect.x + a.rect.y - b.rect.x - b.rect.y)
})
console.log(images[0])
  await browser.close()
  return json(images[0].imageSrc)
}