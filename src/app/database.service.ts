import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://leticia-goncalves.glitch.me';

  async getPeople() {
    return this.http.get<Person[]>(this.baseURL + '/person').toPromise();
  }

  deletePerson(_id: string) {
    console.log(this.baseURL + '/person/' + _id);
    return this.http.delete(this.baseURL + '/person/' + _id);
  }

  addPerson(person: Person) {
    let body = new HttpParams();
    body = body.set('name', person.name);
    body = body.set('nacionality', person.nacionality);
    body = body.set('age', String(person.age));
    body = body.set('profession', person.profession);
    return this.http.post(this.baseURL + '/person', body, {
      observe: 'response',
    });
  }

  getPerson(_id: string): Observable<Person> {
    return this.http.get<Person>(this.baseURL + '/person/' + _id);
  }

  /*editProduct(_id: any, product: any){
    let body = new HttpParams();
    body = body.set('title', product.title)
    body = body.set('price', String(product.price))
    body = body.set('description', product.description)
    return this.http.put(this.baseURL + "/produtos/"  + _id, body, {observe: "response"})
  }*/
}
