# @ngxp/environment

Loads the Angular environment at runtime instead of build-time.


## Why

Normally Angular's environment configuration is provided by importing `environment` from the `environment` folder and replaced with the specific stage configuration at build-time.

If you are working with Docker images this means you have to build a new image for each stage/environment which can be a potential cause of errors.

That's why we want to build an image _once_ and use it across all stages/environments. So we have to load environment-specific configuration at runtime instead of build-time and this library helps with that.

## Usage

In the `main.ts` file of your Angular application wrap the bootstrap logic with `fetchEnvironment(...)`.

```ts
fetchEnvironment().then(env => {
    if (env.production) {
        enableProdMode();
    }

    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
});
```

This will load a JSON configuration from `<PROTOCOL>//<HOST>/environment` before the Angular application starts. Additionally the `fetchEnvironment` function can be called with a `path` parameter

```ts
fetchEnvironment(`http://example.org/my/custom/environment.json`).then(env => {
  ...
});
```

In your `AppModule` import the `EnvironmentModule.forRoot()`. 
This will provide the `ENVIRONMENT` InjectionToken inside your application for everyone to use.

```ts
import { EnvironmentModule } from '@partnerportal/environment';

@NgModule({
    imports: [
        BrowserModule,
        EnvironmentModule.forRoot(),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}

```

```ts
import { ENVIRONMENT } from '@ngxp/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private environment: ENVIRONMENT,
    ) { }
}

```


## Troubleshooting

### fetch

The `fetchEnvironment` uses the `fetch` method in the background. So you might have to install `whatwg-fetch` and add `import 'whatwg-fetch'` in your `polyfills.ts`.

### localStorage

The loaded configuration is temporarily saved in the `localStorage`. This means it will not always be compatible with SSR, Ionic or Cordova applications where `localStorage` is not available.
