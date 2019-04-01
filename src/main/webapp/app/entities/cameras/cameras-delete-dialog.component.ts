import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICameras } from 'app/shared/model/cameras.model';
import { CamerasService } from './cameras.service';

@Component({
    selector: 'jhi-cameras-delete-dialog',
    templateUrl: './cameras-delete-dialog.component.html'
})
export class CamerasDeleteDialogComponent {
    cameras: ICameras;

    constructor(protected camerasService: CamerasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.camerasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'camerasListModification',
                content: 'Deleted an cameras'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cameras-delete-popup',
    template: ''
})
export class CamerasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cameras }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CamerasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cameras = cameras;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cameras', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cameras', { outlets: { popup: null } }]);
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
