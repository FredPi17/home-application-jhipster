/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { CourbesUpdateComponent } from 'app/entities/courbes/courbes-update.component';
import { CourbesService } from 'app/entities/courbes/courbes.service';
import { Courbes } from 'app/shared/model/courbes.model';

describe('Component Tests', () => {
    describe('Courbes Management Update Component', () => {
        let comp: CourbesUpdateComponent;
        let fixture: ComponentFixture<CourbesUpdateComponent>;
        let service: CourbesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CourbesUpdateComponent]
            })
                .overrideTemplate(CourbesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourbesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourbesService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Courbes(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.courbes = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Courbes();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.courbes = entity;
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
