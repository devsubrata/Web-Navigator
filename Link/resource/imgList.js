const categoryList = ["ReadingArticle", "GRA", "Motivation", "Mix"];

const ReadingArticle = [
    "Read ➜ Analysis ➜ Write.png",
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

const Mix = ["Career.png", "IELTS - Strategy.png"];

function loadedImageList(dirName) {
    if (dirName === "ReadingArticle") return ReadingArticle;
    else if (dirName === "Motivation") return Motivation;
    else if (dirName === "GRA") return GRA;
    else return Mix;
}
