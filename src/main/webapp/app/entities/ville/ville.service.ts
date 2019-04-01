import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVille, Ville } from 'app/shared/model/ville.model';

type EntityResponseType = HttpResponse<IVille>;
type EntityArrayResponseType = HttpResponse<IVille[]>;

@Injectable({ providedIn: 'root' })
export class VilleService {
    public resourceUrl = SERVER_API_URL + 'api/villes';

    constructor(protected http: HttpClient) {}

    create(ville: IVille): Observable<EntityResponseType> {
        return this.http.post<IVille>(this.resourceUrl, ville, { observe: 'response' });
    }

    update(ville: IVille): Observable<EntityResponseType> {
        return this.http.put<IVille>(this.resourceUrl, ville, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVille>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVille[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getByLatLong(latitude: string, longitude: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/getVille/${latitude}/${longitude}`, { observe: 'response' });
    }

    getByCityName(cityName: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/getVille/${cityName}`, { observe: 'response' });
    }

    get(): Observable<any> {
        return this.http.get<IVille[]>(`${this.resourceUrl}`, { observe: 'response' });
    }
}
