var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as rs from 'jsrsasign';
import { AbstractValidationHandler } from 'angular-oauth2-oidc';
/**
 * Validates the signature of an id_token against one
 * of the keys of an JSON Web Key Set (jwks).
 *
 * This jwks can be provided by the discovery document.
 */
var JwksValidationHandler = /** @class */ (function (_super) {
    __extends(JwksValidationHandler, _super);
    function JwksValidationHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Allowed algorithms
         */
        _this.allowedAlgorithms = [
            'HS256',
            'HS384',
            'HS512',
            'RS256',
            'RS384',
            'RS512',
            'ES256',
            'ES384',
            'PS256',
            'PS384',
            'PS512'
        ];
        /**
         * Time period in seconds the timestamp in the signature can
         * differ from the current time.
         */
        _this.gracePeriodInSec = 600;
        return _this;
    }
    JwksValidationHandler.prototype.validateSignature = function (params, retry) {
        var _this = this;
        if (retry === void 0) { retry = false; }
        if (!params.idToken)
            throw new Error('Parameter idToken expected!');
        if (!params.idTokenHeader)
            throw new Error('Parameter idTokenHandler expected.');
        if (!params.jwks)
            throw new Error('Parameter jwks expected!');
        if (!params.jwks['keys'] ||
            !Array.isArray(params.jwks['keys']) ||
            params.jwks['keys'].length === 0) {
            throw new Error('Array keys in jwks missing!');
        }
        // console.debug('validateSignature: retry', retry);
        var kid = params.idTokenHeader['kid'];
        var keys = params.jwks['keys'];
        var key;
        var alg = params.idTokenHeader['alg'];
        if (kid) {
            key = keys.find(function (k) { return k['kid'] === kid; } /* && k['use'] === 'sig' */);
        }
        else {
            var kty_1 = this.alg2kty(alg);
            var matchingKeys = keys.filter(function (k) { return k['kty'] === kty_1 && k['use'] === 'sig'; });
            /*
                  if (matchingKeys.length == 0) {
                      let error = 'No matching key found.';
                      console.error(error);
                      return Promise.reject(error);
                  }*/
            if (matchingKeys.length > 1) {
                var error = 'More than one matching key found. Please specify a kid in the id_token header.';
                console.error(error);
                return Promise.reject(error);
            }
            else if (matchingKeys.length === 1) {
                key = matchingKeys[0];
            }
        }
        if (!key && !retry && params.loadKeys) {
            return params
                .loadKeys()
                .then(function (loadedKeys) { return (params.jwks = loadedKeys); })
                .then(function (_) { return _this.validateSignature(params, true); });
        }
        if (!key && retry && !kid) {
            var error = 'No matching key found.';
            console.error(error);
            return Promise.reject(error);
        }
        if (!key && retry && kid) {
            var error = 'expected key not found in property jwks. ' +
                'This property is most likely loaded with the ' +
                'discovery document. ' +
                'Expected key id (kid): ' +
                kid;
            console.error(error);
            return Promise.reject(error);
        }
        var keyObj = rs.KEYUTIL.getKey(key);
        var validationOptions = {
            alg: this.allowedAlgorithms,
            gracePeriod: this.gracePeriodInSec
        };
        var isValid = rs.KJUR.jws.JWS.verifyJWT(params.idToken, keyObj, validationOptions);
        if (isValid) {
            return Promise.resolve();
        }
        else {
            return Promise.reject('Signature not valid');
        }
    };
    JwksValidationHandler.prototype.alg2kty = function (alg) {
        switch (alg.charAt(0)) {
            case 'R':
                return 'RSA';
            case 'E':
                return 'EC';
            default:
                throw new Error('Cannot infer kty from alg: ' + alg);
        }
    };
    JwksValidationHandler.prototype.calcHash = function (valueToHash, algorithm) {
        var hashAlg = new rs.KJUR.crypto.MessageDigest({ alg: algorithm });
        var result = hashAlg.digestString(valueToHash);
        var byteArrayAsString = this.toByteArrayAsString(result);
        return Promise.resolve(byteArrayAsString);
    };
    JwksValidationHandler.prototype.toByteArrayAsString = function (hexString) {
        var result = '';
        for (var i = 0; i < hexString.length; i += 2) {
            var hexDigit = hexString.charAt(i) + hexString.charAt(i + 1);
            var num = parseInt(hexDigit, 16);
            result += String.fromCharCode(num);
        }
        return result;
    };
    return JwksValidationHandler;
}(AbstractValidationHandler));
export { JwksValidationHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiandrcy12YWxpZGF0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW9hdXRoMi1vaWRjLWp3a3MvIiwic291cmNlcyI6WyJsaWIvandrcy12YWxpZGF0aW9uLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSx5QkFBeUIsRUFBb0IsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRjs7Ozs7R0FLRztBQUNIO0lBQTJDLHlDQUF5QjtJQUFwRTtRQUFBLHFFQTRJQztRQTNJQzs7V0FFRztRQUNILHVCQUFpQixHQUFhO1lBQzVCLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1NBQ1IsQ0FBQztRQUVGOzs7V0FHRztRQUNILHNCQUFnQixHQUFHLEdBQUcsQ0FBQzs7SUFzSHpCLENBQUM7SUFwSEMsaURBQWlCLEdBQWpCLFVBQWtCLE1BQXdCLEVBQUUsS0FBYTtRQUF6RCxpQkF1RkM7UUF2RjJDLHNCQUFBLEVBQUEsYUFBYTtRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFOUQsSUFDRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3BCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxD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R0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQTVJRCxDQUEyQyx5QkFBeUIsR0E0SW5FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcnMgZnJvbSAnanNyc2FzaWduJztcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWxpZGF0aW9uSGFuZGxlciwgVmFsaWRhdGlvblBhcmFtcyB9IGZyb20gJ2FuZ3VsYXItb2F1dGgyLW9pZGMnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyB0aGUgc2lnbmF0dXJlIG9mIGFuIGlkX3Rva2VuIGFnYWluc3Qgb25lXHJcbiAqIG9mIHRoZSBrZXlzIG9mIGFuIEpTT04gV2ViIEtleSBTZXQgKGp3a3MpLlxyXG4gKlxyXG4gKiBUaGlzIGp3a3MgY2FuIGJlIHByb3ZpZGVkIGJ5IHRoZSBkaXNjb3ZlcnkgZG9jdW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSndrc1ZhbGlkYXRpb25IYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RWYWxpZGF0aW9uSGFuZGxlciB7XHJcbiAgLyoqXHJcbiAgICogQWxsb3dlZCBhbGdvcml0aG1zXHJcbiAgICovXHJcbiAgYWxsb3dlZEFsZ29yaXRobXM6IHN0cmluZ1tdID0gW1xyXG4gICAgJ0hTMjU2JyxcclxuICAgICdIUzM4NCcsXHJcbiAgICAnSFM1MTInLFxyXG4gICAgJ1JTMjU2JyxcclxuICAgICdSUzM4NCcsXHJcbiAgICAnUlM1MTInLFxyXG4gICAgJ0VTMjU2JyxcclxuICAgICdFUzM4NCcsXHJcbiAgICAnUFMyNTYnLFxyXG4gICAgJ1BTMzg0JyxcclxuICAgICdQUzUxMidcclxuICBdO1xyXG5cclxuICAvKipcclxuICAgKiBUaW1lIHBlcmlvZCBpbiBzZWNvbmRzIHRoZSB0aW1lc3RhbXAgaW4gdGhlIHNpZ25hdHVyZSBjYW5cclxuICAgKiBkaWZmZXIgZnJvbSB0aGUgY3VycmVudCB0aW1lLlxyXG4gICAqL1xyXG4gIGdyYWNlUGVyaW9kSW5TZWMgPSA2MDA7XHJcblxyXG4gIHZhbGlkYXRlU2lnbmF0dXJlKHBhcmFtczogVmFsaWRhdGlvblBhcmFtcywgcmV0cnkgPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBpZiAoIXBhcmFtcy5pZFRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBpZFRva2VuIGV4cGVjdGVkIScpO1xyXG4gICAgaWYgKCFwYXJhbXMuaWRUb2tlbkhlYWRlcilcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgaWRUb2tlbkhhbmRsZXIgZXhwZWN0ZWQuJyk7XHJcbiAgICBpZiAoIXBhcmFtcy5qd2tzKSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBqd2tzIGV4cGVjdGVkIScpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgIXBhcmFtcy5qd2tzWydrZXlzJ10gfHxcclxuICAgICAgIUFycmF5LmlzQXJyYXkocGFyYW1zLmp3a3NbJ2tleXMnXSkgfHxcclxuICAgICAgcGFyYW1zLmp3a3NbJ2tleXMnXS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGtleXMgaW4gandrcyBtaXNzaW5nIScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZGVidWcoJ3ZhbGlkYXRlU2lnbmF0dXJlOiByZXRyeScsIHJldHJ5KTtcclxuXHJcbiAgICBsZXQga2lkOiBzdHJpbmcgPSBwYXJhbXMuaWRUb2tlbkhlYWRlclsna2lkJ107XHJcbiAgICBsZXQga2V5czogb2JqZWN0W10gPSBwYXJhbXMuandrc1sna2V5cyddO1xyXG4gICAgbGV0IGtleTogb2JqZWN0O1xyXG5cclxuICAgIGxldCBhbGcgPSBwYXJhbXMuaWRUb2tlbkhlYWRlclsnYWxnJ107XHJcblxyXG4gICAgaWYgKGtpZCkge1xyXG4gICAgICBrZXkgPSBrZXlzLmZpbmQoayA9PiBrWydraWQnXSA9PT0ga2lkIC8qICYmIGtbJ3VzZSddID09PSAnc2lnJyAqLyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQga3R5ID0gdGhpcy5hbGcya3R5KGFsZyk7XHJcbiAgICAgIGxldCBtYXRjaGluZ0tleXMgPSBrZXlzLmZpbHRlcihcclxuICAgICAgICBrID0+IGtbJ2t0eSddID09PSBrdHkgJiYga1sndXNlJ10gPT09ICdzaWcnXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdLZXlzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSAnTm8gbWF0Y2hpbmcga2V5IGZvdW5kLic7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICBpZiAobWF0Y2hpbmdLZXlzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBsZXQgZXJyb3IgPVxyXG4gICAgICAgICAgJ01vcmUgdGhhbiBvbmUgbWF0Y2hpbmcga2V5IGZvdW5kLiBQbGVhc2Ugc3BlY2lmeSBhIGtpZCBpbiB0aGUgaWRfdG9rZW4gaGVhZGVyLic7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICAgICAgfSBlbHNlIGlmIChtYXRjaGluZ0tleXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAga2V5ID0gbWF0Y2hpbmdLZXlzWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFrZXkgJiYgIXJldHJ5ICYmIHBhcmFtcy5sb2FkS2V5cykge1xyXG4gICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgLmxvYWRLZXlzKClcclxuICAgICAgICAudGhlbihsb2FkZWRLZXlzID0+IChwYXJhbXMuandrcyA9IGxvYWRlZEtleXMpKVxyXG4gICAgICAgIC50aGVuKF8gPT4gdGhpcy52YWxpZGF0ZVNpZ25hdHVyZShwYXJhbXMsIHRydWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWtleSAmJiByZXRyeSAmJiAha2lkKSB7XHJcbiAgICAgIGxldCBlcnJvciA9ICdObyBtYXRjaGluZyBrZXkgZm91bmQuJztcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFrZXkgJiYgcmV0cnkgJiYga2lkKSB7XHJcbiAgICAgIGxldCBlcnJvciA9XHJcbiAgICAgICAgJ2V4cGVjdGVkIGtleSBub3QgZm91bmQgaW4gcHJvcGVydHkgandrcy4gJyArXHJcbiAgICAgICAgJ1RoaXMgcHJvcGVydHkgaXMgbW9zdCBsaWtlbHkgbG9hZGVkIHdpdGggdGhlICcgK1xyXG4gICAgICAgICdkaXNjb3ZlcnkgZG9jdW1lbnQuICcgK1xyXG4gICAgICAgICdFeHBlY3RlZCBrZXkgaWQgKGtpZCk6ICcgK1xyXG4gICAgICAgIGtpZDtcclxuXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrZXlPYmogPSBycy5LRVlVVElMLmdldEtleShrZXkpO1xyXG4gICAgbGV0IHZhbGlkYXRpb25PcHRpb25zID0ge1xyXG4gICAgICBhbGc6IHRoaXMuYWxsb3dlZEFsZ29yaXRobXMsXHJcbiAgICAgIGdyYWNlUGVyaW9kOiB0aGlzLmdyYWNlUGVyaW9kSW5TZWNcclxuICAgIH07XHJcbiAgICBsZXQgaXNWYWxpZCA9IHJzLktKVVIuandzLkpXUy52ZXJpZnlKV1QoXHJcbiAgICAgIHBhcmFtcy5pZFRva2VuLFxyXG4gICAgICBrZXlPYmosXHJcbiAgICAgIHZhbGlkYXRpb25PcHRpb25zXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnU2lnbmF0dXJlIG5vdCB2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbGcya3R5KGFsZzogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGFsZy5jaGFyQXQoMCkpIHtcclxuICAgICAgY2FzZSAnUic6XHJcbiAgICAgICAgcmV0dXJuICdSU0EnO1xyXG4gICAgICBjYXNlICdFJzpcclxuICAgICAgICByZXR1cm4gJ0VDJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbmZlciBrdHkgZnJvbSBhbGc6ICcgKyBhbGcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FsY0hhc2godmFsdWVUb0hhc2g6IHN0cmluZywgYWxnb3JpdGhtOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgbGV0IGhhc2hBbGcgPSBuZXcgcnMuS0pVUi5jcnlwdG8uTWVzc2FnZURpZ2VzdCh7IGFsZzogYWxnb3JpdGhtIH0pO1xyXG4gICAgbGV0IHJlc3VsdCA9IGhhc2hBbGcuZGlnZXN0U3RyaW5nKHZhbHVlVG9IYXNoKTtcclxuICAgIGxldCBieXRlQXJyYXlBc1N0cmluZyA9IHRoaXMudG9CeXRlQXJyYXlBc1N0cmluZyhyZXN1bHQpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShieXRlQXJyYXlBc1N0cmluZyk7XHJcbiAgfVxyXG5cclxuICB0b0J5dGVBcnJheUFzU3RyaW5nKGhleFN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhleFN0cmluZy5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICBsZXQgaGV4RGlnaXQgPSBoZXhTdHJpbmcuY2hhckF0KGkpICsgaGV4U3RyaW5nLmNoYXJBdChpICsgMSk7XHJcbiAgICAgIGxldCBudW0gPSBwYXJzZUludChoZXhEaWdpdCwgMTYpO1xyXG4gICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShudW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn0iXX0=