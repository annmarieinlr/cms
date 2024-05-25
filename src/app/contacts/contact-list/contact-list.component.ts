import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',

})
export class ContactListComponent implements OnInit {
 
  contacts: Contact[] = []; //initialze empty contacts array


     constructor(private contactService: ContactService) {} //inject ContactService
      
     ngOnInit() {
      this.contacts = this.contactService.getContacts();
     }
      //@Output() selectedContactEvent = new EventEmitter<Contact>();
      onSelected(contact: Contact) {
      this.contactService.contactSelectedEvent.emit(contact);
  }
}
