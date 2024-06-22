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
  contacts: Contact[] = []; //initialze empty contacts array
  
  //subscription: Subscription;
  contactSubscription: Subscription;
  term: string;
 
  constructor(private contactService: ContactService) {} //inject ContactService
      
  ngOnInit():void {
    this.contactSubscription = this.contactService.getContacts()
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        },
        (error) => {
          console.error('Error fetching contacts:', error);
          // Handle error as needed
        }
      );
      this.contactSubscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
        
      });
    }
    search(value: string) {
      this.term = value;
    }
    ngOnDestroy():void {
      // Unsubscribe from the subscription
      if (this.contactSubscription) {
        this.contactSubscription.unsubscribe();
    }
      
  }
}   
     
  

