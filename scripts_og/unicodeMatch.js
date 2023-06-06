var fs = require('fs');
var path = require('path');
var knownEmojis = require('../data/knownEmojis.json'); //unicode only, has dashes
var emojis = require('../data/emojis.json'); //has name, unicode name has spaces
var processedEmojis = [];
for (var _i = 0, knownEmojis_1 = knownEmojis; _i < knownEmojis_1.length; _i++) {
    var unicode = knownEmojis_1[_i];
    for (var _a = 0, emojis_1 = emojis; _a < emojis_1.length; _a++) {
        var emoji = emojis_1[_a];
        //processing all emojis in emoji.json, replacing all whitespace to -
        var processedUnicode = emoji.unicode.toLowerCase().replace('\s/g', '-');
        if (unicode === processedUnicode) {
            processedEmojis.push({
                "unicode": unicode,
                "name": emoji.name,
                "category": emoji.category.name.toLowerCase(),
                "keywords": emoji.keywords
            });
        }
    }
}
console.log(processedEmojis);
fs.writeFileSync(path.resolve(__dirname, './processedEmojis.json'), JSON.stringify(processedEmojis));
