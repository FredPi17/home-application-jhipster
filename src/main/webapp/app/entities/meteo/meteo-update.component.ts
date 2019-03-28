import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMeteo } from 'app/shared/model/meteo.model';
import { MeteoService } from './meteo.service';

@Component({
    selector: 'jhi-meteo-update',
    templateUrl: './meteo-update.component.html'
})
export class MeteoUpdateComponent implements OnInit {
    meteo: IMeteo;
    isSaving: boolean;

    constructor(protected meteoService: MeteoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meteo }) => {
            this.meteo = meteo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.meteo.id !== undefined) {
            this.subscribeToSaveResponse(this.meteoService.update(this.meteo));
        } else {
            this.subscribeToSaveResponse(this.meteoService.create(this.meteo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeteo>>) {
        result.subscribe((res: HttpResponse<IMeteo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
