import {Component, OnInit} from "@angular/core";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {ApiService} from "../../../util/apiService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAction} from "../../../dto/userAction";
import {TooltipModule} from "ngx-bootstrap/tooltip";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault,
    NgStyle,
    NgClass,
    TooltipModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  public client: ClientDto
  public currentClient: ClientDto
  public friends: Array<ClientDto>
  public invitations: Array<ClientDto>
  public invitationsFrom: Array<ClientDto>
  public compositions: Array<CompositionDocument>
  public current: boolean
  public canGrant: boolean;
  public userAction: UserAction
  public rating: number
  public colorFrom: string;
  public colorTo: string;
  public tabs = ['compositions', 'friends', 'invitations']
  public activeTab = 'compositions'

  constructor(
    private clientService: ClientService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getFriendsAndInvitations(params['id']);
      this.clientService.getCurrentUser().subscribe(it => {
        this.currentClient = it;
        this.current = params['id'] == undefined || it.id == params['id'];

        if (this.current) {
          this.client = it
          this.colorFrom = this.client.colors.match(/.{1,3}/g)!![0]
          this.colorTo = this.client.colors.match(/.{1,3}/g)!![1]
          this.getClientRating()
          this.getCompositions(it.id)
        }

        if (!this.current) {
          this.clientService.getUser(params['id']).subscribe(it => {
            this.client = it
            this.colorFrom = this.client.colors.match(/.{1,3}/g)!![0]
            this.colorTo = this.client.colors.match(/.{1,3}/g)!![1]
            this.getCompositions(it.id)
            this.getClientRating()
          })
        }
      })


    })
  }

  private defineUserAction(id: number) {
    const invitationsFrom = this.invitationsFrom.some(it => it.id == id);
    if (invitationsFrom) {
      this.userAction = UserAction.INVITE_FROM
      return
    }
    const invitationsTo = this.invitations.some(it => it.id == id);
    if (invitationsTo) {
      this.userAction = UserAction.INVITE_TO
      return;
    }
    const friendWith = this.friends.some(it => it.id == id);
    if (friendWith) {
      this.userAction = UserAction.FRIENDS
      return;
    }
    this.userAction = UserAction.NOTHING
  }

  private getCompositions(id: number) {
    this.apiService.findUserCompositions(id).subscribe(it => {
      this.compositions = it;
    })
  }

  private getFriendsAndInvitations(id: number) {
    this.clientService.getFriendList().subscribe(it => {
      this.friends = it;
      this.clientService.getInvitationList().subscribe(it => {
        this.invitations = it;
        this.clientService.getInvitationFromList().subscribe(it => {
          this.invitationsFrom = it;
          if (id) this.defineUserAction(id)
        })
      })
    })
  }

  toNoteInfoPage(id: number) {
    this.router.navigate(['/info'], {queryParams: {id: id}})
  }

  toUserPage(id: number) {
    this.router.navigate(['/profile'], {queryParams: {id: id}})
  }

  delete() {
    this.clientService.declineFriend(this.client.id).subscribe()
    this.userAction = UserAction.NOTHING
  }

  invite() {
    this.clientService.inviteOrAcceptFriend(this.client.id).subscribe()
    this.userAction = UserAction.INVITE_FROM
  }

  accept() {
    this.clientService.inviteOrAcceptFriend(this.client.id).subscribe()
    this.userAction = UserAction.FRIENDS
    window.location.reload()
  }

  protected readonly UserAction = UserAction;

  grant() {
    this.clientService.grantAdmin(this.client.id).subscribe(() => window.location.reload())
  }

  getClientRating() {
    this.apiService.getClientRating(this.client.id).subscribe(it => this.rating = it)
  }

  changeTab(tab: string) {
    this.activeTab = tab
  }
}
