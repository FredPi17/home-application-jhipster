/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { MeteoDetailComponent } from 'app/entities/meteo/meteo-detail.component';
import { Meteo } from 'app/shared/model/meteo.model';

describe('Component Tests', () => {
    describe('Meteo Management Detail Component', () => {
        let comp: MeteoDetailComponent;
        let fixture: ComponentFixture<MeteoDetailComponent>;
        const route = ({ data: of({ meteo: new Meteo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [MeteoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeteoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeteoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meteo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
