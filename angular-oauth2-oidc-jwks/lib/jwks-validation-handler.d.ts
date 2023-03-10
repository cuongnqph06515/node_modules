import { AbstractValidationHandler, ValidationParams } from 'angular-oauth2-oidc';
/**
 * Validates the signature of an id_token against one
 * of the keys of an JSON Web Key Set (jwks).
 *
 * This jwks can be provided by the discovery document.
 */
export declare class JwksValidationHandler extends AbstractValidationHandler {
    /**
     * Allowed algorithms
     */
    allowedAlgorithms: string[];
    /**
     * Time period in seconds the timestamp in the signature can
     * differ from the current time.
     */
    gracePeriodInSec: number;
    validateSignature(params: ValidationParams, retry?: boolean): Promise<any>;
    private alg2kty;
    calcHash(valueToHash: string, algorithm: string): Promise<string>;
    toByteArrayAsString(hexString: string): string;
}
