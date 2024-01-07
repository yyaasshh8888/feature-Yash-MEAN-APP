import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(@Inject(DOCUMENT) private _doc: any) {}

  /**
   * Get the title of the current HTML document.
   */
  getTitle(): string {
    return this._doc.title;
  }

  /**
   * Set the title of the current HTML document.
   * @param newTitle
   */
  setTitle(newTitle: string) {
    this._doc.title = newTitle || '';
  }
}
