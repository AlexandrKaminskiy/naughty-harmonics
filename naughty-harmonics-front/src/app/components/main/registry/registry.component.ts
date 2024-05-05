import {Component, OnInit} from '@angular/core';
import {CompositionBlockComponent} from "../composition-block/composition-block.component";
import {ApiService} from "../../../util/apiService";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {async, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [
    CompositionBlockComponent,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css'
})
export class RegistryComponent implements OnInit {

  compositions: CompositionDocument[]

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.findAll('')
      .subscribe(it => this.compositions = it.content)
  }

}
