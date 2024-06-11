import {Component, HostListener, OnInit} from '@angular/core';
import {CompositionBlockComponent} from "../composition-block/composition-block.component";
import {ApiService} from "../../../util/apiService";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {SortType} from "../../../dto/sortType";

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
  styleUrl: './registry.component.css',
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(300)]),
      transition(':leave', [style({opacity: '1'}), animate(100, style({opacity: '0'}))]),
    ])
  ]
})
export class RegistryComponent implements OnInit {

  compositions: CompositionDocument[]
  name: string = '';
  bpm: number;
  complexity: number;
  filtersEnabled: boolean = false;
  directions = [SortType.NONE, SortType.NONE, SortType.NONE, SortType.NONE, SortType.NONE]
  size = 10;
  page = 0;
  constructor(
    public apiService: ApiService,
    public socialAuthService: SocialAuthService,
    public router: Router
  ) {
  }

  // @HostListener("window:scroll", ["$event"])
  // onWindowScroll() {
  //   console.log(123)
  //   let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  //   let max = document.documentElement.scrollHeight;
  //   console.log('pos' + pos + ';max' + max)
  //   if (pos == max) {
  //     this.size += 10
  //     this.apiService.findAll(this.name, this.bpm, this.complexity, 0, this.size)
  //       .subscribe(it => this.compositions = it.content)
  //   }
  // }

  ngOnInit() {
    this.apiService.findAll()
      .subscribe(it => this.compositions = it.content)
  }


  change($event: any) {
    this.name = $event.target.value
    console.log(this.name)
  }

  search() {
    this.apiService.findAll(this.name, this.bpm, this.complexity, this.page, 10)
      .subscribe(it => {
        this.compositions = it.content
        if (this.compositions.length == 0 && this.page > 0) {
          this.prev()
        }
      })
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

  changeFiltersEnabled() {
    this.filtersEnabled = !this.filtersEnabled;
  }

  sort(field: string, type: string, direction: number) {
    var directionString: string
    switch (this.directions[direction]) {
      case SortType.ASC:
        directionString = 'desc';
        this.directions[direction] = SortType.DESC;
        break
      case SortType.NONE:
        directionString = 'asc';
        this.directions[direction] = SortType.ASC;
        break
      case SortType.DESC:
        directionString = 'asc';
        this.directions[direction] = SortType.ASC;
        break
    }

    this.compositions.sort((a, b) =>
      this.sortLogic(a, b, field, type, directionString))
  }

  private sortLogic(a: any, b: any, field: any, type: string, direction: string) {
    if (type === 'string') {
      if (a[field].toLowerCase() < b[field].toLowerCase()) {
        return direction === 'asc' ? -1 : 1;
      } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    } else {
      return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
    }
  }

  prev() {
    if (this.page == 0) {
      return
    }
    this.page--
    this.search()
  }

  next() {
    this.page++
    this.search()
  }
}
