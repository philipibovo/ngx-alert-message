import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgxAlertMessage } from '@philipibovo/ngx-alert-message';

import { GenerateConfigComponent } from './generate-config/generate-config.component';
import { VersionsComponent } from './versions/versions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isSmallScreen: boolean = false;
  public menuIsActive: boolean = false;

  public codeInHtmlArroba: string = `@`;
  public codeInHtmlKeyOpen: string = `{`;
  public codeInHtmlKeyClose: string = `}`;

  public howToUseExampleType: string = `information`;
  public howToUseExampleMessage: string = `Lorem ipsum, dolor...`;
  public howToUseExampleTitle: string = ``;

  public positionExample: string = `bottom`;

  public sizeExample: string = `fill`;

  public borderExampleRadius: string = `10px`;
  public borderExampleSize: string = `3px`;
  public borderExampleType: string = `dashed`;

  public fixedExample: string = `true`;

  public messageFontFamilyExample: string = `"Comic Sans MS", "Comic Sans", cursive`;
  public messageFontSizeExample: string = `20px`;

  public showCloseIconExample: string = `false`;

  public timedExample: string = `false`;

  public timedOutExample: number = 20000;

  public titleFontFamilyExample: string = `"Comic Sans MS", "Comic Sans", cursive`;
  public titleFontSizeExample: string = `20px`;

  public alertErrorExampleBackgroundColor: string = `#ffdcdc`;
  public alertErrorExampleBorderColor: string = `#ff9999`;
  public alertErrorExampleCloseIconColor: string = `#ff6666`;
  public alertErrorExampleMessageFontColor: string = `#ff6666`;
  public alertErrorExampleTimeBarColor: string = `#ff9999`;
  public alertErrorExampleTitleFontColor: string = `#ff6666`;

  public alertInformationExampleBackgroundColor: string = `#c2d9ff`;
  public alertInformationExampleBorderColor: string = `#6597e6`;
  public alertInformationExampleCloseIconColor: string = `#305ba1`;
  public alertInformationExampleMessageFontColor: string = `#305ba1`;
  public alertInformationExampleTimeBarColor: string = `#6597e6`;
  public alertInformationExampleTitleFontColor: string = `#305ba1`;

  public alertSuccessExampleBackgroundColor: string = `#c2ffcc`;
  public alertSuccessExampleBorderColor: string = `#5cd670`;
  public alertSuccessExampleCloseIconColor: string = `#35b64a`;
  public alertSuccessExampleMessageFontColor: string = `#35b64a`;
  public alertSuccessExampleTimeBarColor: string = `#5cd670`;
  public alertSuccessExampleTitleFontColor: string = `#35b64a`;

  public alertWarningExampleBackgroundColor: string = `#fff194`;
  public alertWarningExampleBorderColor: string = `#c3b555`;
  public alertWarningExampleCloseIconColor: string = `#ae9c29`;
  public alertWarningExampleMessageFontColor: string = `#ae9c29`;
  public alertWarningExampleTimeBarColor: string = `#c3b555`;
  public alertWarningExampleTitleFontColor: string = `#ae9c29`;

  constructor(
    private _dialog: MatDialog,
    private _ngxAlertMessage: NgxAlertMessage
  ) {}

  title = 'ngx-alert-message-demo';

  ngOnInit() {
    this.verifyScreenSize();
  }

  verifyScreenSize() {
    if (window.innerWidth <= 959) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  scroolToElement(id: string) {
    const el = document.querySelector<HTMLElement>(`#${id}`)!;
    const scrollY = el.getBoundingClientRect().top + window.scrollY;

    window.scroll({
      top: scrollY - 70,
      behavior: 'smooth',
    });

    if (this.isSmallScreen) {
      this.menuIsActive = false;
    }
  }

  showColorPicker(id: string) {
    const colorPicker = document.querySelector<HTMLElement>(`#${id}`);

    colorPicker?.click();
  }

  showAlert(
    type: string,
    message: string,
    title?: string | null,
    localConfig?: any
  ) {
    switch (type) {
      case `error`:
        this._ngxAlertMessage.error(message, title, localConfig);
        break;

      case `information`:
        this._ngxAlertMessage.information(message, title, localConfig);
        break;

      case `success`:
        this._ngxAlertMessage.success(message, title, localConfig);
        break;

      case `warning`:
        this._ngxAlertMessage.warning(message, title, localConfig);
        break;
    }
  }

  openGenerateConfig() {
    let dialogWidth: string = `98%`;

    const dialogRef = this._dialog.open(GenerateConfigComponent, {
      hasBackdrop: true,
      width: dialogWidth,
      height: `90vh`,
    });
  }

  openVersions() {
    let dialogWidth: string = `500px`;

    const dialogRef = this._dialog.open(VersionsComponent, {
      hasBackdrop: true,
      width: dialogWidth,
    });
  }
}
