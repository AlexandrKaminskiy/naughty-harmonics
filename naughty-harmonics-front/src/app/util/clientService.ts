import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BACKEND_HOST} from "./constants";
import {ClientDto} from "../dto/clientDto";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser() {
    return this.httpClient.get<ClientDto>(`${BACKEND_HOST}/client`)
  }
}