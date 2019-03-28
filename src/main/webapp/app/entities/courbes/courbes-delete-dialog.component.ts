import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourbes } from 'app/shared/model/courbes.model';
import { CourbesService } from './courbes.service';

@Component({
    selector: 'jhi-courbes-delete-dialog',
    templateUrl: './courbes-delete-dialog.component.html'
})
export class CourbesDeleteDialogComponent {
    courbes: ICourbes;

    constructor(protected courbesService: CourbesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courbesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'courbesListModification',
                content: 'Deleted an courbes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-courbes-delete-popup',
    template: ''
})
export class CourbesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ courbes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CourbesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.courbes = courbes;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/courbes', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/courbes', { outlets: { popup: null } }]);
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
