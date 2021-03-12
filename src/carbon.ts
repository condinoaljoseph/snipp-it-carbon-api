import puppeteer from 'puppeteer';

type Url = string;
type Path = string;

function openCarbonNowSh(url: Url) {}

export function getResp(url: Url, path: Path) {
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('https://example.com');
		await page.screenshot({ path: 'example.png' });

		await browser.close();
	})();
}
