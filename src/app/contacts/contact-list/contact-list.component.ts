import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',

})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
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

    onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
