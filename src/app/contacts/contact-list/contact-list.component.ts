import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',

})
export class ContactListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  term: string;
 
  contacts: Contact[] = []; //initialze empty contacts array


     constructor(private contactService: ContactService) {} //inject ContactService
      
     ngOnInit() {
      this.contacts = this.contactService.getContacts();
      this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
        
      });
    }
    search(value: string) {
      this.term = value;
    }
    ngOnDestroy() {
      // Unsubscribe from the subscription
      this.subscription.unsubscribe();
    }
  
    
  }
      
     
  

