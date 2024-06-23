import { Observable, Subject, throwError } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  private firebaseUrl = 'https://cmsproject-64c63-default-rtdb.firebaseio.com/contacts.json';

  // contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString(); // Convert maxContactId to string
    this.contacts.push(newContact);

    // Notify subscribers about changes to the contacts list
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);

      // Store contacts in Firebase
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    // Notify subscribers about changes to the contacts list
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }


  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://cmsproject-64c63-default-rtdb.firebaseio.com/contacts.json')
      .pipe(
        tap((contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
          const contactListClone = this.contacts.slice();
          this.contactListChangedEvent.next(contactListClone);
        }),
        catchError((error) => {
          console.error('Error fetching contacts:', error);
          return throwError(error);
        })
      );
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  storeContacts() {

     // Map contacts to include imageUrl property if it exists
  // const contactsToStore = this.contacts.map(contact => ({
  //   ...contact,
  //   imageUrl: contact.imageUrl || '' // Default to empty string if imageUrl is undefined
  // }));
    // Convert the contacts array into a string format
    const contactsString = JSON.stringify(this.contacts);

    // PUT request to store the contacts in the Firebase database
    this.http.put(this.firebaseUrl, contactsString, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
      .subscribe((response: Response) => {
        console.log(response);
      });
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);

    // Notify subscribers about changes to the contacts list
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  private getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10); // Convert contact id to number
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
}