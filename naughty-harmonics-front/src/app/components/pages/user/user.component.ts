import {Component, OnInit} from "@angular/core";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {NgForOf, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {ApiService} from "../../../util/apiService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAction} from "../../../dto/userAction";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault
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

  constructor(
    private clientService: ClientService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.current = params['id'] == undefined;
      this.getFriendsAndInvitations(params['id']);
      this.clientService.getCurrentUser().subscribe(it => {
        this.currentClient = it;
        if (this.current) {
          this.client = it
          this.getCompositions(it.id)
        }
      })

      if (!this.current) {
        this.clientService.getUser(params['id']).subscribe(it => {
          this.client = it
          this.getCompositions(it.id)

        })
      }
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
  }

  protected readonly UserAction = UserAction;

  grant() {
    this.clientService.grantAdmin(this.client.id).subscribe(() => window.location.reload())
  }
}
