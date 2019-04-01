import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICameras } from 'app/shared/model/cameras.model';

type EntityResponseType = HttpResponse<ICameras>;
type EntityArrayResponseType = HttpResponse<ICameras[]>;

@Injectable({ providedIn: 'root' })
export class CamerasService {
    public resourceUrl = SERVER_API_URL + 'api/cameras';

    constructor(protected http: HttpClient) {}

    create(cameras: ICameras): Observable<EntityResponseType> {
        return this.http.post<ICameras>(this.resourceUrl, cameras, { observe: 'response' });
    }

    update(cameras: ICameras): Observable<EntityResponseType> {
        return this.http.put<ICameras>(this.resourceUrl, cameras, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICameras>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICameras[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
