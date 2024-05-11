import {Component, Input} from '@angular/core';
import {CompositionDocument} from "../../../dto/compositionDocument";
import {Router} from "@angular/router";

@Component({
  selector: 'app-composition-block',
  standalone: true,
  imports: [],
  templateUrl: './composition-block.component.html',
  styleUrl: './composition-block.component.css'
})
export class CompositionBlockComponent {
  @Input() document: CompositionDocument

  constructor(private router: Router) {
  }

  navigateToCard($event: Event) {
    this.router.navigate(['creation'], {queryParams: {id: this.document.id}})
    $event.stopPropagation()
  }
}
