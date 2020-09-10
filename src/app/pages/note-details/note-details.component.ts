import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { Router, ActivatedRoute, Params } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;
  noteId: number;
  new: boolean;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Find if creating a new node or editing an existing one
    //We subscribe to the parameter changes, (func) is a observer, which is a callback function called everytime a new message is emmited from the observable(params observable in this case), i.e this callback will be executed everytime there is a change in the route parameters
    this.route.params.subscribe((params: Params) => { //:id is a parameter of the route
      this.note = new Note();
      if(params.id){    // This id refers to the :id in the router, as the 'new' path doesn't contain ':id'
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      }else{
        this.new = true;
      }
    }); 

    
  }

  onSubmit(form: NgForm){
    if(this.new){
      //save the note
      this.notesService.add(form.value);
      this.router.navigateByUrl('/');
    }else{
      //update the note
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.router.navigateByUrl('/');
    }
    //5154   
  }

  cancel(){
    this.router.navigateByUrl('/');
  }

}
