import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Broadcaster } from 'ng2-cable/js/index';

import { AppService, IPost } from '../appService';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
    threadId: number;
    thread: IPost;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private broadcaster: Broadcaster,
        private appService: AppService
    ) {
        route.params.map(params => params['id']).subscribe(id => {
            if (!id) {
                this.router.navigate(['/']);
            }
            this.threadId = +id;
            this.appService
                .getThread(id)
                .subscribe(res => {
                    this.thread = res;
                }, error => {
                    // TODO 該当記事がみつかりません
                });
        });

        this.broadcaster
            .on<any>('create')
            .map<IPost>(message => JSON.parse(message.obj))
            .filter(post => post.parentPostId == this.threadId)
            .subscribe(post => {
                if (this.thread && this.thread.replies) {
                    this.thread.replies.push(post);
                }
            });
    }

    ngOnInit() {
    }

}
