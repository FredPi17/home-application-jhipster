import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeteo } from 'app/shared/model/meteo.model';
import { MeteoService } from './meteo.service';

@Component({
    selector: 'jhi-meteo-delete-dialog',
    templateUrl: './meteo-delete-dialog.component.html'
})
export class MeteoDeleteDialogComponent {
    meteo: IMeteo;

    constructor(protected meteoService: MeteoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meteoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meteoListModification',
                content: 'Deleted an meteo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meteo-delete-popup',
    template: ''
})
export class MeteoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meteo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MeteoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.meteo = meteo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meteo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meteo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
