import {typekit, objectkit, validationkit} from 'basekits'
import scripter from 'dom-scripter'

function Metapatcher() {
  this.configure()

  // prevent ms browsers to request browserconfig.xml file on openning
  this.set('meta', 'name', {name: 'msapplication-config', content: 'none'})
}

Metapatcher.prototype.defaultSettings = {
  structuredData: {enabled: true},
  androidChromeIcons: {enabled: true},
  msTags: {enabled: true},
  safariTags: {enabled: true},
  appleTags: {enabled: true},
  openGraphTags: {enabled: true},
  twitterTags: {enabled: true},
  facebookTags: {enabled: true}
}
Metapatcher.prototype.mimeTypesByExtension = {
  'svg': 'image/svg+xml',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'ico': 'image/x-icon',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'bmp': 'image/bmp'
}
Metapatcher.prototype.prioritizeMethods = ['preload', 'prefetch', 'preconnect', 'dns-prefetch']
Metapatcher.prototype.validAndroidChromeIconSizes = [
  '72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'
]
Metapatcher.prototype.validAppleTouchIconSizes = [
  '120x120', '180x180', '152x152', '167x167', '1024x1024'
]
Metapatcher.prototype.validMSTileIconSizes = [
  '70x70', '150x150', '310x150', '310x310'
]
Metapatcher.prototype.mstilesNamingMap = {
  '70x70': 'msapplication-square70x70logo',
  '150x150': 'msapplication-square150x150logo',
  '310x310': 'msapplication-square310x310logo',
  '310x150': 'msapplication-wide310x150logo'
}
Metapatcher.prototype.reImageSizeFromStr = /[0-9]{2,3}x[0-9]{2,3}/g

Metapatcher.prototype.setFavicon = function setFavicon(path) {
  const mime = this.findMimeType(path)
  if (validationkit.isEmpty(mime)) return undefined
  return this.set('link', 'rel', {rel: 'shortcut icon', href: path, type: mime})
}

Metapatcher.prototype.setProjectMeta = function setProjectMeta(obj) {
  if (validationkit.isEmpty(obj)) return undefined

  if (validationkit.isNotEmpty(obj.name)) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {name: 'application-name', content: obj.name})
    }
    if (this.settings.safariTags.enabled) {
      this.setSafariMobileWebApp({name: obj.name})
    }
    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:site_name', content: obj.name})
    }
  }

  if (validationkit.isNotEmpty(obj.url)) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {name: 'msapplication-starturl', content: obj.url})
    }
  }

  if (validationkit.isNotEmpty(obj.logo)) {
    if (this.settings.structuredData.enabled) {
      scripter.injectJSONLD({
        '@type': 'Organization',
        logo: obj.logo,
        url: obj.url
      }, {'data-mptype': 'sdorg'})
    }
  }

  if (validationkit.isNotEmpty(obj.primaryColor)) {
    this.set('meta', 'name', {name: 'theme-color', content: obj.primaryColor})
  }

  if (validationkit.isNotEmpty(obj.backgroundColor)) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {name: 'msapplication-TileColor', content: obj.backgroundColor})
    }
  }

  return this
}

Metapatcher.prototype.robots = function robots(directives) {
  return this.set('meta', 'name', {name: 'robots', content: directives})
}

Metapatcher.prototype.prioritize = function prioritize(url, method) {
  if (this.prioritizeMethods.indexOf(method) === -1) return undefined
  return this.set('meta', undefined, {name: method, content: url})
}

Metapatcher.prototype.removeAllPrioritizations = function removeAllPrioritizations() {
  for (var i = 0; i < this.prioritizeMethods.length; i++) {
    const method = this.prioritizeMethods[i]
    const elems = document.querySelectorAll('meta[name="' + method + '"]')
    if (validationkit.isNotEmpty(elems)) {
      for (let i = 0; i < elems.length; i++) {
        elems[i].parentNode.removeChild(elems[i])
      }
    }
  }

  return this
}

Metapatcher.prototype.setIcons = function setIcons(list) {
  const self = this
  const validTypes = Object.values(self.mimeTypesByExtension)

  list.map(function(url) {
    const type = self.findMimeType(url)
    const sizeMatches = url.match(self.reImageSizeFromStr)

    if (sizeMatches && sizeMatches.length > 0 && type && validTypes.indexOf(type) !== -1) {
      const size = sizeMatches[0]
      // android chrome icons
      if (self.validAndroidChromeIconSizes.indexOf(size) !== -1 &&
      self.settings.androidChromeIcons.enabled) {
        self.set('link', undefined, {rel: 'icon', href: url, sizes: size, type: type})
      }
      // apple touch icons
      if (self.validAppleTouchIconSizes.indexOf(size) !== -1 &&
      self.settings.appleTags.enabled) {
        self.set('link', undefined, {rel: 'apple-touch-icon', href: url, sizes: size})
      }
      // mstile icons
      if (self.validMSTileIconSizes.indexOf(size) !== -1 &&
      self.settings.msTags.enabled) {
        self.set('meta', undefined, {name: self.mstilesNamingMap[size], content: url})
      }
    }
  })

  return self
}

// set canonicals one by one
Metapatcher.prototype.setCanonical = function setCanonical(url) {
  return this.set('link', undefined, {rel: 'canonical', href: url})
}
// and remove all at once
Metapatcher.prototype.removeAllCanonicals = function removeAllCanonicals() {
  const elems = document.querySelectorAll('link[rel="canonical"]')
  if (validationkit.isNotEmpty(elems)) {
    for (let i = 0; i < elems.length; i++) {
      elems[i].parentNode.removeChild(elems[i])
    }
  }
  return this
}

// set local versions one by one
Metapatcher.prototype.setLocalVersion = function setLocalVersion(locale, url, isActiveLocale = false) {
  this.set('link', undefined, {rel: 'alternate', href: url, hreflang: locale})

  if (this.settings.openGraphTags.enabled) {
    const suffix = isActiveLocale ? '' : ':alternate'
    this.set('meta', undefined, {property: 'og:locale' + suffix, content: locale})
  }

  return this
}
// and remove all at once
Metapatcher.prototype.removeAllLocalVersions = function removeAllLocalVersions() {
  const elems = document.querySelectorAll('link[rel="alternate"]')
  if (validationkit.isNotEmpty(elems)) {
    for (let i = 0; i < elems.length; i++) {
      elems2[i].parentNode.removeChild(elems2[i])
    }
  }

  if (this.settings.openGraphTags.enabled) {
    const elems2 = document.querySelectorAll('meta[property="og:locale:alternate"]')
    if (validationkit.isNotEmpty(elems2)) {
      for (let j = 0; j < elems2.length; j++) {
        elems2[j].parentNode.removeChild(elems2[j])
      }
    }

    const elem = document.querySelector('meta[property="og:locale"]')
    if (validationkit.isNotEmpty(elem)) {
      elem.parentNode.removeChild(elem)
    }
  }

  return this
}

Metapatcher.prototype.setPageMeta = function setPageMeta(obj) {
  if (validationkit.isEmpty(obj)) return this

  if (validationkit.isNotEmpty(obj.title)) {
    document.title = obj.title

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:title', content: obj.title})
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {name: 'twitter:title', content: obj.title})
    }
  }

  if (validationkit.isNotEmpty(obj.description)) {
    this.set('meta', 'name', {name: 'description', content: obj.description})

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:description', content: obj.description})
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {name: 'twitter:description', content: obj.description})
    }
  }

  if (validationkit.isNotEmpty(obj.url)) {
    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:url', content: obj.url})
    }
  }

  if (validationkit.isNotEmpty(obj.image)) {
    const imgobj = this.formatImageInput(obj.image)
    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:image', content: imgobj.url})

      if (validationkit.isNotEmpty(imgobj.width)) {
        this.set('meta', 'property', {property: 'og:image:width', content: imgobj.width})
      }

      if (validationkit.isNotEmpty(imgobj.height)) {
        this.set('meta', 'property', {property: 'og:image:height', content: imgobj.height})
      }
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {name: 'twitter:image', content: imgobj.url})
    }
  }

  if (validationkit.isNotEmpty(obj.locale)) {
    document.querySelector('html').setAttribute('lang', obj.locale)

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {property: 'og:locale', content: obj.locale.replace('-', '_')})
    }
  }

  if (validationkit.isNotEmpty(obj.localVersions)) {
    Object
      .keys(obj.localVersions)
      .map(
        l => this.setLocalVersion(
          l, obj.localVersions[l], validationkit.isNotEmpty(obj.locale) && obj.locale == l
        )
      )
  }

  if (validationkit.isNotEmpty(obj.canonicals)) {
    obj.canonicals.map(u => this.setCanonical(u))
  }

  return this
}

Metapatcher.prototype.setSafariMobileWebApp = function setSafariMobileWebApp(obj) {
  if (!this.settings.appleTags.enabled) return this

  this.set('meta', 'name', {name: 'apple-mobile-web-app-capable', content: 'yes'})

  if (validationkit.isNotEmpty(obj.name)) {
    this.set('meta', 'name', {name: 'apple-mobile-web-app-title', content: obj.name})
  }

  if (validationkit.isNotEmpty(obj.statusBarStyle)) {
    this.set('meta', 'name', {name: 'apple-mobile-web-app-status-bar-style', content: obj.statusBarStyle})
  }

  return this
}

Metapatcher.prototype.setSafariPinnedTab = function setSafariPinnedTab(url, color) {
  return this.set('link', 'rel', {rel: 'mask-icon', href: url, color: color || 'black'})
}

Metapatcher.prototype.setFacebookMeta = function setFacebookMeta(obj) {
  if (validationkit.isNotEmpty(obj.appID)) {
    this.set('meta', 'property', {property: 'fb:app_id', content: obj.appID})
  }
  return this
}

Metapatcher.prototype.setTwitterMeta = function setTwitterMeta(obj) {
  if (!this.settings.twitterTags.enabled) return this

  if (validationkit.isNotEmpty(obj.card))
    this.set('meta', 'name', {name: 'twitter:card', content: obj.card})

  if (validationkit.isNotEmpty(obj.site))
    this.set('meta', 'name', {name: 'twitter:site', content: obj.site})

  if (validationkit.isNotEmpty(obj.creator))
    this.set('meta', 'name', {name: 'twitter:creator', content: obj.creator})
}

Metapatcher.prototype.breadcrumb = function breadcrumb(data) {
  if (!this.settings.structuredData.enabled) return this

  const o = {
    '@type': 'BreadcrumbList',
    'itemListElement': data.map(function(obj, index) {
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': obj.title,
        'item': obj.url
      }
    })
  }

  scripter.injectJSONLD(o, {'data-mptype': 'sdb'})

  return this
}

Metapatcher.prototype.formatImageInput = function formatImageInput(input) {
  if (typekit.isString(input)) return {url: input}
  else if (typekit.isObject(input)) return {
    url: input.url,
    width: input.width,
    height: input.height
  }
  else return {}
}

Metapatcher.prototype.findMimeType = function findMimeType(path) {
  const lastind = path.lastIndexOf('.')
  if (lastind < 1) return undefined

  const ext = path.slice(lastind + 1)
  if (validationkit.isEmpty(ext)) return undefined

  return objectkit.getProp(this.mimeTypesByExtension, ext, undefined)
}

Metapatcher.prototype.set = function set(tag, id, attrs = {}) {
  if (validationkit.isNotEmpty(id)) {
    const alreadyExist = this.hasElement(tag + '[' + id + '="' + attrs[id] + '"]')
    if (alreadyExist) alreadyExist.parentNode.removeChild(alreadyExist)
  }

  const elem = this.createElement(tag, attrs)

  this.patch(elem)

  return elem
}

Metapatcher.prototype.hasElement = function hasElement(query) {
  return document.querySelector(query)
}

Metapatcher.prototype.createElement = function createElement(tag, attrs) {
  const elem = document.createElement(tag)
  if (typekit.isObject(attrs)) {
    Object.keys(attrs).map(attr => elem.setAttribute(attr, attrs[attr]))
  }
  return elem
}

Metapatcher.prototype.patch = function patch(elem) {
  document.getElementsByTagName('head')[0].insertBefore(elem, null)
}

Metapatcher.prototype.configure = function configure(userSettings = {}) {
  const defaultSettings = this.defaultSettings
  this.settings = Object
    .keys(this.defaultSettings)
    .reduce(function(memo, name) {
      memo[name] = objectkit.getProp(userSettings, name, objectkit.getProp(defaultSettings, name, {}))
      return memo
    }, {})
}

export default new Metapatcher()
