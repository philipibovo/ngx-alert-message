<p align="center">
  <img src="https://ngx-alert-message.web.app/assets/thunbnail.png" alt="Logo ngx alert message" />
</p>
<br>

# ngx-alert-message

ngx-alert-message provides an Angular API for simplified use of alerts on your website, completely customizable and easy to implement.

---

### Getting Started

Start by installing the Angular Layout library from [npm](https://www.npmjs.com/package/@philipibovo/ngx-alert-message)

`npm install -save @philipibovo/ngx-alert-message`

Next, you'll need to import the ngx-flexbox module in your module.

**my-module.module.ts**

```ts

import { NgxAlertMessageModule } from '@philipibovo/ngx-alert-message';
...

@NgModule({
    ...
    imports: [ NgxAlertMessageModule ],
    ...
});
```

Now, in your component, you must import ngx-alert-message:

```ts
import { NgxAlertMessage } from '@philipibovo/ngx-alert-message';
...
constructor(private _ngxAlertMessage: NgxAlertMessage) { ... };
...
this._ngxAlertMessage.information('Message')
...

```

Check out [all of the available options](https://ngx-alert-message.web.app/) for using ngx-alert-message in your application.

---

### Browser Support

&nbsp;
<a href="http://caniuse.com/#feat=flexbox" target="_blank">
![caniuseflexbox](https://cloud.githubusercontent.com/assets/210413/21288118/917e3faa-c440-11e6-9b08-28aff590c7ae.png)
</a>

---

### License

The sources for this package are in the [ngx-alert-message](https://ngx-alert-message.web.app/) repository. <br/>
Please file issues and pull requests against that repo.

License: MIT
