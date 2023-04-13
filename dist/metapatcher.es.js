import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _classPrivateFieldSet from '@babel/runtime-corejs3/helpers/classPrivateFieldSet';
import _classPrivateFieldGet from '@babel/runtime-corejs3/helpers/classPrivateFieldGet';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _Object$assign from '@babel/runtime-corejs3/core-js/object/assign';
import _JSON$stringify from '@babel/runtime-corejs3/core-js/json/stringify';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js/instance/includes';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js/instance/map';
import _Object$keys from '@babel/runtime-corejs3/core-js/object/keys';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js/instance/concat';
import _lastIndexOfInstanceProperty from '@babel/runtime-corejs3/core-js/instance/last-index-of';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js/instance/slice';
import _WeakMap from '@babel/runtime-corejs3/core-js/weak-map';
import { domScripter } from 'dom-scripter';

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _isDomAvailable = /*#__PURE__*/new _WeakMap();
var _memory = /*#__PURE__*/new _WeakMap();
var _validMSTileIconSizes = /*#__PURE__*/new _WeakMap();
var _reImageSizeFromStr = /*#__PURE__*/new _WeakMap();
var _msTilesNamingMap = /*#__PURE__*/new _WeakMap();
var _validAppleTouchIconSizes = /*#__PURE__*/new _WeakMap();
var _validAndroidChromeIconSizes = /*#__PURE__*/new _WeakMap();
var _prioritizeMethods = /*#__PURE__*/new _WeakMap();
var _mimeTypesByExtension = /*#__PURE__*/new _WeakMap();
var Metapatcher = /*#__PURE__*/function () {
  function Metapatcher() {
    _classCallCheck(this, Metapatcher);
    _defineProperty(this, "settings", {
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
    });
    _classPrivateFieldInitSpec(this, _isDomAvailable, {
      writable: true,
      value: typeof document !== 'undefined'
    });
    _classPrivateFieldInitSpec(this, _memory, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _validMSTileIconSizes, {
      writable: true,
      value: ['70x70', '150x150', '310x150', '310x310']
    });
    _classPrivateFieldInitSpec(this, _reImageSizeFromStr, {
      writable: true,
      value: /[0-9]{2,3}x[0-9]{2,3}/g
    });
    _classPrivateFieldInitSpec(this, _msTilesNamingMap, {
      writable: true,
      value: {
        '70x70': 'msapplication-square70x70logo',
        '150x150': 'msapplication-square150x150logo',
        '310x310': 'msapplication-square310x310logo',
        '310x150': 'msapplication-wide310x150logo'
      }
    });
    _classPrivateFieldInitSpec(this, _validAppleTouchIconSizes, {
      writable: true,
      value: ['120x120', '180x180', '152x152', '167x167', '1024x1024']
    });
    _classPrivateFieldInitSpec(this, _validAndroidChromeIconSizes, {
      writable: true,
      value: ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512']
    });
    _classPrivateFieldInitSpec(this, _prioritizeMethods, {
      writable: true,
      value: ['preload', 'prefetch', 'preconnect', 'dns-prefetch']
    });
    _classPrivateFieldInitSpec(this, _mimeTypesByExtension, {
      writable: true,
      value: {
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp'
      }
    });
    this.set('meta', 'name', {
      name: 'msapplication-config',
      content: 'none'
    });
  }
  _createClass(Metapatcher, [{
    key: "configure",
    value: function configure() {
      var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = _Object$assign({}, this.settings, userSettings);
      return this;
    }
  }, {
    key: "setFavicon",
    value: function setFavicon(path) {
      var mime = this.findMimeType(path);
      if (typeof mime === 'string') this.set('link', 'rel', {
        rel: 'shortcut icon',
        href: path,
        type: mime
      });
      return this;
    }
  }, {
    key: "setProjectMeta",
    value: function setProjectMeta(obj) {
      if (obj.name) {
        if (this.settings.msTags && this.settings.msTags.enabled) {
          this.set('meta', 'name', {
            name: 'application-name',
            content: obj.name
          });
        }
        if (this.settings.safariTags && this.settings.safariTags.enabled) {
          this.setSafariMobileWebApp({
            name: obj.name
          });
        }
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:site_name',
            content: obj.name
          });
        }
      }
      if (obj.url) {
        if (this.settings.msTags && this.settings.msTags.enabled) {
          this.set('meta', 'name', {
            name: 'msapplication-starturl',
            content: obj.url
          });
        }
      }
      if (obj.logo) {
        if (this.settings.structuredData && this.settings.structuredData.enabled) {
          var logoJsonLdId = 'metapatcher-project-meta-organization';
          var logoJsonLd = {
            '@type': 'Organization',
            logo: obj.logo,
            url: obj.url
          };
          if (!_classPrivateFieldGet(this, _isDomAvailable)) {
            _classPrivateFieldGet(this, _memory).push("<script type=\"application/ld+json\" id=\"".concat(logoJsonLdId, "\">").concat(_JSON$stringify(logoJsonLd), "</script>"));
          } else {
            domScripter.injectJsonLd(logoJsonLd, {
              location: 'headEnd',
              id: logoJsonLdId
            });
          }
        }
      }
      if (obj.primaryColor) {
        this.set('meta', 'name', {
          name: 'theme-color',
          content: obj.primaryColor
        });
      }
      if (obj.backgroundColor) {
        if (this.settings.msTags && this.settings.msTags.enabled) {
          this.set('meta', 'name', {
            name: 'msapplication-TileColor',
            content: obj.backgroundColor
          });
        }
      }
      return this;
    }
  }, {
    key: "robots",
    value: function robots(directives) {
      this.set('meta', 'name', {
        name: 'robots',
        content: directives
      });
      return this;
    }
  }, {
    key: "prioritize",
    value: function prioritize(url, method) {
      var _context;
      if (_includesInstanceProperty(_context = _classPrivateFieldGet(this, _prioritizeMethods)).call(_context, method)) {
        this.set('meta', undefined, {
          name: method,
          content: url
        });
      }
      return this;
    }
  }, {
    key: "removeAllPrioritizations",
    value: function removeAllPrioritizations() {
      if (!_classPrivateFieldGet(this, _isDomAvailable)) return this;
      for (var i = 0; i < _classPrivateFieldGet(this, _prioritizeMethods).length; i++) {
        var method = _classPrivateFieldGet(this, _prioritizeMethods)[i];
        var elems = document.querySelectorAll('meta[name="' + method + '"]');
        if (elems && elems.length > 0) {
          for (var _i = 0; _i < elems.length; _i++) {
            elems[_i].parentNode.removeChild(elems[_i]);
          }
        }
      }
      return this;
    }
  }, {
    key: "setIcons",
    value: function setIcons(list) {
      var _this = this;
      _mapInstanceProperty(list).call(list, function (url) {
        var _context2, _context3, _context4;
        var type = _this.findMimeType(url);
        var sizeMatches = url.match(_classPrivateFieldGet(_this, _reImageSizeFromStr));
        var size = _this.isArray(sizeMatches) && sizeMatches.length > 0 ? sizeMatches[0] : undefined;
        if (typeof type !== 'string') return;
        if (typeof size !== 'string') return;
        // android chrome icons
        if (_this.settings.androidChromeIcons && _this.settings.androidChromeIcons.enabled && _includesInstanceProperty(_context2 = _classPrivateFieldGet(_this, _validAndroidChromeIconSizes)).call(_context2, size)) {
          _this.set('link', undefined, {
            rel: 'icon',
            href: url,
            sizes: size,
            type: type
          });
        }
        // apple touch icons
        if (_this.settings.appleTags && _this.settings.appleTags.enabled && _includesInstanceProperty(_context3 = _classPrivateFieldGet(_this, _validAppleTouchIconSizes)).call(_context3, size)) {
          _this.set('link', undefined, {
            rel: 'apple-touch-icon',
            href: url,
            sizes: size
          });
        }
        // mstile icons
        if (_this.settings.msTags && _this.settings.msTags.enabled && _includesInstanceProperty(_context4 = _classPrivateFieldGet(_this, _validMSTileIconSizes)).call(_context4, size)) {
          _this.set('meta', undefined, {
            name: _classPrivateFieldGet(_this, _msTilesNamingMap)[size],
            content: url
          });
        }
      });
      return this;
    }
  }, {
    key: "setPageMeta",
    value: function setPageMeta(obj) {
      var _this2 = this;
      if (obj.title) {
        this.setPageTitle(obj.title);
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:title',
            content: obj.title
          });
        }
        if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
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
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:description',
            content: obj.description
          });
        }
        if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
          this.set('meta', 'name', {
            name: 'twitter:description',
            content: obj.description
          });
        }
      }
      if (obj.url) {
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:url',
            content: obj.url
          });
        }
      }
      if (obj.image) {
        var img = this.formatImageInput(obj.image);
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:image',
            content: img.url
          });
          if (img.width) {
            this.set('meta', 'property', {
              property: 'og:image:width',
              content: img.width
            });
          }
          if (img.height) {
            this.set('meta', 'property', {
              property: 'og:image:height',
              content: img.height
            });
          }
        }
        if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
          this.set('meta', 'name', {
            name: 'twitter:image',
            content: img.url
          });
        }
      }
      if (obj.locale) {
        if (_classPrivateFieldGet(this, _isDomAvailable)) {
          document.querySelector('html').setAttribute('lang', obj.locale);
        }
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
          this.set('meta', 'property', {
            property: 'og:locale',
            content: obj.locale.replace('-', '_')
          });
        }
      }
      if (obj.localVersions) {
        var _context5;
        _mapInstanceProperty(_context5 = _Object$keys(obj.localVersions)).call(_context5, function (lo) {
          return _this2.setLocalVersion(lo, obj.localVersions[lo], typeof obj.locale === 'string' && obj.locale == lo);
        });
      }
      if (obj.canonicals) {
        var _context6;
        _mapInstanceProperty(_context6 = obj.canonicals).call(_context6, function (url) {
          return _this2.setCanonical(url);
        });
      }
      return this;
    }
  }, {
    key: "setCanonical",
    value: function setCanonical(url) {
      this.set('link', undefined, {
        rel: 'canonical',
        href: url
      });
      return this;
    }
  }, {
    key: "removeAllCanonicals",
    value: function removeAllCanonicals() {
      if (!_classPrivateFieldGet(this, _isDomAvailable)) return this;
      var elems = document.querySelectorAll('link[rel="canonical"]');
      if (elems && elems.length > 0) {
        for (var i = 0; i < elems.length; i++) {
          elems[i].parentNode.removeChild(elems[i]);
        }
      }
      return this;
    }
  }, {
    key: "setLocalVersion",
    value: function setLocalVersion(locale, url) {
      var isActiveLocale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.set('link', undefined, {
        rel: 'alternate',
        href: url,
        hreflang: locale
      });
      if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
        var suffix = isActiveLocale ? '' : ':alternate';
        this.set('meta', undefined, {
          property: 'og:locale' + suffix,
          content: locale
        });
      }
      return this;
    }
  }, {
    key: "removeAllLocalVersions",
    value: function removeAllLocalVersions() {
      if (!_classPrivateFieldGet(this, _isDomAvailable)) return this;
      var elems = document.querySelectorAll('link[rel="alternate"]');
      if (elems && elems.length > 0) {
        for (var i = 0; i < elems.length; i++) {
          elems[i].parentNode.removeChild(elems[i]);
        }
      }
      if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
        var elems2 = document.querySelectorAll('meta[property="og:locale:alternate"]');
        if (elems2 && elems2.length > 0) {
          for (var j = 0; j < elems2.length; j++) {
            elems2[j].parentNode.removeChild(elems2[j]);
          }
        }
        var elem = document.querySelector('meta[property="og:locale"]');
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    }
  }, {
    key: "setPageTitle",
    value: function setPageTitle(title) {
      if (!_classPrivateFieldGet(this, _isDomAvailable)) _classPrivateFieldGet(this, _memory).push("<title>".concat(title, "</title>"));else document.title = title;
      return this;
    }
  }, {
    key: "setSafariMobileWebApp",
    value: function setSafariMobileWebApp(obj) {
      if (this.settings.appleTags && !this.settings.appleTags.enabled) return this;
      this.set('meta', 'name', {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      });
      if (obj.name) this.set('meta', 'name', {
        name: 'apple-mobile-web-app-title',
        content: obj.name
      });
      if (obj.statusBarStyle) this.set('meta', 'name', {
        name: 'apple-mobile-web-app-status-bar-style',
        content: obj.statusBarStyle
      });
      return this;
    }
  }, {
    key: "setSafariPinnedTab",
    value: function setSafariPinnedTab(url, color) {
      this.set('link', 'rel', {
        rel: 'mask-icon',
        href: url,
        color: color || 'black'
      });
      return this;
    }
  }, {
    key: "setFacebookMeta",
    value: function setFacebookMeta(obj) {
      if (this.settings.facebookTags && !this.settings.facebookTags.enabled) return this;
      if (obj.appId) this.set('meta', 'property', {
        property: 'fb:app_id',
        content: obj.appId
      });
      return this;
    }
  }, {
    key: "setTwitterMeta",
    value: function setTwitterMeta(obj) {
      if (this.settings.twitterTags && !this.settings.twitterTags.enabled) return this;
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
      if (obj.title) this.set('meta', 'name', {
        name: 'twitter:title',
        content: obj.title
      });
      if (obj.description) this.set('meta', 'name', {
        name: 'twitter:description',
        content: obj.description
      });
      if (obj.image) this.set('meta', 'name', {
        name: 'twitter:image',
        content: obj.image
      });
      return this;
    }
  }, {
    key: "breadcrumb",
    value: function () {
      var _breadcrumb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
        var attrs,
          json,
          _context7,
          _context8,
          _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              attrs = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              if (!(this.settings.structuredData && !this.settings.structuredData.enabled)) {
                _context10.next = 3;
                break;
              }
              return _context10.abrupt("return", this);
            case 3:
              json = {
                '@type': 'BreadcrumbList',
                'itemListElement': _mapInstanceProperty(data).call(data, function (_ref, ind) {
                  var title = _ref.title,
                    url = _ref.url;
                  return {
                    '@type': 'ListItem',
                    'position': ind + 1,
                    'name': title,
                    'item': url
                  };
                })
              };
              if (_classPrivateFieldGet(this, _isDomAvailable)) {
                _context10.next = 8;
                break;
              }
              _classPrivateFieldGet(this, _memory).push(_concatInstanceProperty(_context7 = "<script type=\"application/ld+json\"".concat(this.isObject(attrs) ? ' ' + _mapInstanceProperty(_context8 = _Object$keys(attrs)).call(_context8, function (attr) {
                var _context9;
                return _concatInstanceProperty(_context9 = "".concat(attr, "=\"")).call(_context9, attrs[attr], "\"");
              }).join(' ') : '', ">")).call(_context7, _JSON$stringify(json), "</script>"));
              _context10.next = 10;
              break;
            case 8:
              _context10.next = 10;
              return domScripter.injectJsonLd(json, {
                location: 'headEnd',
                attrs: attrs
              });
            case 10:
              return _context10.abrupt("return", this);
            case 11:
            case "end":
              return _context10.stop();
          }
        }, _callee, this);
      }));
      function breadcrumb(_x) {
        return _breadcrumb.apply(this, arguments);
      }
      return breadcrumb;
    }()
  }, {
    key: "set",
    value: function set(tag, id) {
      var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!_classPrivateFieldGet(this, _isDomAvailable)) {
        var _context11, _context12;
        var html = _concatInstanceProperty(_context11 = "<".concat(tag)).call(_context11, this.isObject(attrs) ? ' ' + _mapInstanceProperty(_context12 = _Object$keys(attrs)).call(_context12, function (attr) {
          var _context13;
          return _concatInstanceProperty(_context13 = "".concat(attr, "=\"")).call(_context13, attrs[attr], "\"");
        }).join(' ') : '', ">");
        _classPrivateFieldGet(this, _memory).push(html);
        return html;
      }
      if (typeof id === 'string') {
        var alreadyExist = this.hasElement(tag + '[' + id + '="' + attrs[id] + '"]');
        if (alreadyExist) alreadyExist.parentNode.removeChild(alreadyExist);
      }
      var elem = this.createElement(tag, attrs);
      this.patch(elem);
      return elem;
    }
  }, {
    key: "formatImageInput",
    value: function formatImageInput(input) {
      if (typeof input === 'string') {
        return {
          url: input
        };
      }
      if (this.isObject(input)) {
        return {
          url: input.url,
          width: input.width,
          height: input.height
        };
      }
      return {};
    }
  }, {
    key: "findMimeType",
    value: function findMimeType(path) {
      var lastind = _lastIndexOfInstanceProperty(path).call(path, '.');
      if (lastind < 1) return undefined;
      var ext = _sliceInstanceProperty(path).call(path, lastind + 1);
      if (!ext) return undefined;
      return Object.hasOwn(_classPrivateFieldGet(this, _mimeTypesByExtension), ext) ? _classPrivateFieldGet(this, _mimeTypesByExtension)[ext] : undefined;
    }
  }, {
    key: "dump",
    value: function dump() {
      var data = _classPrivateFieldGet(this, _memory).join('\n');
      _classPrivateFieldSet(this, _memory, []);
      return data;
    }
  }, {
    key: "patch",
    value: function patch(elem) {
      document.getElementsByTagName('head')[0].insertBefore(elem, null);
    }
  }, {
    key: "createElement",
    value: function createElement(tag, attrs) {
      var elem = document.createElement(tag);
      if (this.isObject(attrs)) {
        var _context14;
        _mapInstanceProperty(_context14 = _Object$keys(attrs)).call(_context14, function (attr) {
          return elem.setAttribute(attr, attrs[attr]);
        });
      }
      return elem;
    }
  }, {
    key: "hasElement",
    value: function hasElement(query) {
      return document.querySelector(query);
    }
  }, {
    key: "isArray",
    value: function isArray(v) {
      return !!v && v.constructor === Array;
    }
  }, {
    key: "isObject",
    value: function isObject(v) {
      return !!v && v.constructor === Object;
    }
  }]);
  return Metapatcher;
}();
var metapatcher = new Metapatcher();

export { Metapatcher, metapatcher };
