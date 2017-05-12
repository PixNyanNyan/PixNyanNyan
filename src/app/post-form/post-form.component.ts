import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    @ViewChild('message')
    message: ElementRef;

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

    insertMessage(text: string) {
        var textArea: HTMLTextAreaElement = this.message.nativeElement;
        var pos = textArea.selectionStart;
        var oldMessage = this.model.message || '';
        this.model.message = oldMessage.substring(0, pos) + text + oldMessage.substring(pos);
        textArea.focus();
    }

    fileChange($event) {
        var files: File[] = $event.srcElement.files;
        this.model.image = files[0];
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
