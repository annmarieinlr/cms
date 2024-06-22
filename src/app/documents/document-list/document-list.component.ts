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
    this.subscription = this.documentService.getDocuments()
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList; // Assign fetched documents to component property
      });
    
    // Subscribe to documentListChangedEvent to update documents list
    this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}