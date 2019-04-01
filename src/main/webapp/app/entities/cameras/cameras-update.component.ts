import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICameras } from 'app/shared/model/cameras.model';
import { CamerasService } from './cameras.service';

@Component({
    selector: 'jhi-cameras-update',
    templateUrl: './cameras-update.component.html'
})
export class CamerasUpdateComponent implements OnInit {
    cameras: ICameras;
    isSaving: boolean;

    constructor(protected camerasService: CamerasService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cameras }) => {
            this.cameras = cameras;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cameras.id !== undefined) {
            this.subscribeToSaveResponse(this.camerasService.update(this.cameras));
        } else {
            this.subscribeToSaveResponse(this.camerasService.create(this.cameras));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICameras>>) {
        result.subscribe((res: HttpResponse<ICameras>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
