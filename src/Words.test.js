import { parsePhrase, parseWord } from './Words';

describe('parseWord', () => {
  it('extracts sylables', () => {
    expect(parseWord('Sound')).toEqual({
      capitals: [true, false, false, false, false],
      segments: ['s', 'ou', 'nd'],
      spoonerable: true,
      word: 'Sound',
    });
  });

  it('extracts empties', () => {
    expect(parseWord('eat')).toEqual({
      capitals: [false, false, false],
      segments: ['', 'ea', 't'],
      spoonerable: true,
      word: 'eat',
    });
  });

  it('extracts "qu"', () => {
    expect(parseWord('queen')).toEqual({
      capitals: [false, false, false, false, false],
      segments: ['qu', 'ee', 'n'],
      spoonerable: true,
      word: 'queen',
    });
  });

  it('extracts a begining "y"', () => {
    expect(parseWord('year')).toEqual({
      capitals: [false, false, false, false],
      segments: ['y', 'ea', 'r'],
      spoonerable: true,
      word: 'year',
    });
  });

  it('works in lowercase', () => {
    expect(parseWord('woW')).toEqual({
      capitals: [false, false, true],
      segments: ['w', 'o', 'w'],
      spoonerable: true,
      word: 'woW',
    });
  });

  it('skips articles', () => {
    expect(parseWord('but')).toEqual({
      capitals: [false, false, false],
      segments: ['but'],
      spoonerable: false,
      word: 'but',
    });
    expect(parseWord('in')).toEqual({
      capitals: [false, false],
      segments: ['in'],
      spoonerable: false,
      word: 'in',
    });
  });

  it('takes special characters', () => {
    expect(parseWord('we\'re')).toEqual({
      capitals: [false, false, false, false, false],
      segments: ['w', 'e', '\'', 'r', 'e'],
      spoonerable: true,
      word: 'we\'re',
    });
  });
});

describe('parsePhrase', () => {
  it('parsePhrases words independently', () => {
    expect(parsePhrase('Omg WOW')).toEqual([{
      capitals: [true, false, false],
      segments: ['', 'o', 'mg'],
      spoonerable: true,
      word: 'Omg',
    }, {
      capitals: [true, true, true],
      segments: ['w', 'o', 'w'],
      spoonerable: true,
      word: 'WOW',
    }]);
  });
});
