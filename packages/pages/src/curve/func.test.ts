import { describe, it, expect } from 'vitest';
import { judgeAreas, TPoint } from './func'
describe('Component Tests', () => {
    it('should return true for a simple test', () => {
        expect(true).toBe(true);
    });

    describe('judgeAreas', () => {
        it('should return true when point is inside polygon', () => {
            const point: TPoint = { x: 1, y: 1 };
            const polygon: TPoint[] = [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 2, y: 2 },
                { x: 0, y: 2 }
            ];
            expect(judgeAreas(point, polygon)).toBe(true);
        });

        it('should return false when point is outside polygon', () => {
            const point: TPoint = { x: 3, y: 3 };
            const polygon: TPoint[] = [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 2, y: 2 },
                { x: 0, y: 2 }
            ];
            expect(judgeAreas(point, polygon)).toBe(false);
        });

        it('should return true when point is on polygon boundary', () => {
            const point: TPoint = { x: 2, y: 1 };
            const polygon: TPoint[] = [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 2, y: 2 },
                { x: 0, y: 2 }
            ];
            expect(judgeAreas(point, polygon)).toBe(true);
        });

        it('should work with triangle polygon', () => {
            const point: TPoint = { x: 1, y: 1 };
            const polygon: TPoint[] = [
                { x: 0, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 2 }
            ];
            expect(judgeAreas(point, polygon)).toBe(true);
        });
    });
});