/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵParsedTranslation } from '@angular/localize';
import { MessageRenderer } from './message_renderer';
/**
 * A message renderer that outputs `ɵParsedTranslation` objects.
 */
export declare class TargetMessageRenderer implements MessageRenderer<ɵParsedTranslation> {
    private current;
    private icuDepth;
    get message(): ɵParsedTranslation;
    startRender(): void;
    endRender(): void;
    text(text: string): void;
    placeholder(name: string, body: string | undefined): void;
    startPlaceholder(name: string): void;
    closePlaceholder(name: string): void;
    startContainer(): void;
    closeContainer(): void;
    startIcu(): void;
    endIcu(): void;
    private normalizePlaceholderName;
    private renderPlaceholder;
    private storeMessagePart;
}
