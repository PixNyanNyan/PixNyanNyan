import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';

import { ICreatePostModel, AppService } from '../appService';
import { ConfigService } from '../configService';

@Component({
    selector: 'post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    @Input()
    parentPostId: number;

    recaptchaSiteKey: string;
    recaptchaToken: string;

    @ViewChild('reCaptcha')
    reCaptcha: ReCaptchaComponent;

    model: ICreatePostModel = {
        email: null,
        title: null,
        author: null,
        message: null,
        image: null,
        parentPostId: null
    };

    constructor(
        private appService: AppService,
        private config: ConfigService
    ) {
        this.recaptchaSiteKey = config.get('recaptchaSiteKey');
    }

    ngOnInit() {
    }

    handleCorrectCaptcha(token) {
        this.recaptchaToken = token;
    }

    onSubmit() {
        console.log('onSubmit');
        if (this.parentPostId)
            this.model.parentPostId = this.parentPostId;
        this.appService
            .createPost(this.model, this.recaptchaToken)
            .finally(() => {
                this.reCaptcha.reset();
            })
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
