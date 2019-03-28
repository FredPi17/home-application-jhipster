/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HomeApplicationTestModule } from '../../../test.module';
import { VilleDeleteDialogComponent } from 'app/entities/ville/ville-delete-dialog.component';
import { VilleService } from 'app/entities/ville/ville.service';

describe('Component Tests', () => {
    describe('Ville Management Delete Component', () => {
        let comp: VilleDeleteDialogComponent;
        let fixture: ComponentFixture<VilleDeleteDialogComponent>;
        let service: VilleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [VilleDeleteDialogComponent]
            })
                .overrideTemplate(VilleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VilleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VilleService);
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
