import {randomString, Token} from '../string';

// Tests for randomString
describe('randomString', () => {
  it('should pick a random string from the array', () => {
    const token: Token = ['pick', ['apple', 'banana', 'cherry']];
    const result = randomString(token);
    expect(['apple', 'banana', 'cherry']).toContain(result);
  });

  it('should repeat a pattern a random number of times', () => {
    const token: Token = ['repeat', 2, 5, ['pick', ['x', 'y', 'z', ' ']]];
    const result = randomString(token);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('should pick a random character from the Unicode range', () => {
    const token: Token = ['range', 65, 90]; // A-Z
    const result = randomString(token);
    expect(result).toMatch(/^[A-Z]$/);
  });

  // test tlist token
  it('executes a list of tokens', () => {
    const token: Token = [
      'list',
      [
        ['pick', ['monkey', 'dog', 'cat']],
        ['pick', [' ']],
        ['pick', ['ate', 'threw', 'picked']],
        ['pick', [' ']],
        ['pick', ['apple', 'banana', 'cherry']],
      ],
    ];
    const result = randomString(token);
    expect(/monkey|dog|cat/.test(result)).toBe(true);
    expect(/ate|threw|picked/.test(result)).toBe(true);
    expect(/apple|banana|cherry/.test(result)).toBe(true);
  });
});
