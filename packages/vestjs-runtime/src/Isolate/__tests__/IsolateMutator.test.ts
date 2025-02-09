import { Isolate } from 'Isolate';
import { IsolateMutator } from 'IsolateMutator';

describe('IsolateMutator', () => {
  describe('setParent', () => {
    it('should set parent', () => {
      const parent = {} as Isolate;
      const isolate = {} as Isolate;

      expect(isolate.parent).toBeUndefined();
      expect(IsolateMutator.setParent(isolate, parent)).toBe(isolate);
      expect(isolate.parent).toBe(parent);
    });

    describe('When the child already has a parent', () => {
      it('Should set the new parent of the child', () => {
        const parent1 = {} as Isolate;
        const parent2 = {} as Isolate;
        const isolate = {} as Isolate;

        IsolateMutator.setParent(isolate, parent1);
        expect(isolate.parent).toBe(parent1);
        IsolateMutator.setParent(isolate, parent2);
        expect(isolate.parent).toBe(parent2);
      });
    });
  });

  describe('saveOutput', () => {
    it('should save output', () => {
      const isolate = {} as Isolate;
      const output = {};

      expect(isolate.output).toBeUndefined();
      expect(IsolateMutator.saveOutput(isolate, output)).toBe(isolate);
      expect(isolate.output).toBe(output);
    });
  });

  describe('setKey', () => {
    it('should set key', () => {
      const isolate = {} as Isolate;
      const key = 'foo';

      expect(isolate.key).toBeUndefined();
      expect(IsolateMutator.setKey(isolate, key)).toBe(isolate);
      expect(isolate.key).toBe(key);
    });
  });

  describe('addChild', () => {
    it('should add child', () => {
      const isolate = { children: [] } as unknown as Isolate;
      const child1 = {} as Isolate;
      const child2 = {} as Isolate;

      expect(isolate.children).toEqual([]);
      IsolateMutator.addChild(isolate, child1);
      expect(isolate.children).toEqual([child1]);
      IsolateMutator.addChild(isolate, child2);
      expect(isolate.children).toEqual([child1, child2]);
    });

    it('should set parent of the child', () => {
      const isolate = { children: [] } as unknown as Isolate;
      const child = {} as Isolate;

      expect(child.parent).toBeUndefined();
      IsolateMutator.addChild(isolate, child);
      expect(child.parent).toBe(isolate);
    });
  });

  describe('removeChild', () => {
    it('Should remove child', () => {
      const child1 = {} as Isolate;
      const child2 = {} as Isolate;
      const isolate = { children: [child1, child2] } as unknown as Isolate;

      expect(isolate.children).toEqual([child1, child2]);
      IsolateMutator.removeChild(isolate, child1);
      expect(isolate.children).toEqual([child2]);
      IsolateMutator.removeChild(isolate, child2);
      expect(isolate.children).toEqual([]);
    });

    describe('When the child does not exist', () => {
      it('Should no-op', () => {
        const child = {} as Isolate;
        const isolate = { children: [] } as unknown as Isolate;

        expect(isolate.children).toEqual([]);
        IsolateMutator.removeChild(isolate, child);
        expect(isolate.children).toEqual([]);
      });
    });
  });

  describe('slice', () => {
    it('Should slice children', () => {
      const child1 = {} as Isolate;
      const child2 = {} as Isolate;
      const isolate = { children: [child1, child2] } as unknown as Isolate;

      expect(isolate.children).toEqual([child1, child2]);
      IsolateMutator.slice(isolate, 1);
      expect(isolate.children).toEqual([child1]);
    });

    describe('When children are nullish', () => {
      it('Should no-op', () => {
        const isolate = { children: null } as unknown as Isolate;

        expect(isolate.children).toBeNull();
        IsolateMutator.slice(isolate, 1);
        expect(isolate.children).toBeNull();
      });
    });
  });
});
