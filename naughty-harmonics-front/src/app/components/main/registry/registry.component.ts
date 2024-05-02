import {Component, OnInit} from '@angular/core';
import {CompositionBlockComponent} from "../composition-block/composition-block.component";
import {ApiService} from "../../../util/apiService";
import {NgForOf} from "@angular/common";
import {CompositionDocument} from "../../../dto/compositionDocument";
import {async, Observable} from "rxjs";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [
    CompositionBlockComponent,
    NgForOf
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css'
})
export class RegistryComponent implements OnInit {

  compositions: Array<CompositionDocument>

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.findAll('')
      .subscribe(it => {
        this.compositions = it
        console.log(this.compositions)
      })
  }

  protected readonly async = async;
  protected readonly async = async;
}
