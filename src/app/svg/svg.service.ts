import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SvgService {
    private base_url = '/assets/logos/';

    constructor(private http: HttpClient) { }

    public getSvg(url: string): Observable<any> {
        return this.http.get(this.base_url + url, { headers: new HttpHeaders({ 'Content-type': 'text/plain' }), responseType: 'text' });
    }
}