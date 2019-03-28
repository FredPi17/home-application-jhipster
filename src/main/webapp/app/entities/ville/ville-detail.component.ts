import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVille } from 'app/shared/model/ville.model';

@Component({
    selector: 'jhi-ville-detail',
    templateUrl: './ville-detail.component.html'
})
export class VilleDetailComponent implements OnInit {
    ville: IVille;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ville }) => {
            this.ville = ville;
        });
    }

    previousState() {
        window.history.back();
    }
}
