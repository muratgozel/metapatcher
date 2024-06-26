/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals'
import { metapatcher } from '../dist/index.js'

test('server environment', () => {
    expect(metapatcher.isDomAvailable).toEqual(false)
})

test('no duplicate records', () => {
    metapatcher.setCanonical('https://example.com')
    expect(metapatcher.memory).toContain('<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />')
    metapatcher.setCanonical('https://asdad.com')
    expect(metapatcher.memory).toContain('<link id="metapatcher-canonical" rel="canonical" href="https://asdad.com" />')
    expect(metapatcher.memory).not.toContain('<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />')
})

test.only('keep memory on dump', () => {
    expect(metapatcher.isDomAvailable).toEqual(false)
    metapatcher.setCanonical('https://example.com')
    expect(metapatcher.dump()).toContain('<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />')
    expect(metapatcher.memory).toContain('<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />')
})

test.only('flush memory', () => {
    metapatcher.setCanonical('https://example.com')
    expect(metapatcher.dump()).toContain('<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />')
    metapatcher.flushMemory()
    expect(metapatcher.memory.length).toBe(0)
})
