/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HomeApplicationTestModule } from '../../../test.module';
import { CourbesDeleteDialogComponent } from 'app/entities/courbes/courbes-delete-dialog.component';
import { CourbesService } from 'app/entities/courbes/courbes.service';

describe('Component Tests', () => {
    describe('Courbes Management Delete Component', () => {
        let comp: CourbesDeleteDialogComponent;
        let fixture: ComponentFixture<CourbesDeleteDialogComponent>;
        let service: CourbesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CourbesDeleteDialogComponent]
            })
                .overrideTemplate(CourbesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourbesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourbesService);
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
