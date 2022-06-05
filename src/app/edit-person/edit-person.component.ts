import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent implements OnInit {
  form!: FormGroup;
  _id: string | null | undefined;
  waiting = false;
  notFound = false;
  objWithPerson: any = { person: {} };
  person: Person = {
    _id: '',
    name: '',
    nacionality: '',
    age: 0,
    profession: '',
  };

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async getPeople(_id: string): Promise<void> {
    this.waiting = true;
    this.objWithPerson = await this.web.getPerson(_id);
    if (this.objWithPerson == undefined) {
      this.notFound = true;
      this.waiting = false;
      return;
    }
    this.waiting = false;
    this.person = this.objWithPerson.person;
  }

  edit() {
    if (this.verifyErrorOnForm()) return;
    this.web.editProduct(this._id, this.person).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Edição realizada com sucesso!');
      } else {
        this.toastr.error('Não foi possível realizar a edição.');
      }
    });
  }

  verifyErrorOnForm() {
    if (this.form.get('age')?.errors?.['max']) {
      this.toastr.error('A idade máxima é de 130 anos');
      return true;
    }
    if (this.form.get('age')?.errors?.['min']) {
      this.toastr.error('A idade mínima é de 0 anos');
      return true;
    }
    if (!this.form.valid) {
      this.toastr.error('Preencha todos os campos');
      return true;
    }

    return false;
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.person.name, [Validators.required]),
      nacionality: new FormControl(this.person.nacionality, [
        Validators.required,
      ]),
      age: new FormControl(this.person.age, [
        Validators.required,
        Validators.min(0),
        Validators.max(130),
      ]),
      profession: new FormControl(this.person.profession, [
        Validators.required,
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined)
      await this.getPeople(this._id);
    this.initForm();
  }
}
