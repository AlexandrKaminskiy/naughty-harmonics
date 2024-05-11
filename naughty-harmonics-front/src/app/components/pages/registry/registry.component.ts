import {Component, OnInit} from '@angular/core';
import {CompositionBlockComponent} from "../composition-block/composition-block.component";
import {ApiService} from "../../../util/apiService";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [
    CompositionBlockComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    GoogleSigninButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css'
})
export class RegistryComponent implements OnInit {

  compositions: CompositionDocument[]
  name: string = '';
  bpm: number;
  complexity: number;

  constructor(
    public apiService: ApiService,
    public socialAuthService: SocialAuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.apiService.findAll()
      .subscribe(it => this.compositions = it.content)
  }


  change($event: any) {
    this.name = $event.target.value
    console.log(this.name)
  }

  search() {
    this.apiService.findAll(this.name, this.bpm, this.complexity, 0, 10)
      .subscribe(it => this.compositions = it.content)
  }

  fillName(e: any) {
    this.name = e.target.value
  }

  fillComplexity(e: any) {
    this.complexity = +e.target.value
  }

  fillBpm(e: any) {
    this.complexity = +e.target.value
  }

  toNoteInfoPage(i: number) {
    this.router.navigate(['/info'], {queryParams: {id: i}})
  }
}
