import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeteo } from 'app/shared/model/meteo.model';

@Component({
    selector: 'jhi-meteo-detail',
    templateUrl: './meteo-detail.component.html'
})
export class MeteoDetailComponent implements OnInit {
    meteo: IMeteo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meteo }) => {
            this.meteo = meteo;
        });
    }

    previousState() {
        window.history.back();
    }
}
