import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  messagesSubscription: Subscription;

  constructor(private messageService: MessageService) {}
  ngOnInit() {
    // this.messages = this.messageService.getMessages(); // Initialize messages array
    // this.messageService.messageChangedEvent.subscribe(messages => {
    //   this.messages = messages; // Update messages array when it changes
    // })

    this.messagesSubscription = this.messageService.getMessages()
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
        // Handle error as needed
      }
    );
    this.messagesSubscription = this.messageService.messageChangedEvent.subscribe((contactsList: Message[]) => {
      
    });
  }
  }
  // onMessageSelected(message: Message) {
  //   // Implement your logic when a message is selected
  //   console.log('Message selected:', message);
  // }

