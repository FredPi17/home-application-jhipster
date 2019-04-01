import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { HomeApplicationSharedModule } from 'app/shared';
import {
    CamerasComponent,
    CamerasDetailComponent,
    CamerasUpdateComponent,
    CamerasDeletePopupComponent,
    CamerasDeleteDialogComponent,
    camerasRoute,
    camerasPopupRoute
} from './';

const ENTITY_STATES = [...camerasRoute, ...camerasPopupRoute];

@NgModule({
    imports: [HomeApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CamerasComponent,
        CamerasDetailComponent,
        CamerasUpdateComponent,
        CamerasDeleteDialogComponent,
        CamerasDeletePopupComponent
    ],
    entryComponents: [CamerasComponent, CamerasUpdateComponent, CamerasDeleteDialogComponent, CamerasDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeApplicationCamerasModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
