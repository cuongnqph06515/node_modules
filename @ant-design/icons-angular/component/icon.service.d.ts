import { HttpBackend, HttpClient } from '@angular/common/http';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CachedIconDefinition, IconDefinition, ThemeType, TwoToneColorPalette, TwoToneColorPaletteSetter } from '../types';
export declare class IconService {
    protected _rendererFactory: RendererFactory2;
    protected _handler: HttpBackend;
    protected _document: any;
    protected sanitizer: DomSanitizer;
    defaultTheme: ThemeType;
    twoToneColor: TwoToneColorPaletteSetter;
    protected _renderer: Renderer2;
    protected _http: HttpClient;
    /**
     * All icon definitions would be registered here.
     */
    protected readonly _svgDefinitions: Map<string, IconDefinition>;
    /**
     * Cache all rendered icons. Icons are identified by name, theme,
     * and for twotone icons, primary color and secondary color.
     */
    protected readonly _svgRenderedDefinitions: Map<string, CachedIconDefinition>;
    protected _inProgressFetches: Map<string, Observable<IconDefinition | null>>;
    /**
     * Url prefix for fetching inline SVG by dynamic importing.
     */
    protected _assetsUrlRoot: string;
    protected _twoToneColorPalette: TwoToneColorPalette;
    /** A flag indicates whether jsonp loading is enabled. */
    private _enableJsonpLoading;
    private readonly _jsonpIconLoad$;
    constructor(_rendererFactory: RendererFactory2, _handler: HttpBackend, _document: any, sanitizer: DomSanitizer);
    /**
     * Call this method to switch to jsonp like loading.
     */
    useJsonpLoading(): void;
    /**
     * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
     * @param prefix
     */
    changeAssetsSource(prefix: string): void;
    /**
     * Add icons provided by ant design.
     * @param icons
     */
    addIcon(...icons: IconDefinition[]): void;
    /**
     * Register an icon. Namespace is required.
     * @param type
     * @param literal
     */
    addIconLiteral(type: string, literal: string): void;
    /**
     * Remove all cache.
     */
    clear(): void;
    /**
     * Get a rendered `SVGElement`.
     * @param icon
     * @param twoToneColor
     */
    getRenderedContent(icon: IconDefinition | string, twoToneColor?: string): Observable<SVGElement>;
    getCachedIcons(): Map<string, IconDefinition>;
    /**
     * Get raw svg and assemble a `IconDefinition` object.
     * @param type
     */
    protected _loadIconDynamically(type: string): Observable<IconDefinition | null>;
    protected _loadIconDynamicallyWithJsonp(icon: IconDefinition, url: string): Observable<IconDefinition>;
    /**
     * Render a new `SVGElement` for a given `IconDefinition`, or make a copy from cache.
     * @param icon
     * @param twoToneColor
     */
    protected _loadSVGFromCacheOrCreateNew(icon: IconDefinition, twoToneColor?: string): SVGElement;
    protected _createSVGElementFromString(str: string): SVGElement;
    protected _setSVGAttribute(svg: SVGElement): SVGElement;
    protected _colorizeSVGIcon(svg: SVGElement, twotone: boolean, pri: string, sec: string): SVGElement;
}
