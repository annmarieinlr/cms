import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',

})
export class ContactListComponent implements OnInit {
 
  contacts: Contact[] = [
    new Contact(
       '1', 
      'R. Kent Jackson',
      'jacksonk@byui.edu', 
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null),
      new Contact(
        '2', 
       'Rex Barzeer',
       'barzeerR@byui.edu', 
       '208-496-3768',
       '../../assets/images/barzeer.jpg',
       null)
  ];

     constructor() {}
      ngOnInit() {}
      @Output() selectedContactEvent = new EventEmitter<Contact>();
      onSelected(contact: Contact) {
      this.selectedContactEvent.emit(contact);
  }
}
