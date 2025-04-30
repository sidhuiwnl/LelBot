import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import {convertToCleanHTML} from "@/lib/genai";

export async function POST(req: Request) {
    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ScraperBot/1.0)',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.status}`);
        }

        const html = await res.text();
        const $ = cheerio.load(html);


        $('svg, i, span[class*="icon"], span[class*="fa"], span[class*="material-icons"]').remove();


        $('script, style, meta, link, noscript').remove();


        $('[style*="display:none"], [style*="visibility:hidden"]').remove();
        $('[hidden]').remove();

        // 4. Clean empty elements (no text and no img/video inside)
        $('body *').each((_, el) => {
            const text = $(el).text().trim();
            const hasMedia = $(el).find('img, video, iframe').length > 0;
            if (!text && !hasMedia) {
                $(el).remove();
            }
        });


        const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote'];
        $('body *').each((_, el) => {
            const tag = $(el)[0]?.tagName?.toLowerCase();
            if (tag && !allowedTags.includes(tag)) {
                $(el).replaceWith($(el).html() || '');
            }
        });

        $('*').each((_, el) => {
            if (el.type === 'text' && el.data) {
                el.data = el.data.replace(/\s+/g, ' ');
            }
        });


        $('p, h1, h2, h3, h4, h5, h6').each((_, el) => {
            if ($(el).text().trim() === '') {
                $(el).remove();
            }
        });




        const bodyContent = $('body').html()?.trim()
            .replace(/(\r\n|\n|\r)+/g, '\n')
            .replace(/>\s+</g, '><');


        const editorHTMl = await convertToCleanHTML(bodyContent as string);

        return NextResponse.json({
            result: editorHTMl,
        });

    } catch (error) {
        console.error("Scraping error:", error);
        return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
    }
}
