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
    {
        fileName: "10 C1 Phrasal Verbs you MUST Know.pdf",
        url: "https://www.youtube.com/watch?v=L2ugKsJt_bc",
        ...colorSet3,
        tag: ["Phrasal Verb"],
    },
];
const markDownFile = [
    { fileName: "TheEnglishWeSpeak-2024.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet4 },
    { fileName: "TheEnglishWeSpeak-2025.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet4 },
    { fileName: "TheEnglishWeSpeak-2026.md", url: "https://www.bbc.co.uk/learningenglish/features/the-english-we-speak", ...colorSet4 },
    { fileName: "LearnEnglishFromTheNews.md", url: "https://www.bbc.co.uk/programmes/p05hw4bq/episodes/downloads", ...colorSet4 },
    { fileName: "SixMinuteEnglish-2024.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet4 },
    { fileName: "SixMinuteEnglish.md", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", ...colorSet4 },
    {
        fileName: "10 Real Idioms to Improve your English Fluency.md",
        url: "#",
        ...colorSet2,
    },
];

// TODO----------------- txt files for tabular format -------------------------
const tabularFiles = [
    { fileName: "500 Phrasal Verbs.txt", url: "#", ...colorSet1, tag: ["Phrasal Verb"] },
    { fileName: "A large list of phrasal verbs with their meanings.txt", url: "#", ...colorSet1, tag: ["Phrasal Verb"] },
];

// TODO----------------- CSV files -------------------------
const writingFiles = [
    { fileName: "Common Essay Topics with Subtopics.csv", url: "https://ieltsliz.com/common-essay-topics-for-ielts/", ...colorSet4 },
    { fileName: "LinkingWords.csv", url: "https://ieltsliz.com/linking-words-for-writing/", ...colorSet2 },
    { fileName: "Paraphrases & Alternative Expressions.csv", url: "#", ...colorSet2 },
    { fileName: "Task2 ➜ BodyParagraphAnalysis.csv", url: "#", ...colorSet2 },
    { fileName: "IELTS Task 2 Model Response.csv", url: "#", ...colorSet2 },
    { fileName: "IELTS - Vocabulary (10minuteEnglish).csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary"] },
];

const readingFiles = [{ fileName: "Top 100 List of heading Vocabulary.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary", "Reading"] }];

const topicSpecificVocab = [
    { fileName: "IELTS-TopicSpecific-Vocabulary-1.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"] },
    {
        fileName: "IELTS Speaking Vocabulary (topic specific).csv",
        url: "#",
        ...colorSet2,
        tag: ["IELTS Vocabulary", "Topic Specific Vocabulary", "Speaking"],
    },
    {
        fileName: "2500 IELTS Vocabulary.csv",
        url: "#",
        ...colorSet2,
        tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"],
    },

    {
        fileName: "IELTS Writing Task 2 Vocabulary List — Band 7+.csv",
        url: "#",
        ...colorSet2,
        tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"],
    },
    { fileName: "IELTS Academic vocabulary (Mitchel).csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"] },
    { fileName: "Udemy IELTS Vocabulary.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"] },
    {
        fileName: "IELTS Vocabulary 🟢 English Pro Tips.csv",
        url: "https://www.youtube.com/watch?v=z4pxc2eESbw&list=PLs_vfE4jCVSoDgiMMMiEiaZYYgDCJCZZR",
        ...colorSet2,
        tag: ["IELTS Vocabulary", "Topic Specific Vocabulary"],
    },
];

const phrasalVerbs = [{ fileName: "PhrasalVerbs.csv", url: "#", ...colorSet2, tag: ["Phrasal Verb"] }];
const idioms = [
    { fileName: "Idioms.csv", url: "#", ...colorSet2, tag: ["Idiom"] },
    { fileName: "Idioms For IELTS Speaking.csv", url: "#", ...colorSet2, tag: ["Idiom"] },
    { fileName: "Idioms Collection.csv", url: "#", ...colorSet2, tag: ["Idiom"] },
    { fileName: "IELTS-Speaking-Success-Idioms (Keith).csv", url: "#", ...colorSet2, tag: ["Idiom"] },
    {
        fileName: "100 Useful Idioms for the IELTS Speaking Test.csv",
        url: "https://ieltscharlie.com/100-useful-idioms-for-the-ielts-speaking-test/",
        ...colorSet2,
        tag: ["Idiom"],
    },
];

const collocations = [
    { fileName: "Collocations ➜ pearson-academic-collocations.csv", url: "#", ...colorSet2, tag: ["Collocation"] },
    { fileName: "Collocations ➜ collocations_from_cambridge.csv", url: "#", ...colorSet2, tag: ["Collocation"] },
    { fileName: "Collocations ➜ Using Collocations for Natural English.csv", url: "#", ...colorSet2, tag: ["Collocation"] },
    {
        fileName: "IELTS Speaking – 20 Most Common Collocations to Sound More Fluent.csv",
        url: "https://www.youtube.com/watch?v=5dq2A9GwckU",
        ...colorSet2,
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
    ...readingFiles,
    {
        fileName: "50 Synonyms You NEED To Know to Pass The IELTS Test.csv",
        url: "https://www.youtube.com/watch?v=8oYpg7Gb1QI",
        ...colorSet2,
        tag: ["IELTS Vocabulary"],
    },
    {
        fileName: "69 Advanced Words (C1 + C2) to Get a Band 9.csv",
        url: "https://www.youtube.com/watch?v=_s1rIKaoAyM",
        ...colorSet2,
        tag: ["IELTS Vocabulary"],
    },
    { fileName: "IELTS most useful vocabulary.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary"] },
    { fileName: "Top 300 IELTS Vocabulary.csv", url: "#", ...colorSet2, tag: ["IELTS Vocabulary"] },
    {
        fileName: "30 IELTS Academic Writing Vocabulary Synonyms for Band 7+.csv",
        url: "https://www.youtube.com/watch?v=FIfKnfQU8KU",
        ...colorSet2,
        tag: ["IELTS Vocabulary"],
    },
    {
        fileName: "IELTS Vocabulary (Juva).csv",
        url: "#",
        ...colorSet2,
        tag: ["IELTS Vocabulary"],
    },

    { fileName: "Common Paraphrasing Synonyms.csv", url: "#", ...colorSet2 },
    ...topicSpecificVocab,
    { fileName: "Synonyms-1(SW).csv", url: "#", ...colorSet2 },
    { fileName: "Synonyms-2(list).csv", url: "#", ...colorSet2 },
    { fileName: "Barron's - 1100 Words You Need to Know.csv", url: "#", ...colorSet2 },
    ...phrasalVerbs,
    ...idioms,
    { fileName: "Categorized Words & Expressions.csv", url: "#", ...colorSet2 },
    ...tews,
    {
        fileName: "LEFTN-2025.csv",
        url: "https://www.bbc.co.uk/learningenglish/english/features/learning-english-from-the-news_2025",
        ...colorSet2,
        tag: ["BBC"],
    },
    {
        fileName: "LEFTN-2026.csv",
        url: "https://www.bbc.co.uk/learningenglish/english/features/learning-english-from-the-news_2026",
        ...colorSet2,
        tag: ["BBC"],
    },
    ...collocations,
    ...wordFamily,
    { fileName: "DailyVocabNotes.csv", url: "#", ...colorSet2 },
    { fileName: "SpeakingBandComparison.csv", url: "#", ...colorSet2 },
];

// console.log(pdfFiles.length);
// console.log(markDownFile.length);
// console.log(vocabFiles.length);
