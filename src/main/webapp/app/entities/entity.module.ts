import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'meteo',
                loadChildren: './meteo/meteo.module#HomeApplicationMeteoModule'
            },
            {
                path: 'courbes',
                loadChildren: './courbes/courbes.module#HomeApplicationCourbesModule'
            },
            {
                path: 'ville',
                loadChildren: './ville/ville.module#HomeApplicationVilleModule'
            },
            {
                path: 'cameras',
                loadChildren: './cameras/cameras.module#HomeApplicationCamerasModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeApplicationEntityModule {}
