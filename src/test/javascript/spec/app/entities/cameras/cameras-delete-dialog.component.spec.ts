/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HomeApplicationTestModule } from '../../../test.module';
import { CamerasDeleteDialogComponent } from 'app/entities/cameras/cameras-delete-dialog.component';
import { CamerasService } from 'app/entities/cameras/cameras.service';

describe('Component Tests', () => {
    describe('Cameras Management Delete Component', () => {
        let comp: CamerasDeleteDialogComponent;
        let fixture: ComponentFixture<CamerasDeleteDialogComponent>;
        let service: CamerasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CamerasDeleteDialogComponent]
            })
                .overrideTemplate(CamerasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CamerasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CamerasService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
