import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  messages: Message[] = [
    new Message(
       '1', 
      'Stress',
      'I have more to do than are hours in the day', 
      'Annmarie'
     ),
      new Message(
        '2', 
       'Architectural Design',
       'One of my team leads is not doing their job', 
       'Annmarie',
      ), 
      new Message(
        '3', 
       'Food',
       'Mom, I am hungry AGAIN', 
       'Neil',
      )
  ];

  constructor() {}
  ngOnInit() {}
 
      onAddMessage(message: Message) {
      this.messages.push(message);
      }
}
