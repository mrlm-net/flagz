import { describe, it, expect } from "vitest";
import Flagger from './flagger';

describe('Flagger', () => {
    it('should get and set simple keys', () => {
        const flagger = new Flagger();
        flagger.set('FEATURE_A', true);
        expect(flagger.get('FEATURE_A')).toBe(true);
        expect(flagger.get('FEATURE_B')).toBe(false);
    });

    it('should get and set nested keys', () => {
        const flagger = new Flagger();
        flagger.set('FEATURE_A.SUB_FEATURE_A1', true);
        expect(flagger.get('FEATURE_A.SUB_FEATURE_A1')).toBe(true);
        expect(flagger.get('FEATURE_A.SUB_FEATURE_A2')).toBe(false);
        expect(flagger.get('FEATURE_B')).toBe(false);
    });

    it('should return false for non-boolean values', () => {
        const flagger = new Flagger({ FEATURE_A: { SUB_FEATURE_A1: 'notABoolean' } });
        expect(flagger.get('FEATURE_A.SUB_FEATURE_A1')).toBe(false);
    });

    it('should handle custom separators', () => {
        const flagger = new Flagger({}, { separator: '/' });
        flagger.set('FEATURE_A/SUB_FEATURE_A1', true);
        expect(flagger.get('FEATURE_A/SUB_FEATURE_A1')).toBe(true);
        expect(flagger.get('FEATURE_A/SUB_FEATURE_A2')).toBe(false);
    });

    it('should add new flags', () => {
        const flagger = new Flagger();
        flagger.addFlags({ FEATURE_C: true, FEATURE_D: { SUB_FEATURE_D1: false } });
        expect(flagger.get('FEATURE_C')).toBe(true);
        expect(flagger.get('FEATURE_D.SUB_FEATURE_D1')).toBe(false);
    });

    it('should set a fresh copy of flags', () => {
        const flagger = new Flagger();
        flagger.setFlags({ FEATURE_E: true, FEATURE_F: { SUB_FEATURE_F1: false } });
        expect(flagger.get('FEATURE_E')).toBe(true);
        expect(flagger.get('FEATURE_F.SUB_FEATURE_F1')).toBe(false);
        expect(flagger.get('FEATURE_A')).toBe(false); // Ensure old flags are not present
    });

    it('should overwrite existing flags with addFlags', () => {
        const flagger = new Flagger({ FEATURE_G: false });
        flagger.addFlags({ FEATURE_G: true });
        expect(flagger.get('FEATURE_G')).toBe(true);
    });

    it('should handle empty flags object in setFlags', () => {
        const flagger = new Flagger({ FEATURE_H: true });
        flagger.setFlags({});
        expect(flagger.get('FEATURE_H')).toBe(false);
    });

    it('should handle nested flags in addFlags', () => {
        const flagger = new Flagger({ FEATURE_I: { SUB_FEATURE_I1: false } });
        flagger.addFlags({ FEATURE_I: { SUB_FEATURE_I1: true, SUB_FEATURE_I2: true } });
        expect(flagger.get('FEATURE_I.SUB_FEATURE_I1')).toBe(true);
        expect(flagger.get('FEATURE_I.SUB_FEATURE_I2')).toBe(true);
    });

    it('should handle nested flags in setFlags', () => {
        const flagger = new Flagger({ FEATURE_J: { SUB_FEATURE_J1: false } });
        flagger.setFlags({ FEATURE_J: { SUB_FEATURE_J1: true, SUB_FEATURE_J2: true } });
        expect(flagger.get('FEATURE_J.SUB_FEATURE_J1')).toBe(true);
        expect(flagger.get('FEATURE_J.SUB_FEATURE_J2')).toBe(true);
        expect(flagger.get('FEATURE_J.SUB_FEATURE_J3')).toBe(false);
    });

    it('should deeply merge flags with addFlags', () => {
        const flagger = new Flagger({ FEATURE_K: { SUB_FEATURE_K1: false, SUB_FEATURE_K2: true } });
        flagger.addFlags({ FEATURE_K: { SUB_FEATURE_K1: true, SUB_FEATURE_K3: true } });
        expect(flagger.get('FEATURE_K.SUB_FEATURE_K1')).toBe(true);
        expect(flagger.get('FEATURE_K.SUB_FEATURE_K2')).toBe(true);
        expect(flagger.get('FEATURE_K.SUB_FEATURE_K3')).toBe(true);
    });

    it('should deeply merge flags with setFlags', () => {
        const flagger = new Flagger({ FEATURE_L: { SUB_FEATURE_L1: false, SUB_FEATURE_L2: true } });
        flagger.setFlags({ FEATURE_L: { SUB_FEATURE_L1: true, SUB_FEATURE_L3: true } });
        expect(flagger.get('FEATURE_L.SUB_FEATURE_L1')).toBe(true);
        expect(flagger.get('FEATURE_L.SUB_FEATURE_L2')).toBe(false); // Ensure old flags are not present
        expect(flagger.get('FEATURE_L.SUB_FEATURE_L3')).toBe(true);
    });

    it('should handle merging empty objects with addFlags', () => {
        const flagger = new Flagger({ FEATURE_M: { SUB_FEATURE_M1: true } });
        flagger.addFlags({});
        expect(flagger.get('FEATURE_M.SUB_FEATURE_M1')).toBe(true);
    });

    it('should handle merging empty objects with setFlags', () => {
        const flagger = new Flagger({ FEATURE_N: { SUB_FEATURE_N1: true } });
        flagger.setFlags({});
        expect(flagger.get('FEATURE_N.SUB_FEATURE_N1')).toBe(false);
    });

    it('should handle merging nested objects with addFlags', () => {
        const flagger = new Flagger({ FEATURE_O: { SUB_FEATURE_O1: { SUB_SUB_FEATURE_O1: false } } });
        flagger.addFlags({ FEATURE_O: { SUB_FEATURE_O1: { SUB_SUB_FEATURE_O1: true, SUB_SUB_FEATURE_O2: true } } });
        expect(flagger.get('FEATURE_O.SUB_FEATURE_O1.SUB_SUB_FEATURE_O1')).toBe(true);
        expect(flagger.get('FEATURE_O.SUB_FEATURE_O1.SUB_SUB_FEATURE_O2')).toBe(true);
    });

    it('should handle merging nested objects with setFlags', () => {
        const flagger = new Flagger({ FEATURE_P: { SUB_FEATURE_P1: { SUB_SUB_FEATURE_P1: false } } });
        flagger.setFlags({ FEATURE_P: { SUB_FEATURE_P1: { SUB_SUB_FEATURE_P1: true, SUB_SUB_FEATURE_P2: true } } });
        expect(flagger.get('FEATURE_P.SUB_FEATURE_P1.SUB_SUB_FEATURE_P1')).toBe(true);
        expect(flagger.get('FEATURE_P.SUB_FEATURE_P1.SUB_SUB_FEATURE_P2')).toBe(true);
        expect(flagger.get('FEATURE_P.SUB_FEATURE_P2')).toBe(false); // Ensure old flags are not present
    });
});
