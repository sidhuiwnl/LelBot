import { Exa } from "exa-js";

const exa = new Exa("98313789-bced-45eb-a5a3-5096aae2532b")

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