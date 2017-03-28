import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ConfigService {
    private _config: any;

    constructor(private http: Http) {
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('config.json')
                .map(res => res.json())
                .subscribe(res => {
                    this._config = res;
                    resolve(true);
                });
        });
    }

    get(key: string) {
        return this._config[key];
    }
}
