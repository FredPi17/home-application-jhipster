import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IVille, Ville } from 'app/shared/model/ville.model';
import { VilleService } from 'app/entities/ville/ville.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-ville-create',
    templateUrl: './modal-add-city.component.html'
})
export class JhiAddCityModalComponent implements AfterViewInit, OnInit {
    ville: Ville;
    isSaving: boolean;
    name: string;
    result: boolean;

    constructor(protected villeService: VilleService, protected activatedRoute: ActivatedRoute, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.isSaving = false;
        this.ville = new Ville();
    }

    previousState() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.result = true;
        this.isSaving = true;
        if (this.name !== '') {
            this.ville.name = this.name;
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

    ngAfterViewInit(): void {}

    cancel() {
        this.activeModal.dismiss('cancel');
    }
}
