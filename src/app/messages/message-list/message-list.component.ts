import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.messages = this.messageService.getMessages(); // Initialize messages array
    this.messageService.messageChangedEvent.subscribe(messages => {
      this.messages = messages; // Update messages array when it changes
    })
  }
  onMessageSelected(message: Message) {
    // Implement your logic when a message is selected
    console.log('Message selected:', message);
  }
}
