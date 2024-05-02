import { Component, Injectable, Inject, Optional } from '@angular/core';

interface IConfigAlertItem {
  backgroundColor?: string;
  borderColor?: string;
  closeIconColor?: string;
  messageFontColor?: string;
  timeBarColor?: string;
  titleFontColor?: string;
}

interface IConfig {
  alertError?: IConfigAlertItem;
  alertInformation?: IConfigAlertItem;
  alertSuccess?: IConfigAlertItem;
  alertWarning?: IConfigAlertItem;
  border?: {
    radius?: string; //-> CSS units (ch | cn | em | in | mm | pc | px | pt | rem | vh | vmax | vm | vmin | vw | x | %)
    size?: string;
    type?: string;
  };
  fixed?: boolean | string;
  messageFontFamily?: string;
  messageFontSize?: string;
  position?: string; //-> bottom, bottom-left, bottom-right, top, top-left, top-right
  showCloseIcon?: boolean | string;
  size?: string; //-> CSS units (ch | cn | em | in | mm | pc | px | pt | rem | vh | vmax | vm | vmin | vw | x | %), or CSS calc() function
  timed?: boolean | string;
  timedOut?: number;
  titleFontFamily?: string;
  titleFontSize?: string;
  smallScreenConfig?: IConfig;
  alternativeTheme?: IConfig;
  useAlternativeTheme?: boolean | string;
}

@Component({
  selector: 'lib-ngx-alert-message',
  templateUrl: './ngx-alert-message.component.html',
  styleUrls: ['./ngx-alert-message.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class NgxAlertMessage {
  private _colors: any;
  private _border: any;
  private _defaultValues: IConfig;
  private _smallScreenBreakpoint: number;

  constructor(
    @Optional() @Inject('ngxAlertMessageConfig') private _globalConfig: IConfig
  ) {
    this._colors = {
      background: {
        error: `rgb(180, 0, 0)`,
        information: `rgb(0, 153, 255)`,
        success: `rgba(72, 181, 0)`,
        warning: `rgb(212, 155, 30)`,
      },
      border: {
        error: `rgb(180, 0, 0)`,
        information: `rgb(0, 153, 255)`,
        success: `rgba(72, 181, 0)`,
        warning: `rgb(212, 155, 30)`,
      },
      font: {
        error: `rgb(255, 255, 255)`,
        information: `rgb(255, 255, 255)`,
        success: `rgba(255, 255, 255)`,
        warning: `rgb(255, 255, 255)`,
      },
      timeBar: {
        error: `rgb(101, 0, 0)`,
        information: `rgb(0, 108, 181)`,
        success: `rgb(48, 119, 0)`,
        warning: `rgb(163, 116, 16)`,
      },
    };

    this._border = {
      radius: `5px`,
      size: `1px`,
      type: `solid`,
      smallScreenConfig: {
        radius: `0px`,
      },
    };

    this._defaultValues = {
      alertError: {
        backgroundColor: this._colors.background.error,
        borderColor: this._colors.border.error,
        closeIconColor: this._colors.font.error,
        messageFontColor: this._colors.font.error,
        timeBarColor: this._colors.timeBar.error,
        titleFontColor: this._colors.font.error,
      },
      alertInformation: {
        backgroundColor: this._colors.background.information,
        borderColor: this._colors.border.information,
        closeIconColor: this._colors.font.information,
        messageFontColor: this._colors.font.information,
        timeBarColor: this._colors.timeBar.information,
        titleFontColor: this._colors.font.information,
      },
      alertSuccess: {
        backgroundColor: this._colors.background.success,
        borderColor: this._colors.border.success,
        closeIconColor: this._colors.font.success,
        messageFontColor: this._colors.font.success,
        timeBarColor: this._colors.timeBar.success,
        titleFontColor: this._colors.font.success,
      },
      alertWarning: {
        backgroundColor: this._colors.background.warning,
        borderColor: this._colors.border.warning,
        closeIconColor: this._colors.font.warning,
        messageFontColor: this._colors.font.warning,
        timeBarColor: this._colors.timeBar.warning,
        titleFontColor: this._colors.font.warning,
      },
      border: {
        size: this._border.size,
        radius: this._border.radius,
        type: this._border.type,
      },
      fixed: false,
      messageFontFamily: `Verdana, sans-serif`,
      messageFontSize: `14px`,
      position: `top-right`,
      showCloseIcon: true,
      size: `300px`,
      timed: true,
      timedOut: 10000,
      titleFontFamily: `Verdana, sans-serif`,
      titleFontSize: `14px`,
      smallScreenConfig: {
        alertError: {
          backgroundColor: this._colors.background.error,
          borderColor: this._colors.border.error,
          messageFontColor: this._colors.font.error,
          timeBarColor: this._colors.timeBar.error,
          titleFontColor: this._colors.font.error,
        },
        alertInformation: {
          backgroundColor: this._colors.background.information,
          borderColor: this._colors.border.information,
          messageFontColor: this._colors.font.information,
          timeBarColor: this._colors.timeBar.information,
          titleFontColor: this._colors.font.information,
        },
        alertSuccess: {
          backgroundColor: this._colors.background.success,
          borderColor: this._colors.border.success,
          messageFontColor: this._colors.font.success,
          timeBarColor: this._colors.timeBar.success,
          titleFontColor: this._colors.font.success,
        },
        alertWarning: {
          backgroundColor: this._colors.background.warning,
          borderColor: this._colors.border.warning,
          messageFontColor: this._colors.font.warning,
          timeBarColor: this._colors.timeBar.warning,
          titleFontColor: this._colors.font.warning,
        },
        border: {
          size: this._border.size,
          radius: this._border.smallScreenConfig.radius,
          type: this._border.type,
        },
        fixed: false,
        messageFontFamily: `Arial, Helvetica, sans-serif`,
        messageFontSize: `14px`,
        position: `bottom`,
        showCloseIcon: true,
        size: `fill`,
        timed: true,
        timedOut: 10000,
        titleFontFamily: `Arial, Helvetica, sans-serif`,
        titleFontSize: `14px`,
      },
      useAlternativeTheme: false,
    };

    this._smallScreenBreakpoint = 959;
  }
  // end constructor

  private async createAlert(
    message: string,
    alertType: string,
    title?: string | null | undefined,
    localConfig?: IConfig
  ) {
    let box = document.createElement(`div`);
    let boxClose = document.createElement(`div`);
    let boxMessage = document.createElement(`div`);
    let boxTimeBar = document.createElement(`div`);
    let boxTitle = document.createElement(`div`);
    let boxWrap = document.createElement(`div`);
    let boxWrapContent = document.createElement(`div`);
    let boxWrapFirstChild = document.createElement(`div`);

    let fixed: boolean | string = false;
    let position: string = ``;
    let showIconClose: boolean | string = true;
    let size: string = ``;
    let timedAlert: boolean | string = true;
    let timedAlertTime: number = 0;

    position = await this.getPanelPosition(localConfig);
    fixed = await this.getBoxFixed(localConfig);
    showIconClose = await this.getBoxShowIconClose(localConfig);
    size = await this.getPanelSize(localConfig);
    timedAlert = await this.getAlertTimed(localConfig);
    timedAlertTime = await this.getAlertTimedOut(localConfig);

    box.id = `pbam-box-${new Date().getTime()}`;

    if (
      (showIconClose === true || showIconClose === `true`) &&
      (fixed === false || fixed === `false`)
    ) {
      let closeIconColor: String = await this.getBoxCloseIcomColor(
        alertType,
        localConfig
      );

      boxClose.setAttribute(
        `style`,
        `cursor: pointer;
        color: ${closeIconColor};
       font-family: Verdana, sans-serif;
       font-size: 16px;
       font-weight: bold;
      `
      );
      boxClose.id = `${box.id}-close`;
      boxClose.classList.add(`pbam__wrap__close`);
      boxClose.innerHTML = `x`;
    }

    boxWrapFirstChild.classList.add(`pbam__wrap__first-child`);
    boxWrapContent.classList.add(`pbam__wrap__first-child__content`);

    if (title !== `` && title !== null && title !== undefined) {
      let titleFontColor: String = await this.getBoxTitleFontColor(
        alertType,
        localConfig
      );
      let titleFontFamily: String = await this.getBoxTitleFontFamily(
        localConfig
      );
      let titleFontSize: String = await this.getBoxTitleFontSize(localConfig);

      boxTitle.setAttribute(
        `style`,
        `color: ${titleFontColor};
         font-family: ${titleFontFamily};
         font-size: ${titleFontSize};
         font-weight: bold;
        `
      );
      boxTitle.classList.add(`pbam__wrap__first-child__content__title`);
      boxTitle.innerHTML = title;
      boxWrapContent.appendChild(boxTitle);
    }

    let messageFontColor: String = await this.getBoxMessageFontColor(
      alertType,
      localConfig
    );
    let messageFontFamily: String = await this.getBoxMessageFontFamily(
      localConfig
    );
    let messageFontSize: String = await this.getBoxMessageFontSize(localConfig);

    boxMessage.setAttribute(
      `style`,
      `color: ${messageFontColor};
       font-family: ${messageFontFamily};
       font-size: ${messageFontSize};
      `
    );
    boxMessage.classList.add(`pbam__wrap__first-child__content__message`);
    boxMessage.innerHTML = message;

    boxWrapContent.appendChild(boxMessage);

    boxWrapFirstChild.appendChild(boxWrapContent);

    boxWrap.setAttribute(
      `style`,
      `padding: 15px;
       display: flex;
       flex-direction: row;
       align-items: flex-start;
       justify-content: space-between;
      `
    );
    boxWrap.classList.add(`pbam__wrap`);
    boxWrap.appendChild(boxWrapFirstChild);

    if (
      (showIconClose === true || showIconClose === `true`) &&
      (fixed === false || fixed === `false`)
    ) {
      boxWrap.appendChild(boxClose);
    }

    if (
      (timedAlert === true || timedAlert === `true`) &&
      (fixed === false || fixed === `false`)
    ) {
      let timedBarColor: string = await this.getTimeBarColor(
        alertType,
        localConfig
      );

      boxTimeBar.setAttribute(
        `style`,
        `height: 4px;
         width: 100%;
         background: ${timedBarColor};
         border-radius: ${size === 'fill' ? '0px' : '0 0 5px 5px'};
        `
      );
      boxTimeBar.id = `${box.id}-timer`;
      boxTimeBar.classList.add(`pbam__time-bar`);
      boxTimeBar.setAttribute(`timer`, `100`);
      boxTimeBar.setAttribute(`pause`, `false`);
    }

    box.classList.add(`pbam`);
    box.classList.add(`pbam--${alertType}`);

    box.appendChild(boxWrap);

    if (
      (timedAlert === true || timedAlert === `true`) &&
      (fixed === false || fixed === `false`)
    ) {
      box.appendChild(boxTimeBar);
    }

    // SET pbam CSS
    let bgColor: string = await this.getBoxBackgroundColor(
      alertType,
      localConfig
    );

    let borderColor: string = await this.getBoxBorderColor(
      alertType,
      localConfig
    );

    let borderRadius: string =
      size === `fill` ? `0px` : await this.getBoxBorderRadius(localConfig);

    let borderSize: string = await this.getBoxBorderSize(localConfig);

    let borderType: string = this.getBoxBorderType(localConfig);

    box.setAttribute(
      `style`,
      `width: 100%;
       border: ${borderSize} ${borderType} ${borderColor};
       border-radius: ${borderRadius};
       color: ${messageFontColor};
       margin: 0 20px 15px 20px;
       font-size: 1rem;
       background: ${bgColor};
       -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
       box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);`
    );
    // END SET pbam CSS

    if (document.getElementById(`pbam-container-${position}`)) {
      document.getElementById(`pbam-container-${position}`)?.appendChild(box);

      if (
        (showIconClose === true || showIconClose === `true`) &&
        (fixed === false || fixed === `false`)
      ) {
        this.setButtonCloseAction(boxClose.id);
      }

      if (
        (timedAlert === true || timedAlert === `true`) &&
        (fixed === false || fixed === `false`)
      ) {
        this.setMouseEnterAction(box.id);
        this.setMouseLeaveAction(box.id, timedAlertTime);
        this.startAlertTimer(boxTimeBar.id, timedAlertTime);
      }
    } else {
      let alertContainer = document.createElement(`div`);
      alertContainer.id = `pbam-container-${position}`;

      let top: string = ``;
      let bottom: string = ``;
      let left: string = ``;
      let right: string = ``;
      let transform: string = ``;
      let widthIsFill: boolean = false;

      if (size === `fill` || size === `FILL`) {
        size = `100vw`;
        widthIsFill = true;
      }

      switch (position) {
        case `bottom`:
          if (widthIsFill) {
            bottom = `-16px`;
            left = `0px`;
          } else {
            bottom = `0px`;
            left = `50%`;
            transform = `translateX(-50%)`;
          }
          break;

        case `bottom-left`:
          if (widthIsFill) {
            bottom = `-16px`;
            left = `0px`;
          } else {
            bottom = `0px`;
            left = `20px`;
          }
          break;

        case `bottom-right`:
          if (widthIsFill) {
            bottom = `-16px`;
            left = `0px`;
          } else {
            bottom = `0px`;
            right = `20px`;
          }
          break;

        case `top`:
          if (widthIsFill) {
            top = `0px`;
            left = `0px`;
          } else {
            top = `20px`;
            left = `50%`;
            transform = `translateX(-50%)`;
          }
          break;

        case `top-left`:
          if (widthIsFill) {
            top = `0px`;
            left = `0px`;
          } else {
            top = `20px`;
            left = `20px`;
          }
          break;

        case `top-right`:
          if (widthIsFill) {
            top = `0px`;
            left = `0px`;
          } else {
            top = `20px`;
            right = `20px`;
          }
          break;
      }

      // SET pbamContainer CSS
      alertContainer.setAttribute(
        `style`,
        `position: fixed;
         width: ${size};
         min-right: 150px;
         ${top ? 'top: ' + top + ';' : ''}
         ${bottom ? 'bottom: ' + bottom + ';' : ''}
         ${left ? 'left: ' + left + ';' : ''}
         ${right ? 'right: ' + right + ';' : ''}
         ${transform ? 'transform: ' + transform + ';' : ''}
         padding: 0;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         z-index: 2147483647;`
      );
      // END SET pbamContainer CSS

      alertContainer.appendChild(box);

      document.body.appendChild(alertContainer);

      if (
        (showIconClose === true || showIconClose === `true`) &&
        (fixed === false || fixed === `false`)
      ) {
        this.setButtonCloseAction(boxClose.id);
      }

      if (
        (timedAlert === true || timedAlert === `true`) &&
        (fixed === false || fixed === `false`)
      ) {
        this.setMouseEnterAction(box.id);
        this.setMouseLeaveAction(box.id, timedAlertTime);
        this.startAlertTimer(boxTimeBar.id, timedAlertTime);
      }
    }
  }
  // end private createAlert(...)

  private getPanelPosition(localConfig?: IConfig): string {
    let position: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig?.alternativeTheme
        ) {
          position = localConfig.smallScreenConfig?.alternativeTheme.position
            ? localConfig.smallScreenConfig?.alternativeTheme.position
            : ``;
        }

        if (!position) {
          position = localConfig.smallScreenConfig?.position
            ? localConfig.smallScreenConfig?.position
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (!position) {
        if (this._globalConfig && this._globalConfig.smallScreenConfig) {
          if (
            useAlternativeTheme &&
            this._globalConfig.smallScreenConfig?.alternativeTheme
          ) {
            position = this._globalConfig.smallScreenConfig?.alternativeTheme
              ?.position
              ? this._globalConfig.smallScreenConfig?.alternativeTheme.position
              : ``;
          }

          if (!position) {
            position = this._globalConfig.smallScreenConfig?.position
              ? this._globalConfig.smallScreenConfig?.position
              : ``;
          }
        }
        // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
      }
    }
    // end if (isSmallScreen)

    if (!position) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          position = localConfig.alternativeTheme.position
            ? localConfig.alternativeTheme.position
            : ``;
        }

        if (!position) {
          position = localConfig.position ? localConfig.position : ``;
        }
      }
      // end if (localConfig)

      if (!position) {
        if (this._globalConfig) {
          if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
            position = this._globalConfig.alternativeTheme.position
              ? this._globalConfig.alternativeTheme.position
              : ``;
          }

          if (!position) {
            position = this._globalConfig.position
              ? this._globalConfig.position
              : ``;
          }
        }
        // end if (this._globalConfig)
      }

      if (!position) {
        position = isSmallScreen
          ? this._defaultValues.smallScreenConfig!.position!
          : this._defaultValues.position!;
      }
    }

    return position;
  }
  // end private getPanelPosition(...): string

  private getPanelSize(localConfig?: IConfig): string {
    let width: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          width = localConfig.smallScreenConfig.alternativeTheme.size
            ? localConfig.smallScreenConfig.alternativeTheme.size
            : ``;
        }

        if (!width) {
          width = localConfig.smallScreenConfig.size
            ? localConfig.smallScreenConfig.size
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          width = this._globalConfig.smallScreenConfig.alternativeTheme.size
            ? this._globalConfig.smallScreenConfig.alternativeTheme.size
            : ``;
        }

        if (!width) {
          width = this._globalConfig.smallScreenConfig.size
            ? this._globalConfig.smallScreenConfig.size
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!width) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          width = localConfig.alternativeTheme.size
            ? localConfig.alternativeTheme.size
            : ``;
        }

        if (!width) {
          width = localConfig.size ? localConfig.size : ``;
        }
      }
      // end if (localConfig)
    }

    if (!width) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          width = this._globalConfig.alternativeTheme.size
            ? this._globalConfig.alternativeTheme.size
            : ``;
        }

        if (!width) {
          width = this._globalConfig.size ? this._globalConfig.size : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!width) {
      width = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.size!
        : this._defaultValues.size!;
    }

    return width;
  }
  // end private getPanelSize(...): string

  private getBoxBackgroundColor(
    alertType: string,
    localConfig?: IConfig
  ): string {
    let bgColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              bgColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.backgroundColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.backgroundColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.backgroundColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.backgroundColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .backgroundColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!bgColor) {
          switch (alertType) {
            case `error`:
              bgColor = localConfig.smallScreenConfig.alertError
                ?.backgroundColor
                ? localConfig.smallScreenConfig.alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = localConfig.smallScreenConfig.alertInformation
                ?.backgroundColor
                ? localConfig.smallScreenConfig.alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = localConfig.smallScreenConfig.alertSuccess
                ?.backgroundColor
                ? localConfig.smallScreenConfig.alertSuccess.backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = localConfig.smallScreenConfig.alertWarning
                ?.backgroundColor
                ? localConfig.smallScreenConfig.alertWarning.backgroundColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              bgColor = this._globalConfig.smallScreenConfig.alternativeTheme
                .alertError?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = this._globalConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = this._globalConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = this._globalConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.backgroundColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!bgColor) {
          switch (alertType) {
            case `error`:
              bgColor = this._globalConfig.smallScreenConfig.alertError
                ?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alertError
                    .backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = this._globalConfig.smallScreenConfig.alertInformation
                ?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = this._globalConfig.smallScreenConfig.alertSuccess
                ?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alertSuccess
                    .backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = this._globalConfig.smallScreenConfig.alertWarning
                ?.backgroundColor
                ? this._globalConfig.smallScreenConfig.alertWarning
                    .backgroundColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!bgColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              bgColor = localConfig.alternativeTheme.alertError?.backgroundColor
                ? localConfig.alternativeTheme.alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = localConfig.alternativeTheme.alertInformation
                ?.backgroundColor
                ? localConfig.alternativeTheme.alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = localConfig.alternativeTheme.alertSuccess
                ?.backgroundColor
                ? localConfig.alternativeTheme.alertSuccess.backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = localConfig.alternativeTheme.alertWarning
                ?.backgroundColor
                ? localConfig.alternativeTheme.alertWarning.backgroundColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!bgColor) {
          switch (alertType) {
            case `error`:
              bgColor = localConfig.alertError?.backgroundColor
                ? localConfig.alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = localConfig.alertInformation?.backgroundColor
                ? localConfig.alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = localConfig.alertSuccess?.backgroundColor
                ? localConfig.alertSuccess.backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = localConfig.alertWarning?.backgroundColor
                ? localConfig.alertWarning.backgroundColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!bgColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              bgColor = this._globalConfig.alternativeTheme.alertError
                ?.backgroundColor
                ? this._globalConfig.alternativeTheme.alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = this._globalConfig.alternativeTheme.alertInformation
                ?.backgroundColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = this._globalConfig.alternativeTheme.alertSuccess
                ?.backgroundColor
                ? this._globalConfig.alternativeTheme.alertSuccess
                    .backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = this._globalConfig.alternativeTheme.alertWarning
                ?.backgroundColor
                ? this._globalConfig.alternativeTheme.alertWarning
                    .backgroundColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!bgColor) {
          switch (alertType) {
            case `error`:
              bgColor = this._globalConfig.alertError?.backgroundColor
                ? this._globalConfig.alertError.backgroundColor
                : ``;
              break;

            case `information`:
              bgColor = this._globalConfig.alertInformation?.backgroundColor
                ? this._globalConfig.alertInformation.backgroundColor
                : ``;
              break;

            case `success`:
              bgColor = this._globalConfig.alertSuccess?.backgroundColor
                ? this._globalConfig.alertSuccess.backgroundColor
                : ``;
              break;

            case `warning`:
              bgColor = this._globalConfig.alertWarning?.backgroundColor
                ? this._globalConfig.alertWarning.backgroundColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!bgColor) {
      switch (alertType) {
        case `error`:
          bgColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!
                .backgroundColor!
            : this._defaultValues!.alertError!.backgroundColor!;
          break;

        case `information`:
          bgColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .backgroundColor!
            : this._defaultValues!.alertInformation!.backgroundColor!;
          break;

        case `success`:
          bgColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!
                .backgroundColor!
            : this._defaultValues!.alertSuccess!.backgroundColor!;
          break;

        case `warning`:
          bgColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!
                .backgroundColor!
            : this._defaultValues!.alertWarning!.backgroundColor!;
          break;
      }
    }

    return bgColor;
  }
  // end private getBoxBackgroundColor(...): string

  private getBoxBorderColor(alertType: string, localConfig?: IConfig): string {
    let borderColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              borderColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.borderColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .borderColor
                : ``;
              break;

            case `information`:
              borderColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.borderColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.borderColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .borderColor
                : ``;
              break;

            case `warning`:
              borderColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.borderColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .borderColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!borderColor) {
          switch (alertType) {
            case `error`:
              borderColor = localConfig.smallScreenConfig.alertError
                ?.borderColor
                ? localConfig.smallScreenConfig.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = localConfig.smallScreenConfig.alertInformation
                ?.borderColor
                ? localConfig.smallScreenConfig.alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = localConfig.smallScreenConfig.alertSuccess
                ?.borderColor
                ? localConfig.smallScreenConfig.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = localConfig.smallScreenConfig.alertWarning
                ?.borderColor
                ? localConfig.smallScreenConfig.alertWarning.borderColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              borderColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertError?.borderColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertInformation?.borderColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertSuccess?.borderColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertWarning?.borderColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.borderColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!borderColor) {
          switch (alertType) {
            case `error`:
              borderColor = this._globalConfig.smallScreenConfig.alertError
                ?.borderColor
                ? this._globalConfig.smallScreenConfig.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = this._globalConfig.smallScreenConfig
                .alertInformation?.borderColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .borderColor
                : ``;
              break;

            case `success`:
              borderColor = this._globalConfig.smallScreenConfig.alertSuccess
                ?.borderColor
                ? this._globalConfig.smallScreenConfig.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = this._globalConfig.smallScreenConfig.alertWarning
                ?.borderColor
                ? this._globalConfig.smallScreenConfig.alertWarning.borderColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!borderColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              borderColor = localConfig.alternativeTheme.alertError?.borderColor
                ? localConfig.alternativeTheme.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = localConfig.alternativeTheme.alertInformation
                ?.borderColor
                ? localConfig.alternativeTheme.alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = localConfig.alternativeTheme.alertSuccess
                ?.borderColor
                ? localConfig.alternativeTheme.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = localConfig.alternativeTheme.alertWarning
                ?.borderColor
                ? localConfig.alternativeTheme.alertWarning.borderColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!borderColor) {
          switch (alertType) {
            case `error`:
              borderColor = localConfig.alertError?.borderColor
                ? localConfig.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = localConfig.alertInformation?.borderColor
                ? localConfig.alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = localConfig.alertSuccess?.borderColor
                ? localConfig.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = localConfig.alertWarning?.borderColor
                ? localConfig.alertWarning.borderColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!borderColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              borderColor = this._globalConfig.alternativeTheme.alertError
                ?.borderColor
                ? this._globalConfig.alternativeTheme.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = this._globalConfig.alternativeTheme.alertInformation
                ?.borderColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .borderColor
                : ``;
              break;

            case `success`:
              borderColor = this._globalConfig.alternativeTheme.alertSuccess
                ?.borderColor
                ? this._globalConfig.alternativeTheme.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = this._globalConfig.alternativeTheme.alertWarning
                ?.borderColor
                ? this._globalConfig.alternativeTheme.alertWarning.borderColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!borderColor) {
          switch (alertType) {
            case `error`:
              borderColor = this._globalConfig.alertError?.borderColor
                ? this._globalConfig.alertError.borderColor
                : ``;
              break;

            case `information`:
              borderColor = this._globalConfig.alertInformation?.borderColor
                ? this._globalConfig.alertInformation.borderColor
                : ``;
              break;

            case `success`:
              borderColor = this._globalConfig.alertSuccess?.borderColor
                ? this._globalConfig.alertSuccess.borderColor
                : ``;
              break;

            case `warning`:
              borderColor = this._globalConfig.alertWarning?.borderColor
                ? this._globalConfig.alertWarning.borderColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!borderColor) {
      switch (alertType) {
        case `error`:
          borderColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!.borderColor!
            : this._defaultValues!.alertError!.borderColor!;
          break;

        case `information`:
          borderColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .borderColor!
            : this._defaultValues!.alertInformation!.borderColor!;
          break;

        case `success`:
          borderColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!.borderColor!
            : this._defaultValues!.alertSuccess!.borderColor!;
          break;

        case `warning`:
          borderColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!.borderColor!
            : this._defaultValues!.alertWarning!.backgroundColor!;
          break;
      }
    }

    return borderColor;
  }
  // end private getBoxBorderColor(...): string

  private getBoxBorderRadius(localConfig?: IConfig): string {
    let borderRadius: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderRadius = localConfig.smallScreenConfig.alternativeTheme.border
            ?.radius
            ? localConfig.smallScreenConfig.alternativeTheme.border.radius
            : ``;
        }

        if (!borderRadius) {
          borderRadius = localConfig.smallScreenConfig.border?.radius
            ? localConfig.smallScreenConfig.border.radius
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderRadius = this._globalConfig.smallScreenConfig.alternativeTheme
            .border.radius
            ? this._globalConfig.smallScreenConfig.alternativeTheme.border
                .radius
            : ``;
        }

        if (!borderRadius) {
          borderRadius = this._globalConfig.smallScreenConfig.border?.radius
            ? this._globalConfig.smallScreenConfig.border.radius
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!borderRadius) {
      if (localConfig) {
        if (
          useAlternativeTheme &&
          localConfig.alternativeTheme &&
          localConfig.alternativeTheme.border
        ) {
          borderRadius = localConfig.alternativeTheme.border.radius
            ? localConfig.alternativeTheme.border.radius
            : ``;
        }

        if (!borderRadius) {
          borderRadius = localConfig.border?.radius
            ? localConfig.border.radius
            : ``;
        }
      }
      // end if (localConfig)
    }

    if (!borderRadius) {
      if (this._globalConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.alternativeTheme &&
          this._globalConfig.alternativeTheme.border
        ) {
          borderRadius = this._globalConfig.alternativeTheme.border.radius
            ? this._globalConfig.alternativeTheme.border.radius
            : ``;
        }

        if (!borderRadius) {
          borderRadius = this._globalConfig.border?.radius
            ? this._globalConfig.border.radius
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!borderRadius) {
      borderRadius = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.border!.radius!
        : this._defaultValues.border!.radius!;
    }

    return borderRadius;
  }
  // end private getBoxBorderRadius(...): string

  private getBoxBorderSize(localConfig?: IConfig): string {
    let borderSize: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderSize = localConfig.smallScreenConfig.alternativeTheme.border
            ?.size
            ? localConfig.smallScreenConfig.alternativeTheme.border.size
            : ``;
        }

        if (!borderSize) {
          borderSize = localConfig.smallScreenConfig.border?.size
            ? localConfig.smallScreenConfig.border.size
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderSize = this._globalConfig.smallScreenConfig.alternativeTheme
            .border.size
            ? this._globalConfig.smallScreenConfig.alternativeTheme.border.size
            : ``;
        }

        if (!borderSize) {
          borderSize = this._globalConfig.smallScreenConfig.border?.size
            ? this._globalConfig.smallScreenConfig.border.size
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!borderSize) {
      if (localConfig) {
        if (
          useAlternativeTheme &&
          localConfig.alternativeTheme &&
          localConfig.alternativeTheme.border
        ) {
          borderSize = localConfig.alternativeTheme.border.size
            ? localConfig.alternativeTheme.border.size
            : ``;
        }

        if (!borderSize) {
          borderSize = localConfig.border?.size ? localConfig.border.size : ``;
        }
      }
      // end if (localConfig)
    }

    if (!borderSize) {
      if (this._globalConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.alternativeTheme &&
          this._globalConfig.alternativeTheme.border
        ) {
          borderSize = this._globalConfig.alternativeTheme.border.size
            ? this._globalConfig.alternativeTheme.border.size
            : ``;
        }

        if (!borderSize) {
          borderSize = this._globalConfig.border?.size
            ? this._globalConfig.border.size
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!borderSize) {
      borderSize = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.border!.size!
        : this._defaultValues.border!.size!;
    }

    return borderSize;
  }
  // end private getBoxBorderSize(...): string

  private getBoxBorderType(localConfig?: IConfig): string {
    let borderType: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderType = localConfig.smallScreenConfig.alternativeTheme.border
            ?.type
            ? localConfig.smallScreenConfig.alternativeTheme.border.type
            : ``;
        }

        if (!borderType) {
          borderType = localConfig.smallScreenConfig.border?.type
            ? localConfig.smallScreenConfig.border.type
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme.border
        ) {
          borderType = this._globalConfig.smallScreenConfig.alternativeTheme
            .border.type
            ? this._globalConfig.smallScreenConfig.alternativeTheme.border.type
            : ``;
        }

        if (!borderType) {
          borderType = this._globalConfig.smallScreenConfig.border?.type
            ? this._globalConfig.smallScreenConfig.border.type
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!borderType) {
      if (localConfig) {
        if (
          useAlternativeTheme &&
          localConfig.alternativeTheme &&
          localConfig.alternativeTheme.border
        ) {
          borderType = localConfig.alternativeTheme.border.type
            ? localConfig.alternativeTheme.border.type
            : ``;
        }

        if (!borderType) {
          borderType = localConfig.border?.type ? localConfig.border.type : ``;
        }
      }
      // end if (localConfig)
    }

    if (!borderType) {
      if (this._globalConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.alternativeTheme &&
          this._globalConfig.alternativeTheme.border
        ) {
          borderType = this._globalConfig.alternativeTheme.border.type
            ? this._globalConfig.alternativeTheme.border.type
            : ``;
        }

        if (!borderType) {
          borderType = this._globalConfig.border?.type
            ? this._globalConfig.border.type
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!borderType) {
      borderType = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.border!.type!
        : this._defaultValues.border!.type!;
    }

    return borderType;
  }
  // end private getBoxBorderType(...): string

  private getBoxFixed(localConfig?: IConfig): boolean | string {
    let fixed: boolean | string | undefined = undefined;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          fixed = localConfig.smallScreenConfig.alternativeTheme.fixed
            ? localConfig.smallScreenConfig.alternativeTheme.fixed
            : undefined;
        }

        if (!fixed) {
          fixed = localConfig.smallScreenConfig.fixed
            ? localConfig.smallScreenConfig.fixed
            : undefined;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          fixed = this._globalConfig.smallScreenConfig.alternativeTheme.fixed
            ? this._globalConfig.smallScreenConfig.alternativeTheme.fixed
            : undefined;
        }

        if (!fixed) {
          fixed = this._globalConfig.smallScreenConfig.fixed
            ? this._globalConfig.smallScreenConfig.fixed
            : undefined;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!fixed) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          fixed = localConfig.alternativeTheme.fixed
            ? localConfig.alternativeTheme.fixed
            : undefined;
        }

        if (!fixed) {
          fixed = localConfig.fixed ? localConfig.fixed : undefined;
        }
      }
      // end if (localConfig)
    }

    if (!fixed) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          fixed = this._globalConfig.alternativeTheme.fixed
            ? this._globalConfig.alternativeTheme.fixed
            : undefined;
        }

        if (!fixed) {
          fixed = this._globalConfig.fixed
            ? this._globalConfig.fixed
            : undefined;
        }
      }
      // end if (this._globalConfig)
    }

    if (!fixed) {
      fixed = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.fixed!
        : this._defaultValues.fixed!;
    }

    return fixed;
  }
  // end private getBoxFixed(...): boolean

  private getBoxCloseIcomColor(
    alertType: string,
    localConfig?: IConfig
  ): string {
    let closeIconColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              closeIconColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.closeIconColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.closeIconColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.closeIconColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.closeIconColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .closeIconColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!closeIconColor) {
          switch (alertType) {
            case `error`:
              closeIconColor = localConfig.smallScreenConfig.alertError
                ?.closeIconColor
                ? localConfig.smallScreenConfig.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = localConfig.smallScreenConfig.alertInformation
                ?.closeIconColor
                ? localConfig.smallScreenConfig.alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = localConfig.smallScreenConfig.alertSuccess
                ?.closeIconColor
                ? localConfig.smallScreenConfig.alertSuccess.closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = localConfig.smallScreenConfig.alertWarning
                ?.closeIconColor
                ? localConfig.smallScreenConfig.alertWarning.closeIconColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              closeIconColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertError?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertInformation?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertSuccess?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertWarning?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.closeIconColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!closeIconColor) {
          switch (alertType) {
            case `error`:
              closeIconColor = this._globalConfig.smallScreenConfig.alertError
                ?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = this._globalConfig.smallScreenConfig
                .alertInformation?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = this._globalConfig.smallScreenConfig.alertSuccess
                ?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alertSuccess
                    .closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = this._globalConfig.smallScreenConfig.alertWarning
                ?.closeIconColor
                ? this._globalConfig.smallScreenConfig.alertWarning
                    .closeIconColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!closeIconColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              closeIconColor = localConfig.alternativeTheme.alertError
                ?.closeIconColor
                ? localConfig.alternativeTheme.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = localConfig.alternativeTheme.alertInformation
                ?.closeIconColor
                ? localConfig.alternativeTheme.alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = localConfig.alternativeTheme.alertSuccess
                ?.closeIconColor
                ? localConfig.alternativeTheme.alertSuccess.closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = localConfig.alternativeTheme.alertWarning
                ?.closeIconColor
                ? localConfig.alternativeTheme.alertWarning.closeIconColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!closeIconColor) {
          switch (alertType) {
            case `error`:
              closeIconColor = localConfig.alertError?.closeIconColor
                ? localConfig.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = localConfig.alertInformation?.closeIconColor
                ? localConfig.alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = localConfig.alertSuccess?.closeIconColor
                ? localConfig.alertSuccess.closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = localConfig.alertWarning?.closeIconColor
                ? localConfig.alertWarning.closeIconColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!closeIconColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              closeIconColor = this._globalConfig.alternativeTheme.alertError
                ?.closeIconColor
                ? this._globalConfig.alternativeTheme.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = this._globalConfig.alternativeTheme
                .alertInformation?.closeIconColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = this._globalConfig.alternativeTheme.alertSuccess
                ?.closeIconColor
                ? this._globalConfig.alternativeTheme.alertSuccess
                    .closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = this._globalConfig.alternativeTheme.alertWarning
                ?.closeIconColor
                ? this._globalConfig.alternativeTheme.alertWarning
                    .closeIconColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!closeIconColor) {
          switch (alertType) {
            case `error`:
              closeIconColor = this._globalConfig.alertError?.closeIconColor
                ? this._globalConfig.alertError.closeIconColor
                : ``;
              break;

            case `information`:
              closeIconColor = this._globalConfig.alertInformation
                ?.closeIconColor
                ? this._globalConfig.alertInformation.closeIconColor
                : ``;
              break;

            case `success`:
              closeIconColor = this._globalConfig.alertSuccess?.closeIconColor
                ? this._globalConfig.alertSuccess.closeIconColor
                : ``;
              break;

            case `warning`:
              closeIconColor = this._globalConfig.alertWarning?.closeIconColor
                ? this._globalConfig.alertWarning.closeIconColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!closeIconColor) {
      switch (alertType) {
        case `error`:
          closeIconColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!.closeIconColor!
            : this._defaultValues!.alertError!.closeIconColor!;
          break;

        case `information`:
          closeIconColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .closeIconColor!
            : this._defaultValues!.alertInformation!.closeIconColor!;
          break;

        case `success`:
          closeIconColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!
                .closeIconColor!
            : this._defaultValues!.alertSuccess!.closeIconColor!;
          break;

        case `warning`:
          closeIconColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!
                .closeIconColor!
            : this._defaultValues!.alertWarning!.closeIconColor!;
          break;
      }
    }

    return closeIconColor;
  }
  // end private getBoxCloseIcomColor(...): string

  private getBoxMessageFontColor(
    alertType: string,
    localConfig?: IConfig
  ): string {
    let messageFontColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              messageFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.messageFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.messageFontColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.messageFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.messageFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .messageFontColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!messageFontColor) {
          switch (alertType) {
            case `error`:
              messageFontColor = localConfig.smallScreenConfig.alertError
                ?.messageFontColor
                ? localConfig.smallScreenConfig.alertError.messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = localConfig.smallScreenConfig.alertInformation
                ?.messageFontColor
                ? localConfig.smallScreenConfig.alertInformation
                    .messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = localConfig.smallScreenConfig.alertSuccess
                ?.messageFontColor
                ? localConfig.smallScreenConfig.alertSuccess.messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = localConfig.smallScreenConfig.alertWarning
                ?.messageFontColor
                ? localConfig.smallScreenConfig.alertWarning.messageFontColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertError?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertInformation?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertSuccess?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertWarning?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.messageFontColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!messageFontColor) {
          switch (alertType) {
            case `error`:
              messageFontColor = this._globalConfig.smallScreenConfig.alertError
                ?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alertError
                    .messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alertInformation?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alertSuccess?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alertSuccess
                    .messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = this._globalConfig.smallScreenConfig
                .alertWarning?.messageFontColor
                ? this._globalConfig.smallScreenConfig.alertWarning
                    .messageFontColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!messageFontColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              messageFontColor = localConfig.alternativeTheme.alertError
                ?.messageFontColor
                ? localConfig.alternativeTheme.alertError.messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = localConfig.alternativeTheme.alertInformation
                ?.messageFontColor
                ? localConfig.alternativeTheme.alertInformation.messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = localConfig.alternativeTheme.alertSuccess
                ?.messageFontColor
                ? localConfig.alternativeTheme.alertSuccess.messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = localConfig.alternativeTheme.alertWarning
                ?.messageFontColor
                ? localConfig.alternativeTheme.alertWarning.messageFontColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!messageFontColor) {
          switch (alertType) {
            case `error`:
              messageFontColor = localConfig.alertError?.messageFontColor
                ? localConfig.alertError.messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = localConfig.alertInformation?.messageFontColor
                ? localConfig.alertInformation.messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = localConfig.alertSuccess?.messageFontColor
                ? localConfig.alertSuccess.messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = localConfig.alertWarning?.messageFontColor
                ? localConfig.alertWarning.messageFontColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!messageFontColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              messageFontColor = this._globalConfig.alternativeTheme.alertError
                ?.messageFontColor
                ? this._globalConfig.alternativeTheme.alertError
                    .messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = this._globalConfig.alternativeTheme
                .alertInformation?.messageFontColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = this._globalConfig.alternativeTheme
                .alertSuccess?.messageFontColor
                ? this._globalConfig.alternativeTheme.alertSuccess
                    .messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = this._globalConfig.alternativeTheme
                .alertWarning?.messageFontColor
                ? this._globalConfig.alternativeTheme.alertWarning
                    .messageFontColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!messageFontColor) {
          switch (alertType) {
            case `error`:
              messageFontColor = this._globalConfig.alertError?.messageFontColor
                ? this._globalConfig.alertError.messageFontColor
                : ``;
              break;

            case `information`:
              messageFontColor = this._globalConfig.alertInformation
                ?.messageFontColor
                ? this._globalConfig.alertInformation.messageFontColor
                : ``;
              break;

            case `success`:
              messageFontColor = this._globalConfig.alertSuccess
                ?.messageFontColor
                ? this._globalConfig.alertSuccess.messageFontColor
                : ``;
              break;

            case `warning`:
              messageFontColor = this._globalConfig.alertWarning
                ?.messageFontColor
                ? this._globalConfig.alertWarning.messageFontColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!messageFontColor) {
      switch (alertType) {
        case `error`:
          messageFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!
                .messageFontColor!
            : this._defaultValues!.alertError!.messageFontColor!;
          break;

        case `information`:
          messageFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .messageFontColor!
            : this._defaultValues!.alertInformation!.messageFontColor!;
          break;

        case `success`:
          messageFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!
                .messageFontColor!
            : this._defaultValues!.alertSuccess!.messageFontColor!;
          break;

        case `warning`:
          messageFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!
                .messageFontColor!
            : this._defaultValues!.alertWarning!.messageFontColor!;
          break;
      }
    }

    return messageFontColor;
  }
  // end private getBoxMessageFontColor(...): string

  private getBoxMessageFontFamily(localConfig?: IConfig): string {
    let messageFontFamily: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          messageFontFamily = localConfig.smallScreenConfig.alternativeTheme
            .messageFontFamily
            ? localConfig.smallScreenConfig.alternativeTheme.messageFontFamily
            : ``;
        }

        if (!messageFontFamily) {
          messageFontFamily = localConfig.smallScreenConfig.messageFontFamily
            ? localConfig.smallScreenConfig.messageFontFamily
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          messageFontFamily = this._globalConfig.smallScreenConfig
            .alternativeTheme.messageFontFamily
            ? this._globalConfig.smallScreenConfig.alternativeTheme
                .messageFontFamily
            : ``;
        }

        if (!messageFontFamily) {
          messageFontFamily = this._globalConfig.smallScreenConfig
            .messageFontFamily
            ? this._globalConfig.smallScreenConfig.messageFontFamily
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!messageFontFamily) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          messageFontFamily = localConfig.alternativeTheme.messageFontFamily
            ? localConfig.alternativeTheme.messageFontFamily
            : ``;
        }

        if (!messageFontFamily) {
          messageFontFamily = localConfig.messageFontFamily
            ? localConfig.messageFontFamily
            : ``;
        }
      }
      // end if (localConfig)
    }

    if (!messageFontFamily) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          messageFontFamily = this._globalConfig.alternativeTheme
            .messageFontFamily
            ? this._globalConfig.alternativeTheme.messageFontFamily
            : ``;
        }

        if (!messageFontFamily) {
          messageFontFamily = this._globalConfig.messageFontFamily
            ? this._globalConfig.messageFontFamily
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!messageFontFamily) {
      messageFontFamily = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.messageFontFamily!
        : this._defaultValues.messageFontFamily!;
    }

    return messageFontFamily;
  }
  // end private getBoxMessageFontFamily(...): string

  private getBoxMessageFontSize(localConfig?: IConfig): string {
    let messageFontSize: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          messageFontSize = localConfig.smallScreenConfig.alternativeTheme
            .messageFontSize
            ? localConfig.smallScreenConfig.alternativeTheme.messageFontSize
            : ``;
        }

        if (!messageFontSize) {
          messageFontSize = localConfig.smallScreenConfig.messageFontSize
            ? localConfig.smallScreenConfig.messageFontSize
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          messageFontSize = this._globalConfig.smallScreenConfig
            .alternativeTheme.messageFontSize
            ? this._globalConfig.smallScreenConfig.alternativeTheme
                .messageFontSize
            : ``;
        }

        if (!messageFontSize) {
          messageFontSize = this._globalConfig.smallScreenConfig.messageFontSize
            ? this._globalConfig.smallScreenConfig.messageFontSize
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!messageFontSize) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          messageFontSize = localConfig.alternativeTheme.messageFontSize
            ? localConfig.alternativeTheme.messageFontSize
            : ``;
        }

        if (!messageFontSize) {
          messageFontSize = localConfig.messageFontSize
            ? localConfig.messageFontSize
            : ``;
        }
      }
      // end if (localConfig)
    }

    if (!messageFontSize) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          messageFontSize = this._globalConfig.alternativeTheme.messageFontSize
            ? this._globalConfig.alternativeTheme.messageFontSize
            : ``;
        }

        if (!messageFontSize) {
          messageFontSize = this._globalConfig.messageFontSize
            ? this._globalConfig.messageFontSize
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!messageFontSize) {
      messageFontSize = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.messageFontSize!
        : this._defaultValues.messageFontSize!;
    }

    return messageFontSize;
  }
  // end private getBoxMessageFontSize(...): string

  private getBoxShowIconClose(localConfig?: IConfig): boolean | string {
    let showCloseIcon: boolean | string | undefined = undefined;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          showCloseIcon = localConfig.smallScreenConfig.alternativeTheme
            .showCloseIcon
            ? localConfig.smallScreenConfig.alternativeTheme.showCloseIcon
            : undefined;
        }

        if (!showCloseIcon) {
          showCloseIcon = localConfig.smallScreenConfig.showCloseIcon
            ? localConfig.smallScreenConfig.showCloseIcon
            : undefined;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          showCloseIcon = this._globalConfig.smallScreenConfig.alternativeTheme
            .showCloseIcon
            ? this._globalConfig.smallScreenConfig.alternativeTheme
                .showCloseIcon
            : undefined;
        }

        if (!showCloseIcon) {
          showCloseIcon = this._globalConfig.smallScreenConfig.showCloseIcon
            ? this._globalConfig.smallScreenConfig.showCloseIcon
            : undefined;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!showCloseIcon) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          showCloseIcon = localConfig.alternativeTheme.showCloseIcon
            ? localConfig.alternativeTheme.showCloseIcon
            : undefined;
        }

        if (!showCloseIcon) {
          showCloseIcon = localConfig.showCloseIcon
            ? localConfig.showCloseIcon
            : undefined;
        }
      }
      // end if (localConfig)
    }

    if (!showCloseIcon) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          showCloseIcon = this._globalConfig.alternativeTheme.showCloseIcon
            ? this._globalConfig.alternativeTheme.showCloseIcon
            : undefined;
        }

        if (!showCloseIcon) {
          showCloseIcon = this._globalConfig.showCloseIcon
            ? this._globalConfig.showCloseIcon
            : undefined;
        }
      }
      // end if (this._globalConfig)
    }

    if (!showCloseIcon) {
      showCloseIcon = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.showCloseIcon!
        : this._defaultValues.showCloseIcon!;
    }

    return showCloseIcon;
  }
  // end private getBoxShowIconClose(...): boolean

  private getBoxTitleFontColor(
    alertType: string,
    localConfig?: IConfig
  ): string {
    let titleFontColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              titleFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.titleFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.titleFontColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.titleFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.titleFontColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .titleFontColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!titleFontColor) {
          switch (alertType) {
            case `error`:
              titleFontColor = localConfig.smallScreenConfig.alertError
                ?.titleFontColor
                ? localConfig.smallScreenConfig.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = localConfig.smallScreenConfig.alertInformation
                ?.titleFontColor
                ? localConfig.smallScreenConfig.alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = localConfig.smallScreenConfig.alertSuccess
                ?.titleFontColor
                ? localConfig.smallScreenConfig.alertSuccess.titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = localConfig.smallScreenConfig.alertWarning
                ?.titleFontColor
                ? localConfig.smallScreenConfig.alertWarning.titleFontColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              titleFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertError?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertInformation?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertSuccess?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertWarning?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.titleFontColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!titleFontColor) {
          switch (alertType) {
            case `error`:
              titleFontColor = this._globalConfig.smallScreenConfig.alertError
                ?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = this._globalConfig.smallScreenConfig
                .alertInformation?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = this._globalConfig.smallScreenConfig.alertSuccess
                ?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alertSuccess
                    .titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = this._globalConfig.smallScreenConfig.alertWarning
                ?.titleFontColor
                ? this._globalConfig.smallScreenConfig.alertWarning
                    .titleFontColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!titleFontColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              titleFontColor = localConfig.alternativeTheme.alertError
                ?.titleFontColor
                ? localConfig.alternativeTheme.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = localConfig.alternativeTheme.alertInformation
                ?.titleFontColor
                ? localConfig.alternativeTheme.alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = localConfig.alternativeTheme.alertSuccess
                ?.titleFontColor
                ? localConfig.alternativeTheme.alertSuccess.titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = localConfig.alternativeTheme.alertWarning
                ?.titleFontColor
                ? localConfig.alternativeTheme.alertWarning.titleFontColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!titleFontColor) {
          switch (alertType) {
            case `error`:
              titleFontColor = localConfig.alertError?.titleFontColor
                ? localConfig.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = localConfig.alertInformation?.titleFontColor
                ? localConfig.alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = localConfig.alertSuccess?.titleFontColor
                ? localConfig.alertSuccess.titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = localConfig.alertWarning?.titleFontColor
                ? localConfig.alertWarning.titleFontColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!titleFontColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              titleFontColor = this._globalConfig.alternativeTheme.alertError
                ?.titleFontColor
                ? this._globalConfig.alternativeTheme.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = this._globalConfig.alternativeTheme
                .alertInformation?.titleFontColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = this._globalConfig.alternativeTheme.alertSuccess
                ?.titleFontColor
                ? this._globalConfig.alternativeTheme.alertSuccess
                    .titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = this._globalConfig.alternativeTheme.alertWarning
                ?.titleFontColor
                ? this._globalConfig.alternativeTheme.alertWarning
                    .titleFontColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!titleFontColor) {
          switch (alertType) {
            case `error`:
              titleFontColor = this._globalConfig.alertError?.titleFontColor
                ? this._globalConfig.alertError.titleFontColor
                : ``;
              break;

            case `information`:
              titleFontColor = this._globalConfig.alertInformation
                ?.titleFontColor
                ? this._globalConfig.alertInformation.titleFontColor
                : ``;
              break;

            case `success`:
              titleFontColor = this._globalConfig.alertSuccess?.titleFontColor
                ? this._globalConfig.alertSuccess.titleFontColor
                : ``;
              break;

            case `warning`:
              titleFontColor = this._globalConfig.alertWarning?.titleFontColor
                ? this._globalConfig.alertWarning.titleFontColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!titleFontColor) {
      switch (alertType) {
        case `error`:
          titleFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!.titleFontColor!
            : this._defaultValues!.alertError!.titleFontColor!;
          break;

        case `information`:
          titleFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .titleFontColor!
            : this._defaultValues!.alertInformation!.titleFontColor!;
          break;

        case `success`:
          titleFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!
                .titleFontColor!
            : this._defaultValues!.alertSuccess!.titleFontColor!;
          break;

        case `warning`:
          titleFontColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!
                .titleFontColor!
            : this._defaultValues!.alertWarning!.titleFontColor!;
          break;
      }
    }

    return titleFontColor;
  }
  // end private getBoxTitleFontColor(...): string

  private getBoxTitleFontFamily(localConfig?: IConfig): string {
    let titleFontFamily: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          titleFontFamily = localConfig.smallScreenConfig.alternativeTheme
            .titleFontFamily
            ? localConfig.smallScreenConfig.alternativeTheme.titleFontFamily
            : ``;
        }

        if (!titleFontFamily) {
          titleFontFamily = localConfig.smallScreenConfig.titleFontFamily
            ? localConfig.smallScreenConfig.titleFontFamily
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          titleFontFamily = this._globalConfig.smallScreenConfig
            .alternativeTheme.titleFontFamily
            ? this._globalConfig.smallScreenConfig.alternativeTheme
                .titleFontFamily
            : ``;
        }

        if (!titleFontFamily) {
          titleFontFamily = this._globalConfig.smallScreenConfig.titleFontFamily
            ? this._globalConfig.smallScreenConfig.titleFontFamily
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!titleFontFamily) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          titleFontFamily = localConfig.alternativeTheme.titleFontFamily
            ? localConfig.alternativeTheme.titleFontFamily
            : ``;
        }

        if (!titleFontFamily) {
          titleFontFamily = localConfig.titleFontFamily
            ? localConfig.titleFontFamily
            : ``;
        }
      }
      // end if (localConfig)
    }

    if (!titleFontFamily) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          titleFontFamily = this._globalConfig.alternativeTheme.titleFontFamily
            ? this._globalConfig.alternativeTheme.titleFontFamily
            : ``;
        }

        if (!titleFontFamily) {
          titleFontFamily = this._globalConfig.titleFontFamily
            ? this._globalConfig.titleFontFamily
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!titleFontFamily) {
      titleFontFamily = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.titleFontFamily!
        : this._defaultValues.titleFontFamily!;
    }

    return titleFontFamily;
  }
  // end private getBoxTitleFontFamily(...): string

  private getBoxTitleFontSize(localConfig?: IConfig): string {
    let titleFontSize: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          titleFontSize = localConfig.smallScreenConfig.alternativeTheme
            .titleFontSize
            ? localConfig.smallScreenConfig.alternativeTheme.titleFontSize
            : ``;
        }

        if (!titleFontSize) {
          titleFontSize = localConfig.smallScreenConfig.titleFontSize
            ? localConfig.smallScreenConfig.titleFontSize
            : ``;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          titleFontSize = this._globalConfig.smallScreenConfig.alternativeTheme
            .titleFontSize
            ? this._globalConfig.smallScreenConfig.alternativeTheme
                .titleFontSize
            : ``;
        }

        if (!titleFontSize) {
          titleFontSize = this._globalConfig.smallScreenConfig.titleFontSize
            ? this._globalConfig.smallScreenConfig.titleFontSize
            : ``;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!titleFontSize) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          titleFontSize = localConfig.alternativeTheme.titleFontSize
            ? localConfig.alternativeTheme.titleFontSize
            : ``;
        }

        if (!titleFontSize) {
          titleFontSize = localConfig.titleFontSize
            ? localConfig.titleFontSize
            : ``;
        }
      }
      // end if (localConfig)
    }

    if (!titleFontSize) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          titleFontSize = this._globalConfig.alternativeTheme.titleFontSize
            ? this._globalConfig.alternativeTheme.titleFontSize
            : ``;
        }

        if (!titleFontSize) {
          titleFontSize = this._globalConfig.titleFontSize
            ? this._globalConfig.titleFontSize
            : ``;
        }
      }
      // end if (this._globalConfig)
    }

    if (!titleFontSize) {
      titleFontSize = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.titleFontSize!
        : this._defaultValues.titleFontSize!;
    }

    return titleFontSize;
  }
  // end private getBoxTitleFontSize(...): string

  private getAlertTimed(localConfig?: IConfig): boolean | string {
    let timed: boolean | string | undefined = undefined;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          timed = localConfig.smallScreenConfig.alternativeTheme.timed
            ? localConfig.smallScreenConfig.alternativeTheme.timed
            : undefined;
        }

        if (!timed) {
          timed = localConfig.smallScreenConfig.timed
            ? localConfig.smallScreenConfig.timed
            : undefined;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          timed = this._globalConfig.smallScreenConfig.alternativeTheme.timed
            ? this._globalConfig.smallScreenConfig.alternativeTheme.timed
            : undefined;
        }

        if (!timed) {
          timed = this._globalConfig.smallScreenConfig.timed
            ? this._globalConfig.smallScreenConfig.timed
            : undefined;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!timed) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          timed = localConfig.alternativeTheme.timed
            ? localConfig.alternativeTheme.timed
            : undefined;
        }

        if (!timed) {
          timed = localConfig.timed ? localConfig.timed : undefined;
        }
      }
      // end if (localConfig)
    }

    if (!timed) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          timed = this._globalConfig.alternativeTheme.timed
            ? this._globalConfig.alternativeTheme.timed
            : undefined;
        }

        if (!timed) {
          timed = this._globalConfig.timed
            ? this._globalConfig.timed
            : undefined;
        }
      }
      // end if (this._globalConfig)
    }

    if (!timed) {
      timed = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.timed!
        : this._defaultValues.timed!;
    }

    return timed;
  }
  // end private getAlertTimed(...): boolean

  private getAlertTimedOut(localConfig?: IConfig): number {
    let timedOut: number | undefined = undefined;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          timedOut = localConfig.smallScreenConfig.alternativeTheme.timedOut
            ? localConfig.smallScreenConfig.alternativeTheme.timedOut
            : undefined;
        }

        if (!timedOut) {
          timedOut = localConfig.smallScreenConfig.timedOut
            ? localConfig.smallScreenConfig.timedOut
            : undefined;
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          timedOut = this._globalConfig.smallScreenConfig.alternativeTheme
            .timedOut
            ? this._globalConfig.smallScreenConfig.alternativeTheme.timedOut
            : undefined;
        }

        if (!timedOut) {
          timedOut = this._globalConfig.smallScreenConfig.timedOut
            ? this._globalConfig.smallScreenConfig.timedOut
            : undefined;
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!timedOut) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          timedOut = localConfig.alternativeTheme.timedOut
            ? localConfig.alternativeTheme.timedOut
            : undefined;
        }

        if (!timedOut) {
          timedOut = localConfig.timedOut ? localConfig.timedOut : undefined;
        }
      }
      // end if (localConfig)
    }

    if (!timedOut) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          timedOut = this._globalConfig.alternativeTheme.timedOut
            ? this._globalConfig.alternativeTheme.timedOut
            : undefined;
        }

        if (!timedOut) {
          timedOut = this._globalConfig.timedOut
            ? this._globalConfig.timedOut
            : undefined;
        }
      }
      // end if (this._globalConfig)
    }

    if (!timedOut) {
      timedOut = isSmallScreen
        ? this._defaultValues.smallScreenConfig!.timedOut!
        : this._defaultValues.timedOut!;
    }

    return timedOut;
  }
  // end private getAlertTimedOut(...): number

  private getTimeBarColor(alertType: string, localConfig?: IConfig): string {
    let timeBarColor: string = ``;
    let isSmallScreen: boolean =
      window.innerWidth <= this._smallScreenBreakpoint ? true : false;
    let useAlternativeTheme: boolean = false;

    if (isSmallScreen) {
      useAlternativeTheme =
        localConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? localConfig.smallScreenConfig.useAlternativeTheme === true ||
            localConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;

      if (!useAlternativeTheme) {
        this._globalConfig?.smallScreenConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.smallScreenConfig.useAlternativeTheme === true ||
            this._globalConfig.smallScreenConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
      }
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        localConfig?.useAlternativeTheme !== undefined
          ? localConfig.useAlternativeTheme === true ||
            localConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (!useAlternativeTheme) {
      useAlternativeTheme =
        this._globalConfig?.useAlternativeTheme !== undefined
          ? this._globalConfig.useAlternativeTheme === true ||
            this._globalConfig.useAlternativeTheme === `true`
            ? true
            : false
          : false;
    }

    if (isSmallScreen) {
      if (localConfig && localConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          localConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              timeBarColor = localConfig.smallScreenConfig.alternativeTheme
                .alertError?.timeBarColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertError
                    .timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = localConfig.smallScreenConfig.alternativeTheme
                .alertInformation?.timeBarColor
                ? localConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = localConfig.smallScreenConfig.alternativeTheme
                .alertSuccess?.timeBarColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertSuccess
                    .timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = localConfig.smallScreenConfig.alternativeTheme
                .alertWarning?.timeBarColor
                ? localConfig.smallScreenConfig.alternativeTheme.alertWarning
                    .timeBarColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!timeBarColor) {
          switch (alertType) {
            case `error`:
              timeBarColor = localConfig.smallScreenConfig.alertError
                ?.timeBarColor
                ? localConfig.smallScreenConfig.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = localConfig.smallScreenConfig.alertInformation
                ?.timeBarColor
                ? localConfig.smallScreenConfig.alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = localConfig.smallScreenConfig.alertSuccess
                ?.timeBarColor
                ? localConfig.smallScreenConfig.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = localConfig.smallScreenConfig.alertWarning
                ?.timeBarColor
                ? localConfig.smallScreenConfig.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig && localConfig.smallScreenConfig)

      if (this._globalConfig && this._globalConfig.smallScreenConfig) {
        if (
          useAlternativeTheme &&
          this._globalConfig.smallScreenConfig.alternativeTheme
        ) {
          switch (alertType) {
            case `error`:
              timeBarColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertError?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertInformation?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertSuccess?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = this._globalConfig.smallScreenConfig
                .alternativeTheme.alertWarning?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alternativeTheme
                    .alertWarning.timeBarColor
                : ``;
              break;
          }
        }
        // end localConfig.smallScreenConfig.alternativeTheme

        if (!timeBarColor) {
          switch (alertType) {
            case `error`:
              timeBarColor = this._globalConfig.smallScreenConfig.alertError
                ?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = this._globalConfig.smallScreenConfig
                .alertInformation?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alertInformation
                    .timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = this._globalConfig.smallScreenConfig.alertSuccess
                ?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = this._globalConfig.smallScreenConfig.alertWarning
                ?.timeBarColor
                ? this._globalConfig.smallScreenConfig.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig && this._globalConfig.smallScreenConfig)
    }
    // end if (isSmallScreen)

    if (!timeBarColor) {
      if (localConfig) {
        if (useAlternativeTheme && localConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              timeBarColor = localConfig.alternativeTheme.alertError
                ?.timeBarColor
                ? localConfig.alternativeTheme.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = localConfig.alternativeTheme.alertInformation
                ?.timeBarColor
                ? localConfig.alternativeTheme.alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = localConfig.alternativeTheme.alertSuccess
                ?.timeBarColor
                ? localConfig.alternativeTheme.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = localConfig.alternativeTheme.alertWarning
                ?.timeBarColor
                ? localConfig.alternativeTheme.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!timeBarColor) {
          switch (alertType) {
            case `error`:
              timeBarColor = localConfig.alertError?.timeBarColor
                ? localConfig.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = localConfig.alertInformation?.timeBarColor
                ? localConfig.alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = localConfig.alertSuccess?.timeBarColor
                ? localConfig.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = localConfig.alertWarning?.timeBarColor
                ? localConfig.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
      }
      // end if (localConfig)
    }

    if (!timeBarColor) {
      if (this._globalConfig) {
        if (useAlternativeTheme && this._globalConfig.alternativeTheme) {
          switch (alertType) {
            case `error`:
              timeBarColor = this._globalConfig.alternativeTheme.alertError
                ?.timeBarColor
                ? this._globalConfig.alternativeTheme.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = this._globalConfig.alternativeTheme
                .alertInformation?.timeBarColor
                ? this._globalConfig.alternativeTheme.alertInformation
                    .timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = this._globalConfig.alternativeTheme.alertSuccess
                ?.timeBarColor
                ? this._globalConfig.alternativeTheme.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = this._globalConfig.alternativeTheme.alertWarning
                ?.timeBarColor
                ? this._globalConfig.alternativeTheme.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
        // end localConfig.alternativeTheme

        if (!timeBarColor) {
          switch (alertType) {
            case `error`:
              timeBarColor = this._globalConfig.alertError?.timeBarColor
                ? this._globalConfig.alertError.timeBarColor
                : ``;
              break;

            case `information`:
              timeBarColor = this._globalConfig.alertInformation?.timeBarColor
                ? this._globalConfig.alertInformation.timeBarColor
                : ``;
              break;

            case `success`:
              timeBarColor = this._globalConfig.alertSuccess?.timeBarColor
                ? this._globalConfig.alertSuccess.timeBarColor
                : ``;
              break;

            case `warning`:
              timeBarColor = this._globalConfig.alertWarning?.timeBarColor
                ? this._globalConfig.alertWarning.timeBarColor
                : ``;
              break;
          }
        }
      }
      // end if (this._globalConfig)
    }

    if (!timeBarColor) {
      switch (alertType) {
        case `error`:
          timeBarColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertError!.timeBarColor!
            : this._defaultValues!.alertError!.timeBarColor!;
          break;

        case `information`:
          timeBarColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertInformation!
                .timeBarColor!
            : this._defaultValues!.alertInformation!.timeBarColor!;
          break;

        case `success`:
          timeBarColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertSuccess!.timeBarColor!
            : this._defaultValues!.alertSuccess!.timeBarColor!;
          break;

        case `warning`:
          timeBarColor = isSmallScreen
            ? this._defaultValues.smallScreenConfig!.alertWarning!.timeBarColor!
            : this._defaultValues!.alertWarning!.timeBarColor!;
          break;
      }
    }

    return timeBarColor;
  }
  // end private getTimeBarColor(...): string

  private setButtonCloseAction(id: string) {
    const container = document.getElementById(
      id.replace(`-close`, ``)
    )?.parentElement;

    document.getElementById(id)?.addEventListener(`click`, () => {
      if (container!.childNodes.length > 1) {
        document.getElementById(id.replace(`-close`, ``))?.remove();
      } else {
        container!.remove();
      }
    });
  }
  // end private setButtonCloseAction(...)

  private setMouseEnterAction(id: string) {
    document.getElementById(id)?.addEventListener(
      'mouseenter',
      () => {
        document.getElementById(`${id}-timer`)?.setAttribute(`pause`, `true`);
      },
      false
    );
  }
  // end private setMouseEnterAction(...)

  private setMouseLeaveAction(id: string, timerMiliSeconds: number) {
    document.getElementById(id)?.addEventListener(
      'mouseleave',
      () => {
        document.getElementById(`${id}-timer`)?.setAttribute(`pause`, `false`);
        this.startAlertTimer(`${id}-timer`, timerMiliSeconds);
      },
      false
    );
  }
  // end private setMouseLeaveAction(...)

  private startAlertTimer(id: string, timerMiliSeconds: number) {
    let el = document.getElementById(id);

    let width: number = parseInt(el?.getAttribute(`timer`)!);

    let interval = setInterval(frame, timerMiliSeconds / 100);

    function frame() {
      if (el) {
        if (width > 0 && el?.getAttribute(`pause`) !== `true`) {
          width--;
          el?.setAttribute(`timer`, `${width}`);
          el!.style.width = `${width}%`;
        } else {
          if (el!.getAttribute(`pause`) !== `true`) {
            const container = document.getElementById(
              id.replace(`-close`, ``)
            )?.parentElement;

            if (container) {
              if (container.childNodes.length > 1) {
                document.getElementById(id.replace(`-timer`, ``))?.remove();
              } else {
                container.remove();
              }
            }
          }

          clearInterval(interval);
        }
      }
    }
  }
  // end private startAlertTimer(...)

  public error(
    message: string,
    title?: string | null | undefined,
    localConfig?: any
  ) {
    this.createAlert(message, `error`, title, localConfig);
  }

  public information(
    message: string,
    title?: string | null | undefined,
    localConfig?: any
  ) {
    this.createAlert(message, `information`, title, localConfig);
  }

  public success(
    message: string,
    title?: string | null | undefined,
    localConfig?: any
  ) {
    this.createAlert(message, `success`, title, localConfig);
  }

  public warning(
    message: string,
    title?: string | null | undefined,
    localConfig?: any
  ) {
    this.createAlert(message, `warning`, title, localConfig);
  }
}
