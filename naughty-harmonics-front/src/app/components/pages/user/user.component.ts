import {Component, OnInit} from "@angular/core";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {ApiService} from "../../../util/apiService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  public client: ClientDto

  public friends: Array<ClientDto>
  public invitations: Array<ClientDto>
  public compositions: Array<CompositionDocument>

  page: number = 0
  public disabled = true

  constructor(
    private clientService: ClientService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      params['id'];
    })

    this.clientService.getCurrentUser().subscribe(clientDto => {
      this.client = clientDto;
      this.apiService.findUserCompositions(clientDto.id).subscribe(it => {
        this.compositions = it;
      })
    })
    this.clientService.getFriendList().subscribe(it => {
      this.friends = it;
    })
    this.clientService.getInvitationList().subscribe(it => {
      this.invitations = it;
    })
  }
}
