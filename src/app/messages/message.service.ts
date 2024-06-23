import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  maxMessageId: number;
  private messagesUrl = 'https://cmsproject-64c63-default-rtdb.firebaseio.com/messages.json';

  constructor( private http: HttpClient) {
    this.messages = MOCKMESSAGES;
   }



  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
  messageChangedEvent = new EventEmitter<Message[]>();
    

  // getMessages(): Message[] {
  //   return this.messages.slice();
    
  // }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('https://cmsproject-64c63-default-rtdb.firebaseio.com/messages.json')
      .pipe(
        tap((messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          //this.messages.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
          const messageListClone = this.messages.slice();
          this.messageChangedEvent.next(messageListClone);
        }),
        catchError((error) => {
          console.error('Error fetching contacts:', error);
          return throwError(error);
        })
      );
  }

  storeMessages() {
     // Convert the contacts array into a string format
     const contactsString = JSON.stringify(this.messages);

     // PUT request to store the contacts in the Firebase database
     this.http.put(this.messagesUrl, contactsString, {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
     })
       .subscribe((response: Response) => {
         console.log(response);
       });
  }
  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
