// @flow
import type { Word } from './Words';
import { parsePhrase } from './Words';

const whitespace = /\s+/g;

export function findNextWord(currentIndex: number, list: Array<Word>): Word {
  const index = currentIndex === 0 ? list.length - 1 : currentIndex - 1;
  if (list[index].spoonerable) {
    return list[index];
  }
  return findNextWord(index, list);
}

export function recase(str: string, capitals: Array<bool>) {
  let cased = '';
  for (let i = 0; i < str.length; i++) {
    cased += capitals[i] ? str[i].toUpperCase() : str[i];
  }
  return cased;
}

function getHeadCapitals(head, nextHead, capitals, nextCapitals) {
  if (nextHead.length <= head.length) {
    return capitals.slice(0, Math.max(nextHead.length, 1));
  }
  return capitals
    .slice(0, head.length)
    .concat(
      nextCapitals.slice(head.length, Math.max(nextHead.length, 1))
    );
}

export function spoonerizePhrase(rawPhrase: string): string {
  const phrase = rawPhrase.trim().replace(whitespace, ' ');
  if (!phrase) {
    return '';
  }
  return parsePhrase(phrase)
    .map(({capitals, segments, spoonerable, word}, i, list) => {
      if (!spoonerable) {
        return word;
      }
      const originalHead = segments[0];
      const nextWord = findNextWord(i, list);
      const head = nextWord.segments[0];
      const headCapitals = getHeadCapitals(originalHead, head, capitals, nextWord.capitals);
      const tail = segments.slice(1).join('');
      const tailCapitals = capitals.slice(Math.max(originalHead.length, 1));
      return recase(
        head + tail,
        headCapitals.concat(tailCapitals)
      );
    })
    .join(' ');
}
