import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourbes } from 'app/shared/model/courbes.model';

type EntityResponseType = HttpResponse<ICourbes>;
type EntityArrayResponseType = HttpResponse<ICourbes[]>;

@Injectable({ providedIn: 'root' })
export class CourbesService {
    public resourceUrl = SERVER_API_URL + 'api/courbes';

    constructor(protected http: HttpClient) {}

    create(courbes: ICourbes): Observable<EntityResponseType> {
        return this.http.post<ICourbes>(this.resourceUrl, courbes, { observe: 'response' });
    }

    update(courbes: ICourbes): Observable<EntityResponseType> {
        return this.http.put<ICourbes>(this.resourceUrl, courbes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICourbes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICourbes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
