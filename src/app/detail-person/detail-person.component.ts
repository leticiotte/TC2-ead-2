import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css'],
})
export class DetailPersonComponent implements OnInit {
  _id: string | undefined | null;
  objPerson: any;
  person!: Person;
  priceFormatted: any;
  waiting = false;
  error: boolean = false;

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.error = true
      return of(result as T);
    };
  }

  getPerson(_id: string): void {
    this.waiting = true;
    const response = this.web
      .getPerson(_id)
      .pipe(catchError(this.handleError<Person[]>('getPerson', [])))
      .subscribe((res) => {
        if (res) {
          this.waiting = false;
          this.objPerson = res;
          this.person = this.objPerson.person as Person;
        }
      });
    console.log(response);
  }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('i');
    if (this._id) this.getPerson(this._id);
  }
}
