import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { snakeCase } from 'change-case';

import { ConfigService } from './configService';

import 'rxjs/add/operator/map';

/**
 * 伺服器服務
 */
@Injectable()
export class AppService {
    apiUrl: string;

    constructor(
        private http: Http,
        private config: ConfigService
    ) {
        this.apiUrl = this.config.get('apiUrl');
    }

    getThreads(): Observable<IPost[]> {
        return this.http.get(this.apiUrl + 'threads', {
            responseType: ResponseContentType.Json
        }).map(res => <IPost[]>res.json());
    }

    getThread(id: number): Observable<IPost> {
        return this.http.get(this.apiUrl + 'threads/' + id, {
            responseType: ResponseContentType.Json
        }).map(res => <IPost>res.json());
    }

    createPost(model: ICreatePostModel, recaptchaToken: string): Observable<IPost> {
        return Observable.create(observer => {
            var formData: FormData = new FormData();
            var xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('g-recaptcha-response', recaptchaToken);
            for (let i in model) {
                if (!model[i])
                    continue;
                formData.append(`post[${snakeCase(i)}]`, model[i]);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (200 <= xhr.status && xhr.status <= 299) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.open('POST', this.apiUrl + 'posts', true);
            xhr.send(formData);
        });
    }
}

export interface IPost {
    id: number;
    parentPostId?: number;
    title: string;
    author: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    imageFileName?: string;
    imageFileSize?: number;
    imageContentType?: string;
    imageUpdatedAt?: Date | string;
    identityHash: string;
    message: string;
    locked?: boolean;
    admin?: boolean;
    replies?: IPost[];
}

export interface ICreatePostModel {
    title?: string;
    author?: string;
    email?: string;
    message?: string;
    parentPostId?: number;
    image?: File;
}
