import { grammarCards } from "./GrammarCards/GrammarCards.js";
import { idiomCards } from "./IdiomCards/IdiomCards.js";
import { phrasalVerbCards } from "./PhrasalVerbCards/PhrasalVerbCards.js";

// console.log(grammarCards);
// console.log(idiomCards);
// console.log(phrasalVerbCards);

const categoryList = ["GrammarCards", "IdiomCards", "PhrasalVerbCards"];

function loadedImageList(dirName) {
    if (dirName === "GrammarCards") return grammarCards;
    else if (dirName === "IdiomCards") return idiomCards;
    else if (dirName === "PhrasalVerbCards") return phrasalVerbCards;
    else return;
}

export { grammarCards, idiomCards, phrasalVerbCards, categoryList, loadedImageList };
