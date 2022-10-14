import { parseTranslation, translate as _translate } from './utils';
/**
 * Load translations for `$localize`.
 *
 * The given `translations` are processed and added to a lookup based on their `MessageId`.
 * A new translation will overwrite a previous translation if it has the same `MessageId`.
 *
 * * If a message is generated by the Angular compiler from an `i18n` marker in a template, the
 *   `MessageId` is passed through to the `$localize` call as a custom `MessageId`. The `MessageId`
 *   will match what is extracted into translation files.
 *
 * * If the translation is from a call to `$localize` in application code, and no custom `MessageId`
 *   is provided, then the `MessageId` can be generated by passing the tagged string message-parts
 *   to the `parseMessage()` function (not currently public API).
 *
 * @publicApi
 *
 */
export function loadTranslations(translations) {
    // Ensure the translate function exists
    if (!$localize.translate) {
        $localize.translate = translate;
    }
    if (!$localize.TRANSLATIONS) {
        $localize.TRANSLATIONS = {};
    }
    Object.keys(translations).forEach(key => {
        $localize.TRANSLATIONS[key] = parseTranslation(translations[key]);
    });
}
/**
 * Remove all translations for `$localize`.
 *
 * @publicApi
 */
export function clearTranslations() {
    $localize.translate = undefined;
    $localize.TRANSLATIONS = {};
}
/**
 * Translate the text of the given message, using the loaded translations.
 *
 * This function may reorder (or remove) substitutions as indicated in the matching translation.
 */
export function translate(messageParts, substitutions) {
    try {
        return _translate($localize.TRANSLATIONS, messageParts, substitutions);
    }
    catch (e) {
        console.warn(e.message);
        return [messageParts, substitutions];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3RyYW5zbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQStCLGdCQUFnQixFQUFpQixTQUFTLElBQUksVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBVS9HOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFlBQThDO0lBQzdFLHVDQUF1QztJQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtRQUN4QixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUNqQztJQUNELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1FBQzNCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQjtJQUMvQixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUNoQyxTQUFTLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsWUFBa0MsRUFBRSxhQUE2QjtJQUV6RixJQUFJO1FBQ0YsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDeEU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDdEM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtMb2NhbGl6ZUZufSBmcm9tICcuL2xvY2FsaXplJztcbmltcG9ydCB7TWVzc2FnZUlkLCBQYXJzZWRUcmFuc2xhdGlvbiwgcGFyc2VUcmFuc2xhdGlvbiwgVGFyZ2V0TWVzc2FnZSwgdHJhbnNsYXRlIGFzIF90cmFuc2xhdGV9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIFdlIGF1Z21lbnQgdGhlIGAkbG9jYWxpemVgIG9iamVjdCB0byBhbHNvIHN0b3JlIHRoZSB0cmFuc2xhdGlvbnMuXG4gKlxuICogTm90ZSB0aGF0IGJlY2F1c2UgdGhlIFRSQU5TTEFUSU9OUyBhcmUgYXR0YWNoZWQgdG8gYSBnbG9iYWwgb2JqZWN0LCB0aGV5IHdpbGwgYmUgc2hhcmVkIGJldHdlZW5cbiAqIGFsbCBhcHBsaWNhdGlvbnMgdGhhdCBhcmUgcnVubmluZyBpbiBhIHNpbmdsZSBwYWdlIG9mIHRoZSBicm93c2VyLlxuICovXG5kZWNsYXJlIGNvbnN0ICRsb2NhbGl6ZTogTG9jYWxpemVGbiZ7VFJBTlNMQVRJT05TOiBSZWNvcmQ8TWVzc2FnZUlkLCBQYXJzZWRUcmFuc2xhdGlvbj59O1xuXG4vKipcbiAqIExvYWQgdHJhbnNsYXRpb25zIGZvciBgJGxvY2FsaXplYC5cbiAqXG4gKiBUaGUgZ2l2ZW4gYHRyYW5zbGF0aW9uc2AgYXJlIHByb2Nlc3NlZCBhbmQgYWRkZWQgdG8gYSBsb29rdXAgYmFzZWQgb24gdGhlaXIgYE1lc3NhZ2VJZGAuXG4gKiBBIG5ldyB0cmFuc2xhdGlvbiB3aWxsIG92ZXJ3cml0ZSBhIHByZXZpb3VzIHRyYW5zbGF0aW9uIGlmIGl0IGhhcyB0aGUgc2FtZSBgTWVzc2FnZUlkYC5cbiAqXG4gKiAqIElmIGEgbWVzc2FnZSBpcyBnZW5lcmF0ZWQgYnkgdGhlIEFuZ3VsYXIgY29tcGlsZXIgZnJvbSBhbiBgaTE4bmAgbWFya2VyIGluIGEgdGVtcGxhdGUsIHRoZVxuICogICBgTWVzc2FnZUlkYCBpcyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgYCRsb2NhbGl6ZWAgY2FsbCBhcyBhIGN1c3RvbSBgTWVzc2FnZUlkYC4gVGhlIGBNZXNzYWdlSWRgXG4gKiAgIHdpbGwgbWF0Y2ggd2hhdCBpcyBleHRyYWN0ZWQgaW50byB0cmFuc2xhdGlvbiBmaWxlcy5cbiAqXG4gKiAqIElmIHRoZSB0cmFuc2xhdGlvbiBpcyBmcm9tIGEgY2FsbCB0byBgJGxvY2FsaXplYCBpbiBhcHBsaWNhdGlvbiBjb2RlLCBhbmQgbm8gY3VzdG9tIGBNZXNzYWdlSWRgXG4gKiAgIGlzIHByb3ZpZGVkLCB0aGVuIHRoZSBgTWVzc2FnZUlkYCBjYW4gYmUgZ2VuZXJhdGVkIGJ5IHBhc3NpbmcgdGhlIHRhZ2dlZCBzdHJpbmcgbWVzc2FnZS1wYXJ0c1xuICogICB0byB0aGUgYHBhcnNlTWVzc2FnZSgpYCBmdW5jdGlvbiAobm90IGN1cnJlbnRseSBwdWJsaWMgQVBJKS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IFJlY29yZDxNZXNzYWdlSWQsIFRhcmdldE1lc3NhZ2U+KSB7XG4gIC8vIEVuc3VyZSB0aGUgdHJhbnNsYXRlIGZ1bmN0aW9uIGV4aXN0c1xuICBpZiAoISRsb2NhbGl6ZS50cmFuc2xhdGUpIHtcbiAgICAkbG9jYWxpemUudHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuICB9XG4gIGlmICghJGxvY2FsaXplLlRSQU5TTEFUSU9OUykge1xuICAgICRsb2NhbGl6ZS5UUkFOU0xBVElPTlMgPSB7fTtcbiAgfVxuICBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAkbG9jYWxpemUuVFJBTlNMQVRJT05TW2tleV0gPSBwYXJzZVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uc1trZXldKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGFsbCB0cmFuc2xhdGlvbnMgZm9yIGAkbG9jYWxpemVgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVHJhbnNsYXRpb25zKCkge1xuICAkbG9jYWxpemUudHJhbnNsYXRlID0gdW5kZWZpbmVkO1xuICAkbG9jYWxpemUuVFJBTlNMQVRJT05TID0ge307XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIHRoZSB0ZXh0IG9mIHRoZSBnaXZlbiBtZXNzYWdlLCB1c2luZyB0aGUgbG9hZGVkIHRyYW5zbGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIG1heSByZW9yZGVyIChvciByZW1vdmUpIHN1YnN0aXR1dGlvbnMgYXMgaW5kaWNhdGVkIGluIHRoZSBtYXRjaGluZyB0cmFuc2xhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCBzdWJzdGl0dXRpb25zOiByZWFkb25seSBhbnlbXSk6XG4gICAgW1RlbXBsYXRlU3RyaW5nc0FycmF5LCByZWFkb25seSBhbnlbXV0ge1xuICB0cnkge1xuICAgIHJldHVybiBfdHJhbnNsYXRlKCRsb2NhbGl6ZS5UUkFOU0xBVElPTlMsIG1lc3NhZ2VQYXJ0cywgc3Vic3RpdHV0aW9ucyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZS5tZXNzYWdlKTtcbiAgICByZXR1cm4gW21lc3NhZ2VQYXJ0cywgc3Vic3RpdHV0aW9uc107XG4gIH1cbn1cbiJdfQ==