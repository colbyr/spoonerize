'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNextWord = findNextWord;
exports.recase = recase;
exports.spoonerizePhrase = spoonerizePhrase;

var _Words = require('./Words');

var whitespace = /\s+/g;

function findNextWord(currentIndex, list) {
  var index = currentIndex === 0 ? list.length - 1 : currentIndex - 1;
  if (list[index].spoonerable) {
    return list[index];
  }
  return findNextWord(index, list);
}

function recase(str, capitals) {
  var cased = '';
  for (var i = 0; i < str.length; i++) {
    cased += capitals[i] ? str[i].toUpperCase() : str[i];
  }
  return cased;
}

function getHeadCapitals(head, nextHead, capitals, nextCapitals) {
  if (nextHead.length <= head.length) {
    return capitals.slice(0, Math.max(nextHead.length, 1));
  }
  return capitals.slice(0, head.length).concat(nextCapitals.slice(head.length, Math.max(nextHead.length, 1)));
}

function spoonerizePhrase(rawPhrase) {
  var phrase = rawPhrase.trim().replace(whitespace, ' ');
  if (!phrase) {
    return '';
  }
  return (0, _Words.parsePhrase)(phrase).map(function (_ref, i, list) {
    var capitals = _ref.capitals;
    var segments = _ref.segments;
    var spoonerable = _ref.spoonerable;
    var word = _ref.word;

    if (!spoonerable) {
      return word;
    }
    var originalHead = segments[0];
    var nextWord = findNextWord(i, list);
    var head = nextWord.segments[0];
    var headCapitals = getHeadCapitals(originalHead, head, capitals, nextWord.capitals);
    var tail = segments.slice(1).join('');
    var tailCapitals = capitals.slice(Math.max(originalHead.length, 1));
    return recase(head + tail, headCapitals.concat(tailCapitals));
  }).join(' ');
}