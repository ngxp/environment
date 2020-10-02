import { ModuleWithProviders, NgModule } from '@angular/core';
import { ENVIRONMENT, environmentStorageKey } from './environment';

export function environmentFactory(): any {
    return JSON.parse(window.localStorage.getItem(environmentStorageKey));
}

@NgModule()
export class EnvironmentModule {
    static forRoot(): ModuleWithProviders<EnvironmentModule> {
        return {
            ngModule: EnvironmentModule,
            providers: [
                {
                    provide: ENVIRONMENT,
                    useFactory: environmentFactory
                }
            ]
        };
    }
}
