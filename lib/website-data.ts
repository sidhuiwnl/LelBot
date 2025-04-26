import { CheerioCrawler } from 'crawlee';

async function run(websiteUrl: string) {
    const crawler = new CheerioCrawler({
        async requestHandler({ $, request, log }) {
            log.info(`Visiting ${request.url}`);


            const links = $('a').map((_, el) => ({
                href: $(el).attr('href'),
                text: $(el).text().trim(),
            })).get();


            const images = $('img').map((_, el) => ({
                src: $(el).attr('src'),
                alt: $(el).attr('alt'),
            })).get();


            const headings = $('h1, h2, h3, h4, h5, h6').map((_, el) => ({
                tag: el.tagName.toLowerCase(),
                text: $(el).text().trim(),
            })).get();


            const paragraphs = $('p').map((_, el) => $(el).text().trim()).get();

            console.log('Links:', links);
            console.log('Images:', images);
            console.log('Headings:', headings);
            console.log('Paragraphs:', paragraphs);
        },

        maxRequestsPerCrawl: 1,
    });

    await crawler.run([websiteUrl]);
}

run('https://v4.zod.dev/v4');
