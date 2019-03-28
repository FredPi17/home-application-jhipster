import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICourbes } from 'app/shared/model/courbes.model';
import { CourbesService } from './courbes.service';

@Component({
    selector: 'jhi-courbes-update',
    templateUrl: './courbes-update.component.html'
})
export class CourbesUpdateComponent implements OnInit {
    courbes: ICourbes;
    isSaving: boolean;

    constructor(protected courbesService: CourbesService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ courbes }) => {
            this.courbes = courbes;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.courbes.id !== undefined) {
            this.subscribeToSaveResponse(this.courbesService.update(this.courbes));
        } else {
            this.subscribeToSaveResponse(this.courbesService.create(this.courbes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourbes>>) {
        result.subscribe((res: HttpResponse<ICourbes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
