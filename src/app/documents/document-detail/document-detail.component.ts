import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'] // Fix typo here
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
    this.document = this.documentService.getDocument(params['id']); 
      
    });
  }
}
