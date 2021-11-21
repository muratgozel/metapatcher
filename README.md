# metapatcher
Device aware HTML document head management including meta tags, social media tags, icons and JSONLD expressions.

![NPM](https://img.shields.io/npm/l/metapatcher)
[![npm version](https://badge.fury.io/js/metapatcher.svg)](https://badge.fury.io/js/metapatcher)
![npm bundle size](https://img.shields.io/bundlephobia/min/metapatcher)
![npm](https://img.shields.io/npm/dy/metapatcher)

## Install
```sh
npm install metapatcher
```

## Import
Require or import:
```js
const metapatcher = require('metapatcher')
// or
import metapatcher from 'metapatcher'
```
Or inject via `<script>` tag:
```html
<script src="https://cdn.jsdelivr.net/npm/metapatcher@2/dist/metapatcher.iife.js" crossorigin type="text/javascript"></script>
```
Accessible at `window.metapatcher`.

## Usage
### Configure
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
metapatcher.configure(settings)
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

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
