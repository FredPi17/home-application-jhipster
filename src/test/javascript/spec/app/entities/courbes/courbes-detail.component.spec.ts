/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { CourbesDetailComponent } from 'app/entities/courbes/courbes-detail.component';
import { Courbes } from 'app/shared/model/courbes.model';

describe('Component Tests', () => {
    describe('Courbes Management Detail Component', () => {
        let comp: CourbesDetailComponent;
        let fixture: ComponentFixture<CourbesDetailComponent>;
        const route = ({ data: of({ courbes: new Courbes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CourbesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CourbesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourbesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.courbes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
