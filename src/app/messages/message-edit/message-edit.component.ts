import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output, AfterViewInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
  //@ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  //@Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = "Annmarie";

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    
    const newMessage = new Message('', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }
  
  

onClear() {
  // Clear the subject and msgText input elements in the form
  this.subjectInputRef.nativeElement.value = '';
  this.msgTextInputRef.nativeElement.value = '';
}
}


