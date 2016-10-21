import { spoonerizePhrase } from './Spoonerism';

it('spoonerizes classics', () => {
  expect(
    spoonerizePhrase('Fleetwood Mac')
  ).toEqual(
    'Meetwood Flac'
  );
});

it('spoonerizes around articles', () => {
  expect(
    spoonerizePhrase('Yes and no')
  ).toEqual(
    'Nes and yo'
  );
});

it('spoonerizes words that start with vowels', () => {
  expect(
    spoonerizePhrase('Bank of America')
  ).toEqual(
    'Ank of Bamerica'
  );
});

it('spoonerizes "qu"s properly', () => {
  expect(spoonerizePhrase('Peter McQueen')).toBe('McQueter Peen');
});

it('handles non-q "u"s properly', () => {
  expect(spoonerizePhrase('Crocodile Dundee')).toBe('Docodile Crundee');
});

it('normalizes spaces', () => {
  expect(spoonerizePhrase('random wow')).toBe(spoonerizePhrase(' random  wow'));
});
