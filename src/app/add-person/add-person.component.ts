import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  form!: FormGroup;
  person = { name: '', nacionality: '', age: 0, profession: '' };

  constructor(private web: DatabaseService, private toastr: ToastrService) {}

  add() {
    if (this.verifyErrorOnForm()) return;
    this.web.addPerson(this.person).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Cadastro realizado com sucesso!');
      } else {
        this.toastr.error('Não foi possível realizar o cadastro.');
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

  ngOnInit(): void {
    this.initForm();
  }
}
