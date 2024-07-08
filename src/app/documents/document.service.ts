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
  private firebaseUrl = 'https://cmsproject-64c63-default-rtdb.firebaseio.com/documents.json';

  //documents: Document[] = MOCKDOCUMENTS;

  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    //make sure id of the new Document id empty
    //document._id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{message: string, document: Document}>('http://localhost:3000/documents', document, {headers: headers})
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.storeDocuments();
        }
      );
    }
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);

  //   // Notify subscribers about changes to the documents list
  //   const documentsListClone = this.documents.slice();
  //   //this.documentListChangedEvent.next(documentsListClone);

  //    // Call storeDocuments() to save the updated documents list
  //    this.storeDocuments();
  // }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('http://localhost:3000/documents')
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

   
  storeDocuments() {
    // Convert the documents array into a string format
    const documentsJson = JSON.stringify(this.documents);

    // Create a new HttpHeaders object that sets the Content-Type
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Call the http service’s put() method to send the document list to your Firebase database server
    this.http.put(this.firebaseUrl, documentsJson, {headers: headers})
      .subscribe(() => {
        // Emit the documentListChangedEvent with a cloned copy of the documents array
        this.documentListChangedEvent.next([...this.documents]);
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
        return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
        return;
    }
    //set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.storeDocuments();
        }
      );
    // Notify subscribers about changes to the documents list
    const documentsListClone = this.documents.slice();
     // Call storeDocuments() to save the updated documents list
     this.storeDocuments();
}

deleteDocument(document: Document) {
  if (!document) {
      return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);
  if (pos < 0) {
      return;
  }

  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.storeDocuments();
      }
    );

  this.documents.splice(pos, 1);

  // Notify subscribers about changes to the documents list
  const documentsListClone = this.documents.slice();
   // Call storeDocuments() to save the updated documents list
   this.storeDocuments();
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

