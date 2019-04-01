/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeApplicationTestModule } from '../../../test.module';
import { CamerasComponent } from 'app/entities/cameras/cameras.component';
import { CamerasService } from 'app/entities/cameras/cameras.service';
import { Cameras } from 'app/shared/model/cameras.model';

describe('Component Tests', () => {
    describe('Cameras Management Component', () => {
        let comp: CamerasComponent;
        let fixture: ComponentFixture<CamerasComponent>;
        let service: CamerasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CamerasComponent],
                providers: []
            })
                .overrideTemplate(CamerasComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CamerasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CamerasService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cameras(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cameras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
