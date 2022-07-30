'use strict';

var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/index-of');
var _Object$values = require('@babel/runtime-corejs3/core-js/object/values');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/map');
var _Object$keys = require('@babel/runtime-corejs3/core-js/object/keys');
var _Object$assign = require('@babel/runtime-corejs3/core-js/object/assign');
var _lastIndexOfInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/last-index-of');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/slice');
var _reduceInstanceProperty = require('@babel/runtime-corejs3/core-js/instance/reduce');
var domScripter = require('dom-scripter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _indexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_indexOfInstanceProperty);
var _Object$values__default = /*#__PURE__*/_interopDefaultLegacy(_Object$values);
var _mapInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_mapInstanceProperty);
var _Object$keys__default = /*#__PURE__*/_interopDefaultLegacy(_Object$keys);
var _Object$assign__default = /*#__PURE__*/_interopDefaultLegacy(_Object$assign);
var _lastIndexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_lastIndexOfInstanceProperty);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _reduceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_reduceInstanceProperty);

var scripter = new domScripter.DomScripter();

function Metapatcher() {
  this.configure(); // prevent ms browsers to request browserconfig.xml file on openning

  this.set('meta', 'name', {
    name: 'msapplication-config',
    content: 'none'
  });
}

Metapatcher.prototype.defaultSettings = {
  structuredData: {
    enabled: true
  },
  androidChromeIcons: {
    enabled: true
  },
  msTags: {
    enabled: true
  },
  safariTags: {
    enabled: true
  },
  appleTags: {
    enabled: true
  },
  openGraphTags: {
    enabled: true
  },
  twitterTags: {
    enabled: true
  },
  facebookTags: {
    enabled: true
  }
};
Metapatcher.prototype.mimeTypesByExtension = {
  'svg': 'image/svg+xml',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'ico': 'image/x-icon',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'bmp': 'image/bmp'
};
Metapatcher.prototype.prioritizeMethods = ['preload', 'prefetch', 'preconnect', 'dns-prefetch'];
Metapatcher.prototype.validAndroidChromeIconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'];
Metapatcher.prototype.validAppleTouchIconSizes = ['120x120', '180x180', '152x152', '167x167', '1024x1024'];
Metapatcher.prototype.validMSTileIconSizes = ['70x70', '150x150', '310x150', '310x310'];
Metapatcher.prototype.mstilesNamingMap = {
  '70x70': 'msapplication-square70x70logo',
  '150x150': 'msapplication-square150x150logo',
  '310x310': 'msapplication-square310x310logo',
  '310x150': 'msapplication-wide310x150logo'
};
Metapatcher.prototype.reImageSizeFromStr = /[0-9]{2,3}x[0-9]{2,3}/g;

Metapatcher.prototype.setFavicon = function setFavicon(path) {
  var mime = this.findMimeType(path);
  if (!mime) return undefined;
  return this.set('link', 'rel', {
    rel: 'shortcut icon',
    href: path,
    type: mime
  });
};

Metapatcher.prototype.setProjectMeta = function setProjectMeta(obj) {
  if (!this.isObject(obj)) return undefined;

  if (obj.name) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {
        name: 'application-name',
        content: obj.name
      });
    }

    if (this.settings.safariTags.enabled) {
      this.setSafariMobileWebApp({
        name: obj.name
      });
    }

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:site_name',
        content: obj.name
      });
    }
  }

  if (obj.url) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {
        name: 'msapplication-starturl',
        content: obj.url
      });
    }
  }

  if (obj.logo) {
    if (this.settings.structuredData.enabled) {
      scripter.injectjsonld({
        '@type': 'Organization',
        logo: obj.logo,
        url: obj.url
      }, {
        'data-mptype': 'sdorg',
        location: 'headEnd',
        id: 'metapatcher-project-meta-organization'
      });
    }
  }

  if (obj.primaryColor) {
    this.set('meta', 'name', {
      name: 'theme-color',
      content: obj.primaryColor
    });
  }

  if (obj.backgroundColor) {
    if (this.settings.msTags.enabled) {
      this.set('meta', 'name', {
        name: 'msapplication-TileColor',
        content: obj.backgroundColor
      });
    }
  }

  return this;
};

Metapatcher.prototype.robots = function robots(directives) {
  return this.set('meta', 'name', {
    name: 'robots',
    content: directives
  });
};

Metapatcher.prototype.prioritize = function prioritize(url, method) {
  var _context;

  if (_indexOfInstanceProperty__default["default"](_context = this.prioritizeMethods).call(_context, method) === -1) return undefined;
  return this.set('meta', undefined, {
    name: method,
    content: url
  });
};

Metapatcher.prototype.removeAllPrioritizations = function removeAllPrioritizations() {
  for (var i = 0; i < this.prioritizeMethods.length; i++) {
    var method = this.prioritizeMethods[i];
    var elems = document.querySelectorAll('meta[name="' + method + '"]');

    if (elems && elems.length > 0) {
      for (var _i = 0; _i < elems.length; _i++) {
        elems[_i].parentNode.removeChild(elems[_i]);
      }
    }
  }

  return this;
};

Metapatcher.prototype.setIcons = function setIcons(list) {
  var self = this;

  var validTypes = _Object$values__default["default"](self.mimeTypesByExtension);

  _mapInstanceProperty__default["default"](list).call(list, function (url) {
    var type = self.findMimeType(url);
    var sizeMatches = url.match(self.reImageSizeFromStr);

    if (sizeMatches && sizeMatches.length > 0 && type && _indexOfInstanceProperty__default["default"](validTypes).call(validTypes, type) !== -1) {
      var _context2, _context3, _context4;

      var size = sizeMatches[0]; // android chrome icons

      if (_indexOfInstanceProperty__default["default"](_context2 = self.validAndroidChromeIconSizes).call(_context2, size) !== -1 && self.settings.androidChromeIcons.enabled) {
        self.set('link', undefined, {
          rel: 'icon',
          href: url,
          sizes: size,
          type: type
        });
      } // apple touch icons


      if (_indexOfInstanceProperty__default["default"](_context3 = self.validAppleTouchIconSizes).call(_context3, size) !== -1 && self.settings.appleTags.enabled) {
        self.set('link', undefined, {
          rel: 'apple-touch-icon',
          href: url,
          sizes: size
        });
      } // mstile icons


      if (_indexOfInstanceProperty__default["default"](_context4 = self.validMSTileIconSizes).call(_context4, size) !== -1 && self.settings.msTags.enabled) {
        self.set('meta', undefined, {
          name: self.mstilesNamingMap[size],
          content: url
        });
      }
    }
  });

  return self;
}; // set canonicals one by one


Metapatcher.prototype.setCanonical = function setCanonical(url) {
  return this.set('link', undefined, {
    rel: 'canonical',
    href: url
  });
}; // and remove all at once


Metapatcher.prototype.removeAllCanonicals = function removeAllCanonicals() {
  var elems = document.querySelectorAll('link[rel="canonical"]');

  if (elems && elems.length > 0) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].parentNode.removeChild(elems[i]);
    }
  }

  return this;
}; // set local versions one by one


Metapatcher.prototype.setLocalVersion = function setLocalVersion(locale, url) {
  var isActiveLocale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  this.set('link', undefined, {
    rel: 'alternate',
    href: url,
    hreflang: locale
  });

  if (this.settings.openGraphTags.enabled) {
    var suffix = isActiveLocale ? '' : ':alternate';
    this.set('meta', undefined, {
      property: 'og:locale' + suffix,
      content: locale
    });
  }

  return this;
}; // and remove all at once


Metapatcher.prototype.removeAllLocalVersions = function removeAllLocalVersions() {
  var elems = document.querySelectorAll('link[rel="alternate"]');

  if (elems && elems.length > 0) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].parentNode.removeChild(elems2[i]);
    }
  }

  if (this.settings.openGraphTags.enabled) {
    var _elems = document.querySelectorAll('meta[property="og:locale:alternate"]');

    if (_elems && _elems.length > 0) {
      for (var j = 0; j < _elems.length; j++) {
        _elems[j].parentNode.removeChild(_elems[j]);
      }
    }

    var elem = document.querySelector('meta[property="og:locale"]');

    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }

  return this;
};

Metapatcher.prototype.setPageMeta = function setPageMeta(obj) {
  var _this = this;

  if (!this.isObject(obj)) return this;

  if (obj.title) {
    document.title = obj.title;

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:title',
        content: obj.title
      });
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {
        name: 'twitter:title',
        content: obj.title
      });
    }
  }

  if (obj.description) {
    this.set('meta', 'name', {
      name: 'description',
      content: obj.description
    });

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:description',
        content: obj.description
      });
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {
        name: 'twitter:description',
        content: obj.description
      });
    }
  }

  if (obj.url) {
    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:url',
        content: obj.url
      });
    }
  }

  if (obj.image) {
    var imgobj = this.formatImageInput(obj.image);

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:image',
        content: imgobj.url
      });

      if (imgobj.width) {
        this.set('meta', 'property', {
          property: 'og:image:width',
          content: imgobj.width
        });
      }

      if (imgobj.height) {
        this.set('meta', 'property', {
          property: 'og:image:height',
          content: imgobj.height
        });
      }
    }

    if (this.settings.twitterTags.enabled) {
      this.set('meta', 'name', {
        name: 'twitter:image',
        content: imgobj.url
      });
    }
  }

  if (obj.locale) {
    document.querySelector('html').setAttribute('lang', obj.locale);

    if (this.settings.openGraphTags.enabled) {
      this.set('meta', 'property', {
        property: 'og:locale',
        content: obj.locale.replace('-', '_')
      });
    }
  }

  if (obj.localVersions) {
    var _context5;

    _mapInstanceProperty__default["default"](_context5 = _Object$keys__default["default"](obj.localVersions)).call(_context5, function (l) {
      return _this.setLocalVersion(l, obj.localVersions[l], obj.locale && obj.locale == l);
    });
  }

  if (obj.canonicals) {
    var _context6;

    _mapInstanceProperty__default["default"](_context6 = obj.canonicals).call(_context6, function (u) {
      return _this.setCanonical(u);
    });
  }

  return this;
};

Metapatcher.prototype.setSafariMobileWebApp = function setSafariMobileWebApp(obj) {
  if (!this.settings.appleTags.enabled) return this;
  this.set('meta', 'name', {
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  });

  if (obj.name) {
    this.set('meta', 'name', {
      name: 'apple-mobile-web-app-title',
      content: obj.name
    });
  }

  if (obj.statusBarStyle) {
    this.set('meta', 'name', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: obj.statusBarStyle
    });
  }

  return this;
};

Metapatcher.prototype.setSafariPinnedTab = function setSafariPinnedTab(url, color) {
  return this.set('link', 'rel', {
    rel: 'mask-icon',
    href: url,
    color: color || 'black'
  });
};

Metapatcher.prototype.setFacebookMeta = function setFacebookMeta(obj) {
  if (obj.appID) {
    this.set('meta', 'property', {
      property: 'fb:app_id',
      content: obj.appID
    });
  }

  return this;
};

Metapatcher.prototype.setTwitterMeta = function setTwitterMeta(obj) {
  if (!this.settings.twitterTags.enabled) return this;
  if (obj.card) this.set('meta', 'name', {
    name: 'twitter:card',
    content: obj.card
  });
  if (obj.site) this.set('meta', 'name', {
    name: 'twitter:site',
    content: obj.site
  });
  if (obj.creator) this.set('meta', 'name', {
    name: 'twitter:creator',
    content: obj.creator
  });
};

Metapatcher.prototype.breadcrumb = function breadcrumb(data) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!this.settings.structuredData.enabled) return this;
  var o = {
    '@type': 'BreadcrumbList',
    'itemListElement': _mapInstanceProperty__default["default"](data).call(data, function (obj, index) {
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': obj.title,
        'item': obj.url
      };
    })
  };
  scripter.injectjsonld(o, _Object$assign__default["default"]({}, {
    'data-mptype': 'sdb',
    location: 'headEnd'
  }, attrs));
  return this;
};

Metapatcher.prototype.formatImageInput = function formatImageInput(input) {
  if (typeof input == 'string') return {
    url: input
  };else if (this.isObject(input)) return {
    url: input.url,
    width: input.width,
    height: input.height
  };else return {};
};

Metapatcher.prototype.findMimeType = function findMimeType(path) {
  var lastind = _lastIndexOfInstanceProperty__default["default"](path).call(path, '.');

  if (lastind < 1) return undefined;

  var ext = _sliceInstanceProperty__default["default"](path).call(path, lastind + 1);

  if (!ext) return undefined;
  return this.mimeTypesByExtension[ext] || undefined;
};

Metapatcher.prototype.set = function set(tag, id) {
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (id) {
    var alreadyExist = this.hasElement(tag + '[' + id + '="' + attrs[id] + '"]');
    if (alreadyExist) alreadyExist.parentNode.removeChild(alreadyExist);
  }

  var elem = this.createElement(tag, attrs);
  this.patch(elem);
  return elem;
};

Metapatcher.prototype.hasElement = function hasElement(query) {
  return document.querySelector(query);
};

Metapatcher.prototype.createElement = function createElement(tag, attrs) {
  var elem = document.createElement(tag);

  if (this.isObject(attrs)) {
    var _context7;

    _mapInstanceProperty__default["default"](_context7 = _Object$keys__default["default"](attrs)).call(_context7, function (attr) {
      return elem.setAttribute(attr, attrs[attr]);
    });
  }

  return elem;
};

Metapatcher.prototype.patch = function patch(elem) {
  document.getElementsByTagName('head')[0].insertBefore(elem, null);
};

Metapatcher.prototype.configure = function configure() {
  var _context8;

  var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSettings = this.defaultSettings;
  this.settings = _reduceInstanceProperty__default["default"](_context8 = _Object$keys__default["default"](this.defaultSettings)).call(_context8, function (memo, name) {
    memo[name] = userSettings[name] || defaultSettings[name] || {};
    return memo;
  }, {});
};

Metapatcher.prototype.isObject = function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};

var index = new Metapatcher();

module.exports = index;
//# sourceMappingURL=index.js.map
