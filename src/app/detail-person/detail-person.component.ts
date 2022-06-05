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
  notFound = false;

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async getPeople(_id: string): Promise<void> {
    this.waiting = true;
    this.objPerson = await this.web.getPerson(_id);
    if (this.objPerson == undefined) {
      this.notFound = true;
      this.waiting = false;
      return
    }
    this.waiting = false;
    this.person = this.objPerson.person;
  }

  async ngOnInit(): Promise<void> {
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined)
      await this.getPeople(this._id);
  }
}
