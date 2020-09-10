import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('title') title: string;  //We can remove the 'title' in the paranthesis because the name of the variable and this property is same
  @Input('body') body: string;  

  @Input() link: string;  //We dont need to add 'link' in the () because the name is the same

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement>; //Static false would make it so properties are retrieved after anything on the page changes
  @ViewChild('bodyText',{ static: true }) bodyText: ElementRef<HTMLElement>;
  
  constructor(private renderer: Renderer2) {} //Used for UI rendereing manipulation (can easily add/remove css classes,styles,html attributes)

  ngOnInit(): void {
    //Work out if there is a text over flow in the card body, if not hide the truncator (the gradient overlay which hides more text)
    let style = window.getComputedStyle(this.bodyText.nativeElement);
    let viewableHeight = parseInt(style.getPropertyValue("height")); // or just `style.height` also works

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight){
      this.renderer.setStyle(this.truncator.nativeElement, 'display','block');
    }else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display','none');
    }
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }


}
