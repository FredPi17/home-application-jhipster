import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourbes } from 'app/shared/model/courbes.model';

@Component({
    selector: 'jhi-courbes-detail',
    templateUrl: './courbes-detail.component.html'
})
export class CourbesDetailComponent implements OnInit {
    courbes: ICourbes;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ courbes }) => {
            this.courbes = courbes;
        });
    }

    previousState() {
        window.history.back();
    }
}
