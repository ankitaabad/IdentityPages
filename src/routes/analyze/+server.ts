import { json } from '@sveltejs/kit';
import { chromium } from 'playwright';
import {closest,diff} from 'color-diff'
import path from 'path'
import axios from 'axios';
import fs from 'fs';
import ct from 'pure-color-thief-node';
import palette from 'image-palette';
import pixels from 'image-pixels';
// import { getColorFr\omURL,getPaletteFromURL } from 'color-thief-node'
function request(element) {
	try {
		return axios({
			url: element,
			method: 'GET',
			responseType: 'stream'
		});
	} catch (e) {
		console.log('errore: ' + e);
	}
}
const download = async (url, path) => {
	console.log('url', url);
	const saveFile = await request(url);
	console.log('satus ', saveFile.status, url);
	const download = fs.createWriteStream(path);
	console.log({ status: saveFile.status });
	await new Promise((resolve, reject) => {
		saveFile.data.pipe(download);
		download.on('close', (value) => {
			// console.log("end event");
			resolve(value);
		});
		download.on('error', (err) => {
			console.log('write error', url);

			reject(err);
		});
	});
};
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	console.time('pool');
	const browser = await chromium.launch({}); // Or 'firefox' or 'webkit'.
	try {
		const domain = url.searchParams.get('url');
		console.log({ domain });
		const address = 'https://' + domain;
		console.time('start');

		const page = await browser.newPage();
		const page2 = await browser.newPage();

		console.timeEnd('pool');
		page.setViewportSize({ width: 1920, height: 1080 });
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
			var arr = Array.from(elements).slice(1, 10);

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
    console.log({src})
const getFilename = (src) => {
return src.split("/").slice(-1).pop()
}
const __dirname = path.resolve(path.dirname(''));

		const filename = getFilename(src)
    const filePath = path.join(__dirname,"logos",filename)
    const screentshotPath = path.join(__dirname,"logos","screenshot.png")
 console.log({filename,filePath,__dirname}) 
		// await page.screenshot({
		// 	path: filename,
		// 	type: 'png',
		// 	clip: { x: 0, y: 0, height: 100, width: 400 }
		// });
 await download(src,filePath)
 console.log("after download")
 let isSvg = false
if(src.split(".").slice(-1).pop()=== 'svg'){
  isSvg = true
  console.log("inside split",src)
await page2.setViewportSize({width:1920,height:1080}) 
const html = `
      <html>
      <body>
        <div class="testing">
          <h1>Hello World!</h1>
          <img src="data:image/svg+xml;base64,${
            fs.readFileSync(filePath).toString('base64')
          }" alt="alt text" />
        </div>
      </body>
      </html>
    `;

    await page2.setContent(html);
    const take = await page2.$('.testing');
    await take.screenshot({
      path: screentshotPath,
      omitBackground: true
    });
}
const black = {R: 255, G: 255, B: 255}
const white = {R: 0, G: 0, B: 0}
	let colors	
		const img = new ct();
		await img.loadImage(isSvg ?screentshotPath: filePath).then(() => {
			console.log('inside finding colors from image');
      colors = img.getColorPalette(3).filter(value => value[0] !== 4).filter(value =>{
        const db = diff({R: value[0], G: value[1], B: value[2]},black);
        const dw =diff({R: value[0], G: value[1], B: value[2]},white); 
        console.log({db,dw})
        return db < 90 && dw < 90

      })
		});
    console.log({colors})
    
    const palette = [ {color:{R:205,B:0, G:0},label:'rl'}, {color:{R: 0,B:204, G:0},label:'bl'},{color: {R:0,B:0, G:204},label:'gl'}]
    const fc = colors[0]
const closestColor = closest({R:fc[0],G:fc[1],B:fc[2]},palette.map(c => c.color))
console.log({closestColor})
const cwl = palette.find(c => c.color.R === closestColor.R && c.color.G === closestColor.G && c.color.B === closestColor.B)
console.log({cwl})


















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
		return json({colors, src, domain, fonts: Object.keys(font),cc:cwl?.label });
	} finally {
		await browser.close();
	}
}
