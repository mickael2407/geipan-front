import { Component, OnInit } from '@angular/core';
import { CasService } from '../service/cas.service';
import { Observable } from 'rxjs';
import { Cas } from '../interface/cas';
import { ResultsPage } from '../interface/results-page';
import { TemoignageService } from '../service/temoignage.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  public headerTem: string[];
  public headerAndKeyValueCas: Array<{label: string, key: string}>;
  public headerAndKeyValueTem: Array<{label: string, key: string}>;
  public requestCas: (page: number, pageSize: number, sort?: {key: string, value: string}) => Observable<ResultsPage>;
  public requestTem: (page: number, pageSize: number, sort?: {key: string, value: string}) => Observable<ResultsPage>;

  constructor(private casService: CasService, private temService: TemoignageService) {
    this.headerAndKeyValueTem =  [
      { label: 'idCas', key: 'id_cas'}, 
      { label: 'Nom du dossier', key: 'tem_nom_dossier' }, 
      { label: 'Département', key: 'obs_1_adr_dpt' }, 
      { label: 'Date', key: 'obs_date_heure' }
    ]; 
    this.headerAndKeyValueCas = [
      { label: 'idCas', key: 'id_cas' },
      { label: 'Dépatement', key: 'cas_zone_code' },
      { label: 'Classification', key: 'cas_classification'},
      { label: 'Nom du dossier', key: 'cas_nom_dossier'}, 
      { label: 'Année', key: 'cas_AAAA'}
    ];
    this.requestCas = (page, pageSize, sort?: {key: string, value: string}) => this.casService.getAllByPage(page, pageSize, sort);
    this.requestTem = (page, pageSize, sort?: {key: string, value: string}) => this.temService.getAllByPage(page, pageSize);
   }



  ngOnInit(): void {
  }
  

}
