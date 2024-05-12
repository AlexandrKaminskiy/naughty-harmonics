import {Component, OnInit} from "@angular/core";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {ApiService} from "../../../util/apiService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  public client: ClientDto

  public friends: Array<ClientDto>
  public invitations: Array<ClientDto>
  public compositions: Array<CompositionDocument>
  public current: boolean

  constructor(
    private clientService: ClientService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const clientId = params['id'];
      if (clientId) {
        this.current = false
        this.clientService.getUser(clientId).subscribe(it => {
          this.client = it
          this.apiService.findUserCompositions(clientId).subscribe(it => {
            this.compositions = it;
          })
        })
      } else {
        this.current = true
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
    })
  }

  toNoteInfoPage(id: number) {
    this.router.navigate(['/info'], {queryParams: {id: id}})
  }

  toUserPage(id: number) {
    this.router.navigate(['/profile'], {queryParams: {id: id}})
  }
}
