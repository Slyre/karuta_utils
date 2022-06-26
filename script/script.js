import fsPromises from "node:fs/promises"

async function asyncReadFile(filename) {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        return contents.split(/\r?\n/);

    } catch (err) {
        console.log(err);
    }
}

async function rawTextArrayToJsonArray() {
    const rawTextArray = await asyncReadFile('../resource/collection.txt');
    const jsonArray = [];
    rawTextArray.forEach(line => {
        let splittedDotLine = line.split(" · ");
        let splittedSpaceLine = line.split(" ");
        jsonArray.push({anime: splittedDotLine[4], code: splittedSpaceLine[1]})
    })
    return jsonArray;
}

function groupCodesByAnime(karutaJsonArray) {
    const codesByAnime = new Map();
    for (const karutaCard of karutaJsonArray) {
        const animeName = karutaCard.anime;

        if (!codesByAnime.has(animeName)) {
            codesByAnime.set(animeName, []);
        }

        if (karutaCard.anime === animeName) {
            codesByAnime.get(animeName).push(karutaCard.code);
        }
    }
    return codesByAnime;
}


async function process() {
    const karutaCards = await rawTextArrayToJsonArray();
    const groupedCards = groupCodesByAnime(karutaCards);
    groupedCards.forEach((value, key) => {
        console.log(key + ' : ' + ' k!t tag ' + value)
    })
}

process();