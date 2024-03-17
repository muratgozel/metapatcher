export class Metapatcher {
    features: MetapatcherFeatures[] = []

    // all ids when setting meta tags will be prefixed with this to prevent collision with other tags
    idPrefix = 'metapatcher'
    idCounters = { preload: 0, prefetch: 0, preconnect: 0, dnsPrefetch: 0 }

    // it uses memory instead of dom when dom is not available
    isDomAvailable = typeof document !== 'undefined'
    memory: string[] = []

    htmlVoidElements = ['base', 'link', 'meta']

    mimeTypesByExtension = {
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp'
    }

    reImageSizeFromStr = /[0-9]{2,3}x[0-9]{2,3}/g

    appleTouchIconSizes = ['120x120', '180x180', '152x152', '167x167', '1024x1024']
    webAppManifestIconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512']
    msTilesNamingMap = {
        '70x70': 'msapplication-square70x70logo',
        '150x150': 'msapplication-square150x150logo',
        '310x310': 'msapplication-square310x310logo',
        '310x150': 'msapplication-wide310x150logo'
    }

    // all features except browserconfig.xml are enabled
    constructor () {
        this.features = ['structuredData', 'msTags', 'appleTags', 'openGraphTags', 'twitterTags', 'webAppManifest']
        // disable default requests made by browsers
        this.setMsApplicationConfig('none')
    }

    configure (features?: MetapatcherFeatures[]) {
        if (features) this.features = features

        if (this.features.includes('appleTags')) {
            const id = this.idPrefix + '-apple-mobile-web-app-capable'
            this.set('meta', { id, name: 'apple-mobile-web-app-capable', content: 'yes' })
        }

        if (this.features.includes('twitterTags')) {
            const idTw = this.idPrefix + '-twitter-card'
            this.set('meta', { id: idTw, name: 'twitter:card', content: 'summary' })
        }
    }

    setIcons(list: string[]): this {
        const msTileIconSizes = Object.keys(this.msTilesNamingMap)

        for (const url of list) {
            const mimeType = this.findMimeType(url)
            const sizeMatches = url.match(this.reImageSizeFromStr)
            const size = sizeMatches && sizeMatches.length > 0 ? sizeMatches[0] : undefined
            if (!size || !mimeType) continue

            if (this.features.includes('webAppManifest') && this.webAppManifestIconSizes.includes(size)) {
                const idWam = this.idPrefix + '-icon-' + size + '-wam'
                this.removeOne(`link[id="${idWam}"]`)
                this.set('link', { id: idWam, rel: 'icon', href: url, sizes: size, type: mimeType })
            }

            if (this.features.includes('appleTags') && this.appleTouchIconSizes.includes(size)) {
                const idApple = this.idPrefix + '-icon-' + size + '-apple'
                this.removeOne(`link[id="${idApple}"]`)
                this.set('link', { id: idApple, rel: 'apple-touch-icon', href: url, sizes: size })
            }

            if (this.features.includes('msTags') && msTileIconSizes.includes(size)) {
                const idMs = this.idPrefix + '-icon-' + size + '-ms'
                this.removeOne(`meta[id="${idMs}"]`)
                this.set('meta', { id: idMs, name: this.msTilesNamingMap[size as keyof typeof this.msTilesNamingMap], content: url })
            }
        }

        return this
    }

    setPageDetails (params: MetapatcherPageParams): this {
        if (params.title) this.setPageTitle(params.title)
        if (params.description) this.setPageDescription(params.description)
        if (params.path) this.setPageUrl(params.path)
        if (params.image) this.setPageImage(params.image)
        if (params.locale) this.setPageLocale(params.locale)
        if (params.canonical) this.setCanonical(params.canonical)
        if (params.localVersions) this.setLocalVersions(params.localVersions, params.locale ?? '')
        if (params.breadcrumb) this.setBreadcrumb(params.breadcrumb)

        return this
    }

    setPageTitle (title: string): this {
        this.setDocumentTitle(title)

        if (this.features.includes('openGraphTags')) {
            const idOg = this.idPrefix + 'og-title'
            this.removeOne(`meta[id="${idOg}"]`)
            this.set('meta', { id: idOg, property: 'og:title', content: title })
        }

        if (this.features.includes('twitterTags')) {
            const idTw = this.idPrefix + 'tw-title'
            this.removeOne(`meta[id="${idTw}"]`)
            this.set('meta', { id: idTw, name: 'twitter:title', content: title })
        }

        return this
    }

    setPageDescription (description: string): this {
        const id = this.idPrefix + '-description'
        this.removeOne(`meta[id="${id}"]`)
        this.set('meta', { id, name: 'description', content: description })

        if (this.features.includes('openGraphTags')) {
            const idOg = this.idPrefix + '-description-og'
            this.removeOne(`meta[id="${idOg}"]`)
            this.set('meta', { id: idOg, property: 'og:description', content: description })
        }

        if (this.features.includes('twitterTags')) {
            const idTw = this.idPrefix + '-description-tw'
            this.removeOne(`meta[id="${idTw}"]`)
            this.set('meta', { id, name: 'twitter:description', content: description })
        }

        return this
    }

    setPageUrl (url: string): this {
        if (this.features.includes('openGraphTags')) {
            const idOg = this.idPrefix + '-url-og'
            this.removeOne(`meta[id="${idOg}"]`)
            this.set('meta', { id: idOg, property: 'og:url', content: url })
        }

        return this
    }

    setPageImage (param: string | MetapatcherPageImage): this {
        const img: MetapatcherPageImage = typeof param === 'string' ? { path: param } : param

        if (this.features.includes('openGraphTags')) {
            const idOg = this.idPrefix + '-image-og'
            this.removeOne(`meta[id="${idOg}"]`)
            this.set('meta', { id: idOg, property: 'og:image', content: img.path })

            const idOgw = this.idPrefix + '-image-w-og'
            this.removeOne(`meta[id="${idOgw}"]`)
            if (img.width) {
                this.set('meta', { id: idOgw, property: 'og:image:width', content: img.width.toString() })
            }

            const idOgh = this.idPrefix + '-image-h-og'
            this.removeOne(`meta[id="${idOgh}"]`)
            if (img.height) {
                this.set('meta', { id: idOgh, property: 'og:image:height', content: img.height.toString() })
            }
        }

        if (this.features.includes('twitterTags')) {
            const idTw = this.idPrefix + '-image-tw'
            this.removeOne(`meta[id="${idTw}"]`)
            this.set('meta', { id: idTw, property: 'twitter:image', content: img.path })
        }

        return this
    }

    setPageLocale (locale: string) {
        locale = locale.replace('_', '-')

        if (this.isDomAvailable) {
            document.documentElement.setAttribute('lang', locale)
        }

        if (this.features.includes('openGraphTags')) {
            const id = this.idPrefix + '-locale-og'
            this.removeOne(`meta[id="${id}"]`)
            this.set('meta', { id, property: 'og:locale', content: locale })
        }
    }

    setProjectDetails (params: MetapatcherProjectParams): this {
        if (params.favicon) this.setFavicon(params.favicon)
        if (params.name) this.setProjectName(params.name)
        if (params.url) this.setProjectUrl(params.url)
        if (params.robots) this.setRobots(params.robots)
        if (params.logo && params.url) this.setProjectLogo(params.logo, params.url)
        if (params.themeColor) this.setThemeColor(params.themeColor)
        if (params.twitterSite) this.setTwitterSite(params.twitterSite)
        if (params.safariPinnedTab) this.setSafariPinnedTab(params.safariPinnedTab)
        if (params.icons) this.setIcons(params.icons)

        return this
    }

    setProjectName (name: string): this {
        const idMs = this.idPrefix + '-project-name'
        this.removeOne(`meta[id="${idMs}"]`)
        this.set('meta', { id: idMs, name: 'application-name', content: name })

        if (this.features.includes('openGraphTags')) {
            const idOg = this.idPrefix + '-project-name-og'
            this.removeOne(`meta[id="${idOg}"]`)
            this.set('meta', { id: idOg, property: 'og:site_name', content: name })
        }
        else if (this.features.includes('appleTags')) {
            const idApple = this.idPrefix + '-project-name-apple'
            this.removeOne(`meta[id="${idApple}"]`)
            this.set('meta', { id: idApple, name: 'apple-mobile-web-app-title', content: name })
        }

        return this
    }

    setProjectUrl (url: string): this {
        if (this.features.includes('msTags')) {
            const id = this.idPrefix + '-project-url'
            this.removeOne(`meta[id="${id}"]`)
            this.set('meta', { id, name: 'msapplication-starturl', content: url })
        }
        return this
    }

    setProjectLogo (logo: string, url: string): HTMLScriptElement | string {
        if (this.features.includes('structuredData')) {
            const id = this.idPrefix + '-project-logo'
            const json = {
                '@type': 'Organization',
                logo: logo,
                url: url
            }
            const _data = JSON.stringify(json)

            this.removeOne(`script[id="${id}"]`)

            return this.isDomAvailable ? this.setJsonLdDom(id, _data) : this.setJsonLdMemory(id, _data)
        }

        return ''
    }

    setThemeColor (colorHexCode: string): this {
        const id = this.idPrefix + '-theme-color'
        this.removeOne(`meta[id="${id}"]`)
        this.set('meta', { id, name: 'theme-color', content: colorHexCode })

        if (this.features.includes('msTags')) {
            const id = this.idPrefix + '-theme-color-ms'
            this.removeOne(`meta[id="${id}"]`)
            this.set('meta', { id, name: 'msapplication-TileColor', content: colorHexCode })
        }

        return this
    }

    setTwitterSite (username: string): this {
        const id = this.idPrefix + '-twitter-site'
        this.removeOne(`meta[id="${id}"]`)
        this.set('meta', { id, name: 'twitter:site', content: username })
        return this
    }

    addDnsPrefetch (param: string | MetapatcherDnsPrefetchAttrs): this {
        const id = this.idPrefix + '-dns-prefetch-' + this.idCounters.dnsPrefetch.toString()
        this.idCounters.dnsPrefetch += 1
        const attrs: MetapatcherDnsPrefetchAttrs = typeof param === 'string'
            ? { id, rel: 'dns-prefetch', href: param }
            : Object.assign({}, param, { id, rel: 'dns-prefetch' })
        this.removeOne(`link[rel="dns-prefetch"][href="${attrs.href}"]`)
        this.set('link', attrs)
        return this
    }

    addPreconnect (param: string | MetapatcherPreconnectAttrs): this {
        const id = this.idPrefix + '-preconnect-' + this.idCounters.preconnect.toString()
        this.idCounters.preconnect += 1
        const attrs: MetapatcherPreconnectAttrs = typeof param === 'string'
            ? { id, rel: 'preconnect', href: param }
            : Object.assign({}, param, { id, rel: 'preconnect' })
        this.removeOne(`link[rel="preconnect"][href="${attrs.href}"]`)
        this.set('link', attrs)
        return this
    }

    addPrefetch (param: string | MetapatcherPrefetchAttrs): this {
        const id = this.idPrefix + '-prefetch-' + this.idCounters.prefetch.toString()
        this.idCounters.prefetch += 1
        const attrs: MetapatcherPrefetchAttrs = typeof param === 'string'
            ? { id, rel: 'prefetch', href: param }
            : Object.assign({}, param, { id, rel: 'prefetch' })
        this.removeOne(`link[rel="prefetch"][href="${attrs.href}"]`)
        this.set('link', attrs)
        return this
    }

    addPreload (param: string | MetapatcherPreloadAttrs): this {
        const id = this.idPrefix + '-preload-' + this.idCounters.preload.toString()
        this.idCounters.preload += 1
        const attrs: MetapatcherPreloadAttrs = typeof param === 'string'
            ? { id, rel: 'preload', href: param }
            : Object.assign({}, param, { id, rel: 'preload' })
        this.removeOne(`link[rel="preload"][href="${attrs.href}"]`)
        this.set('link', attrs)
        return this
    }

    setRobots(param: string | MetapatcherRobotsAttrs): this {
        const id = this.idPrefix + '-robots'
        const attrs: MetapatcherRobotsAttrs = typeof param === 'string'
            ? { id, name: 'robots', content: param }
            : Object.assign({}, param, { id, name: 'robots' })
        this.removeOne(`meta[id="${id}"]`)
        this.set('meta', attrs)
        return this
    }

    setDocumentTitle(title: string): this {
        if (!this.isDomAvailable) this.memory.push(`<title>${title}</title>`)
        else document.title = title
        return this
    }

    setFavicon(param: string | MetapatcherFaviconAttrs): this {
        const mime = this.findMimeType(typeof param === 'string' ? param : param.href)
        if (!mime) return this

        const id = this.idPrefix + '-favicon'
        const attrs: MetapatcherFaviconAttrs = typeof param === 'string'
            ? { id, rel: 'shortcut icon', href: param }
            : Object.assign({}, param, { id, rel: 'shortcut icon' })

        this.removeOne(`link[id="${id}"]`)
        this.set('link', attrs)
        return this
    }

    setMsApplicationConfig (param: string | MetapatcherMsApplicationConfigAttrs) {
        const id = this.idPrefix + '-msapplication-config'
        const attrs: MetapatcherMsApplicationConfigAttrs = typeof param === 'string'
            ? { id, name: 'msapplication-config', content: param }
            : Object.assign({}, param, { id, name: 'msapplication-config' })
        this.removeOne(`meta[id="${id}"]`)
        this.set('meta', attrs)
        return this
    }

    setSafariPinnedTab(attrs: MetapatcherSafariPinnedTabAttrs): this {
        const id = this.idPrefix + '-safari-pinned-tab'
        const _attrs: MetapatcherSafariPinnedTabAttrs = Object.assign({}, attrs, { id, rel: 'mask-icon' })
        this.removeOne(`link[id="${id}"]`)
        this.set('link', _attrs)
        return this
    }

    setAppleStatusBarStyle (content: 'default' | 'black' | 'black-translucent' = 'default'): this {
        const id = this.idPrefix + '-apple-status-bar-style'
        this.removeOne(`link[id="${id}"]`)
        this.set('meta', { id, name: 'apple-mobile-web-app-status-bar-style', content })
        return this
    }

    setBreadcrumb (data: MetapatcherBreadcrumb[]): HTMLScriptElement | string {
        if (!this.features.includes('structuredData')) return ''

        const id = this.idPrefix + '-breadcrumb'
        const json = {
            '@type': 'BreadcrumbList',
            'itemListElement': data.map(({title, url}, ind) => ({
                '@type': 'ListItem',
                'position': ind + 1,
                'name': title,
                'item': url
            }))
        }
        const _data = JSON.stringify(json)

        this.removeOne(`script[id="${id}"]`)

        return this.isDomAvailable ? this.setJsonLdDom(id, _data) : this.setJsonLdMemory(id, _data)
    }

    setJsonLdDom (id: string, data: string) {
        const elem = document.createElement('script')
        elem.id = id
        elem.type = 'application/ld+json'
        elem.text = data

        document.head.insertBefore(elem, null)

        return elem
    }

    setJsonLdMemory (id: string, data: string) {
        const _data = `<script id="${id}" type="application/ld+json">${data}</script>`
        this.memory.push(_data)
        return _data
    }

    setCanonical (param: string | MetapatcherCanonicalLinkAttrs): this {
        const id = this.idPrefix + '-canonical'
        const attrs: MetapatcherCanonicalLinkAttrs = typeof param === 'string'
            ? { id, rel: 'canonical', href: param }
            : Object.assign({}, param, { id, rel: 'canonical' })

        this.removeOne(`link[id="${id}"]`)
        this.set('link', attrs)

        return this
    }

    setMobileVariant (param: string | MetapatcherMobileVariantLinkAttrs): this {
        const id = this.idPrefix + '-mobile-variant'
        const attrs: MetapatcherMobileVariantLinkAttrs = typeof param === 'string'
            ? { id, rel: 'alternate', href: param, media: 'only screen and (max-width: 640px)' }
            : Object.assign({}, param, { id, rel: 'alternate' })

        this.removeOne(`link[id="${id}"]`)
        this.set('link', attrs)

        return this
    }

    setLocalVersions (param: MetapatcherLocalVersionLinkAttrs[], currentLang = ''): this {
        this.removeMany('link[rel="alternate"][hreflang]')

        if (this.features.includes('openGraphTags')) {
            currentLang = currentLang.replace('_', '-')
            this.removeMany('meta[property="og:locale:alternate"]')
            this.removeOne('meta[property="og:locale"]')
        }

        for (const _attrs of param) {
            const id = this.idPrefix + '-local-version-' + _attrs.hreflang
            _attrs.hreflang = _attrs.hreflang.replace('_', '-')
            const attrs: MetapatcherLocalVersionLinkAttrs = Object.assign({}, _attrs, { id, rel: 'alternate' })

            this.set('link', attrs)

            if (this.features.includes('openGraphTags')) {
                const _id = this.idPrefix + '-local-version-og-' + _attrs.hreflang
                const suffix = currentLang === _attrs.hreflang ? '' : ':alternate'
                const __attrs = { id: _id, property: 'og:locale' + suffix, content: _attrs.hreflang.replace('-', '_') }
                this.set('meta', __attrs)
            }
        }

        return this
    }

    setJsonLd (id: string, data: Record<string, never>): HTMLScriptElement | string {
        const str = JSON.stringify(data)
        this.removeOne(`script[id="${id}"]`)
        return this.isDomAvailable ? this.setJsonLdDom(id, str) : this.setJsonLdMemory(id, str)
    }

    removeOne (query: string): this {
        if (!this.isDomAvailable) return this
        const elem = document.head.querySelector(query)
        if (elem) {
            elem.parentNode!.removeChild(elem)
        }
        return this
    }

    removeMany (query: string): this {
        if (!this.isDomAvailable) return this
        const elems = document.head.querySelectorAll(query)
        if (elems && elems.length > 0) {
            elems.forEach((elem) => {
                elem.parentNode!.removeChild(elem)
            })
        }
        return this
    }

    dump(): string {
        const data = this.memory.join('\n')

        this.memory = []

        return data
    }

    set (tagName: string, attrs: MetapatcherHtmlTagAttrs = {}, settings?: MetapatcherSetSettings): string | HTMLElement {
        tagName = tagName.toLowerCase()

        const isVoid = settings && Object.hasOwn(settings, 'void') ? settings.void! : this.htmlVoidElements.includes(tagName)

        return this.isDomAvailable
            ? this.setDom(tagName, attrs, { void: isVoid })
            : this.setMemory(tagName, attrs, { void: isVoid })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDom (tagName: string, attrs: MetapatcherHtmlTagAttrs = {}, _settings: MetapatcherSetSettings): HTMLElement {
        const elem = document.createElement(tagName)

        this.setElementAttrs(elem, attrs)

        document.head.insertBefore(elem, null)

        return elem
    }

    setMemory (tagName: string, attrs: MetapatcherHtmlTagAttrs = {}, settings: MetapatcherSetSettings): string {
        const closingTag = settings.void ? ` />` : `></${tagName}>`
        const html = `<${tagName}${this.serializeAttrs(attrs)}${closingTag}`
        this.memory.push(html)
        return html
    }

    setElementAttrs (elem: HTMLElement, attrs: MetapatcherHtmlTagAttrs = {}) {
        for (const name of Object.keys(attrs)) {
            const v = attrs[name]!
            if (typeof v === 'string') elem.setAttribute(name, v)
            else if (v === true) elem.setAttribute(name, '')
        }
    }

    async setScript (attrs: MetapatcherSetJsAttrs, settings: MetapatcherSetJsSettings = {}): Promise<HTMLScriptElement> {
        attrs = Object.assign({}, { type: 'text/javascript' }, attrs)
        settings = Object.assign({}, { location: 'headEnd', waitForLoad: '', timeout: 10000 }, settings)

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout.'))
            }, settings.timeout)

            const elem = document.createElement('script')

            const { src, ...rest } = attrs
            this.setElementAttrs(elem, rest)

            function onDone () {
                clearTimeout(timeout)

                if (settings.waitForLoad!.length === 0) {
                    return resolve(elem)
                }
                else {
                    const interval = setInterval(() => {
                        if (Object.hasOwn(window, settings.waitForLoad!)) {
                            clearInterval(interval)
                            return resolve(elem)
                        }
                    }, 100)
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            function onError (_event: Event) {
                clearTimeout(timeout)
                reject(new Error('Error loading resource'))
            }

            elem.addEventListener('load', onDone)
            elem.addEventListener('error', onError)

            elem.src = src

            if (settings.location === 'headEnd') document.head.insertBefore(elem, null)
            else if (settings.location === 'bodyEnd') document.body.insertBefore(elem, null)
            else if (settings.location === 'bodyStart') document.body.insertBefore(elem, document.body.firstChild)
            else document.body.insertBefore(elem, null)
        })
    }

    async setStylesheet (attrs: MetapatcherSetStylesheetAttrs, settings: MetapatcherSetStylesheetSettings = {}): Promise<HTMLLinkElement> {
        attrs = Object.assign({}, { rel: 'stylesheet' }, attrs)
        settings = Object.assign({}, { location: 'headEnd', timeout: 10000 }, settings)

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout.'))
            }, settings.timeout)

            const elem = document.createElement('link')

            const { href, ...rest } = attrs
            this.setElementAttrs(elem, Object.assign({}, rest, { media: 'only x' }))

            function onDone () {
                elem.media = attrs.media ?? 'all'
                clearTimeout(timeout)
                return resolve(elem)
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            function onError (_event: Event) {
                clearTimeout(timeout)
                return reject(new Error('Error loading resource'))
            }

            elem.addEventListener('load', onDone)
            elem.addEventListener('error', onError)

            elem.href = href

            if (settings.location === 'headEnd') document.head.insertBefore(elem, null)
            else if (settings.location === 'bodyEnd') document.body.insertBefore(elem, null)
            else if (settings.location === 'bodyStart') document.body.insertBefore(elem, document.body.firstChild)
            else document.body.insertBefore(elem, null)
        })
    }

    serializeAttrs (attrs: MetapatcherHtmlTagAttrs = {}): string {
        return Object.keys(attrs).reduce((memo, name) => {
            memo += ` ${name}="${attrs[name]}"`
            return memo
        }, '')
    }

    findMimeType(path: string): string | undefined {
        const lastind = path.lastIndexOf('.')
        if (lastind < 1) return undefined

        const ext = path.slice(lastind + 1)
        if (!ext) return undefined

        return Object.hasOwn(this.mimeTypesByExtension, ext)
            ? this.mimeTypesByExtension[ext as keyof typeof this.mimeTypesByExtension]
            : undefined
    }
}

export type MetapatcherFeatures = 'structuredData' |
    'webAppManifest' |
    'msTags' |
    'appleTags' |
    'openGraphTags' |
    'twitterTags'

export type MetapatcherHtmlTagAttrs = Record<string, string | boolean>

export interface MetapatcherSetStylesheetAttrs {
    id: string
    readonly rel?: 'stylesheet'
    href: string
    media?: string
}

export interface MetapatcherSetStylesheetSettings {
    location?: 'headEnd' | 'bodyEnd' | 'bodyStart'
    timeout?: number
}

export interface MetapatcherSetJsAttrs {
    id: string
    type: string
    src: string
    async: boolean
    [index: string]: string | boolean
}

export interface MetapatcherSetJsSettings {
    location?: 'headEnd' | 'bodyEnd' | 'bodyStart'
    waitForLoad?: string
    timeout?: number
}

export interface MetapatcherSetSettings {
    void?: boolean
}

export interface MetapatcherCanonicalLinkAttrs {
    readonly rel?: 'canonical'
    id?: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherMobileVariantLinkAttrs {
    readonly rel?: 'alternate'
    id?: string
    media: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherLocalVersionLinkAttrs {
    readonly rel?: 'alternate'
    id?: string
    hreflang: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherBreadcrumb {
    title: string
    url: string
}

export interface MetapatcherSafariPinnedTabAttrs {
    readonly rel?: 'mask-icon'
    id?: string
    href: string
    color: string
    [index: string]: string | boolean
}

export interface MetapatcherFaviconAttrs {
    readonly rel?: 'shortcut icon'
    id?: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherRobotsAttrs {
    readonly name?: 'robots'
    id?: string
    content: string
    [index: string]: string | boolean
}

export interface MetapatcherPreloadAttrs {
    readonly rel?: 'preload'
    id?: string
    href: string
    as?: MetapatcherPreloadAs
    type?: string
    media?: string
    crossorigin?: boolean
    [index: string]: string | boolean
}

export type MetapatcherPreloadAs = 'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'worker' | 'video'

export interface MetapatcherPrefetchAttrs {
    readonly rel?: 'prefetch'
    id?: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherPreconnectAttrs {
    readonly rel?: 'preconnect'
    id?: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherDnsPrefetchAttrs {
    readonly rel?: 'dns-prefetch'
    id?: string
    href: string
    [index: string]: string | boolean
}

export interface MetapatcherProjectParams {
    favicon?: string | MetapatcherFaviconAttrs
    name?: string
    url?: string
    robots?: string | MetapatcherRobotsAttrs
    logo?: string
    themeColor?: string
    primaryColor?: string
    backgroundColor?: string
    twitterSite?: string
    safariPinnedTab?: MetapatcherSafariPinnedTabAttrs
    icons?: string[]
}

export interface MetapatcherMsApplicationConfigAttrs {
    readonly name?: 'msapplication-config'
    id?: string
    content: string
    [index: string]: string | boolean
}

export interface MetapatcherPageParams {
    title?: string
    description?: string
    path?: string
    image?: string
    locale?: string
    canonical?: string
    mobileVariant?: string
    localVersions?: MetapatcherLocalVersionLinkAttrs[],
    breadcrumb?: MetapatcherBreadcrumb[]
}

export interface MetapatcherPageImage {
    path: string
    width?: string | number
    height?: string | number
}

export const metapatcher = new Metapatcher()
