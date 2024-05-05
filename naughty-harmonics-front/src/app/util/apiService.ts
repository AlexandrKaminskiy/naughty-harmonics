import {Injectable} from "@angular/core";
import {BACKEND_HOST} from "./constants";
import {HttpClient} from "@angular/common/http";
import {CompositionDocument} from "../dto/compositionDocument";
import {Composition} from "../dto/composition";
import {Observable} from "rxjs";
import {Page} from "../dto/page";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public httpClient: HttpClient) {
  }

  findAll(name: any, page: number = 0 ) {
    if (!name) name = 'test'
    return this.httpClient.get<Page<CompositionDocument>>(`${BACKEND_HOST}/composition?page=${page}&name=${name}`)
  }

  saveSheet(composition: Composition): Observable<number> {
    return this.httpClient.post<number>(`${BACKEND_HOST}/composition`, composition)
  }

  updateSheet(id: number, composition: Composition): Observable<number> {
    return this.httpClient.put<number>(`${BACKEND_HOST}/composition/${id}`, composition)
  }

  findById(id: number) {
    return this.httpClient.get<Composition>(`${BACKEND_HOST}/composition/${id}`)
  }
}
