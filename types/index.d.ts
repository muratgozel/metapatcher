export declare class Metapatcher {
    #private;
    settings: Settings;
    constructor();
    configure(userSettings?: Settings): Metapatcher;
    setFavicon(path: string): Metapatcher;
    setProjectMeta(obj: ProjectMetaInput): Metapatcher;
    robots(directives: string): Metapatcher;
    prioritize(url: string, method: string): Metapatcher;
    removeAllPrioritizations(): Metapatcher;
    setIcons(list: string[]): Metapatcher;
    setPageMeta(obj: PageMetaInput): Metapatcher;
    setCanonical(url: string): Metapatcher;
    removeAllCanonicals(): Metapatcher;
    setLocalVersion(locale: string, url: string, isActiveLocale?: boolean): Metapatcher;
    removeAllLocalVersions(): Metapatcher;
    setPageTitle(title: string): Metapatcher;
    setSafariMobileWebApp(obj: SafariInput): Metapatcher;
    setSafariPinnedTab(url: string, color: string): Metapatcher;
    setFacebookMeta(obj: FacebookMetaInput): Metapatcher;
    setTwitterMeta(obj: TwitterMetaInput): Metapatcher;
    breadcrumb(data: Breadcrumb[], attrs?: HtmlElementAttrs): Promise<Metapatcher>;
    set(tag: string, id: string | undefined, attrs?: HtmlElementAttrs): string | HTMLElement;
    formatImageInput(input: ImageInput | string): ImageInput;
    findMimeType(path: string): string | undefined;
    dump(): string;
    patch(elem: HTMLElement): void;
    createElement(tag: string, attrs: HtmlElementAttrs): HTMLElement;
    hasElement(query: string): HTMLElement | null;
    isArray(v: unknown): v is any[];
    isObject(v: unknown): v is object;
}
export declare const metapatcher: Metapatcher;
export interface Settings {
    structuredData?: {
        enabled: boolean;
    };
    androidChromeIcons?: {
        enabled: boolean;
    };
    msTags?: {
        enabled: boolean;
    };
    safariTags?: {
        enabled: boolean;
    };
    appleTags?: {
        enabled: boolean;
    };
    openGraphTags?: {
        enabled: boolean;
    };
    twitterTags?: {
        enabled: boolean;
    };
    facebookTags?: {
        enabled: boolean;
    };
}
export interface HtmlElementAttrs {
    [key: string]: string;
}
export interface MimeTypesByExtension {
    'svg': 'image/svg+xml';
    'png': 'image/png';
    'jpg': 'image/jpeg';
    'jpeg': 'image/jpeg';
    'ico': 'image/x-icon';
    'gif': 'image/gif';
    'webp': 'image/webp';
    'bmp': 'image/bmp';
}
export interface ImageInput {
    url?: string;
    width?: string;
    height?: string;
}
export interface Breadcrumb {
    title: string;
    url: string;
}
export interface TwitterMetaInput {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
}
export interface FacebookMetaInput {
    appId?: string;
}
export interface SafariInput {
    name?: string;
    statusBarStyle?: string;
}
export interface PageMetaInput {
    title?: string;
    description?: string;
    url?: string;
    image?: string | ImageInput;
    locale?: string;
    localVersions?: {
        [index: string]: string;
    };
    canonicals?: string[];
}
export interface MsTilesNamingMap {
    '70x70': 'msapplication-square70x70logo';
    '150x150': 'msapplication-square150x150logo';
    '310x310': 'msapplication-square310x310logo';
    '310x150': 'msapplication-wide310x150logo';
}
export interface ProjectMetaInput {
    name?: string;
    url?: string;
    logo?: string;
    primaryColor?: string;
    backgroundColor?: string;
}
