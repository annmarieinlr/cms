import { Injectable } from '@angular/core';
import  { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = MOCKDOCUMENTS;

  constructor() { }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
}
