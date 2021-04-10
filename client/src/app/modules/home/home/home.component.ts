import { Component, OnInit } from '@angular/core';
import { data } from '../../../data/result.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result = data

  constructor() { }

  ngOnInit(): void {

  }

}