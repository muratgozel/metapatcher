'use strict';

class Metapatcher {
  features = [];
  // all ids when setting meta tags will be prefixed with this to prevent collision with other tags
  idPrefix = "metapatcher";
  idCounters = { preload: 0, prefetch: 0, preconnect: 0, dnsPrefetch: 0 };
  // it uses memory instead of dom when dom is not available
  isDomAvailable = typeof document !== "undefined";
  memory = [];
  htmlVoidElements = ["base", "link", "meta"];
  mimeTypesByExtension = {
    "svg": "image/svg+xml",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "ico": "image/x-icon",
    "gif": "image/gif",
    "webp": "image/webp",
    "bmp": "image/bmp"
  };
  reImageSizeFromStr = /[0-9]{2,3}x[0-9]{2,3}/g;
  appleTouchIconSizes = ["120x120", "180x180", "152x152", "167x167", "1024x1024"];
  webAppManifestIconSizes = ["72x72", "96x96", "128x128", "144x144", "152x152", "192x192", "384x384", "512x512"];
  msTilesNamingMap = {
    "70x70": "msapplication-square70x70logo",
    "150x150": "msapplication-square150x150logo",
    "310x310": "msapplication-square310x310logo",
    "310x150": "msapplication-wide310x150logo"
  };
  // all features except browserconfig.xml are enabled
  constructor() {
    this.features = ["structuredData", "msTags", "appleTags", "openGraphTags", "twitterTags", "webAppManifest"];
    this.setMsApplicationConfig("none");
  }
  configure(features, settings) {
    if (settings == null ? void 0 : settings.idPrefix)
      this.idPrefix = settings.idPrefix;
    if (features)
      this.features = features;
    if (this.features.includes("appleTags")) {
      const id = this.idPrefix + "-apple-mobile-web-app-capable";
      this.set("meta", { id, name: "apple-mobile-web-app-capable", content: "yes" });
    }
    if (this.features.includes("twitterTags")) {
      const idTw = this.idPrefix + "-twitter-card";
      this.set("meta", { id: idTw, name: "twitter:card", content: "summary" });
    }
  }
  setIcons(list) {
    const msTileIconSizes = Object.keys(this.msTilesNamingMap);
    for (const url of list) {
      const mimeType = this.findMimeType(url);
      const sizeMatches = url.match(this.reImageSizeFromStr);
      const size = sizeMatches && sizeMatches.length > 0 ? sizeMatches[0] : void 0;
      if (!size || !mimeType)
        continue;
      if (this.features.includes("webAppManifest") && this.webAppManifestIconSizes.includes(size)) {
        const idWam = this.idPrefix + "-icon-" + size + "-wam";
        this.removeOne("link", { id: idWam });
        this.set("link", { id: idWam, rel: "icon", href: url, sizes: size, type: mimeType });
      }
      if (this.features.includes("appleTags") && this.appleTouchIconSizes.includes(size)) {
        const idApple = this.idPrefix + "-icon-" + size + "-apple";
        this.removeOne("link", { id: idApple });
        this.set("link", { id: idApple, rel: "apple-touch-icon", href: url, sizes: size });
      }
      if (this.features.includes("msTags") && msTileIconSizes.includes(size)) {
        const idMs = this.idPrefix + "-icon-" + size + "-ms";
        this.removeOne("meta", { id: idMs });
        this.set("meta", { id: idMs, name: this.msTilesNamingMap[size], content: url });
      }
    }
    return this;
  }
  setPageDetails(params) {
    if (params.title)
      this.setPageTitle(params.title);
    if (params.description)
      this.setPageDescription(params.description);
    if (params.path)
      this.setPageUrl(params.path);
    if (params.image)
      this.setPageImage(params.image);
    if (params.robots)
      this.setRobots(params.robots);
    if (params.locale)
      this.setPageLocale(params.locale);
    if (params.canonical)
      this.setCanonical(params.canonical);
    if (params.localVersions)
      this.setLocalVersions(params.localVersions, params.locale ?? "");
    if (params.breadcrumb)
      this.setBreadcrumb(params.breadcrumb);
    return this;
  }
  setPageTitle(title) {
    this.setDocumentTitle(title);
    if (this.features.includes("openGraphTags")) {
      const idOg = this.idPrefix + "og-title";
      this.removeOne("meta", { id: idOg });
      this.set("meta", { id: idOg, property: "og:title", content: title });
    }
    if (this.features.includes("twitterTags")) {
      const idTw = this.idPrefix + "tw-title";
      this.removeOne("meta", { id: idTw });
      this.set("meta", { id: idTw, name: "twitter:title", content: title });
    }
    return this;
  }
  setPageDescription(description) {
    const id = this.idPrefix + "-description";
    this.removeOne("meta", { id });
    this.set("meta", { id, name: "description", content: description });
    if (this.features.includes("openGraphTags")) {
      const idOg = this.idPrefix + "-description-og";
      this.removeOne("meta", { id: idOg });
      this.set("meta", { id: idOg, property: "og:description", content: description });
    }
    if (this.features.includes("twitterTags")) {
      const idTw = this.idPrefix + "-description-tw";
      this.removeOne("meta", { id: idTw });
      this.set("meta", { id, name: "twitter:description", content: description });
    }
    return this;
  }
  setPageUrl(url) {
    if (this.features.includes("openGraphTags")) {
      const idOg = this.idPrefix + "-url-og";
      this.removeOne("meta", { id: idOg });
      this.set("meta", { id: idOg, property: "og:url", content: url });
    }
    return this;
  }
  setPageImage(param) {
    const img = typeof param === "string" ? { path: param } : param;
    if (this.features.includes("openGraphTags")) {
      const idOg = this.idPrefix + "-image-og";
      this.removeOne("meta", { id: idOg });
      this.set("meta", { id: idOg, property: "og:image", content: img.path });
      const idOgw = this.idPrefix + "-image-w-og";
      this.removeOne("meta", { id: idOgw });
      if (img.width) {
        this.set("meta", { id: idOgw, property: "og:image:width", content: img.width.toString() });
      }
      const idOgh = this.idPrefix + "-image-h-og";
      this.removeOne("meta", { id: idOgh });
      if (img.height) {
        this.set("meta", { id: idOgh, property: "og:image:height", content: img.height.toString() });
      }
    }
    if (this.features.includes("twitterTags")) {
      const idTw = this.idPrefix + "-image-tw";
      this.removeOne("meta", { id: idTw });
      this.set("meta", { id: idTw, property: "twitter:image", content: img.path });
    }
    return this;
  }
  setPageLocale(locale) {
    locale = locale.replace("_", "-");
    if (this.isDomAvailable) {
      document.documentElement.setAttribute("lang", locale);
    }
    if (this.features.includes("openGraphTags")) {
      const id = this.idPrefix + "-locale-og";
      this.removeOne("meta", { id });
      this.set("meta", { id, property: "og:locale", content: locale });
    }
  }
  setProjectDetails(params) {
    if (params.favicon)
      this.setFavicon(params.favicon);
    if (params.name)
      this.setProjectName(params.name);
    if (params.url)
      this.setProjectUrl(params.url);
    if (params.robots)
      this.setRobots(params.robots);
    if (params.logo && params.url)
      this.setProjectLogo(params.logo, params.url);
    if (params.themeColor)
      this.setThemeColor(params.themeColor);
    if (params.twitterSite)
      this.setTwitterSite(params.twitterSite);
    if (params.safariPinnedTab)
      this.setSafariPinnedTab(params.safariPinnedTab);
    if (params.icons)
      this.setIcons(params.icons);
    return this;
  }
  setProjectName(name) {
    const idMs = this.idPrefix + "-project-name";
    this.removeOne("meta", { id: idMs });
    this.set("meta", { id: idMs, name: "application-name", content: name });
    if (this.features.includes("openGraphTags")) {
      const idOg = this.idPrefix + "-project-name-og";
      this.removeOne("meta", { id: idOg });
      this.set("meta", { id: idOg, property: "og:site_name", content: name });
    } else if (this.features.includes("appleTags")) {
      const idApple = this.idPrefix + "-project-name-apple";
      this.removeOne("meta", { id: idApple });
      this.set("meta", { id: idApple, name: "apple-mobile-web-app-title", content: name });
    }
    return this;
  }
  setProjectUrl(url) {
    if (this.features.includes("msTags")) {
      const id = this.idPrefix + "-project-url";
      this.removeOne("meta", { id });
      this.set("meta", { id, name: "msapplication-starturl", content: url });
    }
    return this;
  }
  setProjectLogo(logo, url) {
    if (this.features.includes("structuredData")) {
      const id = this.idPrefix + "-project-logo";
      const json = {
        "@type": "Organization",
        logo,
        url
      };
      const _data = JSON.stringify(json);
      this.removeOne("script", { id });
      return this.isDomAvailable ? this.setJsonLdDom(id, _data) : this.setJsonLdMemory(id, _data);
    }
    return "";
  }
  setThemeColor(colorHexCode) {
    const id = this.idPrefix + "-theme-color";
    this.removeOne("meta", { id });
    this.set("meta", { id, name: "theme-color", content: colorHexCode });
    if (this.features.includes("msTags")) {
      const idMs = this.idPrefix + "-theme-color-ms";
      this.removeOne("meta", { id: idMs });
      this.set("meta", { id: idMs, name: "msapplication-TileColor", content: colorHexCode });
    }
    return this;
  }
  setTwitterSite(username) {
    const id = this.idPrefix + "-twitter-site";
    this.removeOne("meta", { id });
    this.set("meta", { id, name: "twitter:site", content: username });
    return this;
  }
  addDnsPrefetch(param) {
    const id = this.idPrefix + "-dns-prefetch-" + this.idCounters.dnsPrefetch.toString();
    this.idCounters.dnsPrefetch += 1;
    const attrs = typeof param === "string" ? { id, rel: "dns-prefetch", href: param } : Object.assign({}, param, { id, rel: "dns-prefetch" });
    this.removeOne("link", { rel: "dns-prefetch", href: attrs.href });
    this.set("link", attrs);
    return this;
  }
  addPreconnect(param) {
    const id = this.idPrefix + "-preconnect-" + this.idCounters.preconnect.toString();
    this.idCounters.preconnect += 1;
    const attrs = typeof param === "string" ? { id, rel: "preconnect", href: param } : Object.assign({}, param, { id, rel: "preconnect" });
    this.removeOne("link", { rel: "preconnect", href: attrs.href });
    this.set("link", attrs);
    return this;
  }
  addPrefetch(param) {
    const id = this.idPrefix + "-prefetch-" + this.idCounters.prefetch.toString();
    this.idCounters.prefetch += 1;
    const attrs = typeof param === "string" ? { id, rel: "prefetch", href: param } : Object.assign({}, param, { id, rel: "prefetch" });
    this.removeOne("link", { rel: "prefetch", href: attrs.href });
    this.set("link", attrs);
    return this;
  }
  addPreload(param) {
    const id = this.idPrefix + "-preload-" + this.idCounters.preload.toString();
    this.idCounters.preload += 1;
    const attrs = typeof param === "string" ? { id, rel: "preload", href: param } : Object.assign({}, param, { id, rel: "preload" });
    this.removeOne("link", { rel: "preload", href: attrs.href });
    this.set("link", attrs);
    return this;
  }
  setRobots(param) {
    const id = this.idPrefix + "-robots";
    const attrs = typeof param === "string" ? { id, name: "robots", content: param } : Object.assign({}, param, { id, name: "robots" });
    this.removeOne("meta", { id });
    this.set("meta", attrs);
    return this;
  }
  setDocumentTitle(title) {
    if (!this.isDomAvailable)
      this.memory.push(`<title>${title}</title>`);
    else
      document.title = title;
    return this;
  }
  setFavicon(param) {
    const mime = this.findMimeType(typeof param === "string" ? param : param.href);
    if (!mime)
      return this;
    const id = this.idPrefix + "-favicon";
    const attrs = typeof param === "string" ? { id, rel: "shortcut icon", href: param } : Object.assign({}, param, { id, rel: "shortcut icon" });
    this.removeOne("link", { id });
    this.set("link", attrs);
    return this;
  }
  setMsApplicationConfig(param) {
    const id = this.idPrefix + "-msapplication-config";
    const attrs = typeof param === "string" ? { id, name: "msapplication-config", content: param } : Object.assign({}, param, { id, name: "msapplication-config" });
    this.removeOne("meta", { id });
    this.set("meta", attrs);
    return this;
  }
  setSafariPinnedTab(attrs) {
    const id = this.idPrefix + "-safari-pinned-tab";
    const _attrs = Object.assign({}, attrs, { id, rel: "mask-icon" });
    this.removeOne("link", { id });
    this.set("link", _attrs);
    return this;
  }
  setAppleStatusBarStyle(content = "default") {
    const id = this.idPrefix + "-apple-status-bar-style";
    this.removeOne("meta", { id });
    this.set("meta", { id, name: "apple-mobile-web-app-status-bar-style", content });
    return this;
  }
  setBreadcrumb(data) {
    if (!this.features.includes("structuredData"))
      return "";
    const id = this.idPrefix + "-breadcrumb";
    const json = {
      "@type": "BreadcrumbList",
      "itemListElement": data.map(({ title, url }, ind) => ({
        "@type": "ListItem",
        "position": ind + 1,
        "name": title,
        "item": url
      }))
    };
    const _data = JSON.stringify(json);
    this.removeOne("script", { id });
    return this.isDomAvailable ? this.setJsonLdDom(id, _data) : this.setJsonLdMemory(id, _data);
  }
  setJsonLdDom(id, data) {
    const elem = document.createElement("script");
    elem.id = id;
    elem.type = "application/ld+json";
    elem.text = data;
    document.head.insertBefore(elem, null);
    return elem;
  }
  setJsonLdMemory(id, data) {
    const _data = `<script id="${id}" type="application/ld+json">${data}<\/script>`;
    this.memory.push(_data);
    return _data;
  }
  setCanonical(param) {
    const id = this.idPrefix + "-canonical";
    const attrs = typeof param === "string" ? { id, rel: "canonical", href: param } : Object.assign({}, param, { id, rel: "canonical" });
    this.removeOne("link", { id });
    this.set("link", attrs);
    return this;
  }
  setMeta(name, content) {
    this.removeOne("meta", { name });
    this.set("meta", { name, content });
    return this;
  }
  setMobileVariant(param) {
    const id = this.idPrefix + "-mobile-variant";
    const attrs = typeof param === "string" ? { id, rel: "alternate", href: param, media: "only screen and (max-width: 640px)" } : Object.assign({}, param, { id, rel: "alternate" });
    this.removeOne("link", { id });
    this.set("link", attrs);
    return this;
  }
  setLocalVersions(param, currentLang = "") {
    this.removeMany("link", { rel: "alternate", hreflang: true });
    if (this.features.includes("openGraphTags")) {
      currentLang = currentLang.replace("_", "-");
      this.removeMany("meta", { property: "og:locale:alternate" });
      this.removeOne("meta", { property: "og:locale" });
    }
    for (const _attrs of param) {
      const id = this.idPrefix + "-local-version-" + _attrs.hreflang;
      _attrs.hreflang = _attrs.hreflang.replace("_", "-");
      const attrs = Object.assign({}, _attrs, { id, rel: "alternate" });
      this.set("link", attrs);
      if (this.features.includes("openGraphTags")) {
        const _id = this.idPrefix + "-local-version-og-" + _attrs.hreflang;
        const suffix = currentLang === _attrs.hreflang ? "" : ":alternate";
        const __attrs = { id: _id, property: "og:locale" + suffix, content: _attrs.hreflang.replace("-", "_") };
        this.set("meta", __attrs);
      }
    }
    return this;
  }
  setJsonLd(id, data) {
    const str = JSON.stringify(data);
    this.removeOne("script", { id });
    return this.isDomAvailable ? this.setJsonLdDom(id, str) : this.setJsonLdMemory(id, str);
  }
  removeOne(tagName, attrs) {
    if (!this.isDomAvailable) {
      const queries = [`<${tagName}`].concat(Object.keys(attrs).map((key) => `${key}="${attrs[key]}"`));
      this.memory = this.memory.filter((item) => !queries.every((query2) => item.includes(query2)));
      return this;
    }
    const params = Object.keys(attrs).reduce((memo, key) => {
      memo += `[${key}="${attrs[key]}"]`;
      return memo;
    }, "");
    const query = `${tagName}${params}`;
    const elem = document.head.querySelector(query);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
    return this;
  }
  removeMany(tagName, attrs) {
    if (!this.isDomAvailable) {
      const queries = [`<${tagName}`].concat(Object.keys(attrs).map((key) => typeof attrs[key] === "boolean" ? `${key}` : `${key}="${attrs[key]}"`));
      this.memory = this.memory.filter((item) => !queries.every((query2) => item.includes(query2)));
      return this;
    }
    const params = Object.keys(attrs).reduce((memo, key) => {
      memo += typeof attrs[key] === "boolean" ? `[${key}]` : `[${key}="${attrs[key]}"]`;
      return memo;
    }, "");
    const query = `${tagName}${params}`;
    const elems = document.head.querySelectorAll(query);
    if (elems && elems.length > 0) {
      elems.forEach((elem) => {
        elem.parentNode.removeChild(elem);
      });
    }
    return this;
  }
  dump() {
    if (this.isDomAvailable)
      return "";
    return this.memory.join("\n");
  }
  flushMemory() {
    this.memory = [];
    return this;
  }
  set(tagName, attrs = {}, settings) {
    tagName = tagName.toLowerCase();
    const isVoid = settings && Object.hasOwn(settings, "void") ? settings.void : this.htmlVoidElements.includes(tagName);
    return this.isDomAvailable ? this.setDom(tagName, attrs, { void: isVoid }) : this.setMemory(tagName, attrs, { void: isVoid });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDom(tagName, attrs = {}, _settings) {
    const elem = document.createElement(tagName);
    this.setElementAttrs(elem, attrs);
    document.head.insertBefore(elem, null);
    return elem;
  }
  setMemory(tagName, attrs = {}, settings) {
    const closingTag = settings.void ? ` />` : `></${tagName}>`;
    const html = `<${tagName}${this.serializeAttrs(attrs)}${closingTag}`;
    this.memory.push(html);
    return html;
  }
  setElementAttrs(elem, attrs = {}) {
    for (const name of Object.keys(attrs)) {
      const v = attrs[name];
      if (typeof v === "string")
        elem.setAttribute(name, v);
      else if (v === true)
        elem.setAttribute(name, "");
    }
  }
  async setScript(attrs, settings = {}) {
    attrs = Object.assign({}, { type: "text/javascript" }, attrs);
    settings = Object.assign({}, { location: "headEnd", waitForLoad: "", timeout: 1e4 }, settings);
    return new Promise((resolve, reject) => {
      if (!this.isDomAvailable) {
        return resolve(this.setMemory("script", attrs, { void: this.htmlVoidElements.includes("script") }));
      }
      const timeout = setTimeout(() => {
        reject(new Error("Timeout."));
      }, settings.timeout);
      const elem = document.createElement("script");
      const { src, ...rest } = attrs;
      this.setElementAttrs(elem, rest);
      function onDone() {
        clearTimeout(timeout);
        if (settings.waitForLoad.length === 0) {
          return resolve(elem);
        } else {
          const interval = setInterval(() => {
            if (Object.hasOwn(window, settings.waitForLoad)) {
              clearInterval(interval);
              return resolve(elem);
            }
          }, 100);
        }
      }
      function onError(_event) {
        clearTimeout(timeout);
        reject(new Error("Error loading resource"));
      }
      elem.addEventListener("load", onDone);
      elem.addEventListener("error", onError);
      elem.src = src;
      if (settings.location === "headEnd")
        document.head.insertBefore(elem, null);
      else if (settings.location === "bodyEnd")
        document.body.insertBefore(elem, null);
      else if (settings.location === "bodyStart")
        document.body.insertBefore(elem, document.body.firstChild);
      else
        document.body.insertBefore(elem, null);
    });
  }
  async setStylesheet(attrs, settings = {}) {
    attrs = Object.assign({}, { rel: "stylesheet" }, attrs);
    settings = Object.assign({}, { location: "headEnd", timeout: 1e4 }, settings);
    return new Promise((resolve, reject) => {
      if (!this.isDomAvailable) {
        return resolve(this.setMemory("link", attrs, { void: this.htmlVoidElements.includes("link") }));
      }
      const timeout = setTimeout(() => {
        reject(new Error("Timeout."));
      }, settings.timeout);
      const elem = document.createElement("link");
      const { href, ...rest } = attrs;
      this.setElementAttrs(elem, Object.assign({}, rest, { media: "only x" }));
      function onDone() {
        elem.media = attrs.media ?? "all";
        clearTimeout(timeout);
        return resolve(elem);
      }
      function onError(_event) {
        clearTimeout(timeout);
        return reject(new Error("Error loading resource"));
      }
      elem.addEventListener("load", onDone);
      elem.addEventListener("error", onError);
      elem.href = href;
      if (settings.location === "headEnd")
        document.head.insertBefore(elem, null);
      else if (settings.location === "bodyEnd")
        document.body.insertBefore(elem, null);
      else if (settings.location === "bodyStart")
        document.body.insertBefore(elem, document.body.firstChild);
      else
        document.body.insertBefore(elem, null);
    });
  }
  serializeAttrs(attrs = {}) {
    return Object.keys(attrs).reduce((memo, name) => {
      memo += ` ${name}="${attrs[name]}"`;
      return memo;
    }, "");
  }
  findMimeType(path) {
    const lastind = path.lastIndexOf(".");
    if (lastind < 1)
      return void 0;
    const ext = path.slice(lastind + 1);
    if (!ext)
      return void 0;
    return Object.hasOwn(this.mimeTypesByExtension, ext) ? this.mimeTypesByExtension[ext] : void 0;
  }
}
const metapatcher = new Metapatcher();

exports.Metapatcher = Metapatcher;
exports.metapatcher = metapatcher;
//# sourceMappingURL=index.cjs.map
