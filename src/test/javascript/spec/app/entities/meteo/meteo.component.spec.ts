/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeApplicationTestModule } from '../../../test.module';
import { MeteoComponent } from 'app/entities/meteo/meteo.component';
import { MeteoService } from 'app/entities/meteo/meteo.service';
import { Meteo } from 'app/shared/model/meteo.model';

describe('Component Tests', () => {
    describe('Meteo Management Component', () => {
        let comp: MeteoComponent;
        let fixture: ComponentFixture<MeteoComponent>;
        let service: MeteoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [MeteoComponent],
                providers: []
            })
                .overrideTemplate(MeteoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeteoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeteoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Meteo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.meteos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
