import { json } from '@sveltejs/kit';
import { chromium } from 'playwright';
import palette from 'image-palette';
console.log({path: chromium.executablePath()})
const browser = await chromium.launch({executablePath:chromium.executablePath()}); // Or 'firefox' or 'webkit'.

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {

	console.time('start');
	const page = await browser.newPage();
	page.setViewportSize({ width: 1333, height: 2000 });
	console.timeEnd('start');
	console.log({ url: url.searchParams.get('url') });
	await page.goto(url.searchParams.get('url'));
	// wait until <meta property="og:title"> has a truthy value for content attribute

	// const result = await page.$$('img')
	// const images = []
	// const promises = result.map(async handle => {
	//   const rect = await handle.boundingBox()
	//   const imageSrc = await (await handle.getProperty('src')).jsonValue()
	// images.push({imageSrc,rect})
	//   console.log({imageSrc,rect})
	// })
	// await Promise.all(promises)
	// images.sort((a,b) => {
	//   if(!a.rect){
	//     a.rect = {x:23333,y:122222}
	//   }
	// if(!b.rect){
	//     b.rect = {x:23333,y:122222}
	//   }

	//   return (a.rect.x + a.rect.y - b.rect.x - b.rect.y)
	// })
	// console.log(images[0])
	const firstImage = await page.$('img');
	const src = await (await firstImage?.getProperty('src'))?.jsonValue();
 const firstSvg = await page.$('svg')
 const html = await firstSvg?.innerHTML()
//  console.log({html})
console.log({src})
 var {ids, colors} = palette(src,2)
console.log({colors})
	// await browser.close()
	return json({colors,src});
}
