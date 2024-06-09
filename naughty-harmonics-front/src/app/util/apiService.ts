import {Injectable} from "@angular/core";
import {BACKEND_HOST} from "./constants";
import {HttpClient} from "@angular/common/http";
import {CompositionDocument} from "../dto/compositionDocument";
import {Composition} from "../dto/composition";
import {Observable} from "rxjs";
import {Page} from "../dto/page";
import {PublishResponse} from "../dto/publishResponse";
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public httpClient: HttpClient) {
  }

  findAll(name?: string, bpm?: any, complexity?: any, page?: any, size?: any): Observable<Page<CompositionDocument>> {
    if (!name) name = ''
    if (!bpm) bpm = ''
    if (!complexity) complexity = ''
    if (!page) page = ''
    if (!size) size = ''
    return this.httpClient.get<Page<CompositionDocument>>(
      `${BACKEND_HOST}/composition?name=${name}&complexity=${complexity}&bpm=${bpm}&page=${page}&size=${size}`
    )
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

  findUserCompositions(userId: number) {
    return this.httpClient
      .get<Array<CompositionDocument>>(`${BACKEND_HOST}/composition/user-compositions?userId=${userId}`)
  }

  findByIdBrief(id: number) {
    return this.httpClient.get<CompositionDocument>(
      `${BACKEND_HOST}/composition/brief/${id}`
    )
  }

  ban(id: number) {
    return this.httpClient.put<CompositionDocument>(
      `${BACKEND_HOST}/composition/ban/${id}`, {}
    )
  }

  delete(id: number) {
    return this.httpClient.delete<CompositionDocument>(
      `${BACKEND_HOST}/composition/${id}`
    )
  }

  restore(id: number) {
    return this.httpClient.put<CompositionDocument>(
      `${BACKEND_HOST}/composition/restore/${id}`, {}
    )
  }

  publishSheet(id: number) {
    return this.httpClient.post<PublishResponse>(
      `${BACKEND_HOST}/composition/publish/${id}`, {}
    )
  }

  downloadFile(id: number) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('download', `song.pdf`);

    link.setAttribute('href', `${BACKEND_HOST}/composition/document/${id}/song.pdf`);

    document.body.appendChild(link);
    link.click();
    link.remove();

    // this.httpClient.get(`${BACKEND_HOST}/composition/document/${id}`,
    //   {responseType: 'blob', observe: 'response', withCredentials: true})
    //   .subscribe(resp => {
    //     this.showFile(resp.body as Blob);
    //
    //   })
  }

  private showFile(data: Blob) {
    // const blob = new Blob([data], {type: 'application/pdf'});
    // const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'abc.net/files/test.ino');
    link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // window.open(url);
  }

  isRated(id: number) {
    return this.httpClient.get<boolean>(`${BACKEND_HOST}/rating/rated?compositionId=${id}`)
  }

  rate(id: number) {
    return this.httpClient.post<boolean>(`${BACKEND_HOST}/rating?compositionId=${id}`, {})
  }

  getRating(id: number) {
    return this.httpClient.get<number>(`${BACKEND_HOST}/rating?compositionId=${id}`, {})
  }

  getClientRating(id: number) {
    return this.httpClient.get<number>(`${BACKEND_HOST}/rating/client?clientId=${id}`, {})
  }
}
