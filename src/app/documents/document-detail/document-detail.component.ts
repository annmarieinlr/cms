import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'] // Fix typo here
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;
  id: string;

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.params.subscribe((params: Params) => {
    this.document = this.documentService.getDocument(params['id']); 
      
    });
  }

  onView() {
    if (this.document.url) this.nativeWindow.open(this.document.url);
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
