/**
 * Tokens used to specify random string generation options
 */
export type Token = TokenLiteral | TokenPick | TokenRepeat | TokenRange | TokenList;

/**
 * A string literal to use as-is.
 */
export type TokenLiteral = string;

/**
 * Picks a random string from the provided array of strings.
 * The `from` array can contain any number of strings.
 */
export type TokenPick = [type: 'pick', from: string[]];

/**
 * Repeats `pattern` a random number of times between `min` and `max`.
 */
export type TokenRepeat = [type: 'repeat', min: number, max: number, pattern: Token];

/**
 * Specifies a Unicode code point range from which to pick a random character.
 */
export type TokenRange = [type: 'range', min: number, max: number];

/**
 * Executes a list of `what` tokens in sequence.
 */
export type TokenList = [type: 'list', what: Token[]];

/**
 * Generates a random string based on the provided token.
 * @param token The token defining the random string generation.
 * @returns A randomly generated string.
 */
export function randomString(token: Token): string {
  if (typeof token === 'string') return token;
  const rnd = Math.random();
  switch (token[0]) {
    case 'pick': {
      const set = token[1];
      return set[Math.floor(rnd * set.length)];
    }
    case 'repeat': {
      const min = token[1];
      const max = token[2];
      const pattern = token[3];
      const count = Math.floor(rnd * (max - min + 1)) + min;
      let str = '';
      for (let i = 0; i < count; i++) str += randomString(pattern);
      return str;
    }
    case 'range': {
      const min = token[1];
      const max = token[2];
      const codePoint = Math.floor(rnd * (max - min + 1)) + min;
      return String.fromCodePoint(codePoint);
    }
    case 'list':
      return token[1].map(randomString).join('');
    default:
      throw new Error('Invalid token type');
  }
}
