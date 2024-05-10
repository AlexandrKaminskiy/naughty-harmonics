import {Component, OnInit} from "@angular/core";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  public client: ClientDto
  page: number = 0
  public disabled = true

  constructor(private clientService: ClientService) {
  }


  ngOnInit(): void {
    this.clientService.getCurrentUser().subscribe(clientDto => {
      this.client = clientDto;
    })
  }
}
