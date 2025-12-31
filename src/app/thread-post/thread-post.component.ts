import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IPost } from '../appService';
import { ConfigService } from '../configService';
import { MessageConverterPipe } from '../messageConverter.pipe';

@Component({
  selector: 'thread-post',
  standalone: true,
  imports: [CommonModule, RouterModule, MessageConverterPipe],
  templateUrl: './thread-post.component.html',
  styleUrls: ['./thread-post.component.css']
})
export class ThreadPostComponent implements OnInit {

    @Input()
    thread!: IPost;

    @Input()
    replyMode: boolean = false;

    defaultMessage: {
        title: string,
        author: string,
        message: string
    };

    imageUrl: string = '';

    constructor(
        private config: ConfigService
    ) {
        this.defaultMessage = config.get('defaultMessage');
        this.imageUrl = config.get('imageUrl');
    }

    ngOnInit() {
    }

}
