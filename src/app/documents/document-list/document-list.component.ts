import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
    
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documentsList: Document[]) => {
      // Assign the array passed to the documentsList parameter to the documents class attribute
      this.documents = documentsList;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}