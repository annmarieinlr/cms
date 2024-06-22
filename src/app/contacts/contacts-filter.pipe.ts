import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
// The value parameter contains the data input to the pipe that is to be transferred into a diﬀerent format. 
// The args parameter contains an array of one or more values that are needed to transform the data
  
// Define the transform method that filters contacts based on a search term
transform(contacts: Contact[], term: string) {
  let filteredContacts: Contact[] = []; // Initialize an empty array to store filtered contacts

  // Check if a search term is provided and it has some length
  if (term && term.length > 0) {
    // Filter the contacts array based on the search term
    filteredContacts = contacts.filter(
      (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  // If no contacts match the search term, return the original contacts array
  if (filteredContacts.length < 1) {
    return contacts;
  }

  // Return the array of filtered contacts
  return filteredContacts;
}
}
