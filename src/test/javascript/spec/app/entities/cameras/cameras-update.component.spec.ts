/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { CamerasUpdateComponent } from 'app/entities/cameras/cameras-update.component';
import { CamerasService } from 'app/entities/cameras/cameras.service';
import { Cameras } from 'app/shared/model/cameras.model';

describe('Component Tests', () => {
    describe('Cameras Management Update Component', () => {
        let comp: CamerasUpdateComponent;
        let fixture: ComponentFixture<CamerasUpdateComponent>;
        let service: CamerasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CamerasUpdateComponent]
            })
                .overrideTemplate(CamerasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CamerasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CamerasService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cameras(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cameras = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cameras();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cameras = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
