import { Component } from '@angular/core';
import {FunctionDescription} from "../dto/functionDescription";
import {NgForOf} from "@angular/common";

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
  public functions: FunctionDescription[] = [
    {description: 'up'},
    {description: 'down'},
    {description: 'up 1/2'},
    {description: 'down 1/2'},
    {description: '/3'},
    {description: '\\3'},
  ]
}
