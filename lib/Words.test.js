'use strict';

var _Words = require('./Words');

describe('parseWord', function () {
  it('extracts sylables', function () {
    expect((0, _Words.parseWord)('Sound')).toEqual({
      capitals: [true, false, false, false, false],
      segments: ['s', 'ou', 'nd'],
      spoonerable: true,
      word: 'Sound'
    });
  });

  it('extracts empties', function () {
    expect((0, _Words.parseWord)('eat')).toEqual({
      capitals: [false, false, false],
      segments: ['', 'ea', 't'],
      spoonerable: true,
      word: 'eat'
    });
  });

  it('extracts "qu"', function () {
    expect((0, _Words.parseWord)('queen')).toEqual({
      capitals: [false, false, false, false, false],
      segments: ['qu', 'ee', 'n'],
      spoonerable: true,
      word: 'queen'
    });
  });

  it('extracts a begining "y"', function () {
    expect((0, _Words.parseWord)('year')).toEqual({
      capitals: [false, false, false, false],
      segments: ['y', 'ea', 'r'],
      spoonerable: true,
      word: 'year'
    });
  });

  it('works in lowercase', function () {
    expect((0, _Words.parseWord)('woW')).toEqual({
      capitals: [false, false, true],
      segments: ['w', 'o', 'w'],
      spoonerable: true,
      word: 'woW'
    });
  });

  it('skips articles', function () {
    expect((0, _Words.parseWord)('but')).toEqual({
      capitals: [false, false, false],
      segments: ['but'],
      spoonerable: false,
      word: 'but'
    });
    expect((0, _Words.parseWord)('in')).toEqual({
      capitals: [false, false],
      segments: ['in'],
      spoonerable: false,
      word: 'in'
    });
  });

  it('takes special characters', function () {
    expect((0, _Words.parseWord)('we\'re')).toEqual({
      capitals: [false, false, false, false, false],
      segments: ['w', 'e', '\'', 'r', 'e'],
      spoonerable: true,
      word: 'we\'re'
    });
  });
});

describe('parsePhrase', function () {
  it('parsePhrases words independently', function () {
    expect((0, _Words.parsePhrase)('Omg WOW')).toEqual([{
      capitals: [true, false, false],
      segments: ['', 'o', 'mg'],
      spoonerable: true,
      word: 'Omg'
    }, {
      capitals: [true, true, true],
      segments: ['w', 'o', 'w'],
      spoonerable: true,
      word: 'WOW'
    }]);
  });
});