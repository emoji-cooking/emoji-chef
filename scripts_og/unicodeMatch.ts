const knownEmojis = require('../data/knownEmojis.json'); //unicode only, has dashes
const emojis = require('../data/emojis.json'); //has name, unicode name has spaces

interface Emoji {
  "id": number,
  "name": string,
  "emoji": string,
  "unicode": string,
  "category": Category,
  "sub_category": Category,
  "keywords": string[],
  "version": string
}
    
interface Category {
  "id": number,
  "name": string
}

interface ProcessedEmoji {
  "unicode": string,
  "name": string,
  "category": string,
  "keywords": string[]
}


const processedEmojis : ProcessedEmoji[] = [];

for (const unicode of knownEmojis) {
    for (const emoji of emojis) {
      //processing all emojis in emoji.json, replacing all whitespace to -
      const processedUnicode: string = emoji.unicode.toLowerCase().replace('\s/g', '-');
      if (unicode === processedUnicode) {
        processedEmojis.push({
          "unicode": unicode,
          "name": emoji.name,
          "category": emoji.category.name.towLowerCase(),
          "keywords": emoji.keywords
        });
      }
    }
}

console.log(processedEmojis);

export {};