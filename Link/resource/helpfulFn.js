function downloadImage(img) {
    const rawName = new URL(img.src).pathname.split("/").pop();
    const fileName = decodeURIComponent(rawName);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = fileName;
    link.click();
}

function getImageName(img) {
    return img.substring(0, img.lastIndexOf("."));
}

function highlightTerms(text, colorIndex = 14) {
    const colors = [
        "text-[#FF0000]", // 0
        "text-[#990033]", // 1
        "text-[#ff0066]", // 2
        "text-[#fe3b00]", // 3
        "text-[#B37400]", // 4
        "text-[#00FF00]", // 5
        "text-[#009c1a]", // 6
        "text-[#0000FF]", // 7
        "text-[#000080]", // 8
        "text-[#FF00FF]", // 9
        "text-[#FF69B4]", // 10
        "text-[#E97451]", // 11
        "text-[#9400D3]", // 12
        "text-[#4B0082]", // 13
        "text-[#6600ff]", // 14
        "text-[#e48f05]", // 15
        "text-[#04cab6]", // 16
    ];

    const highlightedText = text.replace(/(\d+)?\*(.*?)\*/g, (match, index, content) => {
        const i = index ? Number(index) : colorIndex;
        const colorClass = colors[i];
        return `<span class="font-semibold ${colorClass}">${content.trim()}</span>`;
    });
    return highlightedText;
}
