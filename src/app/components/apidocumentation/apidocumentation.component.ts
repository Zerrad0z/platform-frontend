import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-apidocumentation',
  templateUrl: './apidocumentation.component.html',
  styleUrls: ['./apidocumentation.component.css']
})
export class ApidocumentationComponent implements OnInit {
  
  documentationUrl: SafeResourceUrl = ''; // Use SafeResourceUrl instead of string

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const urlParam = params.get('url');
      console.log('Encoded URL parameter:', urlParam); // Log the encoded URL
      if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam);
        this.documentationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decodedUrl);
        console.log('Decoded and sanitized URL:', decodedUrl); // Log the decoded URL
      } else {
        console.error('Documentation URL is missing');
      }
    });
  }

  applyCustomStyles(): void {
    const iframe = document.getElementById('swagger-frame') as HTMLIFrameElement;
    setTimeout(() => {
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        const iframeDocument = iframe.contentDocument;

        const style = iframeDocument.createElement('style');
        style.textContent = `
          .swagger-ui .topbar { display: none; }
          .swagger-ui .swagger-container { margin-top: 0; }
        `;
        iframeDocument.head.appendChild(style);
      } else {
        console.error('Unable to access iframe content');
      }
    }, 1000); // Add a delay of 1 second to ensure the iframe content is loaded
  }
}
