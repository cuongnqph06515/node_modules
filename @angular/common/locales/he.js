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
        define("@angular/common/locales/he", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        if (i === 2 && v === 0)
            return 2;
        if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0)
            return 4;
        return 5;
    }
    exports.default = [
        'he',
        [['לפנה״צ', 'אחה״צ'], u, u],
        [['לפנה״צ', 'אחה״צ'], ['AM', 'PM'], u],
        [
            ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
            [
                'יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳',
                'שבת'
            ],
            [
                'יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי',
                'יום חמישי', 'יום שישי', 'יום שבת'
            ],
            ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']
        ],
        u,
        [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            [
                'ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳',
                'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'
            ],
            [
                'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי',
                'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
            ]
        ],
        u,
        [['לפנה״ס', 'לספירה'], u, ['לפני הספירה', 'לספירה']],
        0,
        [5, 6],
        ['d.M.y', 'd בMMM y', 'd בMMMM y', 'EEEE, d בMMMM y'],
        ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
        ['{1}, {0}', u, '{1} בשעה {0}', u],
        ['.', ',', ';', '%', '\u200e+', '\u200e-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\u200f#,##0.00 ¤;\u200f-#,##0.00 ¤', '#E0'],
        'ILS',
        '₪',
        'שקל חדש',
        {
            'BYN': [u, 'р'],
            'CNY': ['\u200eCN¥\u200e', '¥'],
            'ILP': ['ל״י'],
            'THB': ['฿'],
            'TWD': ['NT$']
        },
        'rtl',
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9oZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLFNBQVMsTUFBTSxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsSUFBSTtRQUNKLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QztZQUNFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzFDO2dCQUNFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUTtnQkFDMUQsS0FBSzthQUNOO1lBQ0Q7Z0JBQ0UsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsV0FBVztnQkFDaEQsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTO2FBQ25DO1lBQ0QsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7U0FDM0M7UUFDRCxDQUFDO1FBQ0Q7WUFDRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQy9EO2dCQUNFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO2dCQUM1RCxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO2FBQy9CO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtnQkFDeEQsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU87YUFDakQ7U0FDRjtRQUNELENBQUM7UUFDRCxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztRQUNyRCxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztRQUNoRCxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQzFFLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxvQ0FBb0MsRUFBRSxLQUFLLENBQUM7UUFDcEUsS0FBSztRQUNMLEdBQUc7UUFDSCxTQUFTO1FBQ1Q7WUFDRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ2YsS0FBSyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDO1lBQy9CLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNmO1FBQ0QsS0FBSztRQUNMLE1BQU07S0FDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuLy8gU2VlIGFuZ3VsYXIvdG9vbHMvZ3VscC10YXNrcy9jbGRyL2V4dHJhY3QuanNcblxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSksIHYgPSBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKS5sZW5ndGg7XG4gIGlmIChpID09PSAxICYmIHYgPT09IDApIHJldHVybiAxO1xuICBpZiAoaSA9PT0gMiAmJiB2ID09PSAwKSByZXR1cm4gMjtcbiAgaWYgKHYgPT09IDAgJiYgIShuID49IDAgJiYgbiA8PSAxMCkgJiYgbiAlIDEwID09PSAwKSByZXR1cm4gNDtcbiAgcmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJ2hlJyxcbiAgW1sn15zXpNeg15TXtNemJywgJ9eQ15fXlNe016YnXSwgdSwgdV0sXG4gIFtbJ9ec16TXoNeU17TXpicsICfXkNeX15TXtNemJ10sIFsnQU0nLCAnUE0nXSwgdV0sXG4gIFtcbiAgICBbJ9eQ17MnLCAn15HXsycsICfXktezJywgJ9eT17MnLCAn15TXsycsICfXldezJywgJ9ep17MnXSxcbiAgICBbXG4gICAgICAn15nXldedINeQ17MnLCAn15nXldedINeR17MnLCAn15nXldedINeS17MnLCAn15nXldedINeT17MnLCAn15nXldedINeU17MnLCAn15nXldedINeV17MnLFxuICAgICAgJ9ep15HXqidcbiAgICBdLFxuICAgIFtcbiAgICAgICfXmdeV150g16jXkNep15XXnycsICfXmdeV150g16nXoNeZJywgJ9eZ15XXnSDXqdec15nXqdeZJywgJ9eZ15XXnSDXqNeR15nXoteZJyxcbiAgICAgICfXmdeV150g15fXnteZ16nXmScsICfXmdeV150g16nXmdep15knLCAn15nXldedINep15HXqidcbiAgICBdLFxuICAgIFsn15DXsycsICfXkdezJywgJ9eS17MnLCAn15PXsycsICfXlNezJywgJ9eV17MnLCAn16nXsyddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJywgJzEyJ10sXG4gICAgW1xuICAgICAgJ9eZ16DXldezJywgJ9ek15HXqNezJywgJ9ee16jXpScsICfXkNek16jXsycsICfXnteQ15knLCAn15nXldeg15knLCAn15nXldec15knLCAn15DXldeS17MnLFxuICAgICAgJ9eh16TXmNezJywgJ9eQ15XXp9ezJywgJ9eg15XXkdezJywgJ9eT16bXntezJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ9eZ16DXldeQ16gnLCAn16TXkdeo15XXkNeoJywgJ9ee16jXpScsICfXkNek16jXmdecJywgJ9ee15DXmScsICfXmdeV16DXmScsICfXmdeV15zXmScsXG4gICAgICAn15DXldeS15XXodeYJywgJ9eh16TXmNee15HXqCcsICfXkNeV16fXmNeV15HXqCcsICfXoNeV15HXnteR16gnLCAn15PXptee15HXqCdcbiAgICBdXG4gIF0sXG4gIHUsXG4gIFtbJ9ec16TXoNeU17TXoScsICfXnNeh16TXmdeo15QnXSwgdSwgWyfXnNek16DXmSDXlNeh16TXmdeo15QnLCAn15zXodek15nXqNeUJ11dLFxuICAwLFxuICBbNSwgNl0sXG4gIFsnZC5NLnknLCAnZCDXkU1NTSB5JywgJ2Qg15FNTU1NIHknLCAnRUVFRSwgZCDXkU1NTU0geSddLFxuICBbJ0g6bW0nLCAnSDptbTpzcycsICdIOm1tOnNzIHonLCAnSDptbTpzcyB6enp6J10sXG4gIFsnezF9LCB7MH0nLCB1LCAnezF9INeR16nXoteUIHswfScsIHVdLFxuICBbJy4nLCAnLCcsICc7JywgJyUnLCAnXFx1MjAwZSsnLCAnXFx1MjAwZS0nLCAnRScsICfDlycsICfigLAnLCAn4oieJywgJ05hTicsICc6J10sXG4gIFsnIywjIzAuIyMjJywgJyMsIyMwJScsICdcXHUyMDBmIywjIzAuMDDCoMKkO1xcdTIwMGYtIywjIzAuMDDCoMKkJywgJyNFMCddLFxuICAnSUxTJyxcbiAgJ+KCqicsXG4gICfXqden15wg15fXk9epJyxcbiAge1xuICAgICdCWU4nOiBbdSwgJ9GAJ10sXG4gICAgJ0NOWSc6IFsnXFx1MjAwZUNOwqVcXHUyMDBlJywgJ8KlJ10sXG4gICAgJ0lMUCc6IFsn15zXtNeZJ10sXG4gICAgJ1RIQic6IFsn4Li/J10sXG4gICAgJ1RXRCc6IFsnTlQkJ11cbiAgfSxcbiAgJ3J0bCcsXG4gIHBsdXJhbFxuXTtcbiJdfQ==