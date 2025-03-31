import { alphachar } from '../backend/engine.js';

describe('Engine', function () {
  describe('alphachar', function () {
    it('the keys are the available languages', function () {
      expect(Object.keys(alphachar)).toStrictEqual(["eng", "por"]);
    });
  });
});

describe('Engine', function () {
  describe('alphachar', function () {
    it('there are no repeated keys in each languge', function () {
      for (let lang in alphachar) {
        expect(alphachar[lang]).toBeInstanceOf(Set);
      }
    });
  });
});

describe('Engine', function () {
  describe('alphachar', function () {
    it('there are 30 items in each language', function () {
      for (let lang in alphachar) {
        expect(alphachar[lang].size).toBe(30);
      }
    });
  });
});

describe('Engine', function () {
  describe('alphachar', function () {
    it('single keys are lowercase:uppercase', function () {
      for (let lang in alphachar) {
        for (let single of alphachar[lang]) {
          if (single[0].length === 1) {
            expect(single[0]).toBe(single[1].toLowerCase());
          }
        }
      }
    });
  });
});

describe('Engine', function () {
  describe('alphachar', function () {
    it('composed keys are equal:equal', function () {
      for (let lang in alphachar) {
        for (let single of alphachar[lang]) {
          if (single[0].length > 1) {
            expect(single[0]).toBe(single[1]);
          }
        }
      }
    });
  });
});
