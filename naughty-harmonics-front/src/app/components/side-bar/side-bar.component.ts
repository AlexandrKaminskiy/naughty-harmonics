import {Component} from '@angular/core';
import {FunctionDescription} from "../../dto/functionDescription";
import {NgForOf} from "@angular/common";
import {NoteFunctionType} from "../../dto/noteFunctionType";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  public functions: any[] = [
    {description: 'up', type: NoteFunctionType.BAND_UP},
    {description: 'down', type: NoteFunctionType.BAND_DOWN},
    {description: 'up 1/2', type: NoteFunctionType.BAND_UP_12},
    {description: 'down 1/2', type: NoteFunctionType.BAND_DOWN_12},
    {description: 'vibrato', type: NoteFunctionType.VIBRATO},
  ]


}
