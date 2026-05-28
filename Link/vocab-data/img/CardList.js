import { grammarCards } from "./GrammarCards/GrammarCards.js";
import { idiomCards } from "./IdiomCards/IdiomCards.js";
import { phrasalVerbCards } from "./PhrasalVerbCards/PhrasalVerbCards.js";
import { modalCards } from "./Modals/Modals.js";

const categoryList = ["GrammarCards", "Modals", "IdiomCards", "PhrasalVerbCards"];

function loadedImageList(dirName) {
    if (dirName === "GrammarCards") return grammarCards;
    else if (dirName === "IdiomCards") return idiomCards;
    else if (dirName === "PhrasalVerbCards") return phrasalVerbCards;
    else if (dirName === "Modals") return modalCards;
    else return;
}

export { grammarCards, idiomCards, phrasalVerbCards, categoryList, loadedImageList, modalCards };
