import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person : Person = { _id: "", name: "", nacionality: "", age: 0, profession: "" }

  constructor(private web : DatabaseService, private toastr: ToastrService) { }

  add(){
    this.web.addPerson(this.person).subscribe(res => {
      console.log(res)
      if(res.ok == true){
        this.toastr.success("Cadastro realizado com sucesso!")
      }else{
        this.toastr.error("Não foi possível realizar o cadastro.")
      }
    });
  }


  ngOnInit(): void {
  }

}
