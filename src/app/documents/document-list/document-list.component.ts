import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      'Doc1',
      'name1',
      'description1',
      'url1'
    ), 
    new Document(
      'Doc2',
      'name2',
      'description2',
      'url2'
    ), 
    new Document(
      'Doc3',
      'name3',
      'description3',
      'url3'
    ), 
    new Document(
      'Doc4',
      'name4',
      'description4',
      'url4'
    ), 

  ]
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}