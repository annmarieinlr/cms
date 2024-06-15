import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent  implements OnInit {
  @ViewChild('f') contactForm: NgForm;
  groupContacts: any;
  onCancel() {
    console.log("cancel");
  }

  onSubmit(form: NgForm) {

  }

  ngOnInit(): void {
    
  }
}
