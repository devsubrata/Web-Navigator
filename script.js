const search_links = {
	"Google search": "https://www.google.com/search?q={search_term}",
	AI_Review: "https://www.google.com/search?q={search_term}&udm=50",
	"Cambridge dictionary": "https://dictionary.cambridge.org/dictionary/english/{search_term}",
	"Longman dictionary": "https://www.ldoceonline.com/dictionary/{search_term}",
	"Oxford dictionary": "https://www.oxfordlearnersdictionaries.com/definition/english/{search_term}",
	"Webster dictionary": "https://www.merriam-webster.com/dictionary/{search_term}",
	"Collins dictionary": "https://www.collinsdictionary.com/dictionary/english/{search_term}",
	"vocabulary.com": "https://www.vocabulary.com/dictionary/{search_term}",
	"just-the-word.com": "https://www.just-the-word.com/main.pl?word={search_term}&mode=combinations",
	"thesaurus.com": "https://www.thesaurus.com/browse/{search_term}",
	"dictionary.com": "https://www.dictionary.com/browse/{search_term}",
	"Youglish.com": "https://youglish.com/pronounce/{search_term}/english",
	"Image search": "https://www.google.com/search?tbm=isch&q={search_term}",
	"Video search": "https://www.google.com/search?tbm=vid&q={search_term}",
	"Google Map": "https://www.google.com/maps/place/{search_term}",
	Wikipedia: "https://en.wikipedia.org/wiki/{search_term}",
	"Youtube search": "https://www.youtube.com/results?search_query={search_term}",
	"Facebook search": "https://www.facebook.com/search/top/?q={search_term}",
	"News search": "https://www.google.com/search?tbm=nws&q={search_term}",
	"Pdf search": "https://www.google.com/search?q={search_term}&as_filetype=pdf",
	Downloadly: "https://downloadlynet.ir/?s={search_term}",
	GetIntoPC: "https://getintopc.com/?s={search_term}",
	TorrentEngine: "https://1337x.to/sort-search/{search_term}/time/desc/1/",
	"Book library": "https://www.libgen.is/search.php?req={search_term}",
	Github: "https://github.com/search?q={search_term}",
};

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
    "https://youglish.com/pronounce/",
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
    if (!search_term) {
        alert("Input box empty!\nEnter your search...");
        return;
    }
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
document.getElementById("youglish_btn").addEventListener("click", (event) => {
    let search_term = document.getElementById("search_term").value;
    if (!search_term) {
        alert("Input box empty!\nEnter your search...");
        return;
    }
    window.open(dicts[6] + search_term + "/english", "_blank");
});

// Populate the select element with options from the object
const checkboxes = document.getElementById("checkboxes");
for (const [name, url] of Object.entries(search_links)) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = url;

    const label = document.createElement("label");
    label.textContent = " " + name;
    label.insertBefore(input, label.firstChild);
    checkboxes.appendChild(label);
}

const generated_buttons_div = document.getElementById("generate_link");
const multiple_search_btn = document.getElementById("multiple_search_btn");
multiple_search_btn.addEventListener("click", () => {
    const word = document.getElementById("search_term").value;
    if (!word) {
        alert("Input box empty!\nEnter your search, and try again");
        return;
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert("No options selected!\nSelect options, and try again");
        return;
    }

    generated_buttons_div.innerHTML = "";
    checkboxes.forEach((checkbox) => {
        const url = checkbox.value.replace(/\{search_term\}/, word);
        const btnText = checkbox.parentNode.textContent;

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.textContent = btnText;
        generated_buttons_div.appendChild(link);
    });
});

const multiple_search_clear = document.getElementById("multiple_search_clear");
multiple_search_clear.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    generated_buttons_div.innerHTML = "";
});
