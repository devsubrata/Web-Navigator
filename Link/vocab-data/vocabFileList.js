const colorSet1 = {
    backgroundColor: `bg-indigo-100`,
    textColor: `text-indigo-700`,
    hoverColor: `bg-indigo-200`,
};
const colorSet2 = {
    backgroundColor: `bg-purple-100`,
    textColor: `text-purple-700`,
    hoverColor: `bg-purple-200`,
};
const colorSet3 = {
    backgroundColor: `bg-red-100`,
    textColor: `text-red-700`,
    hoverColor: `bg-red-200`,
};

const colorSet4 = {
    backgroundColor: `bg-teal-100`,
    textColor: `text-teal-700`,
    hoverColor: `bg-teal-200`,
};

const pdfFiles = [
    { fileName: "IdeaBank-1.pdf", url: "#", ...colorSet3 },
    { fileName: "Basic_VS_Advanced.pdf", url: "https://www.youtube.com/watch?v=HK0VDZvjrfc&list=PLyXE-qp_6NO7yKWP-VcTZFOefqLE7CV-6", ...colorSet3 },
    { fileName: "Common Paraphrasing Synonyms.pdf", url: "#", ...colorSet3 },
    { fileName: "50-Synonyms-That-Actually-Boost-Your-Score-2.pdf", url: "#", ...colorSet3 },
    { fileName: "1000 Phrasal Verbs List.pdf", url: "#", ...colorSet3 },
];
const markDownFile = [
    { fileName: "TheEnglishWeSpeak-2024.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "TheEnglishWeSpeak-2025.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "TheEnglishWeSpeak-2026.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "LearnEnglishFromTheNews.md", url: "https://www.bbc.co.uk/programmes/p05hw4bq/episodes/downloads", ...colorSet2 },
    { fileName: "SixMinuteEnglish-2024.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet2 },
    { fileName: "SixMinuteEnglish.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet2 },
];

// TODO----------------- CSV files -------------------------
const writingFiles = [
    { fileName: "Common Essay Topics with Subtopics.csv", url: "https://ieltsliz.com/common-essay-topics-for-ielts/", ...colorSet4 },
    { fileName: "LinkingWords.csv", url: "https://ieltsliz.com/linking-words-for-writing/", ...colorSet4 },
    { fileName: "Paraphrases & Alternative Expressions.csv", url: "#", ...colorSet4 },
];

const topicSpecificVocab = [
    { fileName: "IELTS-TopicSpecific-Vocabulary-1.csv", url: "#", ...colorSet1 },
    { fileName: "IELTS Academic vocabulary (Mitchel).csv", url: "#", ...colorSet1 },
];

const phrasalVerbs = [{ fileName: "PhrasalVerbs.csv", url: "#", ...colorSet1 }];
const idioms = [
    { fileName: "Idioms.csv", url: "#", ...colorSet1 },
    { fileName: "Idioms For IELTS Speaking.csv", url: "#", ...colorSet1 },
];

const collocations = [{ fileName: "pearson-academic-collocations.csv", url: "#", ...colorSet4 }];

const wordFamily = [{ fileName: "word-family.csv", url: "#", ...colorSet2 }];

const vocabFiles = [
    ...writingFiles,
    { fileName: "50 Synonyms You NEED To Know to Pass The IELTS Test.csv", url: "https://www.youtube.com/watch?v=8oYpg7Gb1QI", ...colorSet1 },
    { fileName: "69 Advanced Words (C1 + C2) to Get a Band 9.csv", url: "https://www.youtube.com/watch?v=_s1rIKaoAyM", ...colorSet1 },
    { fileName: "IELTS most useful vocabulary.csv", url: "#", ...colorSet1 },
    { fileName: "Top 300 IELTS Vocabulary.csv", url: "#", ...colorSet1 },
    { fileName: "30 IELTS Academic Writing Vocabulary Synonyms for Band 7+.csv", url: "https://www.youtube.com/watch?v=FIfKnfQU8KU", ...colorSet1 },
    { fileName: "Common Paraphrasing Synonyms.csv", url: "#", ...colorSet1 },
    ...topicSpecificVocab,
    { fileName: "Synonyms-1(SW).csv", url: "#", ...colorSet1 },
    ...phrasalVerbs,
    ...idioms,
    { fileName: "Categorized Words & Expressions.csv", url: "#", ...colorSet1 },
    { fileName: "TEWS-2023.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet1 },
    { fileName: "TEWS-2026.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet1 },
    ...collocations,
    ...wordFamily,
];

// console.log(pdfFiles.length);
// console.log(markDownFile.length);
// console.log(vocabFiles.length);
