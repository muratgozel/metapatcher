import { domScripter } from 'dom-scripter';
export class Metapatcher {
    settings = {
        structuredData: { enabled: true },
        androidChromeIcons: { enabled: true },
        msTags: { enabled: true },
        safariTags: { enabled: true },
        appleTags: { enabled: true },
        openGraphTags: { enabled: true },
        twitterTags: { enabled: true },
        facebookTags: { enabled: true }
    };
    #isDomAvailable = typeof document !== 'undefined';
    #memory = [];
    #validMSTileIconSizes = ['70x70', '150x150', '310x150', '310x310'];
    #reImageSizeFromStr = /[0-9]{2,3}x[0-9]{2,3}/g;
    #msTilesNamingMap = {
        '70x70': 'msapplication-square70x70logo',
        '150x150': 'msapplication-square150x150logo',
        '310x310': 'msapplication-square310x310logo',
        '310x150': 'msapplication-wide310x150logo'
    };
    #validAppleTouchIconSizes = ['120x120', '180x180', '152x152', '167x167', '1024x1024'];
    #validAndroidChromeIconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'];
    #prioritizeMethods = ['preload', 'prefetch', 'preconnect', 'dns-prefetch'];
    #mimeTypesByExtension = {
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp'
    };
    constructor() {
        this.set('meta', 'name', { name: 'msapplication-config', content: 'none' });
    }
    configure(userSettings = {}) {
        this.settings = Object.assign({}, this.settings, userSettings);
        return this;
    }
    setFavicon(path) {
        const mime = this.findMimeType(path);
        if (typeof mime === 'string')
            this.set('link', 'rel', { rel: 'shortcut icon', href: path, type: mime });
        return this;
    }
    setProjectMeta(obj) {
        if (obj.name) {
            if (this.settings.msTags && this.settings.msTags.enabled) {
                this.set('meta', 'name', { name: 'application-name', content: obj.name });
            }
            if (this.settings.safariTags && this.settings.safariTags.enabled) {
                this.setSafariMobileWebApp({ name: obj.name });
            }
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:site_name', content: obj.name });
            }
        }
        if (obj.url) {
            if (this.settings.msTags && this.settings.msTags.enabled) {
                this.set('meta', 'name', { name: 'msapplication-starturl', content: obj.url });
            }
        }
        if (obj.logo) {
            if (this.settings.structuredData && this.settings.structuredData.enabled) {
                const logoJsonLdId = 'metapatcher-project-meta-organization';
                const logoJsonLd = {
                    '@type': 'Organization',
                    logo: obj.logo,
                    url: obj.url
                };
                if (!this.#isDomAvailable) {
                    this.#memory.push(`<script type="application/ld+json" id="${logoJsonLdId}">${JSON.stringify(logoJsonLd)}</script>`);
                }
                else {
                    domScripter.injectJsonLd(logoJsonLd, { location: 'headEnd', id: logoJsonLdId });
                }
            }
        }
        if (obj.primaryColor) {
            this.set('meta', 'name', { name: 'theme-color', content: obj.primaryColor });
        }
        if (obj.backgroundColor) {
            if (this.settings.msTags && this.settings.msTags.enabled) {
                this.set('meta', 'name', { name: 'msapplication-TileColor', content: obj.backgroundColor });
            }
        }
        return this;
    }
    robots(directives) {
        this.set('meta', 'name', { name: 'robots', content: directives });
        return this;
    }
    prioritize(url, method) {
        if (this.#prioritizeMethods.includes(method)) {
            this.set('meta', undefined, { name: method, content: url });
        }
        return this;
    }
    removeAllPrioritizations() {
        if (!this.#isDomAvailable)
            return this;
        for (let i = 0; i < this.#prioritizeMethods.length; i++) {
            const method = this.#prioritizeMethods[i];
            const elems = document.querySelectorAll('meta[name="' + method + '"]');
            if (elems && elems.length > 0) {
                for (let i = 0; i < elems.length; i++) {
                    elems[i].parentNode.removeChild(elems[i]);
                }
            }
        }
        return this;
    }
    setIcons(list) {
        list.map((url) => {
            const type = this.findMimeType(url);
            const sizeMatches = url.match(this.#reImageSizeFromStr);
            const size = this.isArray(sizeMatches) && sizeMatches.length > 0 ? sizeMatches[0] : undefined;
            if (typeof type !== 'string')
                return;
            if (typeof size !== 'string')
                return;
            // android chrome icons
            if (this.settings.androidChromeIcons && this.settings.androidChromeIcons.enabled && this.#validAndroidChromeIconSizes.includes(size)) {
                this.set('link', undefined, { rel: 'icon', href: url, sizes: size, type: type });
            }
            // apple touch icons
            if (this.settings.appleTags && this.settings.appleTags.enabled && this.#validAppleTouchIconSizes.includes(size)) {
                this.set('link', undefined, { rel: 'apple-touch-icon', href: url, sizes: size });
            }
            // mstile icons
            if (this.settings.msTags && this.settings.msTags.enabled && this.#validMSTileIconSizes.includes(size)) {
                this.set('meta', undefined, { name: this.#msTilesNamingMap[size], content: url });
            }
        });
        return this;
    }
    setPageMeta(obj) {
        if (obj.title) {
            this.setPageTitle(obj.title);
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:title', content: obj.title });
            }
            if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
                this.set('meta', 'name', { name: 'twitter:title', content: obj.title });
            }
        }
        if (obj.description) {
            this.set('meta', 'name', { name: 'description', content: obj.description });
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:description', content: obj.description });
            }
            if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
                this.set('meta', 'name', { name: 'twitter:description', content: obj.description });
            }
        }
        if (obj.url) {
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:url', content: obj.url });
            }
        }
        if (obj.image) {
            const img = this.formatImageInput(obj.image);
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:image', content: img.url });
                if (img.width) {
                    this.set('meta', 'property', { property: 'og:image:width', content: img.width });
                }
                if (img.height) {
                    this.set('meta', 'property', { property: 'og:image:height', content: img.height });
                }
            }
            if (this.settings.twitterTags && this.settings.twitterTags.enabled) {
                this.set('meta', 'name', { name: 'twitter:image', content: img.url });
            }
        }
        if (obj.locale) {
            if (this.#isDomAvailable) {
                document.querySelector('html').setAttribute('lang', obj.locale);
            }
            if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
                this.set('meta', 'property', { property: 'og:locale', content: obj.locale.replace('-', '_') });
            }
        }
        if (obj.localVersions) {
            Object.keys(obj.localVersions).map((lo) => this.setLocalVersion(lo, obj.localVersions[lo], typeof obj.locale === 'string' && obj.locale == lo));
        }
        if (obj.canonicals) {
            obj.canonicals.map((url) => this.setCanonical(url));
        }
        return this;
    }
    setCanonical(url) {
        this.set('link', undefined, { rel: 'canonical', href: url });
        return this;
    }
    removeAllCanonicals() {
        if (!this.#isDomAvailable)
            return this;
        const elems = document.querySelectorAll('link[rel="canonical"]');
        if (elems && elems.length > 0) {
            for (let i = 0; i < elems.length; i++) {
                elems[i].parentNode.removeChild(elems[i]);
            }
        }
        return this;
    }
    setLocalVersion(locale, url, isActiveLocale = false) {
        this.set('link', undefined, { rel: 'alternate', href: url, hreflang: locale });
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
            const suffix = isActiveLocale ? '' : ':alternate';
            this.set('meta', undefined, { property: 'og:locale' + suffix, content: locale });
        }
        return this;
    }
    removeAllLocalVersions() {
        if (!this.#isDomAvailable)
            return this;
        const elems = document.querySelectorAll('link[rel="alternate"]');
        if (elems && elems.length > 0) {
            for (let i = 0; i < elems.length; i++) {
                elems[i].parentNode.removeChild(elems[i]);
            }
        }
        if (this.settings.openGraphTags && this.settings.openGraphTags.enabled) {
            const elems2 = document.querySelectorAll('meta[property="og:locale:alternate"]');
            if (elems2 && elems2.length > 0) {
                for (let j = 0; j < elems2.length; j++) {
                    elems2[j].parentNode.removeChild(elems2[j]);
                }
            }
            const elem = document.querySelector('meta[property="og:locale"]');
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        }
        return this;
    }
    setPageTitle(title) {
        if (!this.#isDomAvailable)
            this.#memory.push(`<title>${title}</title>`);
        else
            document.title = title;
        return this;
    }
    setSafariMobileWebApp(obj) {
        if (this.settings.appleTags && !this.settings.appleTags.enabled)
            return this;
        this.set('meta', 'name', { name: 'apple-mobile-web-app-capable', content: 'yes' });
        if (obj.name)
            this.set('meta', 'name', { name: 'apple-mobile-web-app-title', content: obj.name });
        if (obj.statusBarStyle)
            this.set('meta', 'name', { name: 'apple-mobile-web-app-status-bar-style', content: obj.statusBarStyle });
        return this;
    }
    setSafariPinnedTab(url, color) {
        this.set('link', 'rel', { rel: 'mask-icon', href: url, color: color || 'black' });
        return this;
    }
    setFacebookMeta(obj) {
        if (this.settings.facebookTags && !this.settings.facebookTags.enabled)
            return this;
        if (obj.appId)
            this.set('meta', 'property', { property: 'fb:app_id', content: obj.appId });
        return this;
    }
    setTwitterMeta(obj) {
        if (this.settings.twitterTags && !this.settings.twitterTags.enabled)
            return this;
        if (obj.card)
            this.set('meta', 'name', { name: 'twitter:card', content: obj.card });
        if (obj.site)
            this.set('meta', 'name', { name: 'twitter:site', content: obj.site });
        if (obj.creator)
            this.set('meta', 'name', { name: 'twitter:creator', content: obj.creator });
        if (obj.title)
            this.set('meta', 'name', { name: 'twitter:title', content: obj.title });
        if (obj.description)
            this.set('meta', 'name', { name: 'twitter:description', content: obj.description });
        if (obj.image)
            this.set('meta', 'name', { name: 'twitter:image', content: obj.image });
        return this;
    }
    async breadcrumb(data, attrs = {}) {
        if (this.settings.structuredData && !this.settings.structuredData.enabled)
            return this;
        const json = {
            '@type': 'BreadcrumbList',
            'itemListElement': data.map(({ title, url }, ind) => ({
                '@type': 'ListItem',
                'position': ind + 1,
                'name': title,
                'item': url
            }))
        };
        if (!this.#isDomAvailable) {
            this.#memory.push(`<script type="application/ld+json"${this.isObject(attrs)
                ? ' ' + Object.keys(attrs).map((attr) => `${attr}="${attrs[attr]}"`).join(' ')
                : ''}>${JSON.stringify(json)}</script>`);
        }
        else {
            await domScripter.injectJsonLd(json, { location: 'headEnd', attrs: attrs });
        }
        return this;
    }
    set(tag, id, attrs = {}) {
        if (!this.#isDomAvailable) {
            const html = `<${tag}${this.isObject(attrs)
                ? ' ' + Object.keys(attrs).map((attr) => `${attr}="${attrs[attr]}"`).join(' ')
                : ''}>`;
            this.#memory.push(html);
            return html;
        }
        if (typeof id === 'string') {
            const alreadyExist = this.hasElement(tag + '[' + id + '="' + attrs[id] + '"]');
            if (alreadyExist)
                alreadyExist.parentNode.removeChild(alreadyExist);
        }
        const elem = this.createElement(tag, attrs);
        this.patch(elem);
        return elem;
    }
    formatImageInput(input) {
        if (typeof input === 'string') {
            return { url: input };
        }
        if (this.isObject(input)) {
            return { url: input.url, width: input.width, height: input.height };
        }
        return {};
    }
    findMimeType(path) {
        const lastind = path.lastIndexOf('.');
        if (lastind < 1)
            return undefined;
        const ext = path.slice(lastind + 1);
        if (!ext)
            return undefined;
        return Object.hasOwn(this.#mimeTypesByExtension, ext)
            ? this.#mimeTypesByExtension[ext]
            : undefined;
    }
    dump() {
        const data = this.#memory.join('\n');
        this.#memory = [];
        return data;
    }
    patch(elem) {
        document.getElementsByTagName('head')[0].insertBefore(elem, null);
    }
    createElement(tag, attrs) {
        const elem = document.createElement(tag);
        if (this.isObject(attrs)) {
            Object.keys(attrs).map((attr) => elem.setAttribute(attr, attrs[attr]));
        }
        return elem;
    }
    hasElement(query) {
        return document.querySelector(query);
    }
    isArray(v) {
        return (!!v) && (v.constructor === Array);
    }
    isObject(v) {
        return (!!v) && (v.constructor === Object);
    }
}
export const metapatcher = new Metapatcher();
