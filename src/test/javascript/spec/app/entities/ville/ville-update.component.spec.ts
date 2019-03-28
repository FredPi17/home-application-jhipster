/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { VilleUpdateComponent } from 'app/entities/ville/ville-update.component';
import { VilleService } from 'app/entities/ville/ville.service';
import { Ville } from 'app/shared/model/ville.model';

describe('Component Tests', () => {
    describe('Ville Management Update Component', () => {
        let comp: VilleUpdateComponent;
        let fixture: ComponentFixture<VilleUpdateComponent>;
        let service: VilleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [VilleUpdateComponent]
            })
                .overrideTemplate(VilleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VilleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VilleService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ville(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ville = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ville();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ville = entity;
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
