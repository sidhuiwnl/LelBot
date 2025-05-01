import { Exa } from "exa-js";

const apikey = `${process.env.EXA_API_KEY}` as string
const exa = new Exa(apikey);

export async function getWebsiteHtml(website: string) {
    try {
        const response = await exa.getContents(website,{
            text : {
                includeHtmlTags: true,
            },
            extras : {
                imageLinks : 2
            }

        });
        if (response.results && response.results.length > 0 && response.results[0].text) {
            console.log(response.results[0].text);
            return response.results[0].text;

        } else {
            console.log("Failed to retrieve content or content is empty");
        }
    }catch(error) {
        console.error("Error fetching content:", error);
    }
}