import { launch } from 'puppeteer';

type Url = string;
type Path = string;

async function openCarbonNowSh(url: Url) {
	try {
		const browser = await launch({
			handleSIGINT: false,
			handleSIGTERM: false,
			handleSIGHUP: false,
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();
		await page.setViewport({
			width: 800,
			height: 800,
			deviceScaleFactor: 2
		});
		await page.goto(url);
		return { browser, page };
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function getResponse(url: Url, path: Path) {
	try {
		const { browser, page } = await openCarbonNowSh(url);
		const element = await page.$('#export-container .container-bg');
		await element?.screenshot({ path });

		await browser.close();
		return path;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
