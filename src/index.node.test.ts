import { expect, test } from "vitest";
import { metapatcher } from "./index";

test("server environment", () => {
    expect(metapatcher.isDomAvailable).toEqual(false);
});

test("no duplicate records", () => {
    metapatcher.setCanonical("https://example.com");
    expect(metapatcher.memory).toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />',
    );
    metapatcher.setCanonical("https://asdad.com");
    expect(metapatcher.memory).toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://asdad.com" />',
    );
    expect(metapatcher.memory).not.toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />',
    );
    metapatcher.setDocumentTitle("lorem");
    expect(metapatcher.memory).toContain("<title>lorem</title>");
    metapatcher.setDocumentTitle("ipsum");
    expect(metapatcher.memory).not.toContain("<title>lorem</title>");
    expect(metapatcher.memory).toContain("<title>ipsum</title>");
});

test("keep memory on dump", () => {
    expect(metapatcher.isDomAvailable).toEqual(false);
    metapatcher.setCanonical("https://example.com");
    expect(metapatcher.dump()).toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />',
    );
    expect(metapatcher.memory).toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />',
    );
});

test("flush memory", () => {
    metapatcher.setCanonical("https://example.com");
    expect(metapatcher.dump()).toContain(
        '<link id="metapatcher-canonical" rel="canonical" href="https://example.com" />',
    );
    metapatcher.flushMemory();
    expect(metapatcher.memory.length).toBe(0);
});
