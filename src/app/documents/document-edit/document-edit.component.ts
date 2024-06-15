import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  
  onCancel() {
    console.log("cancel");
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    
  }
}
