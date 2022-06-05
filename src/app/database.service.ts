import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://leticia-goncalves.glitch.me';

  async getPeople() {
    return firstValueFrom(this.http.get<Person[]>(this.baseURL + '/person'));
  }

  deletePerson(_id: string) {
    return this.http.delete(this.baseURL + '/person/' + _id);
  }

  addPerson(person: any) {
    let body = new HttpParams();
    body = body.set('name', person.name);
    body = body.set('nacionality', person.nacionality);
    body = body.set('age', String(person.age));
    body = body.set('profession', person.profession);
    return this.http.post(this.baseURL + '/person', body, {
      observe: 'response',
    });
  }

  async getPerson(_id: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(this.baseURL + '/person/' + _id)
      );
      return response;
    } catch (error) {
      return undefined;
    }
  }

  editProduct(_id: any, person: any){
    let body = new HttpParams();
    body = body.set('name', person.name);
    body = body.set('nacionality', person.nacionality);
    body = body.set('age', String(person.age));
    body = body.set('profession', person.profession);
    return this.http.patch(this.baseURL + "/person/"  + _id, body, {observe: "response"})
  }
}
