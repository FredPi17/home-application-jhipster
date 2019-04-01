import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICameras } from 'app/shared/model/cameras.model';
import { AccountService } from 'app/core';
import { CamerasService } from './cameras.service';

@Component({
    selector: 'jhi-cameras',
    templateUrl: './cameras.component.html'
})
export class CamerasComponent implements OnInit, OnDestroy {
    cameras: ICameras[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected camerasService: CamerasService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.camerasService
            .query()
            .pipe(
                filter((res: HttpResponse<ICameras[]>) => res.ok),
                map((res: HttpResponse<ICameras[]>) => res.body)
            )
            .subscribe(
                (res: ICameras[]) => {
                    this.cameras = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCameras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICameras) {
        return item.id;
    }

    registerChangeInCameras() {
        this.eventSubscriber = this.eventManager.subscribe('camerasListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
