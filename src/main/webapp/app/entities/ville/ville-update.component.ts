import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IVille } from 'app/shared/model/ville.model';
import { VilleService } from './ville.service';

@Component({
    selector: 'jhi-ville-update',
    templateUrl: './ville-update.component.html'
})
export class VilleUpdateComponent implements OnInit {
    ville: IVille;
    isSaving: boolean;

    constructor(protected villeService: VilleService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ville }) => {
            this.ville = ville;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ville.id !== undefined) {
            this.subscribeToSaveResponse(this.villeService.update(this.ville));
        } else {
            this.subscribeToSaveResponse(this.villeService.create(this.ville));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVille>>) {
        result.subscribe((res: HttpResponse<IVille>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
