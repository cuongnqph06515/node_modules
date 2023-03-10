/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ButtonDirective } from "./button.directive";
import { ButtonLook } from '../button-look';
/**
 * @hidden
 */
export declare class KendoButtonService {
    buttonLookChange: BehaviorSubject<ButtonLook>;
    buttonClicked: Subject<ButtonDirective>;
    buttonClicked$: Observable<ButtonDirective>;
    click(button: ButtonDirective): void;
    setButtonLook(look: ButtonLook): void;
}
