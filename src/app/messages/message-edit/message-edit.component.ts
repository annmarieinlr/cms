import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = "Annmarie";

  constructor() {}
  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
  

  const newMessage = new Message(
    
    "id:1", 
    this.currentSender,
    
    subject,
    msgText
  );

  // Emit the new Message object using the addMessageEvent emitter
  this.addMessageEvent.emit(newMessage);
}

onClear() {
  // Clear the subject and msgText input elements in the form
  this.subjectInputRef.nativeElement.value = '';
  this.msgTextInputRef.nativeElement.value = '';
}
}


