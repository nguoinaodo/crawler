const Crawler = require('js-crawler');
const cheerio = require('cheerio');
const fs = require('fs');
const arrayToCSV = require('array-to-csv');

exports.vnexpressCrawler = () => {
	const crawler = new Crawler().configure({ depth: 3 });
	const regexp = /^(https:\/\/vnexpress.net)(.+)(\.html)$/g;
	const spaces = /[\r\n\t\f\v]+/g;
	const url = 'http://vnexpress.net/';
	let count = 0;
	// Crawl
	crawler.crawl(url, page => {
		if (page.url.match(regexp) !== null) {
			const content = {};
			const $ = cheerio.load(page.content);
			content.url = page.url;
			content.title = $('.sidebar_1 h1').text();
			content.description = $('.sidebar_1 h2').text();
			content.main = $('.sidebar_1 article p').text();

			if (content.main !== '' && content.description !== '' && content.title !== '') {
				count++;
				content.title = content.title.trim().replace(spaces, ' ');
				content.description = content.description.trim().replace(spaces, ' ');
				content.main = content.main.trim().replace(spaces, ' ');
				text = content.url + '\n' + content.title + '\n' + content.description + '\n' + content.main;
				fs.writeFileSync(`${base}articles/${count}.txt`, text);
			}
		}
	});
};

exports.tuyensinh247Crawler = () => {
	const crawler = new Crawler().configure({ depth: 3 });
	const regexp = /^(http:\/\/diemthi\.tuyensinh247\.com\/diem\-chuan)(.+)(\.html)(\?y=\d+)*$/g;
	const spaces = /\s\s+/g;
	const url = 'http://diemthi.tuyensinh247.com/';
	// Craw 
	crawler.crawl(url, page => {
		if (page.url.match(regexp)) {
			console.log(`-------------${page.url}`)
			const content = [];
			const $ = cheerio.load(page.content);
			let rows = $('.resul-seah .bg_white').each(function () {
				content.push($(this).text().trim().split(spaces));
			});
			console.log(content)
			// fs.writeFileSync(`${base}diemthi/url`, rows);
		}
	});
};
