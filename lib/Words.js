'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWord = parseWord;
exports.parsePhrase = parsePhrase;
var skippable = {
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
  'with': true
};

var invalid = /^\W/;

var segments = /qu|\W+|[bcdfghjklmnpq(?!u)rstvwxyz1-9]+|[aeiou]+/gi;

var whitespace = /\s/g;

var vowel = /^[aeiou]/;

function parseWord(word) {
  var lowercase = word.toLowerCase();
  var skip = skippable[lowercase] || invalid.test(lowercase);
  var match = lowercase.match(segments);
  if (!match) {
    return {
      spoonerable: false,
      capitals: [],
      segments: [],
      word: word
    };
  }
  if (vowel.test(lowercase)) {
    match.unshift('');
  }
  return {
    capitals: word.split('').map(function (c) {
      return c.toLowerCase() !== c;
    }),
    segments: skip ? [lowercase] : match,
    spoonerable: !skip,
    word: word
  };
}

function parsePhrase(phrase) {
  return phrase.split(whitespace).map(parseWord);
}