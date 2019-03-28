/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { MeteoUpdateComponent } from 'app/entities/meteo/meteo-update.component';
import { MeteoService } from 'app/entities/meteo/meteo.service';
import { Meteo } from 'app/shared/model/meteo.model';

describe('Component Tests', () => {
    describe('Meteo Management Update Component', () => {
        let comp: MeteoUpdateComponent;
        let fixture: ComponentFixture<MeteoUpdateComponent>;
        let service: MeteoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [MeteoUpdateComponent]
            })
                .overrideTemplate(MeteoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeteoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeteoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Meteo(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.meteo = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Meteo();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.meteo = entity;
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
