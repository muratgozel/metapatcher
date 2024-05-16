# metapatcher
HTML document head management library with convenient api. Manage social media tags, icons, device specific tags and event structured data with html meta tags and JSONLD documents. Supports both browser and server environments. Fully typed.

It injects head tags based on features you enabled upon start. The features are device, browser, platform specific. You give the data you have on page load and it injects appropriately.
- `structuredData` controls tags related to the [Google Search Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
- `openGraphTags` controls [Open Graph](https://ogp.me) tags which many social media sites rely to fetch page data
- `webAppManifest` controls tags related to [Web Application Manifest](https://www.w3.org/TR/appmanifest/) spec.
- `twitterTags` controls meta tags related to [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- `msTags` controls Microsoft device and browser specific tags including name, description and icons
- `appleTags` controls Apple device specific tags such as icons, name and style

## Install
```sh
npm install metapatcher
```

## Usage
### Import
```js
import { metapatcher } from 'metapatcher'
// or const { metapatcher } = require('metapatcher') for commonjs
```
or inject with script tag:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/metapatcher@4/dist/index.js"></script>
```

### Configure
All features mentioned above are enabled by default. You can disable some of them:
```js
metapatcher.configure(['openGraphTags', 'structuredData', 'twitterTags', 'msTags', 'appleTags'], { idPrefix: 'metapatcher' })
// configure also does some injections so you gonna call it anyway
metapatcher.configure()
```

### Basic, High Level Methods
You have to use at least the following methods to create satisfying frontends:
```js
// all parameters are optional
metapatcher.setProjectDetails({
    favicon: '/path/favicon.ico',
    name: 'My Project',
    url: 'https://example.com',
    robots: 'noindex, nofollow', // or "all" for example
    logo: '/path/logo.png',
    themeColor: '#333333',
    twitterSite: '@twitter',
    safariPinnedTab: { href: '/path/mark.svg', color: '#333333' },
    // icons need to follow this naming: *-[width]x[height].ext
    icons: ['/path/icon-16x16.png', '/path/icon-512x512.png', '/path/icon-150x150.png']
})
```
All of the parameters above are optional and has their own individual methods such as `setFavicon`, `setIcons` or `setName`.

Consider also the following methods at the project level:
```js
metapatcher.setMsApplicationConfig (param: string | MetapatcherMsApplicationConfigAttrs)
metapatcher.setAppleStatusBarStyle (content: 'default' | 'black' | 'black-translucent' = 'default')
metapatcher.addPreload (param: string | MetapatcherPreloadAttrs)
metapatcher.addPrefetch (param: string | MetapatcherPrefetchAttrs)
metapatcher.addPreconnect (param: string | MetapatcherPreconnectAttrs)
metapatcher.addDnsPrefetch (param: string | MetapatcherDnsPrefetchAttrs)
```
Use the following methods from page to page:
```js
// all parameters are optional
metapatcher.setPageDetails({
    title: 'Page | Project Name',
    description: 'Lorem ipsum.',
    path: '/en-us/some/page',
    image: '/media/page-cover.jpg',
    // both xx_XX and xx-XX syntax are okay for locales
    locale: 'en_US',
    canonical: 'https://example.com/en-us/some/page',
    // both xx_XX and xx-XX syntax are okay for hreflang
    localVersions: [
        { hreflang: 'en-US', href: '/en-us/some/page' }, 
        { hreflang: 'tr-TR', href: '/tr-tr/some/page' }],
    breadcrumb: [
        { title: 'Page', url: '/en-us/some/page' },
        { title: 'Some', url: '/en-us/some' },
        { title: 'Home', url: '/en-us' }
    ]
})
```
All of the parameters above are optional and has their own individual methods such as `setPageTitle` or `setBreadcrumb`.

Consider also the following methods at the page level:
```js
metapatcher.setMobileVariant (param: string | MetapatcherMobileVariantLinkAttrs)
```

It will inject appropriate meta tags, link tags, jsonld scripts for specific platforms and devices depending on the enabled features.

### Server-side Usage
The library has a simple `isDomAvailable` property which get its value upon init by a simple check `typeof document !== 'undefined'`. This property decides if the library should inject tags or collect them in memory. So, when you run the library in a non-browser environment, they will be kept in memory. You can print them all with:
```js
metapatcher.dump()
```
It returns:
```html
<meta id="metapatcher-msapplication-config" name="msapplication-config" content="none">
<meta id="metapatcher-apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes">
<meta id="metapatcher-twitter-card" name="twitter:card" content="summary">
...
```

### Low Level Usage, Custom Tags
There are methods that you can use to set custom meta tags, link tags and jsonld scripts without leaving the control of the library.

Set custom tags:
```js
// all parameters are optional
metapatcher.set('meta', { id: 'my-id', name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' })

metapatcher.setJsonLd('my-script', { abc: 'def' })
```
and remove later if neccessary:
```js
metapatcher.removeOne('link[id="my-id"]')
metapatcher.removeMany('link[hreflang]')
```

### Inject Script and Stylesheet Resources
```js
await metapatcher.setScript({ id: 'my-script', src: 'https://cdn.jsdelivr.net/npm/metapatcher@4/dist/index.js', async: true })
// wait for global "metapatcher" to become available under window
await metapatcher.setScript({ id: 'my-script', src: 'https://cdn.jsdelivr.net/npm/metapatcher@4/dist/index.js', async: true }, { waitForLoad: 'metapatcher' })

await metapatcher.setStylesheet({ id: 'my-style', href: 'https://example.com/style.css' })
```

### Supports Boolean Attributes
Many methods takes a parameter to be used as html attrs and you can always provide a boolean value for any attribute to render it as boolean html element attribute:
```js
metapatcher.set('link', { rel: 'manifest', href: '/app.webmanifest', crossorigin: true })
```

## Contributing
If you're interested in contributing, read the [CONTRIBUTING.md](https://github.com/muratgozel/muratgozel/blob/main/CONTRIBUTING.md) first, please.

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![Support me on Patreon](https://cdn.muratgozel.com.tr/support-me-on-patreon.v1.png)](https://patreon.com/muratgozel?utm_medium=organic&utm_source=github_repo&utm_campaign=github&utm_content=join_link)
