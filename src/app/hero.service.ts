import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './Hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/hero';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id ${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.httpClient.put(url, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`add new hero w/ name = ${newHero.name}`)),
        catchError(this.handleError<any>('addHero'))
      );
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.httpClient.delete(url, httpOptions)
      .pipe(
        tap(_ => this.log(`delete hero w/ id = ${id}`)),
        catchError(this.handleError<any>('deleteHero'))
      );
  }

  searchHero(name: string): Observable<Hero[]> {
    if (!name.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}?q=${name.trim()}`;
    return this.httpClient.get<Hero[]>(url)
      .pipe(
        tap(_ => this.log(`found heroes matching ${name}`)),
        catchError(this.handleError<Hero[]>('searchHero', []))
      );
  }

  private log(msg: string): void {
    this.messageService.add(`HeroService: ${msg}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
