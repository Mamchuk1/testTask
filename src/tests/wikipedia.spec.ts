import { Builder, By, Key, WebDriver, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromedriverPath: string = require('chromedriver').path;
import { expect } from 'chai';

const WIKI_URL = 'https://ru.wikipedia.org/';
const ARTICLE_PATH_FRAGMENT = '/wiki/';
const DEFAULT_TIMEOUT = 20000;

const OXYGEN_XPATHS = [
	"/html/body/div[3]/div[3]/div[5]/div[1]/table[1]/tbody/tr[40]/td/div/div/text()[4]",
	"//*[@id='mw-content-text']/div[1]/table[1]/tbody/tr[40]/td/div/div/text()[4]",
];

const openArticle = async (driver: WebDriver, query: string) => {
	const searchInput = await driver.findElement(By.id('searchInput'));
	await searchInput.clear();
	await searchInput.sendKeys(query, Key.ENTER);

	try {
		await driver.wait(until.elementLocated(By.css('.suggestions-results a')), 5000);
		const suggestions = await driver.findElements(By.css('.suggestions-results a'));
		if (suggestions[0]) {
			await suggestions[0].click();
			return;
		}
	} catch {
		// Подсказки не появились — переходим к результатам поиска.
	}

	await driver.wait(async () => {
		const url = await driver.getCurrentUrl();
		return url.includes(ARTICLE_PATH_FRAGMENT) || url.includes('search=');
	}, DEFAULT_TIMEOUT);

	if (!(await driver.getCurrentUrl()).includes(ARTICLE_PATH_FRAGMENT)) {
		const firstResult = await driver.wait(
			until.elementLocated(By.css('.mw-search-results .mw-search-result-heading a')),
			DEFAULT_TIMEOUT
		);
		await firstResult.click();
	}
};

const ensureArticleLoaded = async (driver: WebDriver, titleFragment: string) => {
	await driver.wait(until.urlContains(ARTICLE_PATH_FRAGMENT), DEFAULT_TIMEOUT);
	await driver.wait(until.titleContains(titleFragment), DEFAULT_TIMEOUT);
	await driver.wait(until.elementLocated(By.id('firstHeading')), DEFAULT_TIMEOUT);
};

const extractTextByXPath = async (driver: WebDriver, paths: string[]): Promise<string | null> => {
	for (const path of paths) {
		// eslint-disable-next-line no-await-in-loop
		const text = await driver.executeScript<string | null>(
			function (xp: string) {
				const result = document.evaluate(
					xp,
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null
				);
				return result.singleNodeValue?.textContent?.trim() ?? null;
			},
			path
		);
		if (text) {
			return text;
		}
	}
	return null;
};

describe('Wikipedia: Земля — проверка содержания кислорода 20.95%', function () {
	this.timeout(90000);

	let driver: WebDriver;

	before(async () => {
		const service = new chrome.ServiceBuilder(chromedriverPath);
		const options = new chrome.Options();
		driver = await new Builder()
			.forBrowser('chrome')
			.setChromeOptions(options)
			.setChromeService(service)
			.build();
	});

	after(async () => {
		if (driver) {
			await driver.quit();
		}
	});

	it('должен найти в статье значение 20.95% (кислород в атмосфере)', async () => {
		await driver.get(WIKI_URL);

		await openArticle(driver, 'Земля');
		await ensureArticleLoaded(driver, 'Земля');

		await driver.wait(
			until.elementLocated(
				By.xpath("//*[@id='mw-content-text']/div[1]/table[1]/tbody/tr[40]/td/div/div")
			),
			DEFAULT_TIMEOUT
		);

		const oxygenText = await extractTextByXPath(driver, OXYGEN_XPATHS);
		expect(oxygenText, 'Не удалось извлечь текст с процентом кислорода').to.not.be.null;

		const normalized = oxygenText!.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ');
		const match = normalized.match(/([\d.,]+)\s*%?/);
		expect(match, 'Не удалось распознать значение кислорода в процентах').to.not.be.null;

		const oxygenValue = parseFloat(match![1].replace(',', '.'));
		expect(oxygenValue, `Ожидалось значение около 20.95%, получено: ${oxygenValue}`).to.be.within(20.8, 21.1);
	});

	it('не должен находить значение кислорода для другой статьи', async () => {
		await driver.get(WIKI_URL);

		await openArticle(driver, 'Луна');
		await ensureArticleLoaded(driver, 'Луна');

		const oxygenText = await extractTextByXPath(driver, OXYGEN_XPATHS);
		expect(oxygenText, 'Ожидалось отсутствие данных о кислороде в статье "Луна"').to.be.null;
	});
});


