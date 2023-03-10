/* tslint:disable:align no-empty */
const POSITION_MODE = 'absolute';
const COLLISION = { horizontal: "fit", vertical: "fit" };
/**
 * @hidden
 */
export class BaseTooltip {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.style = {};
        this.popupRef = null;
    }
    get active() {
        return this.popupRef !== null;
    }
    show(e) {
        const align = e.anchor.align;
        const offset = e.anchor.point;
        this.style = e.style;
        if (!this.popupRef) {
            this.popupRef = this.popupService.open(Object.assign({
                offset: offset,
                popupAlign: align,
                animate: this.animate,
                content: this.templateRef,
                collision: COLLISION,
                positionMode: POSITION_MODE
            }, this.popupSettings));
            if (this.localizationService.rtl) {
                this.popupRef.popupElement.setAttribute('dir', 'rtl');
            }
            this.onInit();
        }
        else {
            const popup = this.popupRef.popup.instance;
            popup.offset = offset;
            popup.popupAlign = align;
        }
    }
    hide() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    onInit() {
    }
    ngOnDestroy() {
        this.hide();
    }
}
