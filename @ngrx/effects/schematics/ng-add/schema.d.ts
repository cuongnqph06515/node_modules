/// <amd-module name="@ngrx/effects/schematics/ng-add/schema" />
export interface Schema {
    name: string;
    skipPackageJson?: boolean;
    path?: string;
    flat?: boolean;
    skipTest?: boolean;
    project?: string;
    module?: string;
    group?: boolean;
    /**
     * Setup root effects module without registering initial effects.
     */
    minimal?: boolean;
}
