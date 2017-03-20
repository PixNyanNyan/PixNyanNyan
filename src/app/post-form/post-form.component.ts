import { Component, Input, OnInit } from '@angular/core';

import { ICreatePostModel, AppService } from '../appService';

@Component({
    selector: 'post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    @Input()
    parentPostId: number;

    model: ICreatePostModel = {
        email: null,
        title: null,
        author: null,
        message: null,
        image: null,
        parentPostId: null
    };

    constructor(
        private appService: AppService
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log('onSubmit');
        if (this.parentPostId)
            this.model.parentPostId = this.parentPostId;
        this.appService
            .createPost(this.model)
            .subscribe(res => {
                this.model = {
                    email: null,
                    title: null,
                    author: null,
                    message: null,
                    image: null,
                    parentPostId: null
                };
            });
    }
}
