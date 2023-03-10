import { Injectable } from '@angular/core';
export class UrlHelperService {
    getHashFragmentParams(customHashFragment) {
        let hash = customHashFragment || window.location.hash;
        hash = decodeURIComponent(hash);
        if (hash.indexOf('#') !== 0) {
            return {};
        }
        const questionMarkPosition = hash.indexOf('?');
        if (questionMarkPosition > -1) {
            hash = hash.substr(questionMarkPosition + 1);
        }
        else {
            hash = hash.substr(1);
        }
        return this.parseQueryString(hash);
    }
    parseQueryString(queryString) {
        const data = {};
        let pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;
        if (queryString === null) {
            return data;
        }
        pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf('=');
            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            }
            else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }
            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);
            if (key.substr(0, 1) === '/') {
                key = key.substr(1);
            }
            data[key] = value;
        }
        return data;
    }
}
UrlHelperService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy91cmwtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3BCLHFCQUFxQixDQUFDLGtCQUEyQjtRQUN0RCxJQUFJLElBQUksR0FBRyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUV0RCxJQUFJLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCO1FBRUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFdBQW1CO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLEtBQUssRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQztRQUV0RSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkMsSUFBSSxjQUFjLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM1QyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFFRCxHQUFHLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXpDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUM1QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQXZERixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXJsSGVscGVyU2VydmljZSB7XHJcbiAgcHVibGljIGdldEhhc2hGcmFnbWVudFBhcmFtcyhjdXN0b21IYXNoRnJhZ21lbnQ/OiBzdHJpbmcpOiBvYmplY3Qge1xyXG4gICAgbGV0IGhhc2ggPSBjdXN0b21IYXNoRnJhZ21lbnQgfHwgd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgaGFzaCA9IGRlY29kZVVSSUNvbXBvbmVudChoYXNoKTtcclxuXHJcbiAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgIT09IDApIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXN0aW9uTWFya1Bvc2l0aW9uID0gaGFzaC5pbmRleE9mKCc/Jyk7XHJcblxyXG4gICAgaWYgKHF1ZXN0aW9uTWFya1Bvc2l0aW9uID4gLTEpIHtcclxuICAgICAgaGFzaCA9IGhhc2guc3Vic3RyKHF1ZXN0aW9uTWFya1Bvc2l0aW9uICsgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoYXNoID0gaGFzaC5zdWJzdHIoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5U3RyaW5nOiBzdHJpbmcpOiBvYmplY3Qge1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgbGV0IHBhaXJzLCBwYWlyLCBzZXBhcmF0b3JJbmRleCwgZXNjYXBlZEtleSwgZXNjYXBlZFZhbHVlLCBrZXksIHZhbHVlO1xyXG5cclxuICAgIGlmIChxdWVyeVN0cmluZyA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwYWlycyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwYWlyID0gcGFpcnNbaV07XHJcbiAgICAgIHNlcGFyYXRvckluZGV4ID0gcGFpci5pbmRleE9mKCc9Jyk7XHJcblxyXG4gICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgZXNjYXBlZEtleSA9IHBhaXI7XHJcbiAgICAgICAgZXNjYXBlZFZhbHVlID0gbnVsbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlc2NhcGVkS2V5ID0gcGFpci5zdWJzdHIoMCwgc2VwYXJhdG9ySW5kZXgpO1xyXG4gICAgICAgIGVzY2FwZWRWYWx1ZSA9IHBhaXIuc3Vic3RyKHNlcGFyYXRvckluZGV4ICsgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGVkS2V5KTtcclxuICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlZFZhbHVlKTtcclxuXHJcbiAgICAgIGlmIChrZXkuc3Vic3RyKDAsIDEpID09PSAnLycpIHtcclxuICAgICAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcbn1cclxuIl19