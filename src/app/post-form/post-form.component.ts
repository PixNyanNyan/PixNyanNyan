import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha';
import { finalize } from 'rxjs/operators';

import { ICreatePostModel, AppService } from '../appService';
import { ConfigService } from '../configService';

@Component({
    selector: 'post-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RecaptchaModule],
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

    @Input()
    parentPostId!: number;

    recaptchaSiteKey: string;
    recaptchaToken!: string;

    @ViewChild('reCaptcha')
    reCaptcha!: RecaptchaComponent;

    @ViewChild('message')
    message!: ElementRef;

    model: ICreatePostModel = {
        email: undefined,
        title: undefined,
        author: undefined,
        message: undefined,
        image: undefined,
        parentPostId: undefined
    };

    constructor(
        private appService: AppService,
        private config: ConfigService
    ) {
        this.recaptchaSiteKey = config.get('recaptchaSiteKey');
    }

    ngOnInit() {
    }

    handleCorrectCaptcha(token: string) {
        this.recaptchaToken = token;
    }

    insertMessage(text: string) {
        var textArea: HTMLTextAreaElement = this.message.nativeElement;
        var pos = textArea.selectionStart;
        var oldMessage = this.model.message || '';
        this.model.message = oldMessage.substring(0, pos) + text + oldMessage.substring(pos);
        textArea.focus();
    }

    fileChange($event: any) {
        var files: File[] = $event.srcElement.files;
        this.model.image = files[0];
    }

    onSubmit() {
        console.log('onSubmit');
        if (this.parentPostId)
            this.model.parentPostId = this.parentPostId;
        this.appService
            .createPost(this.model, this.recaptchaToken)
            .pipe(finalize(() => {
                this.reCaptcha.reset();
            }))
            .subscribe(res => {
                this.model = {
                    email: undefined,
                    title: undefined,
                    author: undefined,
                    message: undefined,
                    image: undefined,
                    parentPostId: undefined
                };
            });
    }
}
