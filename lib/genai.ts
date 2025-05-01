import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function convertToCleanHTML(text: string) {
    if (!text) {
        throw new Error("Input text cannot be empty");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
                Please convert this content to clean HTML with these specific instructions:
                
                1. REMOVE THESE SPACE-RELATED ISSUES:
                   - Empty divs and containers (e.g., <div></div>)
                   - Redundant spacing between elements
                   - Duplicate information (like repeated dates)
                   - Unnecessary wrapper elements
                   - Blank lines in the HTML output
                
                2. PRESERVE ALL MEANINGFUL CONTENT:
                   - Article text and structure
                   - Headings and sections
                   - Lists and interactive elements
                   - Code blocks and special notes
                   - All links and references
                
                3. FORMATTING RULES:
                   - Use semantic HTML5 tags
                   - Single line breaks between logical sections
                   - Remove all inline styles
                   - Compact but readable HTML
                   - No empty elements or attributes
                
                4. OUTPUT REQUIREMENTS:
                   - Only the final HTML
                   - No markdown or code blocks
                   - Ready-to-render markup
                   - No comments or debug info
               

                5. WHITESPACE HANDLING:
                   - Convert multiple spaces to single spaces
                   - Remove spaces before closing tags and after opening tags
                   - Trim leading/trailing spaces from text nodes
                   - Preserve only meaningful line breaks
                   - No trailing whitespace at end of lines   

                Content to clean:
                ${text}
            `,
        });

        // Additional cleanup to ensure no empty space remains
        const htmlContent = response.text
            ?.replace(/```html|```/g, '')
            .replace(/\n\s*\n/g, '\n')
            .replace(/<div>\s*<\/div>/g, '')
            .replace(/\s+>/g, '>')
            .replace(/>\s+/g, '>')     // Remove spaces after tags
            .replace(/\s{2,}/g, ' ')   // Collapse multiple spaces
            // .replace(/\n+/g, '\n')     // Collapse multiple newlines
            .trim();

        return htmlContent;
    } catch (error) {
        console.error("Error during HTML cleanup:", error);
        throw new Error("Failed to clean HTML content");
    }
}