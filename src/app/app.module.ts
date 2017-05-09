import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { ROUTES } from './app.routes';
import { AppService } from './appService';
import { ConfigService } from './configService';

import { AppComponent } from './app.component';
import { MessageConverterPipe } from './messageConverter.pipe';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ThreadPostComponent } from './thread-post/thread-post.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThreadComponent,
    PostFormComponent,
    ThreadPostComponent,
    StatusComponent,
    MessageConverterPipe
    ],
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: false
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReCaptchaModule
  ],
  providers: [
    Ng2Cable,
    Broadcaster,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: InitialConfigLoad,
      deps: [ConfigService],
      multi: true
    },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function InitialConfigLoad(config: ConfigService) {
    return () => config.load();
};
