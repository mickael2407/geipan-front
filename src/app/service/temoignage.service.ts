import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temoignage } from '../interface/temoignage';
import { API } from '../const/api';
import { ResultsPage } from '../interface/results-page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemoignageService {

  public temCUrrentPage: Temoignage[];
  constructor(private httpClient: HttpClient) {
    this.temCUrrentPage = [];
  }

  public getAllByPage(page: number, pageSize: number): Observable<ResultsPage> {
    return this.httpClient.get<ResultsPage>(`${environment.API_URL}${API.TEM.ALL_PAGE}?page=${page}&pageSize=${pageSize}`);
  }

  public getTemoignageByCas(idCas: string): Observable<Temoignage[]> {
    return this.httpClient.get<Temoignage[]>(`${environment.API_URL}${API.TEM.BYID}${idCas}`);
  }
}
