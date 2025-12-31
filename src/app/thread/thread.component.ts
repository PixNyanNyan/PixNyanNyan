import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, filter } from 'rxjs/operators';

import { Broadcaster } from '../broadcaster.service';
import { AppService, IPost } from '../appService';
import { PostFormComponent } from '../post-form/post-form.component';
import { ThreadPostComponent } from '../thread-post/thread-post.component';

@Component({
    selector: 'app-thread',
    standalone: true,
    imports: [CommonModule, RouterModule, PostFormComponent, ThreadPostComponent],
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
    threadId!: number;
    thread!: IPost;

    @ViewChild('postForm')
    postForm!: PostFormComponent;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private broadcaster: Broadcaster,
        private appService: AppService
    ) {
        route.params.pipe(map(params => params['id'])).subscribe(id => {
            if (!id) {
                this.router.navigate(['/']);
            }
            this.threadId = +id;
            this.appService
                .getThread(this.threadId)
                .subscribe(res => {
                    this.thread = res;
                }, error => {
                    // TODO 該当記事がみつかりません
                });
        });
        route.queryParams.pipe(
            map(params => params['r']),
            filter(r => !!r)
        ).subscribe(r => {
            if (this.postForm == null) {
                setTimeout(() => {
                    this.postForm.insertMessage('>>No.' + r + '\n');
                }, 300);
                return;
            }
            this.postForm.insertMessage('>>No.' + r + '\n');
        });

        this.broadcaster
            .on<any>('create')
            .pipe(
                map<any, IPost>(message => JSON.parse(message.obj)),
                filter(post => post.parentPostId == this.threadId)
            )
            .subscribe(post => {
                if (this.thread && this.thread.replies) {
                    this.thread.replies.push(post);
                }
            });
    }

    ngOnInit() {
    }

}
