import { expect, test } from '@jest/globals'
import { metapatcher } from '../dist/index.js'

test('disable browserconfig.xml requests upon init', () => {
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-msapplication-config" name="msapplication-config" content="none">'))
})

test('set "apple-mobile-web-app-capable" and "twitter:card" tags on configure', () => {
    metapatcher.configure()
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes">'))
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-twitter-card" name="twitter:card" content="summary">'))
})

test('set document title', () => {
    metapatcher.setDocumentTitle('Example')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<title>Example</title>'))
})

test('set favicon', () => {
    metapatcher.setFavicon('/favicon.ico')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-favicon" rel="shortcut icon" href="/favicon.ico">'))

    metapatcher.setFavicon({ href: '/custom.ico' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.not.stringContaining('<link id="metapatcher-favicon" rel="shortcut icon" href="/favicon.ico">'))
    expect(data2).toEqual(expect.stringContaining('<link href="/custom.ico" id="metapatcher-favicon" rel="shortcut icon">'))
})

test('set icons', () => {
    const list = ['/path/icon-16x16.png', '/path/icon-512x512.png', '/path/icon-150x150.png']
    metapatcher.setIcons(list)
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-icon-512x512-wam" rel="icon" href="/path/icon-512x512.png" sizes="512x512" type="image/png">'))
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-icon-150x150-ms" name="msapplication-square150x150logo" content="/path/icon-150x150.png">'))
})

test('set "robots"', () => {
    metapatcher.setRobots('all')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-robots" name="robots" content="all">'))

    metapatcher.setRobots({ content: 'noindex, nofollow' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.not.stringContaining('<meta id="metapatcher-robots" name="robots" content="all">'))
    expect(data2).toEqual(expect.stringContaining('<meta content="noindex, nofollow" id="metapatcher-robots" name="robots">'))
})

test('set canonical', () => {
    metapatcher.setCanonical('https://example.com')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-canonical" rel="canonical" href="https://example.com">'))
})

test('set hreflang tags', () => {
    const list = [{ hreflang: 'tr_TR', href: '/tr-tr' }, { hreflang: 'en_UK', href: '/en-uk' }, { hreflang: 'en_US', href: '/en-us' }]
    metapatcher.setLocalVersions(list, 'en_US')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link hreflang="tr-TR" href="/tr-tr" id="metapatcher-local-version-tr_TR" rel="alternate">'))
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-local-version-og-tr-TR" property="og:locale:alternate" content="tr_TR">'))
    expect(data).toEqual(expect.stringContaining('<link hreflang="en-UK" href="/en-uk" id="metapatcher-local-version-en_UK" rel="alternate">'))
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-local-version-og-en-UK" property="og:locale:alternate" content="en_UK">'))
    expect(data).toEqual(expect.stringContaining('<link hreflang="en-US" href="/en-us" id="metapatcher-local-version-en_US" rel="alternate">'))
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-local-version-og-en-US" property="og:locale" content="en_US">'))
})

test('set multiple "preload" links', () => {
    metapatcher.addPreload('https://example.com')
    metapatcher.addPreload({ href: 'https://example2.com', custom: 'abc' })
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-preload-0" rel="preload" href="https://example.com">'))
    expect(data).toEqual(expect.stringContaining('<link href="https://example2.com" custom="abc" id="metapatcher-preload-1" rel="preload">'))

    metapatcher.addPreload({ href: 'https://example.com', custom: 'abc' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.stringContaining('<link href="https://example.com" custom="abc" id="metapatcher-preload-2" rel="preload">'))
    expect(data2).toEqual(expect.not.stringContaining('<link id="metapatcher-preload-0" rel="preload" href="https://example.com">'))
})

test('set multiple "prefetch" links', () => {
    metapatcher.addPrefetch('https://example.com')
    metapatcher.addPrefetch({ href: 'https://example2.com', custom: 'abc' })
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-prefetch-0" rel="prefetch" href="https://example.com">'))
    expect(data).toEqual(expect.stringContaining('<link href="https://example2.com" custom="abc" id="metapatcher-prefetch-1" rel="prefetch">'))

    metapatcher.addPrefetch({ href: 'https://example.com', custom: 'abc' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.stringContaining('<link href="https://example.com" custom="abc" id="metapatcher-prefetch-2" rel="prefetch">'))
    expect(data2).toEqual(expect.not.stringContaining('<link id="metapatcher-prefetch-0" rel="prefetch" href="https://example.com">'))
})

test('set multiple "preconnect" links', () => {
    metapatcher.addPreconnect('https://example.com')
    metapatcher.addPreconnect({ href: 'https://example2.com', custom: 'abc' })
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-preconnect-0" rel="preconnect" href="https://example.com">'))
    expect(data).toEqual(expect.stringContaining('<link href="https://example2.com" custom="abc" id="metapatcher-preconnect-1" rel="preconnect">'))

    metapatcher.addPreconnect({ href: 'https://example.com', custom: 'abc' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.stringContaining('<link href="https://example.com" custom="abc" id="metapatcher-preconnect-2" rel="preconnect">'))
    expect(data2).toEqual(expect.not.stringContaining('<link id="metapatcher-preconnect-0" rel="preconnect" href="https://example.com">'))
})

test('set multiple "dns-prefetch" links', () => {
    metapatcher.addDnsPrefetch('https://example.com')
    metapatcher.addDnsPrefetch({ href: 'https://example2.com', custom: 'abc' })
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link id="metapatcher-dns-prefetch-0" rel="dns-prefetch" href="https://example.com">'))
    expect(data).toEqual(expect.stringContaining('<link href="https://example2.com" custom="abc" id="metapatcher-dns-prefetch-1" rel="dns-prefetch">'))

    metapatcher.addDnsPrefetch({ href: 'https://example.com', custom: 'abc' })
    const data2 = document.head.outerHTML
    expect(data2).toEqual(expect.stringContaining('<link href="https://example.com" custom="abc" id="metapatcher-dns-prefetch-2" rel="dns-prefetch">'))
    expect(data2).toEqual(expect.not.stringContaining('<link id="metapatcher-dns-prefetch-0" rel="dns-prefetch" href="https://example.com">'))
})

test('set breadcrumb', () => {
    const b = [{ title: 'abc', url: '/abc' }, { title: 'def', url: '/abc/def' }]
    metapatcher.setBreadcrumb(b)
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<script id="metapatcher-breadcrumb" type="application/ld+json">{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"abc","item":"/abc"},{"@type":"ListItem","position":2,"name":"def","item":"/abc/def"}]}</script>'))
})

test('set safari pinned tab', () => {
    metapatcher.setSafariPinnedTab({ href: '/icon.svg', color: 'red' })
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<link href="/icon.svg" color="red" id="metapatcher-safari-pinned-tab" rel="mask-icon">'))
})

test('set apple status bar style', () => {
    metapatcher.setAppleStatusBarStyle('black-translucent')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-apple-status-bar-style" name="apple-mobile-web-app-status-bar-style" content="black-translucent">'))
})

test('set "twitter:site"', () => {
    metapatcher.setTwitterSite('@twitter')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-twitter-site" name="twitter:site" content="@twitter">'))
})

test('set "msapplication-config"', () => {
    metapatcher.setMsApplicationConfig('/browserconfig.xml')
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta id="metapatcher-msapplication-config" name="msapplication-config" content="/browserconfig.xml">'))
})

test('set meta', () => {
    metapatcher.setMeta('google', 'notranslate')
    const len = document.head.querySelectorAll('meta[name="google"]').length
    expect(len).toBe(1)

    metapatcher.setMeta('google', 'translate')
    const len2 = document.head.querySelectorAll('meta[name="google"]').length
    expect(len2).toBe(1)
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<meta name="google" content="translate">'))
})

/*
test('set script tags', async () => {
    const result = await metapatcher.setScript({ id: 'my-script', src: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js', async: true })
    console.log(result)
    const data = document.head.outerHTML
    expect(data).toEqual(expect.stringContaining('<script type="text/javascript" id="my-script" src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js" async></script>'))
}, 12000)
*/
