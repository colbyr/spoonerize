'use strict';

var _Spoonerism = require('./Spoonerism');

it('spoonerizes classics', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('Fleetwood Mac')).toEqual('Meetwood Flac');
});

it('spoonerizes around articles', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('Yes and no')).toEqual('Nes and yo');
});

it('spoonerizes words that start with vowels', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('Bank of America')).toEqual('Ank of Bamerica');
});

it('spoonerizes "qu"s properly', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('Peter McQueen')).toBe('McQueter Peen');
});

it('handles non-q "u"s properly', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('Crocodile Dundee')).toBe('Docodile Crundee');
});

it('normalizes spaces', function () {
  expect((0, _Spoonerism.spoonerizePhrase)('random wow')).toBe((0, _Spoonerism.spoonerizePhrase)(' random  wow'));
});