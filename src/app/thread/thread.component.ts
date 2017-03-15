import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService, Post } from '../appService';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    thread: Post;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private appService: AppService
    ) {
        route.params.map(params => params['id']).subscribe(id => {
            if (!id) {
                this.router.navigate(['/']);
            }
            this.appService
                .getThread(id)
                .subscribe(res => {
                    this.thread = res;
                }, error => {
                    // TODO 該当記事がみつかりません
                });
        });
    }

    ngOnInit() {
    }

}
