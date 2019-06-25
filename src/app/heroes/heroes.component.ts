import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss', '../app.component.scss']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'WindStorm'
  };
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const newHero: Hero = {
      id: +this.heroes[this.heroes.length - 1].id + 1,
      name
    };
    this.heroService.addHero(newHero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe();
  }
}
