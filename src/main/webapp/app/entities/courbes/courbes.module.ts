import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { HomeApplicationSharedModule } from 'app/shared';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load themes
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
import {
    CourbesComponent,
    CourbesDetailComponent,
    CourbesUpdateComponent,
    CourbesDeletePopupComponent,
    CourbesDeleteDialogComponent,
    courbesRoute,
    courbesPopupRoute
} from './';

const ENTITY_STATES = [...courbesRoute, ...courbesPopupRoute];

@NgModule({
    imports: [HomeApplicationSharedModule, RouterModule.forChild(ENTITY_STATES), ChartsModule],
    declarations: [
        CourbesComponent,
        CourbesDetailComponent,
        CourbesUpdateComponent,
        CourbesDeleteDialogComponent,
        CourbesDeletePopupComponent
    ],
    entryComponents: [CourbesComponent, CourbesUpdateComponent, CourbesDeleteDialogComponent, CourbesDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeApplicationCourbesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
