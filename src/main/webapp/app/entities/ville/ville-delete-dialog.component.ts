import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVille } from 'app/shared/model/ville.model';
import { VilleService } from './ville.service';

@Component({
    selector: 'jhi-ville-delete-dialog',
    templateUrl: './ville-delete-dialog.component.html'
})
export class VilleDeleteDialogComponent {
    ville: IVille;

    constructor(protected villeService: VilleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.villeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'villeListModification',
                content: 'Deleted an ville'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ville-delete-popup',
    template: ''
})
export class VilleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ville }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VilleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ville = ville;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ville', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ville', { outlets: { popup: null } }]);
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
