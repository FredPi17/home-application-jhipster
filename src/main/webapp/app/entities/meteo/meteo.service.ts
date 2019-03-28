import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeteo } from 'app/shared/model/meteo.model';

type EntityResponseType = HttpResponse<IMeteo>;
type EntityArrayResponseType = HttpResponse<IMeteo[]>;

@Injectable({ providedIn: 'root' })
export class MeteoService {
    public resourceUrl = SERVER_API_URL + 'api/meteos';

    constructor(protected http: HttpClient) {}

    create(meteo: IMeteo): Observable<EntityResponseType> {
        return this.http.post<IMeteo>(this.resourceUrl, meteo, { observe: 'response' });
    }

    update(meteo: IMeteo): Observable<EntityResponseType> {
        return this.http.put<IMeteo>(this.resourceUrl, meteo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMeteo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMeteo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    get(place: string, nb: number): Observable<any> {
        console.log('get thingspeak');
        return this.http.get<any>(`${this.resourceUrl}/thingspeak/${place}/${nb}`, { observe: 'response' });
    }
}
