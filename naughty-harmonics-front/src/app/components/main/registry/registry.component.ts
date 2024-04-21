import { Component } from '@angular/core';
import {CompositionBlockComponent} from "../composition-block/composition-block.component";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [
    CompositionBlockComponent
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.css'
})
export class RegistryComponent {

}
