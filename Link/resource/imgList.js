const categoryList = ["ReadingArticle", "GRA", "GrammarCards", "GrammarTopics", "VocabCards", "Motivation", "Mix"];

const ReadingArticle = [
    "Read ➜ Analysis ➜ Write.png",
    "Types of Clause.jpg",
    "Read ➜ Analysis ➜ Write - 2.png",
    "ExtractPattern.png",
    "IELTS Reading Topics.png",
    "Reading IELTS Articles.png",
];
const Motivation = [
    "21 Laws of Self-Mastery.jpg",
    "How to Believe in Yourself.jpg",
    "How to wake up early without feeling tired.jpg",
    "Motivation.jpg",
    "Steps to build your personal growth plan.jpg",
    "The 7 Pillars of Resilience.jpg",
];

const GRA = [
    "Adjective Clauses.png",
    "Liz(Relative Clause).png",
    "Noun Phrases.png",
    "Sentence Structure.png",
    "ParagraphDevelopment.png",
    "Writing improvement.png",
];

const GrammarCards = [
    "conjunctions-PlusPointAcademy.jpg",
    "ImportantGrammarRule(1-11)-PlusPointAcademy.jpg",
    "Preposition-Rule(1-4).jpg",
    "Prepositions(in-on-at).jpg",
    "PrepositionsMastery.jpg",
];
const GrammarTopics = [
    "Adjective Clauses (Understanding, pearson).png",
    "Adverb Clauses (Understanding, pearson).png",
    "Adverbial clauses (Cambridge Adv & Vocab).jpg",
    "Noun Clause (Grammar in Context level-3, 7th edition).png",
    "Noun Clause (Understanding, pearson).png",
    "Noun Phrase (EnglishForToday).png",
];

const VocabCards = [
    "20PhrasalVerbs-PlusPointAcademy.jpg",
    "PhrasalVerbs-(Grouped)-PlusPointAcademy.jpg",
    "PhrasalVerbs-(DailyPhrasalVerb)-PlusPointAcademy.jpg",
];
const Mix = ["Career.png", "IELTS - Strategy.png"];

function loadedImageList(dirName) {
    if (dirName === "ReadingArticle") return ReadingArticle;
    else if (dirName === "Motivation") return Motivation;
    else if (dirName === "GRA") return GRA;
    else if (dirName === "GrammarCards") return GrammarCards;
    else if (dirName === "GrammarTopics") return GrammarTopics;
    else if (dirName === "VocabCards") return VocabCards;
    else return Mix;
}
