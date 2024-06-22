// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Document } from './document.model';
// import { DocumentService } from './document.service';

// @Component({
//   selector: 'cms-documents',
//   templateUrl: './documents.component.html',
//   styleUrl: './documents.component.css'
// })
// export class DocumentsComponent implements OnInit, OnDestroy{
//   //selectedDocument: Document;
//   documents: Document[];
//   subscription: Subscription

//   constructor(private documentService: DocumentService) {}

//   ngOnInit() {
//     this.documents = this.documentService.getDocuments(); // Initialize documents list
    
//     // Subscribe to documentListChangedEvent to update documents list
//     this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
//       this.documents = documents;
//     });
//   }
//   ngOnDestroy(): void {
//     // Unsubscribe from the subscription to prevent memory leaks
//     this.subscription.unsubscribe();
//   }
// }


//UPDATED CODE
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'] // Correct the styleUrl to styleUrls
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documents: Document[];
  subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    // Subscribe to the Observable returned by getDocuments()
    this.subscription = this.documentService.getDocuments()
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents; // Assign fetched documents to component property
        },
        (error) => {
          console.error('Error fetching documents:', error); // Handle error if any
        }
      );

    // Subscribe to documentListChangedEvent to update documents list
    this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
