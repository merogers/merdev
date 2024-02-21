import { expect, test, describe } from '@jest/globals';
import { randomString, hashString } from '../util/crypto';

describe('Unit tests for crypto utility functions', () => {
  describe('Test random string generator', () => {
    test('Test length', () => {
      const randomStringThree = randomString();
      expect(randomStringThree).toHaveLength(172);
    });
    test('Test randomizing', () => {
      const randomStringOne = randomString();
      const randomStringTwo = randomString();
      expect(randomStringOne).not.toBe(randomStringTwo);
    });
  });
  describe('Test hash string function', () => {
    const testSecret = 'testsecret';
    const testResult = '96a372da978e7354f9e3035f8b155800afb6c12986e348a14ce8fe8c8708fe8a';
    test('Test hash functions runs correctly', () => {
      expect(hashString(testSecret, 'password123', testSecret)).toBe(testResult);
    });
  });
});
