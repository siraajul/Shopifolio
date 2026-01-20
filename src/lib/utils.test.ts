import { describe, it, expect, vi } from 'vitest';
import { cn, getRGBA, colorWithOpacity } from './utils';

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names correctly', () => {
            expect(cn('c-red', 'c-blue')).toBe('c-red c-blue');
        });

        it('should handle conditional classes', () => {
            expect(cn('c-red', false && 'c-blue', undefined, null, 'c-green')).toBe('c-red c-green');
        });

        it('should merge tailwind classes properly', () => {
            // tailwind-merge should override p-2 with p-4
            expect(cn('p-2', 'p-4')).toBe('p-4');
        });
    });

    describe('getRGBA', () => {
        it('should return fallback if window is undefined (Node env)', () => {
            // Modern syntax: space separated with slash
            expect(getRGBA('#ff0000')).toBe('rgba(255 0 0 / 1)');
        });

        it('should parse hex codes', () => {
            expect(getRGBA('#00ff00')).toBe('rgba(0 255 0 / 1)');
        });

        it('should return fallback on invalid color', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            expect(getRGBA('invalid-color', 'rgba(0,0,0,1)')).toBe('rgba(0,0,0,1)');
            consoleSpy.mockRestore();
        });

        // Test DOM interactions if environment supports it
        it('should handle CSS variables via DOM', () => {
            // Only run this if we are in a browser-like environment
            if (typeof window !== 'undefined') {
                // Mock getComputedStyle
                const originalGetComputedStyle = window.getComputedStyle;
                const elementMock = { style: { color: '' } } as unknown as HTMLElement;

                vi.spyOn(document, 'createElement').mockReturnValue(elementMock);
                vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
                vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);

                window.getComputedStyle = vi.fn().mockReturnValue({ color: 'rgb(0, 0, 255)' } as unknown as CSSStyleDeclaration);

                expect(getRGBA('var(--test-color)')).toBe('rgba(0 0 255 / 1)');

                window.getComputedStyle = originalGetComputedStyle;
                vi.restoreAllMocks();
            }
        });
    });

    describe('colorWithOpacity', () => {
        it('should add opacity to rgb string', () => {
            const result = colorWithOpacity('rgb(255, 0, 0)', 0.5);
            // Check for prefix syntax match
            expect(result).toContain('rgba(255 0 0 /');
        });

        it('should return original string if not rgb/rgba', () => {
            // The utility only checks if it starts with 'rgb'
            expect(colorWithOpacity('#ff0000', 0.5)).toBe('#ff0000');
        });

        it('should update opacity of rgba string', () => {
            const result = colorWithOpacity('rgba(0, 0, 0, 1)', 0.5);
            expect(result).toContain('rgba(0 0 0 /');
        });
    });
});
