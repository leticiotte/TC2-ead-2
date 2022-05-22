import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Person } from '../models/Person';


@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {
  listPeople: Person[] = []
  person: Person | undefined
  objWithPeopleArray :any = { people : [] }
  waiting = false

  constructor(private web : DatabaseService, private toastr: ToastrService) { }

  async loadPeople() : Promise<void>{
    this.waiting = true
    this.objWithPeopleArray = await this.web.getPeople()
    this.waiting = false
    this.listPeople = this.objWithPeopleArray.people
  }

  deletePerson(_id: string, name: String) : void{
    var r=confirm(`Deseja mesmo excluir a pessoa com o seguinte nome: ${name}?`);
    if (r!=true) return
    this.web.deletePerson(_id).subscribe();
    this.toastr.success("Pessoa excluída com sucesso!")
    this.deletePersonFromList(_id)
  }

  deletePersonFromList(_id: String){
    if(this.listPeople != undefined){
      for(let i = 0; i < this.listPeople?.length; i++){
        if(this.listPeople[i]._id == _id){
          this.listPeople.splice(i, 1);
        }
      }
    }
  }

  ngOnInit(): void {
    this.loadPeople()
  }

}
