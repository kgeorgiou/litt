var Utilities = {
        filterWord2VecWords: function (wordList) {
            var tmp = [];
            var hashMap = { };

            for (var i = 0; i < wordList.length; i++) {

                // The [word, likelihood] tuple as returned from word2vec
                var pair = wordList[i];

                if (!pair)
                    continue;

                // The word part of the tuple
                var word = pair[0];
                // The likelihood of part of the tuple
                var prob = pair[1];

                if (!word)
                    continue;

                word = word.toLowerCase();

                // Replace plural version of the word with singular.
                // This doesn't handle irregular plural nouns e.g goose -> geese
                if (hashMap[word + 's']) {
                    delete hashMap[word + 's'];
                    hashMap[word] = true;
                    tmp = replaceWordWith(tmp, word + 's', word);
                    continue;
                }

                // The word itself or its singular version were already seen
                if (hashMap[word] || hashMap[word.substr(0, word.length - 1)])
                    continue;

                hashMap[word] = true;
                tmp.push(word);
            }

            return tmp;
        }
};

function replaceWordWith(array, oldWord, newWord) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == oldWord) {
            array[i] = newWord;
            return array;
        }
    }
}

module.exports = Utilities;
