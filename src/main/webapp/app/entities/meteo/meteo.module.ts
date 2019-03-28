import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { HomeApplicationSharedModule } from 'app/shared';
import {
    MeteoComponent,
    MeteoDetailComponent,
    MeteoUpdateComponent,
    MeteoDeletePopupComponent,
    MeteoDeleteDialogComponent,
    meteoRoute,
    meteoPopupRoute
} from './';

const ENTITY_STATES = [...meteoRoute, ...meteoPopupRoute];

@NgModule({
    imports: [HomeApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MeteoComponent, MeteoDetailComponent, MeteoUpdateComponent, MeteoDeleteDialogComponent, MeteoDeletePopupComponent],
    entryComponents: [MeteoComponent, MeteoUpdateComponent, MeteoDeleteDialogComponent, MeteoDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeApplicationMeteoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
