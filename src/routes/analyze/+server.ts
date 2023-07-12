import { json } from '@sveltejs/kit';
import { chromium } from 'playwright';
import palette from 'image-palette';
import pixels from 'image-pixels';
import axios from 'axios';
// import { getColorFr\omURL,getPaletteFromURL } from 'color-thief-node'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const browser = await chromium.launch({}); // Or 'firefox' or 'webkit'.
	try {
		const domain = url.searchParams.get('url'); 
    console.log({domain})
		const address = 'https://' + domain;
		console.time('start');
		const page = await browser.newPage();
		page.setViewportSize({ width: 1333, height: 2000 });
		console.timeEnd('start');
		// console.log({ url: address });
		await page.goto(address);
		// const colors = await palette(await pixels(address),2)
		// console.log({colors})
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
		const font = await page.evaluate(() => {
			const font = {};
			let elements = document.body.getElementsByTagName('*');
      var arr = Array.from(elements).slice(1,10);

			arr.map((element) => {
				// element.focus();
				const fontFamily = window.getComputedStyle(element).getPropertyValue('font-family');

				const fontSize = window.getComputedStyle(element).getPropertyValue('font-size');
				const fontColor = window.getComputedStyle(element).getPropertyValue('color');
				if (font[fontFamily]) {
					font[fontFamily]['fontSize'].push(fontSize);
					font[fontFamily]['fontColor'].push(fontColor);
				} else {
					font[fontFamily] = {
						fontSize: [],
						fontColor: []
					};
				}
			});
			return font;
		});
		// console.log(font);
		// console.log(Object.keys(font));
		Object.keys(font).forEach((f) => {
			font[f].fontSize = [...new Set(font[f].fontSize)];
			font[f].fontColor = [...new Set(font[f].fontColor)];
		});
		// console.log(font);
		const firstImage = await page.$('img');
		//   let screenshot = await firstImage.screenshot({ encoding: "base64" }).then(function(data){
		//     let base64Encode = `data:image/png;base64,${data}`;
		//     return base64Encode;
		// });
		// const response = await axios.get(address,  { responseType: 'arraybuffer' })
		// const buffer = Buffer.from(response.data, "utf-8")
		const src = await (await firstImage?.getProperty('src'))?.jsonValue();
    
		// const colors = await getPaletteFromURL(src)
		// console.log({colors})
		// const firstSvg = await page.$('svg');
    // const firstButton = await page.$('button')
    // const buttonTextColor = await (await firstButton?.getProperty('color'))?.jsonValue()
    // const buttonBackgroundColor =await (await  firstButton?.getProperty('background-color'))?.jsonValue()
    // const button = await page.evaluate(() =>{
    //   const button = document.getElementsByTagName('button')?.[0]
    //   const textColor = window.getComputedStyle(button).getPropertyValue('color')
    //   const bgColor = window.getComputedStyle(button).getPropertyValue('background-color')
    //   return {textColor,bgColor}
    // })
    // console.log(button)
		// const html = await firstButton?.evaluate((node) => node.outerHTML);
		// console.log({  html });
		return json({ src, domain, fonts: Object.keys(font)});
	} finally {
		await browser.close();
	}
}
