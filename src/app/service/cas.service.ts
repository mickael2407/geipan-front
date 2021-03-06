import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cas, CasClassife } from '../interface/cas';
import { API } from '../const/api';
import { ResultsPage } from '../interface/results-page';
import { isUndefined } from 'util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasService {
  
  public allCas: CasClassife[];
  public casCUrrentPage: Cas[];
  public allcasByYear: Array<{
    year: number,
    element: Array<Cas>
  }>;
  constructor(private httpClient: HttpClient) {
    this.allCas = [];
    this.casCUrrentPage = [];
    this.allcasByYear = [];
  }


  public getById(idCas: string): Observable<Cas> {
    return this.httpClient.get<Cas>(`${environment.API_URL}${API.CAS.BYID}/${idCas}`);
  }

  public getAllByGroup(): Observable<CasClassife[]> {
    return this.httpClient.get<CasClassife[]>(`${environment.API_URL}${API.CAS.ALL_GROUP}`);
  }

  public getAllByPage(page: number, pageSize: number, sort?:{key: string, value: string}): Observable<ResultsPage> {
    let url = `${environment.API_URL}${API.CAS.ALL_PAGE}?page=${page}&pageSize=${pageSize}`;
    if (!isUndefined(sort)) url += `&sort=${sort.key}&sortDirection=${sort.value}`;
    return this.httpClient.get<ResultsPage>(url);
  }

  public updateCas(cas: Cas): Observable<void> {
    return this.httpClient.put<void>(`${environment.API_URL}${API.CAS.UPDATE}`, cas);
  }

  public getCasByClassification() {
    return this.allCas.map(_elt => {
      return { value: _elt.values.length, name: _elt._id }
    });
  }

  public updateCurrentPage(cas: Cas): void {
    const index = this.casCUrrentPage.findIndex(_cas => _cas._id === cas._id);
    this.casCUrrentPage[index] = cas;
  }

  public setCasByYear(): void {
    console.log((this.allCas))
    let casArray: any[] = this.allCas.map(_elt => _elt.values).reduce((acc, val) => acc.concat(val));
    let yearsArray: number[] = [];
    console.log(casArray);  
    casArray.filter(_elt => typeof _elt.cas_AAAA != "string").forEach(_elt => {
      if(!yearsArray.includes(_elt.cas_AAAA)) {
        yearsArray.push(_elt.cas_AAAA);
        this.allcasByYear.push({
          year: <number>_elt.cas_AAAA,
          element: casArray.filter(_cas => _cas.cas_AAAA === _elt.cas_AAAA)
        });
      }
    });
  }
  


  public getCasByIdCurrentPage(id: string): Cas {
    return this.casCUrrentPage.filter(_cas => _cas._id === id)[0];
  }
  
}
