import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../util/apiService";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {NgIf, NgStyle, NgSwitch} from "@angular/common";
import {ClientService} from "../../../util/clientService";
import {routes} from "../../../app.routes";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {BACKEND_HOST} from "../../../util/constants";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-sheet-info-page',
  standalone: true,
  templateUrl: './composition-info-page.component.html',
  imports: [
    NgIf,
    NgSwitch,
    PdfViewerModule,
    NgStyle,
    NgToastModule
  ],
  styleUrls: ['./composition-info-page.component.css']
})
export class CompositionInfoPageComponent implements OnInit, AfterViewInit {
  public pdfSrc: string;
  public rating: number
  public isRated: boolean
  public compositionDocument: CompositionDocument
  public canDownload: boolean;
  public isAdmin: boolean
  public isCurrentUser: boolean
  @ViewChild('video') videoIfFrame: ElementRef;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    public ngToastService: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.apiService.findByIdBrief(params['id']).subscribe(resp => {
        this.compositionDocument = resp
        console.log(resp)
        this.pdfSrc = BACKEND_HOST + '/composition/document/' + this.compositionDocument.id
        this.clientService.getCurrentUser().subscribe(it => {
          this.getCompositionRating()
          this.getIsRated()
          this.isAdmin = this.clientService.hasRole(it.authority, 'ROLE_ADMIN')
          this.isCurrentUser = it.id == this.compositionDocument.clientId
        })
      }, error => this.router.navigate(['not-found']))

    })
  }

  toUserPage() {
    this.router.navigate(['profile'], {queryParams: {id: this.compositionDocument.clientId}})
  }

  ngAfterViewInit() {
    console.log(this.videoIfFrame)
    if (!this.compositionDocument.videoLink) {
      this.compositionDocument.videoLink = "https://www.youtube.com/embed/NCMKedZvnyI"
    }
    this.videoIfFrame.nativeElement.src = this.compositionDocument.videoLink;
  }

  ban() {
    this.apiService.ban(this.compositionDocument.id).subscribe()
    window.location.reload();
  }

  delete() {
    this.apiService.delete(this.compositionDocument.id).subscribe()
    this.router.navigate(['registry']).then(() => window.location.reload())
  }

  restore() {
    this.apiService.restore(this.compositionDocument.id).subscribe()
    window.location.reload();
  }

  editComposition() {
    this.router.navigate(["creation"], {queryParams: {id: this.compositionDocument.id}})
  }

  downloadComposition() {
    this.ngToastService.info(`File download`, "INFO", 5000)
    this.apiService.downloadFile(this.compositionDocument.id)
  }

  getCompositionRating() {
    this.apiService.getRating(this.compositionDocument.id)
      .subscribe(it => this.rating = it)
  }

  getIsRated() {
    this.apiService.isRated(this.compositionDocument.id)
      .subscribe(it => this.isRated = it)
  }

  rate() {
    this.apiService.rate(this.compositionDocument.id)
      .subscribe(it => {
        this.getCompositionRating()
        this.getIsRated()
      })
      // this.getCompositionRating()
  }
}
