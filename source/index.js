const EventEmitter = require('event-emitter-object/source')
const scripter = require('dom-scripter/source')
const kit = require('@basekits/core')
const kitType = require('@basekits/kit-type')
const kitObject = require('@basekits/kit-object')

function Metapatcher(initialEvents = {}) {
  EventEmitter.call(this, initialEvents)

  this.structuredDataEnabled = true
  this.msTagsEnabled = true
  this.safariTagsEnabled = true
  this.appleTagsEnabled = true
  this.openGraphTagsEnabled = true
  this.twitterTagsEnabled = true
  this.facebookTagsEnabled = true

  this.sizeRe = /[0-9]{2,3}x[0-9]{2,3}/g

  this.extTypeMap = {
    'svg': 'image/svg+xml',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'ico': 'image/x-icon',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'bmp': 'image/bmp'
  }

  // prevent ms browsers to request browserconfig.xml file
  this.setHTMLMetaTag('msapplication-config', 'none')

  this.kit = kit
  this.kit.addKit(kitType)
  this.kit.addKit(kitObject)
}
 
Metapatcher.prototype = Object.create(EventEmitter.prototype)
Metapatcher.prototype.constructor = Metapatcher

Metapatcher.prototype.context = {
  favicon: null,
  projectName: null,
  projectURL: null,
  projectLogo: null,
  primaryColor: null,
  bgColor: null,
  page: {
    title: null,
    url: null,
    image: null,
    breadcrumb: []
  },
  robots: {},
  canonicals: {},
  localizedVersions: {},
  opengraph: {
    sitename: null,
    title: null,
    url: null,
    description: null,
    image: null,
    locale: null,
    localeAlternates: []
  },
  structuredData: {
    name: null,
    url: null,
    logo: null,
    sameAs: [],
    contactPoints: [],
    breadcrumb: []
  },
  androidChrome: {
    appIcons: []
  },
  safari: {
    mobileWebApp: {
      title: null,
      statusBarStyle: null
    },
    pinnedTab: {
      url: null,
      color: null
    }
  },
  apple: {
    appIcons: []
  },
  microsoft: {
    name: null,
    config: null,
    url: null,
    appIcons: []
  },
  facebook: {},
  twitter: {},
  instagram: {},
  linkedin: {}
}

Metapatcher.prototype.setFavicon = function setFavicon(p) {
  if (!this.kit.isEmpty(p) && this.kit.isString(p)) {
    this.context.favicon = p

    const ext = p.slice( p.lastIndexOf('.') + 1 )

    this.setHTMLLinkTag('favicon-single', 'shortcut icon', p, {
      type: this.findIconTypeFromExtension(ext)
    })
  }
}

Metapatcher.prototype.setProjectName = function setProjectName(name) {
  this.context.projectName = name
  this.context.opengraph.sitename = name
  this.context.microsoft.name = name
  this.context.safari.mobileWebApp.title = name

  if (this.msTagsEnabled) {
    this.setHTMLMetaTag('application-name', name)
  }

  if (this.safariTagsEnabled) {
    this.setHTMLMetaTag('apple-mobile-web-app-capable', 'yes')
    this.setHTMLMetaTag('apple-mobile-web-app-title', name)
  }

  if (this.openGraphTagsEnabled) {
    this.setOGTag('og:site_name', name)
  }
}

Metapatcher.prototype.setProjectURL = function setProjectURL(url) {
  this.context.projectURL = url
  this.context.microsoft.url = url

  if (this.msTagsEnabled) {
    this.setHTMLMetaTag('msapplication-starturl', url)
  }
}

Metapatcher.prototype.setProjectLogo = function setProjectLogo(url) {
  this.context.projectLogo = url

  if (this.structuredDataEnabled) {
    const obj = {
      '@type': 'Organization',
      logo: url,
      url: this.context.projectURL
    }

    this.insertJSONLDObject(obj, 'metapatcher-sd-logo')
  }
}

Metapatcher.prototype.setPrimaryColor = function setPrimaryColor(color) {
  this.context.primaryColor = color

  this.setHTMLMetaTag('theme-color', color)
}

Metapatcher.prototype.setBGColor = function setBGColor(color) {
  this.context.bgColor = color

  if (this.msTagsEnabled) {
    this.setHTMLMetaTag('msapplication-TileColor', color)
  }
}

Metapatcher.prototype.preLoad = function preLoad(id, url, attrs = {}) {
  this.setHTMLLinkTag(id, 'preload', url, attrs)
}

Metapatcher.prototype.preFetch = function preFetch(id, url, attrs = {}) {
  this.setHTMLLinkTag(id, 'prefetch', url, attrs)
}

Metapatcher.prototype.preConnect = function preConnect(id, url, attrs = {}) {
  this.setHTMLLinkTag(id, 'preconnect', url, attrs)
}

Metapatcher.prototype.dnsPreFetch = function dnsPreFetch(id, url, attrs = {}) {
  this.setHTMLLinkTag(id, 'dns-prefetch', url, attrs)
}

Metapatcher.prototype.setWebAppManifest = function setWebAppManifest(p) {
  this.setHTMLLinkTag('web-app-manifest', 'manifest', p)
}

Metapatcher.prototype.setViewport = function setViewport(content) {
  this.setHTMLMetaTag('viewport', content)
}

Metapatcher.prototype.disableChromeAutoTranslateRecommendation = function disableChromeAutoTranslateRecommendation() {
  this.setHTMLMetaTag('google', 'notranslate')
}

Metapatcher.prototype.setRobotTag = function setRobotTag(name, content) {
  this.context.robots[name] = content
  this.setHTMLMetaTag(name, content)
}

Metapatcher.prototype.noindex = function noindex() {
  this.setRobotTag('robots', 'noindex')
}

Metapatcher.prototype.setAndroidChromeIcons = function setAndroidChromeIcons(list) {
  const self = this
  const validSizes = [
    '72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384',
    '512x512'
  ]
  const validTypes = Object.values(self.extTypeMap)
  const formatted = list
    .map(function(objOrStr) {
      const obj = {src: null, sizes: null, type: null}
      if (self.kit.isObject(objOrStr)) {
        obj.src = self.kit.getProp(objOrStr, 'src', null)
        obj.sizes = self.kit.getProp(objOrStr, 'sizes', null)
        obj.type = self.kit.getProp(objOrStr, 'type', null)
      }
      else if (self.kit.isString(objOrStr)) {
        obj.src = objOrStr
      }

      if (self.kit.isEmpty(obj.sizes)) {
        const sizeMatches = obj.src.match(self.sizeRe)
        if (sizeMatches && sizeMatches.length > 0) {
          obj.sizes = sizeMatches[0]
        }
      }

      if (self.kit.isEmpty(obj.type)) {
        const ext = obj.src.slice( obj.src.lastIndexOf('.') + 1 )
        obj.type = self.findIconTypeFromExtension(ext)
      }

      return obj
    })
    .filter(function(obj) {
      if (
        self.kit.isEmpty(obj.src) ||
        self.kit.isEmpty(obj.type) ||
        self.kit.isEmpty(obj.sizes)
      ) return false

      const sizeMatches = obj.src.match(self.sizeRe)
      if (self.kit.isEmpty(sizeMatches)) return false
      if (validSizes.indexOf(obj.sizes) === -1) return false

      if (validTypes.indexOf(obj.type) === -1) return false

      return true
    })

  if (formatted.length === 0) return;

  self.context.androidChrome.appIcons = formatted

  formatted
    .map(function(obj) {
      const id = 'android-chrome-icon-' + obj.sizes
      self.setHTMLLinkTag(id, 'icon', obj.src, {sizes: obj.sizes, type: obj.type})
    })
}

Metapatcher.prototype.setSafariMobileWebApp = function setSafariMobileWebApp(name, statusBarStyle) {
  if (this.safariTagsEnabled) {
    this.context.safari.mobileWebApp.title = name
    this.context.safari.mobileWebApp.statusBarStyle = statusBarStyle

    this.setHTMLMetaTag('apple-mobile-web-app-capable', 'yes')
    this.setHTMLMetaTag('apple-mobile-web-app-title', name)
    this.setHTMLMetaTag('apple-mobile-web-app-status-bar-style', statusBarStyle)
  }
}

Metapatcher.prototype.setAppleTouchIcons = function setAppleTouchIcons(list) {
  const self = this
  const validSizes = [
    '120x120', '180x180', '152x152', '167x167', '1024x1024'
  ]
  const validTypes = Object.values(self.extTypeMap)
  const formatted = list
    .map(function(objOrStr) {
      const obj = {src: null, sizes: null, type: null}
      if (self.kit.isObject(objOrStr)) {
        obj.src = self.kit.getProp(objOrStr, 'src', null)
        obj.sizes = self.kit.getProp(objOrStr, 'sizes', null)
        obj.type = self.kit.getProp(objOrStr, 'type', null)
      }
      else if (self.kit.isString(objOrStr)) {
        obj.src = objOrStr
      }

      if (self.kit.isEmpty(obj.sizes)) {
        const sizeMatches = obj.src.match(self.sizeRe)
        if (sizeMatches && sizeMatches.length > 0) {
          obj.sizes = sizeMatches[0]
        }
      }

      if (self.kit.isEmpty(obj.type)) {
        const ext = obj.src.slice( obj.src.lastIndexOf('.') + 1 )
        obj.type = self.findIconTypeFromExtension(ext)
      }

      return obj
    })
    .filter(function(obj) {
      if (
        self.kit.isEmpty(obj.src) ||
        self.kit.isEmpty(obj.type) ||
        self.kit.isEmpty(obj.sizes)
      ) return false

      const sizeMatches = obj.src.match(self.sizeRe)
      if (self.kit.isEmpty(sizeMatches)) return false
      if (validSizes.indexOf(obj.sizes) === -1) return false

      if (validTypes.indexOf(obj.type) === -1) return false

      return true
    })

  if (formatted.length === 0) return;

  this.context.apple.appIcons = formatted

  if (!self.appleTagsEnabled) return;

  formatted
    .map(function(obj) {
      const id = 'apple-touch-icon-' + obj.sizes
      self.setHTMLLinkTag(id, 'apple-touch-icon', obj.src, {sizes: obj.sizes})
    })
}

Metapatcher.prototype.setSafariPinnedTab = function insertSafariPinnedTab(url, color = null) {
  const c = color || this.context.primaryColor

  this.context.safari.pinnedTab.url = url
  this.context.safari.pinnedTab.color = c

  if (this.safariTagsEnabled) {
    const id = 'safari-pinned-tab'
    this.setHTMLLinkTag(id, 'mast-icon', url, {color: c})
  }
}

Metapatcher.prototype.setMSAppConfig = function setMSAppConfig(p) {
  if (!this.kit.isEmpty(p) && this.kit.isString(p)) {
    this.context.microsoft.config = p

    if (this.msTagsEnabled) {
      this.setHTMLMetaTag('msapplication-config', p)
    }
  }
}

Metapatcher.prototype.setMSTileIcons = function setMSTileIcons(list) {
  const self = this
  const namingMap = {
    '70x70': 'msapplication-square70x70logo',
    '150x150': 'msapplication-square150x150logo',
    '310x310': 'msapplication-square310x310logo',
    '310x150': 'msapplication-wide310x150logo'
  }
  const validSizes = ['70x70', '150x150', '310x150', '310x310']
  const validTypes = Object.values(self.extTypeMap)
  const formatted = list
    .map(function(objOrStr) {
      const obj = {src: null, sizes: null, type: null, name: null}
      if (self.kit.isObject(objOrStr)) {
        obj.src = self.kit.getProp(objOrStr, 'src', null)
        obj.sizes = self.kit.getProp(objOrStr, 'sizes', null)
        obj.type = self.kit.getProp(objOrStr, 'type', null)
      }
      else if (self.kit.isString(objOrStr)) {
        obj.src = objOrStr
      }

      if (self.kit.isEmpty(obj.sizes)) {
        const sizeMatches = obj.src.match(self.sizeRe)
        if (sizeMatches && sizeMatches.length > 0) {
          obj.sizes = sizeMatches[0]
        }
      }

      if (self.kit.isEmpty(obj.type)) {
        const ext = obj.src.slice( obj.src.lastIndexOf('.') + 1 )
        obj.type = self.findIconTypeFromExtension(ext)
      }

      return obj
    })
    .filter(function(obj) {
      if (
        self.kit.isEmpty(obj.src) ||
        self.kit.isEmpty(obj.type) ||
        self.kit.isEmpty(obj.sizes)
      ) return false

      const sizeMatches = obj.src.match(self.sizeRe)
      if (self.kit.isEmpty(sizeMatches)) return false
      if (validSizes.indexOf(obj.sizes) === -1) return false

      if (validTypes.indexOf(obj.type) === -1) return false

      return true
    })
    .map(function(obj) {
      obj.name = namingMap[obj.sizes]
      return obj
    })

  if (formatted.length === 0) return;

  self.context.microsoft.appIcons = formatted

  if (!self.msTagsEnabled) return;

  formatted
    .map(function(obj) {
      self.setHTMLMetaTag(obj.name, obj.src)
    })
}

Metapatcher.prototype.insertCanonical = function insertCanonical(id, url) {
  this.context.canonicals[id] = url
  this.setHTMLLinkTag(id, url)
}

Metapatcher.prototype.removeCanonical = function removeCanonical(id) {
  if (this.context.canonicals.hasOwnProperty(id)) {
    delete this.context.canonicals[id]
  }

  this.removeHTMLLinkTag(id)
}

Metapatcher.prototype.removeAllCanonicals = function removeAllCanonicals() {
  const self = this

  Object.keys(self.context.canonicals).map(id => self.removeHTMLLinkTag(id))

  self.context.canonicals = {}
}

Metapatcher.prototype.insertLocalizedVersion = function insertLocalizedVersion(lang, url, activeLang) {
  const id = 'alternate-locale-' + lang.toLowerCase()
  this.context.localizedVersions[id] = url

  this.setHTMLLinkTag(id, 'alternate', url, {hreflang: lang})

  if (this.openGraphTagsEnabled) {
    if (lang == activeLang) {
      this.context.opengraph.locale = lang
      this.setOGTag('og:locale', lang.replace('-', '_'))
    }
    else {
      this.context.opengraph.localeAlternates.push(lang)
      this.setOGTag('og:locale:alternate', lang.replace('-', '_'))
    }
  }
}

Metapatcher.prototype.removeLocalizedVersion = function removeLocalizedVersion(lang) {
  const id = 'alternate-locale-' + lang.toLowerCase()
  if (this.context.localizedVersions.hasOwnProperty(id)) {
    delete this.context.localizedVersions[id]
  }

  this.removeHTMLLinkTag(id)

  if (this.openGraphTagsEnabled) {
    if (this.context.opengraph.locale == lang) {
      this.context.opengraph.locale = null
      this.removeOGTag('og:locale', lang.replace('-', '_'))
    }
    const alternates = this.context.opengraph.localeAlternates
    if (alternates.indexOf(lang) !== -1) {
      this.context.opengraph.localeAlternates = alternates.filter(l => l != lang)
      this.removeOGTag('og:locale:alternate', lang.replace('-', '_'))
    }
  }
}

Metapatcher.prototype.removeAllLocalizedVersions = function removeAllLocalizedVersions() {
  const self = this

  Object.keys(self.context.localizedVersions).map(id => self.removeHTMLLinkTag(id))

  self.context.localizedVersions = {}
}

Metapatcher.prototype.setTitle = function setTitle(text) {
  this.context.page.title = text

  document.title = text
}

Metapatcher.prototype.setFacebookProfile = function setFacebookProfile(config) {
  this.context.facebook = config

  if (this.facebookTagsEnabled) {
    const appID = this.kit.getProp(config, ['app', 'id'])
    if (!this.kit.isEmpty(appID)) {
      this.setOGTag('fb:app_id', appID)
    }
  }
}

Metapatcher.prototype.setTwitterProfile = function setTwitterProfile(config) {
  this.context.twitter = config

  if (this.twitterTagsEnabled) {
    const cardType = this.kit.getProp(config, ['card'])
    if (cardType) {
      this.setHTMLMetaTag('twitter:card', cardType)
    }

    const site = this.kit.getProp(config, ['site'])
    if (site) {
      this.setHTMLMetaTag('twitter:site', site)
    }

    const creator = this.kit.getProp(config, ['creator'])
    if (creator) {
      this.setHTMLMetaTag('twitter:creator', creator)
    }
  }
}

Metapatcher.prototype.setPageMetadata = function setPageMetadata(obj) {
  if (obj.title) {
    this.setTitle(obj.title)

    if (this.openGraphTagsEnabled) {
      this.setOGTag('og:title', obj.title)
    }

    if (this.twitterTagsEnabled) {
      this.setHTMLMetaTag('twitter:title', obj.title)
    }
  }

  if (obj.url) {
    this.context.page.url = obj.url
    this.context.opengraph.url = obj.url

    if (this.openGraphTagsEnabled) {
      this.setOGTag('og:url', obj.url)
    }
  }

  if (obj.description) {
    this.context.page.description = obj.description
    this.context.opengraph.description = obj.description

    this.setHTMLMetaTag('description', obj.description)

    if (this.openGraphTagsEnabled) {
      this.setOGTag('og:description', obj.description)
    }

    if (this.twitterTagsEnabled) {
      this.setHTMLMetaTag('twitter:description', obj.description)
    }
  }

  if (obj.image) {
    const img = {url: null, width: null, height: null}
    if (typeof obj.image == 'string') {
      img.url = obj.image
    }
    if (Object.prototype.toString.call(obj.image) === '[object Object]') {
      img.url = obj.image.url
      if (obj.image.width) img.width = obj.image.width
      if (obj.image.height) img.height = obj.image.height
    }

    this.context.page.image = img
    this.context.opengraph.image = img

    if (this.openGraphTagsEnabled) {
      this.setOGTag('og:image', img.url)
      if (img.width) this.setOGTag('og:image:width', img.width)
      if (img.height) this.setOGTag('og:image:height', img.height)
    }

    if (this.twitterTagsEnabled) {
      this.setHTMLMetaTag('twitter:image', img.url)
    }
  }

  if (obj.locale) {
    this.context.page.locale = obj.locale
    this.context.opengraph.locale = obj.locale

    document.querySelector('html').setAttribute('lang', obj.locale)

    if (this.openGraphTagsEnabled) {
      const fb = obj.locale.replace('-', '_')
      this.context.opengraph.locale = fb
      this.setOGTag('og:locale', fb)
    }
  }
}

Metapatcher.prototype.breadcrumb = function breadcrumb(data) {
  this.context.page.breadcrumb = data

  if (this.structuredDataEnabled) {
    this.context.structuredData.breadcrumb = {
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

    this.insertJSONLDObject(this.context.structuredData.breadcrumb, 'metapatcher-breadcrumb')
  }
}

Metapatcher.prototype.setOGTag = function setOGTag(name, value) {
  let node = document.querySelector('meta[property="' + name + '"]')
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('property', name)
    node.setAttribute('content', value)
    document.getElementsByTagName('head')[0].appendChild(node)
  }
  else {
    if (node.getAttribute('content') != value) {
      node.setAttribute('content', value)
    }
  }
}

Metapatcher.prototype.removeOGTag = function removeOGTag(name, value) {
  const node = document.querySelector('meta[property="' + name + '"][content="' + value + '"]')
  if (node) node.parentNode.removeChild(node)
}

Metapatcher.prototype.setHTMLLinkTag = function setHTMLLinkTag(id, rel, href, moreAttrs = {}) {
  const attrs = Object.assign({}, {id: id, rel: rel, href: href}, moreAttrs || {})

  let node = document.querySelector('link[id="' + id + '"]')
  if (!node) {
    node = document.createElement('link')
    document.getElementsByTagName('head')[0].appendChild(node)
  }

  Object.keys(attrs).map(key => node.setAttribute(key, attrs[key]))
}

Metapatcher.prototype.removeHTMLLinkTag = function removeHTMLLinkTag(id) {
  const node = document.querySelector('link[id="' + id + '"]')
  if (node) node.parentNode.removeChild(node)
}

Metapatcher.prototype.setHTMLMetaTag = function setHTMLMetaTag(name, value) {
  let node = document.querySelector('meta[name="' + name + '"]')
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('name', name)
    node.setAttribute('content', value)
    document.getElementsByTagName('head')[0].appendChild(node)
  }
  else {
    if (node.getAttribute('content') != value) {
      node.setAttribute('content', value)
    }
  }
}

Metapatcher.prototype.insertJSONLDObject = function insertJSONLDObject(obj, id = null) {
  scripter.injectJSONLD(obj, {id: id})
}

Metapatcher.prototype.findIconTypeFromExtension = function findIconTypeFromExtension(ext) {
  return this.extTypeMap.hasOwnProperty(ext) ? this.extTypeMap[ext] : undefined;
}

Metapatcher.prototype.disableStructuredData = function disableStructuredData() {
  this.structuredDataEnabled = false
}

Metapatcher.prototype.disableMSTags = function disableMSTags() {
  this.msTagsEnabled = false

  const node = document.querySelector('meta[name="msapplication-config"]')
  if (node) node.parentNode.removeChild(node)
}

Metapatcher.prototype.disableSafariTags = function disableSafariTags() {
  this.safariTagsEnabled = false
}

Metapatcher.prototype.disableAppleTags = function disableAppleTags() {
  this.appleTagsEnabled = false
}

Metapatcher.prototype.disableOpenGraphTags = function disableOpenGraphTags() {
  this.openGraphTagsEnabled = false
}

Metapatcher.prototype.disableTwitterTags = function disableTwitterTags() {
  this.twitterTagsEnabled = false
}

Metapatcher.prototype.disableFacebookTags = function disableFacebookTags() {
  this.facebookTagsEnabled = false
}

module.exports = Metapatcher
