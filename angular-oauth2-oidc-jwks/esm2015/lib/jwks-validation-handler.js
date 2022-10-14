import * as rs from 'jsrsasign';
import { AbstractValidationHandler } from 'angular-oauth2-oidc';
/**
 * Validates the signature of an id_token against one
 * of the keys of an JSON Web Key Set (jwks).
 *
 * This jwks can be provided by the discovery document.
 */
export class JwksValidationHandler extends AbstractValidationHandler {
    constructor() {
        super(...arguments);
        /**
         * Allowed algorithms
         */
        this.allowedAlgorithms = [
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
        this.gracePeriodInSec = 600;
    }
    validateSignature(params, retry = false) {
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
        let kid = params.idTokenHeader['kid'];
        let keys = params.jwks['keys'];
        let key;
        let alg = params.idTokenHeader['alg'];
        if (kid) {
            key = keys.find(k => k['kid'] === kid /* && k['use'] === 'sig' */);
        }
        else {
            let kty = this.alg2kty(alg);
            let matchingKeys = keys.filter(k => k['kty'] === kty && k['use'] === 'sig');
            /*
                  if (matchingKeys.length == 0) {
                      let error = 'No matching key found.';
                      console.error(error);
                      return Promise.reject(error);
                  }*/
            if (matchingKeys.length > 1) {
                let error = 'More than one matching key found. Please specify a kid in the id_token header.';
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
                .then(loadedKeys => (params.jwks = loadedKeys))
                .then(_ => this.validateSignature(params, true));
        }
        if (!key && retry && !kid) {
            let error = 'No matching key found.';
            console.error(error);
            return Promise.reject(error);
        }
        if (!key && retry && kid) {
            let error = 'expected key not found in property jwks. ' +
                'This property is most likely loaded with the ' +
                'discovery document. ' +
                'Expected key id (kid): ' +
                kid;
            console.error(error);
            return Promise.reject(error);
        }
        let keyObj = rs.KEYUTIL.getKey(key);
        let validationOptions = {
            alg: this.allowedAlgorithms,
            gracePeriod: this.gracePeriodInSec
        };
        let isValid = rs.KJUR.jws.JWS.verifyJWT(params.idToken, keyObj, validationOptions);
        if (isValid) {
            return Promise.resolve();
        }
        else {
            return Promise.reject('Signature not valid');
        }
    }
    alg2kty(alg) {
        switch (alg.charAt(0)) {
            case 'R':
                return 'RSA';
            case 'E':
                return 'EC';
            default:
                throw new Error('Cannot infer kty from alg: ' + alg);
        }
    }
    calcHash(valueToHash, algorithm) {
        let hashAlg = new rs.KJUR.crypto.MessageDigest({ alg: algorithm });
        let result = hashAlg.digestString(valueToHash);
        let byteArrayAsString = this.toByteArrayAsString(result);
        return Promise.resolve(byteArrayAsString);
    }
    toByteArrayAsString(hexString) {
        let result = '';
        for (let i = 0; i < hexString.length; i += 2) {
            let hexDigit = hexString.charAt(i) + hexString.charAt(i + 1);
            let num = parseInt(hexDigit, 16);
            result += String.fromCharCode(num);
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiandrcy12YWxpZGF0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW9hdXRoMi1vaWRjLWp3a3MvIiwic291cmNlcyI6WyJsaWIvandrcy12YWxpZGF0aW9uLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxFQUFFLHlCQUF5QixFQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBRWxGOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHlCQUF5QjtJQUFwRTs7UUFDRTs7V0FFRztRQUNILHNCQUFpQixHQUFhO1lBQzVCLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1NBQ1IsQ0FBQztRQUVGOzs7V0FHRztRQUNILHFCQUFnQixHQUFHLEdBQUcsQ0FBQztJQXNIekIsQ0FBQztJQXBIQyxpQkFBaUIsQ0FBQyxNQUF3QixFQUFFLEtBQUssR0FBRyxLQUFLO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUU5RCxJQUNFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDcEIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FB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TUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcnMgZnJvbSAnanNyc2FzaWduJztcclxuaW1wb3J0IHsgQWJzdHJhY3RWYWxpZGF0aW9uSGFuZGxlciwgVmFsaWRhdGlvblBhcmFtcyB9IGZyb20gJ2FuZ3VsYXItb2F1dGgyLW9pZGMnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyB0aGUgc2lnbmF0dXJlIG9mIGFuIGlkX3Rva2VuIGFnYWluc3Qgb25lXHJcbiAqIG9mIHRoZSBrZXlzIG9mIGFuIEpTT04gV2ViIEtleSBTZXQgKGp3a3MpLlxyXG4gKlxyXG4gKiBUaGlzIGp3a3MgY2FuIGJlIHByb3ZpZGVkIGJ5IHRoZSBkaXNjb3ZlcnkgZG9jdW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSndrc1ZhbGlkYXRpb25IYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RWYWxpZGF0aW9uSGFuZGxlciB7XHJcbiAgLyoqXHJcbiAgICogQWxsb3dlZCBhbGdvcml0aG1zXHJcbiAgICovXHJcbiAgYWxsb3dlZEFsZ29yaXRobXM6IHN0cmluZ1tdID0gW1xyXG4gICAgJ0hTMjU2JyxcclxuICAgICdIUzM4NCcsXHJcbiAgICAnSFM1MTInLFxyXG4gICAgJ1JTMjU2JyxcclxuICAgICdSUzM4NCcsXHJcbiAgICAnUlM1MTInLFxyXG4gICAgJ0VTMjU2JyxcclxuICAgICdFUzM4NCcsXHJcbiAgICAnUFMyNTYnLFxyXG4gICAgJ1BTMzg0JyxcclxuICAgICdQUzUxMidcclxuICBdO1xyXG5cclxuICAvKipcclxuICAgKiBUaW1lIHBlcmlvZCBpbiBzZWNvbmRzIHRoZSB0aW1lc3RhbXAgaW4gdGhlIHNpZ25hdHVyZSBjYW5cclxuICAgKiBkaWZmZXIgZnJvbSB0aGUgY3VycmVudCB0aW1lLlxyXG4gICAqL1xyXG4gIGdyYWNlUGVyaW9kSW5TZWMgPSA2MDA7XHJcblxyXG4gIHZhbGlkYXRlU2lnbmF0dXJlKHBhcmFtczogVmFsaWRhdGlvblBhcmFtcywgcmV0cnkgPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBpZiAoIXBhcmFtcy5pZFRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBpZFRva2VuIGV4cGVjdGVkIScpO1xyXG4gICAgaWYgKCFwYXJhbXMuaWRUb2tlbkhlYWRlcilcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgaWRUb2tlbkhhbmRsZXIgZXhwZWN0ZWQuJyk7XHJcbiAgICBpZiAoIXBhcmFtcy5qd2tzKSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBqd2tzIGV4cGVjdGVkIScpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgIXBhcmFtcy5qd2tzWydrZXlzJ10gfHxcclxuICAgICAgIUFycmF5LmlzQXJyYXkocGFyYW1zLmp3a3NbJ2tleXMnXSkgfHxcclxuICAgICAgcGFyYW1zLmp3a3NbJ2tleXMnXS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IGtleXMgaW4gandrcyBtaXNzaW5nIScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZGVidWcoJ3ZhbGlkYXRlU2lnbmF0dXJlOiByZXRyeScsIHJldHJ5KTtcclxuXHJcbiAgICBsZXQga2lkOiBzdHJpbmcgPSBwYXJhbXMuaWRUb2tlbkhlYWRlclsna2lkJ107XHJcbiAgICBsZXQga2V5czogb2JqZWN0W10gPSBwYXJhbXMuandrc1sna2V5cyddO1xyXG4gICAgbGV0IGtleTogb2JqZWN0O1xyXG5cclxuICAgIGxldCBhbGcgPSBwYXJhbXMuaWRUb2tlbkhlYWRlclsnYWxnJ107XHJcblxyXG4gICAgaWYgKGtpZCkge1xyXG4gICAgICBrZXkgPSBrZXlzLmZpbmQoayA9PiBrWydraWQnXSA9PT0ga2lkIC8qICYmIGtbJ3VzZSddID09PSAnc2lnJyAqLyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQga3R5ID0gdGhpcy5hbGcya3R5KGFsZyk7XHJcbiAgICAgIGxldCBtYXRjaGluZ0tleXMgPSBrZXlzLmZpbHRlcihcclxuICAgICAgICBrID0+IGtbJ2t0eSddID09PSBrdHkgJiYga1sndXNlJ10gPT09ICdzaWcnXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdLZXlzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSAnTm8gbWF0Y2hpbmcga2V5IGZvdW5kLic7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICBpZiAobWF0Y2hpbmdLZXlzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBsZXQgZXJyb3IgPVxyXG4gICAgICAgICAgJ01vcmUgdGhhbiBvbmUgbWF0Y2hpbmcga2V5IGZvdW5kLiBQbGVhc2Ugc3BlY2lmeSBhIGtpZCBpbiB0aGUgaWRfdG9rZW4gaGVhZGVyLic7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICAgICAgfSBlbHNlIGlmIChtYXRjaGluZ0tleXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAga2V5ID0gbWF0Y2hpbmdLZXlzWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFrZXkgJiYgIXJldHJ5ICYmIHBhcmFtcy5sb2FkS2V5cykge1xyXG4gICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgLmxvYWRLZXlzKClcclxuICAgICAgICAudGhlbihsb2FkZWRLZXlzID0+IChwYXJhbXMuandrcyA9IGxvYWRlZEtleXMpKVxyXG4gICAgICAgIC50aGVuKF8gPT4gdGhpcy52YWxpZGF0ZVNpZ25hdHVyZShwYXJhbXMsIHRydWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWtleSAmJiByZXRyeSAmJiAha2lkKSB7XHJcbiAgICAgIGxldCBlcnJvciA9ICdObyBtYXRjaGluZyBrZXkgZm91bmQuJztcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFrZXkgJiYgcmV0cnkgJiYga2lkKSB7XHJcbiAgICAgIGxldCBlcnJvciA9XHJcbiAgICAgICAgJ2V4cGVjdGVkIGtleSBub3QgZm91bmQgaW4gcHJvcGVydHkgandrcy4gJyArXHJcbiAgICAgICAgJ1RoaXMgcHJvcGVydHkgaXMgbW9zdCBsaWtlbHkgbG9hZGVkIHdpdGggdGhlICcgK1xyXG4gICAgICAgICdkaXNjb3ZlcnkgZG9jdW1lbnQuICcgK1xyXG4gICAgICAgICdFeHBlY3RlZCBrZXkgaWQgKGtpZCk6ICcgK1xyXG4gICAgICAgIGtpZDtcclxuXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrZXlPYmogPSBycy5LRVlVVElMLmdldEtleShrZXkpO1xyXG4gICAgbGV0IHZhbGlkYXRpb25PcHRpb25zID0ge1xyXG4gICAgICBhbGc6IHRoaXMuYWxsb3dlZEFsZ29yaXRobXMsXHJcbiAgICAgIGdyYWNlUGVyaW9kOiB0aGlzLmdyYWNlUGVyaW9kSW5TZWNcclxuICAgIH07XHJcbiAgICBsZXQgaXNWYWxpZCA9IHJzLktKVVIuandzLkpXUy52ZXJpZnlKV1QoXHJcbiAgICAgIHBhcmFtcy5pZFRva2VuLFxyXG4gICAgICBrZXlPYmosXHJcbiAgICAgIHZhbGlkYXRpb25PcHRpb25zXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnU2lnbmF0dXJlIG5vdCB2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbGcya3R5KGFsZzogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGFsZy5jaGFyQXQoMCkpIHtcclxuICAgICAgY2FzZSAnUic6XHJcbiAgICAgICAgcmV0dXJuICdSU0EnO1xyXG4gICAgICBjYXNlICdFJzpcclxuICAgICAgICByZXR1cm4gJ0VDJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbmZlciBrdHkgZnJvbSBhbGc6ICcgKyBhbGcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FsY0hhc2godmFsdWVUb0hhc2g6IHN0cmluZywgYWxnb3JpdGhtOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgbGV0IGhhc2hBbGcgPSBuZXcgcnMuS0pVUi5jcnlwdG8uTWVzc2FnZURpZ2VzdCh7IGFsZzogYWxnb3JpdGhtIH0pO1xyXG4gICAgbGV0IHJlc3VsdCA9IGhhc2hBbGcuZGlnZXN0U3RyaW5nKHZhbHVlVG9IYXNoKTtcclxuICAgIGxldCBieXRlQXJyYXlBc1N0cmluZyA9IHRoaXMudG9CeXRlQXJyYXlBc1N0cmluZyhyZXN1bHQpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShieXRlQXJyYXlBc1N0cmluZyk7XHJcbiAgfVxyXG5cclxuICB0b0J5dGVBcnJheUFzU3RyaW5nKGhleFN0cmluZzogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhleFN0cmluZy5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICBsZXQgaGV4RGlnaXQgPSBoZXhTdHJpbmcuY2hhckF0KGkpICsgaGV4U3RyaW5nLmNoYXJBdChpICsgMSk7XHJcbiAgICAgIGxldCBudW0gPSBwYXJzZUludChoZXhEaWdpdCwgMTYpO1xyXG4gICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShudW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn0iXX0=