import { Component, OnInit } from '@angular/core';

import { Post } from '../appService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  threads: Post[] = [
      {
        no: 1,
        title: '無標題',
        author: '無名氏',
        created_at: 'yyyy-MM-ddTHH:mm:ssZ',
        imageFileName: '123.jpg',
        imageFileSize: 123,
        id: '炫炮ID1',
        message: '無內文1',
        replies: [
          {
            no: 2,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '',
            imageFileSize: 123,
            id: '炫炮ID2',
            message: '無內文2'
          },
          {
            no: 3,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '',
            imageFileSize: 123,
            id: '炫炮ID2',
            message: '無內文3'
          }
        ]
      },
      {
        no: 1,
        title: '無標題',
        author: '無名氏',
        created_at: 'yyyy-MM-ddTHH:mm:ssZ',
        imageFileName: '123.jpg',
        imageFileSize: 123,
        id: '炫炮ID1',
        message: '無內文1',
        replies: [
          {
            no: 2,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '',
            imageFileSize: 123,
            id: '炫炮ID2',
            message: '無內文2'
          },
          {
            no: 3,
            title: '無標題',
            author: '無名氏',
            created_at: 'yyyy-MM-ddTHH:mm:ssZ',
            imageFileName: '',
            imageFileSize: 123,
            id: '炫炮ID2',
            message: '無內文3'
          }
        ]
      }
  ];

  constructor() { }

  ngOnInit() {
  }

}
