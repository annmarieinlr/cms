import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit, OnDestroy {
  //selectedContact: Contact;
  contacts: Contact[];
  subscription: Subscription;

  constructor(private contactService: ContactService ){}

  ngOnInit(): void {
    this.contactService.getContacts() // Initialize contacts list
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
  
      });
    // Subscribe to contactListChangedEvent to update contacts list
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.subscription.unsubscribe();
  }
}

