# metapatcher
HTML document head management tool with declarative api. Inject/remove meta tags, icons, social media tags, JSONLD expressions and many more.

![NPM](https://img.shields.io/npm/l/metapatcher)
[![npm version](https://badge.fury.io/js/metapatcher.svg)](https://badge.fury.io/js/metapatcher)
![npm bundle size](https://img.shields.io/bundlephobia/min/metapatcher)
![npm](https://img.shields.io/npm/dy/metapatcher)

## Install
```sh
npm install metapatcher
```

## Import
There are different types of distributions depending on your use case. Essentially, the package can be imported via require:
```js
const Metapatcher = require('metapatcher')
```
or via script tag:
```html
<script src="https://cdn.jsdelivr.net/npm/basekits@1/dist/basekits.iife.js" crossorigin type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-scripter@2/dist/dom-scripter.iife.js" crossorigin type="text/javascript"></script>

<script src="https://cdn.jsdelivr.net/npm/metapatcher@1/dist/metapatcher.iife.js" crossorigin type="text/javascript"></script>
```
but there are lots of other options. See distribution report below.

## Use
### Init
Apply settings upon initiation:
```js
// these are default settings
const settings = {
  structuredData: {enabled: true},
  androidChromeIcons: {enabled: true},
  msTags: {enabled: true},
  safariTags: {enabled: true},
  appleTags: {enabled: true},
  openGraphTags: {enabled: true},
  twitterTags: {enabled: true},
  facebookTags: {enabled: true}
}
const metapatcher = new Metapatcher(settings)
```
### Essential Methods
```js
// injects favicon and returns the dom element
metapatcher.setFavicon('/path/favicon.ico')

// set application name, url and logo across devices and browsers
// returns self
metapatcher.setProjectMeta({
  name: 'Sample App',
  url: 'https://frondjs.org',
  logo: '/path/logo.png',
  primaryColor: '#333333',
  backgroundColor: '#ffffff'
})

// set robots directives, returns the node element
metapatcher.robots('noindex')
metapatcher.robots('index, nofollow')
// reference for google can be found at:
// https://developers.google.com/search/reference/robots_meta_tag

// prioritize loading resources, returns the node element
metapatcher.prioritize('https://frondjs.org', 'preconnect')
metapatcher.prioritize('https://frondjs.org', 'dns-prefetch')
metapatcher.prioritize('/some/page', 'prefetch')
metapatcher.prioritize('/some/path/sample.css', 'preload')
// remove all prioritizations
metapatcher.removeAllPrioritizations()

// document title, meta name and description, social media, canonical, hreflang
// and other applicable tags
// returns self
metapatcher.setPageMeta({
  title: 'Home',
  description: 'This is home.',
  url: 'https://frondjs.org',
  image: '/path/cover.jpg',
  locale: 'tr_TR',
  localVersions: {
    'en_US': 'https://frondjs.org/en-us'
  },
  canonicals: [
    'https://www.frondjs.org'
  ]
})

// if you would like to patch canonicals seperately
metapatcher.setCanonical('https://www.frondjs.org') // returns element
metapatcher.setCanonical('https://www.frondjs.org/home')
// and remove all of them
metapatcher.removeAllCanonicals() // returns self

// if you would like to patch local version tags seperately
metapatcher.setLocalVersion('tr_TR', url, isActiveLocale = false) // returns self
// isActiveLocale indicates that the locale in the first argument is
// equal to the current locale of the page
metapatcher.setLocalVersion('en_US', url2, true)
// and remove all
metapatcher.removeAllLocalVersions()
```
### Flexible
Learn `.set` method to patch custom meta or link tags.
```js
const elem = metapatcher.set(tag, identifierAttr = undefined, attrs = {})
```
- `tag` is **meta** or **link**.
- `identifierAttr` causes to remove any existing tags based on the `identifierAttr=attrs[identifierAttr]` match.
- `attrs` is regular html attributes.
```js
// three example below will create meta name=$1 content=$2 tags.
metapatcher.set('meta', 'name', {name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover'})
metapatcher.set('meta', 'name', {name: 'manifest', content: '/manifest.json'})
metapatcher.set('meta', 'name', {name: 'msapplication-config', content: '/path/msconfig.xml'})

// the example below will create link rel=$1 href=$2 tag.
metapatcher.set('link', undefined, {rel: 'stylesheet', href: '/path/style.css'})

// disable chrome auto-translate recommendation
metapatcher.set('meta', undefined, {name: 'google', content: 'notranslate'})
```
### Breadcrumb
An array of objects in the right order can be converted a valid structured data format:
```js
const data = [
  {title: 'Home', url: 'https://www.frondjs.org'},
  {title: 'About', url: 'https://www.frondjs.org/about'}
]
metapatcher.breadcrumb(data) // returns self
```
### Icons
Icons handled specially. There are various platform spesific icon sizes and specifications across browsers and devices. Metapatcher can cover all of it if you can give your icons in the format below:
```js
const icons = [
  '/path/icon-72x72.png',
  '/path/icon-180x180.png'
  // ...
  // /path/icon-[size].[ext]
]
metapatcher.setIcons(icons)
```
### Platform Specific Methods
```js
metapatcher.setSafariMobileWebApp({
  name: 'Sample App', // already set with .setProjectMeta
  statusBarStyle: 'black-translucent'
})
metapatcher.setSafariPinnedTab('/path/pinned-tab-icon.svg', '#000000')

metapatcher.setFacebookMeta({
  appID: ''
})

metapatcher.setTwitterMeta({
  card: 'summary_large_image',
  site: '@twitter',
  creator: '@muratgozel'
})
```

---

## Distributions Report
This is an auto-generated report that shows the type, name and size of the bundles available to use individually.

[comment]: # (DISTRIBUTIONS_REPORT_START)
```js
[
  "metapatcher.amd.js (8.75 KB)",
  "metapatcher.amd.polyfilled.js (29.53 KB)",
  "metapatcher.cjs.js (8.74 KB)",
  "metapatcher.cjs.polyfilled.js (29.53 KB)",
  "metapatcher.es.js (8.26 KB)",
  "metapatcher.es.polyfilled.js (29.05 KB)",
  "metapatcher.iife.js (8.75 KB)",
  "metapatcher.iife.polyfilled.js (29.53 KB)",
  "metapatcher.umd.js (8.98 KB)",
  "metapatcher.umd.polyfilled.js (29.76 KB)"
]
```
[comment]: # (DISTRIBUTIONS_REPORT_END)

## Babel Polyfills Report
This is an auto-generated report that shows the pollyfils added by core-js to the **pollyfilled** distributions based on the targets configuration described below.

[comment]: # (BABEL_POLYFILLS_REPORT_START)
```js
// polyfills:
[
  "es.symbol",
  "es.symbol.description",
  "es.symbol.iterator",
  "es.array.iterator",
  "es.object.get-prototype-of",
  "es.object.set-prototype-of",
  "es.object.to-string",
  "es.reflect.construct",
  "es.regexp.to-string",
  "es.string.iterator",
  "web.dom-collections.iterator",
  "es.array.index-of",
  "es.array.last-index-of",
  "es.array.map",
  "es.array.reduce",
  "es.array.slice",
  "es.function.name",
  "es.object.keys",
  "es.object.values",
  "es.regexp.exec",
  "es.string.match",
  "es.string.replace"
]
// based on the targets:
{
  "android": "4.4.3",
  "chrome": "49",
  "edge": "18",
  "firefox": "52",
  "ie": "10",
  "ios": "9.3",
  "opera": "67",
  "safari": "11.1",
  "samsung": "4"
}
```
[comment]: # (BABEL_POLYFILLS_REPORT_END)

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
