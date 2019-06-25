import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../Hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor() { }

  ngOnInit() {
  }

}
