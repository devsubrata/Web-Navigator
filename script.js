const web_links = {
    ChatGPT: "https://chatgpt.com/",
    DeepSeek: "https://chat.deepseek.com/",
    PerplexityAI: "https://www.perplexity.ai/",
    GoogleGemini: "https://gemini.google.com/app",
    Copilot: "https://copilot.microsoft.com/?wlexpsignin=1",
    "aeon.co": "https://aeon.co/",
    "The Guardian": "https://www.theguardian.com/international",
    BigThink: "https://bigthink.com/",
    Github: "https://github.com/",
    Twitter: "https://x.com/home",
    LinkedIn: "https://www.linkedin.com/feed/",
};

const dicts = [
    "https://www.google.com/search?q=",
    "https://dictionary.cambridge.org/dictionary/english/",
    "https://www.oxfordlearnersdictionaries.com/definition/english/",
    "https://www.ldoceonline.com/dictionary/",
    "https://www.vocabulary.com/dictionary/",
    "https://en.wikipedia.org/wiki/",
];

// Populate the select element with options from the object
const selectElement = document.getElementById("webSearchSelect");
for (const [name, url] of Object.entries(web_links)) {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = url;
    selectElement.appendChild(option);
}

function navigate() {
    let url = selectElement.value;
    window.open(url, "_blank");
}

function search(url) {
    let search_term = document.getElementById("search_term").value;
    if (!search_term) return;
    window.open(url + search_term, "_blank");
}

document.getElementById("clear_btn").addEventListener("click", () => {
    document.getElementById("search_term").value = "";
});

document.getElementById("nav_btn").addEventListener("click", navigate);
document.getElementById("search_btn").addEventListener("click", (event) => search(dicts[0]));
document.getElementById("cam_btn").addEventListener("click", (event) => search(dicts[1]));
document.getElementById("ox_btn").addEventListener("click", (event) => search(dicts[2]));
document.getElementById("long_btn").addEventListener("click", (event) => search(dicts[3]));
document.getElementById("vocab_btn").addEventListener("click", (event) => search(dicts[4]));
document.getElementById("wiki_btn").addEventListener("click", (event) => search(dicts[5]));
