import { Observable, Subject, throwError } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import  { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  //documents: Document[] = MOCKDOCUMENTS;

  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    // Notify subscribers about changes to the documents list
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('your-firebase-database-url/documents.json')
      .pipe(
        tap((documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
          const documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        }),
        catchError((error) => {
          console.error('Error fetching documents:', error);
          return throwError(error);
        })
      );
  }
  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

 
  

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
        return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
        return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    // Notify subscribers about changes to the documents list
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
}

deleteDocument(document: Document) {
  if (!document) {
      return;
  }

  const pos = this.documents.indexOf(document);
  if (pos < 0) {
      return;
  }

  this.documents.splice(pos, 1);

  // Notify subscribers about changes to the documents list
  const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10); // Convert document id to number
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
}

//   documentSelectedEvent = new EventEmitter<Document>();
//   documentChangedEvent = new EventEmitter<Document[]>();
// }

