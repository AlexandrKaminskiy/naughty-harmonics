import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../util/apiService";
import {CompositionDocument} from "../../../dto/compositionDocument";

@Component({
  selector: 'app-sheet-info-page',
  standalone: true,
  templateUrl: './composition-info-page.component.html',
  styleUrls: ['./composition-info-page.component.css']
})
export class CompositionInfoPageComponent implements OnInit, AfterViewInit {
  public compositionDocument: CompositionDocument
  public canDownload: boolean;

  @ViewChild('video') videoIfFrame: ElementRef;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.apiService.findByIdBrief(params['id']).subscribe(resp => {
        this.compositionDocument = resp
        console.log(resp)

      }, error => this.router.navigate(['not-found']))
    })
  }

  ngAfterViewInit() {
    console.log(this.videoIfFrame)
    if (!this.compositionDocument.videoLink) {
      this.compositionDocument.videoLink = "https://www.youtube.com/embed/NCMKedZvnyI"
    }
    this.videoIfFrame.nativeElement.src = this.compositionDocument.videoLink;
  }


}
