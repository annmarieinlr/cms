import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent  implements OnInit {
  @ViewChild('f') contactForm: NgForm;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(null, value.name, value.email, value.phone, value.imageUrl, this.groupContacts)

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.id = params['id'];

    if (this.id === undefined || this.id === null) {
     this.editMode = false;
     return;
    }

    this.originalContact = this.contactService.getContact(this.id);

    if (this.originalContact === undefined || this.originalContact === null) {
      return;
    }

    this.editMode = true;

    this.contact = JSON.parse(JSON.stringify(this.originalContact));
  });
}
}