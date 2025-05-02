
export function TweetCardResponse({ content, id }: { content: string; id: string }) {
    return (
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 shadow-md text-white space-y-2">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-500 rounded-full" />
                <div>
                    <div className="font-semibold">AI Tweeter</div>
                    <div className="text-sm text-gray-400">@aitweetbot</div>
                </div>
            </div>
            <div className="text-sm whitespace-pre-wrap mt-2">{content}</div>
            <div className="text-xs text-gray-500 mt-2">Tweet ID: {id}</div>
        </div>
    );
}
