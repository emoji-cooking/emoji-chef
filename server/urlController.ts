
//=================FROM emoji-kitchen by xsalazar https://github.com/xsalazar/emoji-kitchen =================//
//code below is adapted from https://github.com/xsalazar/emoji-kitchen/blob/main/scripts/index.js

const axios = require("axios");
const fs = require("fs");
const { knownSupportedEmoji } = require('./data/knownEmojis');

//this array contains all the known dates for found emojis from gstatic
const knownSupportedDates: string[] = [
  "20201001",
  "20210218",
  "20210521",
  "20210831",
  "20211115",
  "20220110",
  "20220203",
  "20220406",
  "20220506",
  "20220815",
  "20220823",
  "20221101",
  "20221107",
  "20230126",
  "20230301",
  "20230405",
  "20230418",
];


// Potential formats are ${rootUrl}/${potentialDate}/${leftEmoji}/${leftEmoji}_${rightEmoji}.png
const rootUrl: string = "https://www.gstatic.com/android/keyboard/emojikitchen";

function printableEmoji(emoji: string): string {
  return String.fromCodePoint(...emoji.split("-").map((p) => `0x${p}`));
}

function googleRequestEmoji(emoji) {
  return emoji
    .split("-")
    .map((part) => `u${part.toLowerCase()}`)
    .join("-");
}

function sortOutputData(outputData) {
  // Iterate through each key and sort the array of sub-values
  Object.entries(outputData).forEach((kvp) => {
    key = kvp[0];
    values = kvp[1];

    console.log(`Sorting ${printableEmoji(key)}`);

    valuesWithSortOrder = values.map((v) => {
      // Inner sort is always on the emoji that's _not_ the top-level emoji
      sortCodePoint = v.leftEmoji === key ? v.rightEmoji : v.leftEmoji;

      // Find the sort order from the reference list
      sortOrder = knownSupportedEmoji.indexOf(sortCodePoint);

      return { ...v, sortOrder: sortOrder };
    });

    sortedValues = valuesWithSortOrder
      .sort((e1, e2) => {
        return e1.sortOrder - e2.sortOrder || e1.date.localeCompare(e2.date);
      })
      .map((v) => {
        return {
          leftEmoji: v.leftEmoji,
          rightEmoji: v.rightEmoji,
          date: v.date,
        };
      });

    outputData[key] = sortedValues;
  });

  return outputData;
}

async function getKitchenSink() {
  // Load up existing data, if any
  const outputData = JSON.parse(fs.readFileSync("emojiOutput.json"));

  // There's no real pattern to the dates the images are found at, so try all the ones I know about
  for (let d = 0; d < knownSupportedDates.length; d++) {
    const date = knownSupportedDates[d];

    for (let i = 0; i < knownSupportedEmoji.length; i++) {
      let leftEmojiCodepoint = knownSupportedEmoji[i];
      let leftRequestEmoji = googleRequestEmoji(leftEmojiCodepoint);

      // Check all the pairwise possibilities...
      for (let j = 0; j < knownSupportedEmoji.length; j++) {
        let rightEmojiCodepoint = knownSupportedEmoji[j];
        let rightRequestEmoji = googleRequestEmoji(rightEmojiCodepoint);

        // ...unless we've already found this pair in the past
        if (
          leftEmojiCodepoint in outputData &&
          outputData[leftEmojiCodepoint].some(
            (x) =>
              x.leftEmoji === leftEmojiCodepoint &&
              x.rightEmoji === rightEmojiCodepoint &&
              x.date === date
          )
        ) {
          console.log(
            `Skipping request for ${printableEmoji(
              leftEmojiCodepoint
            )} x ${printableEmoji(rightEmojiCodepoint)}`
          );
          continue;
        }

        try {
          process.stdout.write(
            `(${d + 1}/${knownSupportedDates.length}) (${i + 1}/${
              knownSupportedEmoji.length
            }) (${j + 1}/${
              knownSupportedEmoji.length
            }) Sending request to: ${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png for ${printableEmoji(
              leftEmojiCodepoint
            )} x ${printableEmoji(rightEmojiCodepoint)} => `
          );

          // Attempt to download, if it doesn't exist, this will throw a 404 exception, caught below
          const response = await axios(
            `${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png`,
            {
              responseType: "stream",
              timeout: 5000,
            }
          );

          console.log(response.status ?? 200);

          // New pair found, add data to persistent store to save later
          outputData[leftEmojiCodepoint] = [
            ...(outputData[leftEmojiCodepoint] ?? []),
            {
              leftEmoji: leftEmojiCodepoint,
              rightEmoji: rightEmojiCodepoint,
              date: date,
            },
          ];

          // Also add data to flip side, so each key has a reference to all possible combinations
          // But the left/right ordering is the same (and important to keep straight!)
          if (leftEmojiCodepoint !== rightEmojiCodepoint) {
            outputData[rightEmojiCodepoint] = [
              ...(outputData[rightEmojiCodepoint] ?? []),
              {
                leftEmoji: leftEmojiCodepoint,
                rightEmoji: rightEmojiCodepoint,
                date: date,
              },
            ];
          }
        } catch (e) {
          if (e.response) {
            console.log(e.response.status);
          }
        }
      }
    }
  }
}

getKitchenSink();