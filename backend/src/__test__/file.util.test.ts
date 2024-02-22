import { expect, test, describe } from '@jest/globals';
import generateFileName from '../util/file.util';

describe('Unit tests for File utility functions', () => {
  describe('Test generate name function', () => {
    test('Test length', () => {
      const fileNameOne = generateFileName();
      expect(fileNameOne).toHaveLength(32);
    });
    test('Test randomizing', () => {
      const fileNameTwo = generateFileName();
      const fileNameThree = generateFileName();
      expect(fileNameTwo).not.toBe(fileNameThree);
    });
  });
});
