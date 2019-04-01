import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICameras } from 'app/shared/model/cameras.model';

@Component({
    selector: 'jhi-cameras-detail',
    templateUrl: './cameras-detail.component.html'
})
export class CamerasDetailComponent implements OnInit {
    cameras: ICameras;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cameras }) => {
            this.cameras = cameras;
        });
    }

    previousState() {
        window.history.back();
    }
}
