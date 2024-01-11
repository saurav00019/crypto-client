import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import {
    widget,
    IChartingLibraryWidget,
    ChartingLibraryWidgetOptions,
    LanguageCode,
    ResolutionString
} from '../../../assets/charting_library';
// import { subscribeOnStream, unsubscribeFromStream } from './streaming.js';

import { SubscribeBarsCallback } from '../../../assets/charting_library';
@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
    @Input() items?: "";
    private _interval: ChartingLibraryWidgetOptions['interval'] = '1' as ResolutionString;
    // BEWARE: no trailing slash is expected in feed URL
    //   private _datafeedUrl = 'https://demo_feed.tradingview.com';
    private _datafeedUrl = 'https://www.marketwicks.com:4001';
    // private _datafeedUrl = 'https://192.168.0.155:4000/history';
    private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
    private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://www.marketwicks.com:4000';
    private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
    private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
    private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
    private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
    private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
    private _containerId: ChartingLibraryWidgetOptions['container'] = 'tv_chart_container';
    private _tvWidget: IChartingLibraryWidget | null = null;

    @Input()
    set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
        this._symbol = symbol || this._symbol;
    }

    @Input()
    set interval(interval: ChartingLibraryWidgetOptions['interval']) {
        this._interval = interval || this._interval;
    }

    @Input()
    set datafeedUrl(datafeedUrl: string) {
        this._datafeedUrl = datafeedUrl || this._datafeedUrl;
    }

    @Input()
    set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
        this._libraryPath = libraryPath || this._libraryPath;
    }

    @Input()
    set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
        this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
    }

    @Input()
    set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
        this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
    }

    @Input()
    set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
        this._clientId = clientId || this._clientId;
    }

    @Input()
    set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
        this._userId = ""
    }

    @Input()
    set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
        this._fullscreen = fullscreen || this._fullscreen;
    }

    @Input()
    set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
        this._autosize = autosize || this._autosize;
    }

    @Input()
    set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
        this._containerId = containerId || this._containerId;
    }

    _symbol: ChartingLibraryWidgetOptions['symbol']

    ngOnInit() {
        // console.log('items', this.items)
        this._symbol = this.items
        this.getChartWigit()

    }
    getChartWigit() {
        function getLanguageFromURL(): LanguageCode | null {
            const regex = new RegExp('[\\?&]lang=([^&#]*)');
            const results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
        }
        console.log("this._symbolthis._symbol", this._symbol)
        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: 'ETHUSDT',
            theme: "dark",
            toolbar_bg: "#0000",
            "timezone": "Asia/Kolkata",
            datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl, 1000),

            interval: this._interval,
            container: this._containerId,
            library_path: this._libraryPath,

            enable_publishing: true,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            news: ["headlines"],
            studies: [
                "Volume@tv-basicstudies"
            ],
            locale: getLanguageFromURL() || 'en',
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: this._chartsStorageUrl,
            charts_storage_api_version: this._chartsStorageApiVersion,
            client_id: this._clientId,
            user_id: this._userId,
            fullscreen: this._fullscreen,
            autosize: this._autosize,



        };

        const tvWidget = new widget(widgetOptions);
        this._tvWidget = tvWidget;

        tvWidget.onChartReady(() => {

            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton();
                button.setAttribute('title', 'Click to show a notification popup');
                button.classList.add('apply-common-tooltip');
                button.addEventListener('click', () => tvWidget.showNoticeDialog({
                    title: 'Notification',
                    body: 'TradingView Charting Library API works correctly',
                    callback: () => {
                        console.log('Noticed!');
                    },
                }));
                button.innerHTML = 'Check API';
            });
        });
    }
    chartData(chartData: any): void {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy() {
        if (this._tvWidget !== null) {
            this._tvWidget.remove();
            this._tvWidget = null;
        }
    }

    ngOnChanges(changes: any) {
        console.log("changes", changes.items.currentValue
        )
        this._symbol = changes.items.currentValue;
        console.log("this._symbol", this._symbol)

        this.getChartWigit()
        // console.log("vikas pathak", this.items)
        // set page when items array first set or changed

    }
}
