import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../appService';
import { Config } from '../config';

@Component({
  selector: 'thread-post',
  templateUrl: './thread-post.component.html',
  styleUrls: ['./thread-post.component.css']
})
export class ThreadPostComponent implements OnInit {

    @Input()
    thread: Post;

    @Input()
    replyMode: boolean;

    defaultMessage: {
        title: string,
        author: string,
        message: string
    };

    constructor(
        private config: Config
    ) {
        this.defaultMessage = config.get('defaultMessage');
    }

    ngOnInit() {
    }

}
