// @flow
const skippable = {
  'a': true,
  'an': true,
  'and': true,
  'but': true,
  'for': true,
  'i': true,
  'in': true,
  'is': true,
  'nor': true,
  'of': true,
  'or': true,
  'some': true,
  'that': true,
  'the': true,
  'this': true,
  'to': true,
  'with': true,
};

const invalid = /^\W/;

const segments = /qu|\W+|[bcdfghjklmnpq(?!u)rstvwxyz1-9]+|[aeiou]+/gi;

const whitespace = /\s/g;

const vowel = /^[aeiou]/;

export type Word = {
  capitals: Array<bool>,
  segments: Array<string>,
  spoonerable: bool,
  word: string,
};

export function parseWord(word: string): Word {
  const lowercase = word.toLowerCase();
  const skip = skippable[lowercase] || invalid.test(lowercase);
  const match = lowercase.match(segments);
  if (!match) {
    return {
      spoonerable: false,
      capitals: [],
      segments: [],
      word,
    };
  }
  if (vowel.test(lowercase)) {
    match.unshift('');
  }
  return {
    capitals: word.split('').map((c) => c.toLowerCase() !== c),
    segments: skip ? [lowercase] : match,
    spoonerable: !skip,
    word,
  };
}

export function parsePhrase(phrase: string): Array<Word> {
  return phrase.split(whitespace).map(parseWord);
}
