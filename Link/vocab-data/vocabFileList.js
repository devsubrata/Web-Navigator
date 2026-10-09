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
    { fileName: "300 Most Commonly Used Synonyms.pdf", url: "#", ...colorSet3 },
    { fileName: "50-Synonyms-That-Actually-Boost-Your-Score-2.pdf", url: "#", ...colorSet3 },
    { fileName: "1000 Phrasal Verbs List.pdf", url: "#", ...colorSet3, tag: ["Phrasal Verb"] },
    {
        fileName: "Advanced grammar for academic task-1.pdf",
        url: "https://www.youtube.com/watch?v=i6U4GdE3_wI",
        ...colorSet3,
        tag: ["Grammar"],
    },
];
const markDownFile = [
    { fileName: "TheEnglishWeSpeak-2024.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "TheEnglishWeSpeak-2025.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "TheEnglishWeSpeak-2026.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2 },
    { fileName: "LearnEnglishFromTheNews.md", url: "https://www.bbc.co.uk/programmes/p05hw4bq/episodes/downloads", ...colorSet2 },
    { fileName: "SixMinuteEnglish-2024.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet2 },
    { fileName: "SixMinuteEnglish.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet2 },
    {
        fileName: "10 Real Idioms to Improve your English Fluency.md",
        url: "#",
        ...colorSet2,
    },
];

// TODO----------------- CSV files -------------------------
const writingFiles = [
    { fileName: "Common Essay Topics with Subtopics.csv", url: "https://ieltsliz.com/common-essay-topics-for-ielts/", ...colorSet4 },
    { fileName: "LinkingWords.csv", url: "https://ieltsliz.com/linking-words-for-writing/", ...colorSet4 },
    { fileName: "Paraphrases & Alternative Expressions.csv", url: "#", ...colorSet4 },
    { fileName: "Task2 ➜ BodyParagraphAnalysis.csv", url: "#", ...colorSet2 },
    { fileName: "IELTS Task 2 Model Response.csv", url: "#", ...colorSet2 },
    { fileName: "IELTS - Vocabulary (10minuteEnglish).csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary"] },
];

const topicSpecificVocab = [
    { fileName: "IELTS-TopicSpecific-Vocabulary-1.csv", url: "#", ...colorSet1, tag: ["IELTS Vocabulary"] },
    { fileName: "IELTS Academic vocabulary (Mitchel).csv", url: "#", ...colorSet1, tag: ["IELTS Vocabulary"] },
    { fileName: "Udemy IELTS Vocabulary.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary"] },
];

const phrasalVerbs = [{ fileName: "PhrasalVerbs.csv", url: "#", ...colorSet1, tag: ["Phrasal Verb"] }];
const idioms = [
    { fileName: "Idioms.csv", url: "#", ...colorSet3, tag: ["Idiom"] },
    { fileName: "Idioms For IELTS Speaking.csv", url: "#", ...colorSet3, tag: ["Idiom"] },
    { fileName: "Idioms Collection.csv", url: "#", ...colorSet3, tag: ["Idiom"] },
    { fileName: "IELTS-Speaking-Success-Idioms (Keith).csv", url: "#", ...colorSet3, tag: ["Idiom"] },
    {
        fileName: "100 Useful Idioms for the IELTS Speaking Test.csv",
        url: "https://ieltscharlie.com/100-useful-idioms-for-the-ielts-speaking-test/",
        ...colorSet1,
        tag: ["Idiom"],
    },
];

const collocations = [
    { fileName: "Collocations ➜ pearson-academic-collocations.csv", url: "#", ...colorSet4, tag: ["Collocation"] },
    { fileName: "Collocations ➜ collocations_from_cambridge.csv", url: "#", ...colorSet4, tag: ["Collocation"] },
    { fileName: "Collocations ➜ Using Collocations for Natural English.csv", url: "#", ...colorSet4, tag: ["Collocation"] },
    {
        fileName: "IELTS Speaking – 20 Most Common Collocations to Sound More Fluent.csv",
        url: "https://www.youtube.com/watch?v=5dq2A9GwckU",
        ...colorSet4,
        tag: ["Collocation"],
    },
];

const wordFamily = [{ fileName: "word-family.csv", url: "#", ...colorSet2 }];

const tews = [
    { fileName: "TEWS-2023.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2, tag: ["BBC"] },
    { fileName: "TEWS-2025.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2, tag: ["BBC"] },
    { fileName: "TEWS-2026.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2, tag: ["BBC"] },
    { fileName: "TheEnglishWeSpeak.csv", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet2, tag: ["BBC"] },
];

const vocabFiles = [
    ...writingFiles,
    {
        fileName: "50 Synonyms You NEED To Know to Pass The IELTS Test.csv",
        url: "https://www.youtube.com/watch?v=8oYpg7Gb1QI",
        ...colorSet1,
        tag: ["IELTS Vocabulary"],
    },
    {
        fileName: "69 Advanced Words (C1 + C2) to Get a Band 9.csv",
        url: "https://www.youtube.com/watch?v=_s1rIKaoAyM",
        ...colorSet1,
        tag: ["IELTS Vocabulary"],
    },
    { fileName: "IELTS most useful vocabulary.csv", url: "#", ...colorSet1, tag: ["IELTS Vocabulary"] },
    { fileName: "Top 300 IELTS Vocabulary.csv", url: "#", ...colorSet1, tag: ["IELTS Vocabulary"] },
    {
        fileName: "30 IELTS Academic Writing Vocabulary Synonyms for Band 7+.csv",
        url: "https://www.youtube.com/watch?v=FIfKnfQU8KU",
        ...colorSet1,
        tag: ["IELTS Vocabulary"],
    },
    { fileName: "Common Paraphrasing Synonyms.csv", url: "#", ...colorSet1 },
    ...topicSpecificVocab,
    { fileName: "Synonyms-1(SW).csv", url: "#", ...colorSet1 },
    { fileName: "Synonyms-2(list).csv", url: "#", ...colorSet1 },
    { fileName: "Barron's - 1100 Words You Need to Know.csv", url: "#", ...colorSet1 },
    ...phrasalVerbs,
    ...idioms,
    { fileName: "Categorized Words & Expressions.csv", url: "#", ...colorSet1 },
    ...tews,
    { fileName: "LEFTN-2025.csv", url: "https://www.bbc.co.uk/learningenglish/english/features/learning-english-from-the-news_2025", ...colorSet2 },
    ...collocations,
    ...wordFamily,
    { fileName: "DailyVocabNotes.csv", url: "#", ...colorSet1 },
    { fileName: "SpeakingBandComparison.csv", url: "#", ...colorSet1 },
];

// console.log(pdfFiles.length);
// console.log(markDownFile.length);
// console.log(vocabFiles.length);
