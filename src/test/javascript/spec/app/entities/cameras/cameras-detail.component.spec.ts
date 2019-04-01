/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeApplicationTestModule } from '../../../test.module';
import { CamerasDetailComponent } from 'app/entities/cameras/cameras-detail.component';
import { Cameras } from 'app/shared/model/cameras.model';

describe('Component Tests', () => {
    describe('Cameras Management Detail Component', () => {
        let comp: CamerasDetailComponent;
        let fixture: ComponentFixture<CamerasDetailComponent>;
        const route = ({ data: of({ cameras: new Cameras(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CamerasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CamerasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CamerasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cameras).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
