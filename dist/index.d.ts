export declare class Metapatcher {
    features: MetapatcherFeatures[];
    idPrefix: string;
    idCounters: {
        preload: number;
        prefetch: number;
        preconnect: number;
        dnsPrefetch: number;
    };
    isDomAvailable: boolean;
    memory: string[];
    htmlVoidElements: string[];
    mimeTypesByExtension: {
        svg: string;
        png: string;
        jpg: string;
        jpeg: string;
        ico: string;
        gif: string;
        webp: string;
        bmp: string;
    };
    reImageSizeFromStr: RegExp;
    appleTouchIconSizes: string[];
    webAppManifestIconSizes: string[];
    msTilesNamingMap: {
        '70x70': string;
        '150x150': string;
        '310x310': string;
        '310x150': string;
    };
    constructor();
    configure(features?: MetapatcherFeatures[], settings?: MetapatcherSettings): void;
    setIcons(list: string[]): this;
    setPageDetails(params: MetapatcherPageParams): this;
    setPageTitle(title: string): this;
    setPageDescription(description: string): this;
    setPageUrl(url: string): this;
    setPageImage(param: string | MetapatcherPageImage): this;
    setPageLocale(locale: string): void;
    setProjectDetails(params: MetapatcherProjectParams): this;
    setProjectName(name: string): this;
    setProjectUrl(url: string): this;
    setThemeColor(colorHexCode: string): this;
    setTwitterSite(username: string): this;
    addDnsPrefetch(param: string | MetapatcherDnsPrefetchAttrs): this;
    addPreconnect(param: string | MetapatcherPreconnectAttrs): this;
    addPrefetch(param: string | MetapatcherPrefetchAttrs): this;
    addPreload(param: string | MetapatcherPreloadAttrs): this;
    setRobots(param: string | MetapatcherRobotsAttrs): this;
    setDocumentTitle(title: string): this;
    setFavicon(param: string | MetapatcherFaviconAttrs): this;
    setMsApplicationConfig(param: string | MetapatcherMsApplicationConfigAttrs): this;
    setSafariPinnedTab(attrs: MetapatcherSafariPinnedTabAttrs): this;
    setAppleStatusBarStyle(content?: 'default' | 'black' | 'black-translucent'): this;
    setBreadcrumb(data: MetapatcherBreadcrumb[]): HTMLScriptElement | string;
    setJsonLdDom(id: string, data: string): HTMLScriptElement;
    setJsonLdMemory(id: string, data: string): string;
    setCanonical(param: string | MetapatcherCanonicalLinkAttrs): this;
    setMeta(name: string, content: string): this;
    setMobileVariant(param: string | MetapatcherMobileVariantLinkAttrs): this;
    setLocalVersions(param: MetapatcherLocalVersionLinkAttrs[], currentLang?: string): this;
    setJsonLd(id: string, data: Record<string, never>): HTMLScriptElement | string;
    removeOne(tagName: string, attrs: Record<string, string>): this;
    removeMany(tagName: string, attrs: Record<string, string | boolean>): this;
    dump(): string;
    flushMemory(): this;
    set(tagName: string, attrs?: MetapatcherHtmlTagAttrs, settings?: MetapatcherSetSettings): string | HTMLElement;
    setDom(tagName: string, attrs: MetapatcherHtmlTagAttrs | undefined, _settings: MetapatcherSetSettings): HTMLElement;
    setMemory(tagName: string, attrs: MetapatcherHtmlTagAttrs | undefined, settings: MetapatcherSetSettings): string;
    setElementAttrs(elem: HTMLElement, attrs?: MetapatcherHtmlTagAttrs): void;
    setScript(attrs: MetapatcherSetJsAttrs, settings?: MetapatcherSetJsSettings): Promise<HTMLScriptElement | string>;
    setStylesheet(attrs: MetapatcherSetStylesheetAttrs, settings?: MetapatcherSetStylesheetSettings): Promise<HTMLLinkElement | string>;
    serializeAttrs(attrs?: MetapatcherHtmlTagAttrs): string;
    findMimeType(path: string): string | undefined;
}
export type MetapatcherFeatures = 'structuredData' | 'webAppManifest' | 'msTags' | 'appleTags' | 'openGraphTags' | 'twitterTags';
export interface MetapatcherSettings {
    idPrefix?: string;
}
export type MetapatcherHtmlTagAttrs = Record<string, string | boolean>;
export interface MetapatcherSetStylesheetAttrs {
    id: string;
    readonly rel?: 'stylesheet';
    href: string;
    media?: string;
    [index: string]: string | boolean;
}
export interface MetapatcherSetStylesheetSettings {
    location?: 'headEnd' | 'bodyEnd' | 'bodyStart';
    timeout?: number;
}
export interface MetapatcherSetJsAttrs {
    id: string;
    type?: string;
    src: string;
    async?: boolean;
    [index: string]: string | boolean;
}
export interface MetapatcherSetJsSettings {
    location?: 'headEnd' | 'bodyEnd' | 'bodyStart';
    waitForLoad?: string;
    timeout?: number;
}
export interface MetapatcherSetSettings {
    void?: boolean;
}
export interface MetapatcherCanonicalLinkAttrs {
    readonly rel?: 'canonical';
    id?: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherMobileVariantLinkAttrs {
    readonly rel?: 'alternate';
    id?: string;
    media: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherLocalVersionLinkAttrs {
    readonly rel?: 'alternate';
    id?: string;
    hreflang: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherBreadcrumb {
    title: string;
    url: string;
}
export interface MetapatcherSafariPinnedTabAttrs {
    readonly rel?: 'mask-icon';
    id?: string;
    href: string;
    color: string;
    [index: string]: string | boolean;
}
export interface MetapatcherFaviconAttrs {
    readonly rel?: 'shortcut icon';
    id?: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherRobotsAttrs {
    readonly name?: 'robots';
    id?: string;
    content: string;
    [index: string]: string | boolean;
}
export interface MetapatcherPreloadAttrs {
    readonly rel?: 'preload';
    id?: string;
    href: string;
    as?: MetapatcherPreloadAs;
    type?: string;
    media?: string;
    crossorigin?: boolean;
    [index: string]: string | boolean;
}
export type MetapatcherPreloadAs = 'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'worker' | 'video';
export interface MetapatcherPrefetchAttrs {
    readonly rel?: 'prefetch';
    id?: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherPreconnectAttrs {
    readonly rel?: 'preconnect';
    id?: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherDnsPrefetchAttrs {
    readonly rel?: 'dns-prefetch';
    id?: string;
    href: string;
    [index: string]: string | boolean;
}
export interface MetapatcherProjectParams {
    favicon?: string | MetapatcherFaviconAttrs;
    name?: string;
    url?: string;
    robots?: string | MetapatcherRobotsAttrs;
    logo?: string;
    themeColor?: string;
    primaryColor?: string;
    backgroundColor?: string;
    twitterSite?: string;
    safariPinnedTab?: MetapatcherSafariPinnedTabAttrs;
    icons?: string[];
    email?: string;
    phone?: string;
    description?: string;
    image?: string;
    legalName?: string;
    address?: {
        country: string;
        region?: string;
        city?: string;
        postalCode?: string;
        street?: string;
    };
}
export interface MetapatcherMsApplicationConfigAttrs {
    readonly name?: 'msapplication-config';
    id?: string;
    content: string;
    [index: string]: string | boolean;
}
export interface MetapatcherPageParams {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    robots?: string | MetapatcherRobotsAttrs;
    locale?: string;
    canonical?: string;
    mobileVariant?: string;
    localVersions?: MetapatcherLocalVersionLinkAttrs[];
    breadcrumb?: MetapatcherBreadcrumb[];
}
export interface MetapatcherPageImage {
    path: string;
    width?: string | number;
    height?: string | number;
}
export declare const metapatcher: Metapatcher;
