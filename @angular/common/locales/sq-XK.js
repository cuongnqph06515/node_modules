/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/sq-XK", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        if (n === 1)
            return 1;
        return 5;
    }
    exports.default = [
        'sq-XK',
        [['p.d.', 'm.d.'], u, ['e paradites', 'e pasdites']],
        [['p.d.', 'm.d.'], u, ['paradite', 'pasdite']],
        [
            ['d', 'h', 'm', 'm', 'e', 'p', 'sh'], ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
            ['e diel', 'e hënë', 'e martë', 'e mërkurë', 'e enjte', 'e premte', 'e shtunë'],
            ['die', 'hën', 'mar', 'mër', 'enj', 'pre', 'sht']
        ],
        [
            ['d', 'h', 'm', 'm', 'e', 'p', 'sh'], ['die', 'hën', 'mar', 'mër', 'enj', 'pre', 'sht'],
            ['e diel', 'e hënë', 'e martë', 'e mërkurë', 'e enjte', 'e premte', 'e shtunë'],
            ['die', 'hën', 'mar', 'mër', 'enj', 'pre', 'sht']
        ],
        [
            ['j', 'sh', 'm', 'p', 'm', 'q', 'k', 'g', 'sh', 't', 'n', 'dh'],
            ['jan', 'shk', 'mar', 'pri', 'maj', 'qer', 'korr', 'gush', 'sht', 'tet', 'nën', 'dhj'],
            [
                'janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor',
                'nëntor', 'dhjetor'
            ]
        ],
        u,
        [['p.K.', 'mb.K.'], u, ['para Krishtit', 'mbas Krishtit']],
        1,
        [6, 0],
        ['d.M.yy', 'd MMM y', 'd MMMM y', 'EEEE, d MMMM y'],
        ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
        ['{1}, {0}', u, '{1} \'në\' {0}', u],
        [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'],
        'EUR',
        '€',
        'Euroja',
        {
            'ALL': ['Lekë'],
            'AOA': [],
            'ARS': [],
            'AUD': ['A$', 'AUD'],
            'BAM': [],
            'BBD': [],
            'BDT': [],
            'BMD': [],
            'BND': [],
            'BOB': [],
            'BRL': [],
            'BSD': [],
            'BWP': [],
            'BYN': [],
            'BZD': [],
            'CAD': ['CA$', 'CAD'],
            'CLP': [],
            'CNY': ['CN¥', 'CNY'],
            'COP': [],
            'CRC': [],
            'CUC': [],
            'CUP': [],
            'CZK': [],
            'DKK': [],
            'DOP': [],
            'EGP': [],
            'EUR': ['€', 'EUR'],
            'FJD': [],
            'FKP': [],
            'GBP': ['£', 'GBP'],
            'GEL': [],
            'GIP': [],
            'GNF': [],
            'GTQ': [],
            'GYD': [],
            'HKD': ['HK$', 'HKS'],
            'HNL': [],
            'HRK': [],
            'HUF': [],
            'IDR': [],
            'ILS': ['₪', 'ILS'],
            'INR': ['₹', 'INR'],
            'ISK': [],
            'JMD': [],
            'JPY': ['JP¥', 'JPY'],
            'KHR': [],
            'KMF': [],
            'KPW': [],
            'KRW': ['₩', 'KRW'],
            'KYD': [],
            'KZT': [],
            'LAK': [],
            'LBP': [],
            'LKR': [],
            'LRD': [],
            'MGA': [],
            'MMK': [],
            'MNT': [],
            'MUR': [],
            'MXN': ['MX$', 'MXN'],
            'MYR': [],
            'NAD': [],
            'NGN': [],
            'NIO': [],
            'NOK': [],
            'NPR': [],
            'NZD': ['NZ$', 'NZD'],
            'PHP': [],
            'PKR': [],
            'PLN': [],
            'PYG': [],
            'RON': [],
            'RUB': [],
            'RWF': [],
            'SBD': [],
            'SEK': [],
            'SGD': [],
            'SHP': [],
            'SRD': [],
            'SSP': [],
            'STN': [],
            'SYP': [],
            'THB': ['฿', 'THB'],
            'TOP': [],
            'TRY': [],
            'TTD': [],
            'TWD': ['NT$', 'TWD'],
            'UAH': [],
            'USD': ['US$', 'USD'],
            'UYU': [],
            'VND': ['₫', 'VND'],
            'XCD': ['EC$', 'XCD'],
            'ZAR': [],
            'ZMW': []
        },
        'ltr',
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3EtWEsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9zcS1YSy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLFNBQVMsTUFBTSxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsT0FBTztRQUNQLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUN2RixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUMvRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNsRDtRQUNEO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUN2RixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUMvRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNsRDtRQUNEO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztZQUMvRCxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3RGO2dCQUNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU87Z0JBQzNGLFFBQVEsRUFBRSxTQUFTO2FBQ3BCO1NBQ0Y7UUFDRCxDQUFDO1FBQ0QsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNOLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUM7UUFDbkQsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7UUFDcEQsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQzlELENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDO1FBQzVDLEtBQUs7UUFDTCxHQUFHO1FBQ0gsUUFBUTtRQUNSO1lBQ0UsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7WUFDcEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDckIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDckIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3JCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNyQixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNyQixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRCxLQUFLO1FBQ0wsTUFBTTtLQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKG4gPT09IDEpIHJldHVybiAxO1xuICByZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnc3EtWEsnLFxuICBbWydwLmQuJywgJ20uZC4nXSwgdSwgWydlIHBhcmFkaXRlcycsICdlIHBhc2RpdGVzJ11dLFxuICBbWydwLmQuJywgJ20uZC4nXSwgdSwgWydwYXJhZGl0ZScsICdwYXNkaXRlJ11dLFxuICBbXG4gICAgWydkJywgJ2gnLCAnbScsICdtJywgJ2UnLCAncCcsICdzaCddLCBbJ0RpZScsICdIw6tuJywgJ01hcicsICdNw6tyJywgJ0VuaicsICdQcmUnLCAnU2h0J10sXG4gICAgWydlIGRpZWwnLCAnZSBow6tuw6snLCAnZSBtYXJ0w6snLCAnZSBtw6tya3Vyw6snLCAnZSBlbmp0ZScsICdlIHByZW10ZScsICdlIHNodHVuw6snXSxcbiAgICBbJ2RpZScsICdow6tuJywgJ21hcicsICdtw6tyJywgJ2VuaicsICdwcmUnLCAnc2h0J11cbiAgXSxcbiAgW1xuICAgIFsnZCcsICdoJywgJ20nLCAnbScsICdlJywgJ3AnLCAnc2gnXSwgWydkaWUnLCAnaMOrbicsICdtYXInLCAnbcOrcicsICdlbmonLCAncHJlJywgJ3NodCddLFxuICAgIFsnZSBkaWVsJywgJ2UgaMOrbsOrJywgJ2UgbWFydMOrJywgJ2UgbcOrcmt1csOrJywgJ2UgZW5qdGUnLCAnZSBwcmVtdGUnLCAnZSBzaHR1bsOrJ10sXG4gICAgWydkaWUnLCAnaMOrbicsICdtYXInLCAnbcOrcicsICdlbmonLCAncHJlJywgJ3NodCddXG4gIF0sXG4gIFtcbiAgICBbJ2onLCAnc2gnLCAnbScsICdwJywgJ20nLCAncScsICdrJywgJ2cnLCAnc2gnLCAndCcsICduJywgJ2RoJ10sXG4gICAgWydqYW4nLCAnc2hrJywgJ21hcicsICdwcmknLCAnbWFqJywgJ3FlcicsICdrb3JyJywgJ2d1c2gnLCAnc2h0JywgJ3RldCcsICduw6tuJywgJ2RoaiddLFxuICAgIFtcbiAgICAgICdqYW5hcicsICdzaGt1cnQnLCAnbWFycycsICdwcmlsbCcsICdtYWonLCAncWVyc2hvcicsICdrb3JyaWsnLCAnZ3VzaHQnLCAnc2h0YXRvcicsICd0ZXRvcicsXG4gICAgICAnbsOrbnRvcicsICdkaGpldG9yJ1xuICAgIF1cbiAgXSxcbiAgdSxcbiAgW1sncC5LLicsICdtYi5LLiddLCB1LCBbJ3BhcmEgS3Jpc2h0aXQnLCAnbWJhcyBLcmlzaHRpdCddXSxcbiAgMSxcbiAgWzYsIDBdLFxuICBbJ2QuTS55eScsICdkIE1NTSB5JywgJ2QgTU1NTSB5JywgJ0VFRUUsIGQgTU1NTSB5J10sXG4gIFsnSEg6bW0nLCAnSEg6bW06c3MnLCAnSEg6bW06c3MgeicsICdISDptbTpzcyB6enp6J10sXG4gIFsnezF9LCB7MH0nLCB1LCAnezF9IFxcJ27Dq1xcJyB7MH0nLCB1XSxcbiAgWycsJywgJ8KgJywgJzsnLCAnJScsICcrJywgJy0nLCAnRScsICfDlycsICfigLAnLCAn4oieJywgJ05hTicsICc6J10sXG4gIFsnIywjIzAuIyMjJywgJyMsIyMwJScsICcjLCMjMC4wMMKgwqQnLCAnI0UwJ10sXG4gICdFVVInLFxuICAn4oKsJyxcbiAgJ0V1cm9qYScsXG4gIHtcbiAgICAnQUxMJzogWydMZWvDqyddLFxuICAgICdBT0EnOiBbXSxcbiAgICAnQVJTJzogW10sXG4gICAgJ0FVRCc6IFsnQSQnLCAnQVVEJ10sXG4gICAgJ0JBTSc6IFtdLFxuICAgICdCQkQnOiBbXSxcbiAgICAnQkRUJzogW10sXG4gICAgJ0JNRCc6IFtdLFxuICAgICdCTkQnOiBbXSxcbiAgICAnQk9CJzogW10sXG4gICAgJ0JSTCc6IFtdLFxuICAgICdCU0QnOiBbXSxcbiAgICAnQldQJzogW10sXG4gICAgJ0JZTic6IFtdLFxuICAgICdCWkQnOiBbXSxcbiAgICAnQ0FEJzogWydDQSQnLCAnQ0FEJ10sXG4gICAgJ0NMUCc6IFtdLFxuICAgICdDTlknOiBbJ0NOwqUnLCAnQ05ZJ10sXG4gICAgJ0NPUCc6IFtdLFxuICAgICdDUkMnOiBbXSxcbiAgICAnQ1VDJzogW10sXG4gICAgJ0NVUCc6IFtdLFxuICAgICdDWksnOiBbXSxcbiAgICAnREtLJzogW10sXG4gICAgJ0RPUCc6IFtdLFxuICAgICdFR1AnOiBbXSxcbiAgICAnRVVSJzogWyfigqwnLCAnRVVSJ10sXG4gICAgJ0ZKRCc6IFtdLFxuICAgICdGS1AnOiBbXSxcbiAgICAnR0JQJzogWyfCoycsICdHQlAnXSxcbiAgICAnR0VMJzogW10sXG4gICAgJ0dJUCc6IFtdLFxuICAgICdHTkYnOiBbXSxcbiAgICAnR1RRJzogW10sXG4gICAgJ0dZRCc6IFtdLFxuICAgICdIS0QnOiBbJ0hLJCcsICdIS1MnXSxcbiAgICAnSE5MJzogW10sXG4gICAgJ0hSSyc6IFtdLFxuICAgICdIVUYnOiBbXSxcbiAgICAnSURSJzogW10sXG4gICAgJ0lMUyc6IFsn4oKqJywgJ0lMUyddLFxuICAgICdJTlInOiBbJ+KCuScsICdJTlInXSxcbiAgICAnSVNLJzogW10sXG4gICAgJ0pNRCc6IFtdLFxuICAgICdKUFknOiBbJ0pQwqUnLCAnSlBZJ10sXG4gICAgJ0tIUic6IFtdLFxuICAgICdLTUYnOiBbXSxcbiAgICAnS1BXJzogW10sXG4gICAgJ0tSVyc6IFsn4oKpJywgJ0tSVyddLFxuICAgICdLWUQnOiBbXSxcbiAgICAnS1pUJzogW10sXG4gICAgJ0xBSyc6IFtdLFxuICAgICdMQlAnOiBbXSxcbiAgICAnTEtSJzogW10sXG4gICAgJ0xSRCc6IFtdLFxuICAgICdNR0EnOiBbXSxcbiAgICAnTU1LJzogW10sXG4gICAgJ01OVCc6IFtdLFxuICAgICdNVVInOiBbXSxcbiAgICAnTVhOJzogWydNWCQnLCAnTVhOJ10sXG4gICAgJ01ZUic6IFtdLFxuICAgICdOQUQnOiBbXSxcbiAgICAnTkdOJzogW10sXG4gICAgJ05JTyc6IFtdLFxuICAgICdOT0snOiBbXSxcbiAgICAnTlBSJzogW10sXG4gICAgJ05aRCc6IFsnTlokJywgJ05aRCddLFxuICAgICdQSFAnOiBbXSxcbiAgICAnUEtSJzogW10sXG4gICAgJ1BMTic6IFtdLFxuICAgICdQWUcnOiBbXSxcbiAgICAnUk9OJzogW10sXG4gICAgJ1JVQic6IFtdLFxuICAgICdSV0YnOiBbXSxcbiAgICAnU0JEJzogW10sXG4gICAgJ1NFSyc6IFtdLFxuICAgICdTR0QnOiBbXSxcbiAgICAnU0hQJzogW10sXG4gICAgJ1NSRCc6IFtdLFxuICAgICdTU1AnOiBbXSxcbiAgICAnU1ROJzogW10sXG4gICAgJ1NZUCc6IFtdLFxuICAgICdUSEInOiBbJ+C4vycsICdUSEInXSxcbiAgICAnVE9QJzogW10sXG4gICAgJ1RSWSc6IFtdLFxuICAgICdUVEQnOiBbXSxcbiAgICAnVFdEJzogWydOVCQnLCAnVFdEJ10sXG4gICAgJ1VBSCc6IFtdLFxuICAgICdVU0QnOiBbJ1VTJCcsICdVU0QnXSxcbiAgICAnVVlVJzogW10sXG4gICAgJ1ZORCc6IFsn4oKrJywgJ1ZORCddLFxuICAgICdYQ0QnOiBbJ0VDJCcsICdYQ0QnXSxcbiAgICAnWkFSJzogW10sXG4gICAgJ1pNVyc6IFtdXG4gIH0sXG4gICdsdHInLFxuICBwbHVyYWxcbl07XG4iXX0=