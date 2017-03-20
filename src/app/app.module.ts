import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppService } from './appService';
import { Config } from './config';

import { AppComponent } from './app.component';
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
    StatusComponent
    ],
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: false
    }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: InitialConfigLoad,
      deps: [Config],
      multi: true
    },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function InitialConfigLoad(config: Config) {
    return () => config.load();
};
