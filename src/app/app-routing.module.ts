import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

const routes: Routes = [
  { path: '',component: MainLayoutComponent, children: [   //The MainLayout comp is displayed on the first screen (i.e localhost:4200)
    { path: '', component: NotesListComponent },            //Adding the NotesListComponent as a child of the main layout comp with the same path
                                                            //injects it into the MainLayoutComponnet as its child (injects it in the router-layout tag in the mainlayout comp)
    { path: 'new', component: NoteDetailsComponent},        //This has to come above :id otherwise it'll be treated as :id only (angular goes from top to bottom)
    { path: ':id', component: NoteDetailsComponent}         //This is a dynamic route so that any address goes to this page e.g localhost:4200/abc
    
  ] }                                                      
                                                            
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [NotesListComponent]