import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  format: any;
  url: any;
  constructor() {}

  ngOnInit(): void {}

  onFileUpload(event: any) {
    const file: any = event.target.files && event.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (ev) => {
        this.url = ev.target.result;
      };
    }
  }
}
