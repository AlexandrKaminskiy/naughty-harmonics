import {Injectable} from "@angular/core";
import {BACKEND_HOST} from "./constants";
import {HttpClient} from "@angular/common/http";
import {CompositionDocument} from "../dto/compositionDocument";
import {Composition} from "../dto/composition";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public httpClient: HttpClient) {
  }

  findAll(name: any, page: number = 0 ) {
    if (!name) name = ''
    return this.httpClient.get<Array<CompositionDocument>>(`${BACKEND_HOST}/composition?page=${page}&name=${name}`)
  }

  saveSheet(composition: Composition): Observable<Response> {
    return this.httpClient.post<Response>(`${BACKEND_HOST}/composition`, composition)
  }
}
