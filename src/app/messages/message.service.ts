import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];


  constructor() {
    this.messages = MOCKMESSAGES;
   }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
  messageChangedEvent = new EventEmitter<Message[]>();

  getMessages(): Message[] {
    return this.messages.slice();
  }
}
