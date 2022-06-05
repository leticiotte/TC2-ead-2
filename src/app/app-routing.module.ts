import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeopleComponent } from './list-people/list-people.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DetailPersonComponent } from './detail-person/detail-person.component';


const routes: Routes = [
  { path: "list", component: ListPeopleComponent },
  { path: "add", component: AddPersonComponent },
  { path: "edit/:id", component: EditPersonComponent },
  { path: "detail/:id", component: DetailPersonComponent },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  {path: '**', redirectTo: "/list", pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
