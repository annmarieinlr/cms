import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;
  
  constructor(private contactService: ContactService) {}
  async ngOnInit(): Promise<void> {

    const contact: Contact = await this.contactService.getContact(this.message.sender);
     this.messageSender = contact.name;
    }
     
  }
  

