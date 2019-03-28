/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HomeApplicationTestModule } from '../../../test.module';
import { CourbesComponent } from 'app/entities/courbes/courbes.component';
import { CourbesService } from 'app/entities/courbes/courbes.service';
import { Courbes } from 'app/shared/model/courbes.model';

describe('Component Tests', () => {
    describe('Courbes Management Component', () => {
        let comp: CourbesComponent;
        let fixture: ComponentFixture<CourbesComponent>;
        let service: CourbesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HomeApplicationTestModule],
                declarations: [CourbesComponent],
                providers: []
            })
                .overrideTemplate(CourbesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourbesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourbesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Courbes(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.courbes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
