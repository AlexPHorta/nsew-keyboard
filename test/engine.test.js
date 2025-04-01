import { alphachar, config, symbnumchar } from '../backend/engine.js';

describe('Engine', function () {

  describe('alphachar', function () {
    it('the keys are the available languages', function () {
      expect(Object.keys(alphachar)).toStrictEqual(["eng", "por"]);
    });
    it('there are no repeated keys in each languge', function () {
      for (let lang in alphachar) {
        expect(alphachar[lang]).toBeInstanceOf(Set);
      }
    });
    it('there are 30 items in each language', function () {
      for (let lang in alphachar) {
        expect(alphachar[lang].size).toBe(30);
      }
    });
    it('keys are strings', function () {
      for (let lang in alphachar) {
        for (let single of alphachar[lang]) {
          for (let key of single) {
            expect(typeof key).toBe("string");
          }
        }
      }
    });
    it('single keys are two items', function () {
      for (let lang in alphachar) {
        for (let single of alphachar[lang]) {
          expect(single.length).toBe(2);
        }
      }
    });
    it('single keys are lowercase:UPPERCASE', function () {
      for (let lang in alphachar) {
        for (let single of alphachar[lang]) {
          if (single[0].length === 1) {
            expect(single[0]).toBe(single[1].toLowerCase());
          }
        }
      }
    });
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

  describe('symbnumchar', function () {
    it('there are no repeated keys in it', function () {
      for (let sn in symbnumchar) {
        expect(symbnumchar[sn]).toBeInstanceOf(Set);
      }
    });
    it('there are 30 items in it', function () {
      for (let sn in symbnumchar) {
        expect(symbnumchar[sn].size).toBe(30);
      }
    });
    it('single keys are two items', function () {
      for (let sn in symbnumchar) {
        for (let single of symbnumchar[sn]) {
          expect(single.length).toBe(2);
        }
      }
    });
    it('keys are strings', function () {
      for (let sn in symbnumchar) {
        for (let single of symbnumchar[sn]) {
          for (let key of single) {
            expect(typeof key).toBe("string");
          }
        }
      }
    });
    it('composed keys are equal:equal', function () {
      for (let sn in symbnumchar) {
        for (let single of symbnumchar[sn]) {
          if (single[0].length > 1) {
            expect(single[0]).toBe(single[1]);
          }
        }
      }
    });
  });

  describe('config', function () {
    const conf_keys = ['active', 'options', 'capslock', 'alpha', 'symbnum', 'def', 'alter'];

    test.each(conf_keys)
      ('%s in config', (k) => { expect(k in config).toBeTruthy() });

    it('has this number of items', function () {
      expect(Object.keys(config).length).toBe(conf_keys.length);
    });
  });

});
