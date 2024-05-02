import { Component } from '@angular/core';
import { NgxAlertMessage } from '@philipibovo/ngx-alert-message';

interface INgxAlertMessageConfigItem {
  backgroundColor?: string;
  borderColor?: string;
  closeIconColor?: string;
  messageFontColor?: string;
  timeBarColor?: string;
  titleFontColor?: string;
}

interface INgxAlertMessageConfig {
  alertError?: INgxAlertMessageConfigItem;
  alertInformation?: INgxAlertMessageConfigItem;
  alertSuccess?: INgxAlertMessageConfigItem;
  alertWarning?: INgxAlertMessageConfigItem;
  border?: {
    radius?: string; //-> CSS units (ch | cn | em | in | mm | pc | px | pt | rem | vh | vmax | vm | vmin | vw | x | %)
    size?: string;
    type?: string;
  };
  fixed?: boolean;
  messageFontFamily?: string;
  messageFontSize?: string;
  position?: string; //-> bottom, bottom-left, bottom-right, top, top-left, top-right
  showCloseIcon?: boolean;
  size?: string; //-> CSS units (ch | cn | em | in | mm | pc | px | pt | rem | vh | vmax | vm | vmin | vw | x | %), or CSS calc() function
  timed?: boolean;
  timedOut?: number;
  titleFontFamily?: string;
  titleFontSize?: string;
  smallScreenConfig?: INgxAlertMessageConfig;
  alternativeTheme?: INgxAlertMessageConfig;
  useAlternativeTheme?: boolean;
}

@Component({
  selector: 'app-generate-config',
  templateUrl: './generate-config.component.html',
  styleUrls: ['./generate-config.component.scss'],
})
export class GenerateConfigComponent {
  public codeInHtmlArroba: string = `@`;
  public codeInHtmlKeyOpen: string = `{`;
  public codeInHtmlKeyClose: string = `}`;

  public propierties: any = {
    alertError: false,
    alertInformation: false,
    alertSuccess: false,
    alertWarning: false,
    border: false,
    fixed: false,
    messageFontFamily: false,
    messageFonrSize: false,
    position: false,
    showCloseIcon: false,
    size: false,
    timed: false,
    timedOut: false,
    titleFontFamily: false,
    titleFontSize: false,
    useAlternativeTheme: false,
    alertenativeTheme: false,
    alertenativeThemeAlertError: false,
    alertenativeThemeAlertInformation: false,
    alertenativeThemeAlertSuccess: false,
    alertenativeThemeAlertWarning: false,
    alertenativeThemeBorder: false,
    alertenativeThemeFixed: false,
    alertenativeThemeMessageFontFamily: false,
    alertenativeThemeMessageFonrSize: false,
    alertenativeThemePosition: false,
    alertenativeThemeShowCloseIcon: false,
    alertenativeThemeSize: false,
    alertenativeThemeTimed: false,
    alertenativeThemeTimedOut: false,
    alertenativeThemeTitleFontFamily: false,
    alertenativeThemeTitleFontSize: false,
    smallScreenConfig: false,
    smallScreenConfigAlertError: false,
    smallScreenConfigAlertInformation: false,
    smallScreenConfigAlertSuccess: false,
    smallScreenConfigAlertWarning: false,
    smallScreenConfigBorder: false,
    smallScreenConfigFixed: false,
    smallScreenConfigMessageFontFamily: false,
    smallScreenConfigMessageFonrSize: false,
    smallScreenConfigPosition: false,
    smallScreenConfigShowCloseIcon: false,
    smallScreenConfigSize: false,
    smallScreenConfigTimed: false,
    smallScreenConfigTimedOut: false,
    smallScreenConfigTitleFontFamily: false,
    smallScreenConfigTitleFontSize: false,
    smallScreenConfigUseAlternativeTheme: false,
    smallScreenConfigAlternativeTheme: false,
    smallScreenConfigAlternativeThemeAlertError: false,
    smallScreenConfigAlternativeThemeAlertInformation: false,
    smallScreenConfigAlternativeThemeAlertSuccess: false,
    smallScreenConfigAlternativeThemeAlertWarning: false,
    smallScreenConfigAlternativeThemeBorder: false,
    smallScreenConfigAlternativeThemeFixed: false,
    smallScreenConfigAlternativeThemeMessageFontFamily: false,
    smallScreenConfigAlternativeThemeMessageFonrSize: false,
    smallScreenConfigAlternativeThemePosition: false,
    smallScreenConfigAlternativeThemeShowCloseIcon: false,
    smallScreenConfigAlternativeThemeSize: false,
    smallScreenConfigAlternativeThemeTimed: false,
    smallScreenConfigAlternativeThemeTimedOut: false,
    smallScreenConfigAlternativeThemeTitleFontFamily: false,
    smallScreenConfigAlternativeThemeTitleFontSize: false,
  };

  public finalConfiguration: INgxAlertMessageConfig = {
    alertError: {},
    alertInformation: {},
    alertSuccess: {},
    alertWarning: {},
    border: {},
    smallScreenConfig: {
      alertError: {},
      alertInformation: {},
      alertSuccess: {},
      alertWarning: {},
      border: {},
      alternativeTheme: {
        alertError: {},
        alertInformation: {},
        alertSuccess: {},
        alertWarning: {},
        border: {},
      },
    },
    alternativeTheme: {
      alertError: {},
      alertInformation: {},
      alertSuccess: {},
      alertWarning: {},
      border: {},
    },
  };

  constructor(private _ngxAlertMessage: NgxAlertMessage) {}

  clipboardFinalConfiguration() {
    let aux: INgxAlertMessageConfig = {};

    if (this.propierties.border) {
      aux.border = {};

      if (this.finalConfiguration.border!.radius) {
        aux.border.radius = this.finalConfiguration.border!.radius;
      }

      if (this.finalConfiguration.border!.size) {
        aux.border.size = this.finalConfiguration.border!.size;
      }

      if (this.finalConfiguration.border!.type) {
        aux.border.type = this.finalConfiguration.border!.type;
      }
    }

    if (this.propierties.fixed && this.finalConfiguration.fixed) {
      aux.fixed = this.finalConfiguration.fixed;
    }

    if (
      this.propierties.messageFontFamily &&
      this.finalConfiguration.messageFontFamily
    ) {
      aux.messageFontFamily = this.finalConfiguration.messageFontFamily;
    }

    if (
      this.propierties.messageFontFamily &&
      this.finalConfiguration.messageFontFamily
    ) {
      aux.messageFontFamily = this.finalConfiguration.messageFontFamily;
    }

    if (this.propierties.position && this.finalConfiguration.position) {
      aux.position = this.finalConfiguration.position;
    }

    if (
      this.propierties.showCloseIcon &&
      this.finalConfiguration.showCloseIcon
    ) {
      aux.showCloseIcon = this.finalConfiguration.showCloseIcon;
    }

    if (this.propierties.size && this.finalConfiguration.size) {
      aux.size = this.finalConfiguration.size;
    }

    if (this.propierties.timed && this.finalConfiguration.timed) {
      aux.timed = this.finalConfiguration.timed;
    }

    if (this.propierties.timedOut && this.finalConfiguration.timedOut) {
      aux.timedOut = this.finalConfiguration.timedOut;
    }

    if (
      this.propierties.titleFontFamily &&
      this.finalConfiguration.titleFontFamily
    ) {
      aux.titleFontFamily = this.finalConfiguration.titleFontFamily;
    }

    if (
      this.propierties.titleFontSize &&
      this.finalConfiguration.titleFontSize
    ) {
      aux.titleFontSize = this.finalConfiguration.titleFontSize;
    }

    if (this.propierties.alertError) {
      aux.alertError = {};

      if (this.finalConfiguration.alertError!.backgroundColor) {
        aux.alertError.backgroundColor =
          this.finalConfiguration.alertError!.backgroundColor;
      }

      if (this.finalConfiguration.alertError!.borderColor) {
        aux.alertError.borderColor =
          this.finalConfiguration.alertError!.borderColor;
      }

      if (this.finalConfiguration.alertError!.closeIconColor) {
        aux.alertError.closeIconColor =
          this.finalConfiguration.alertError!.closeIconColor;
      }

      if (this.finalConfiguration.alertError!.messageFontColor) {
        aux.alertError.messageFontColor =
          this.finalConfiguration.alertError!.messageFontColor;
      }

      if (this.finalConfiguration.alertError!.timeBarColor) {
        aux.alertError.timeBarColor =
          this.finalConfiguration.alertError!.timeBarColor;
      }

      if (this.finalConfiguration.alertError!.titleFontColor) {
        aux.alertError.titleFontColor =
          this.finalConfiguration.alertError!.titleFontColor;
      }
    }

    if (this.propierties.alertInformation) {
      aux.alertInformation = {};

      if (this.finalConfiguration.alertInformation!.backgroundColor) {
        aux.alertInformation.backgroundColor =
          this.finalConfiguration.alertInformation!.backgroundColor;
      }

      if (this.finalConfiguration.alertInformation!.borderColor) {
        aux.alertInformation.borderColor =
          this.finalConfiguration.alertInformation!.borderColor;
      }

      if (this.finalConfiguration.alertInformation!.closeIconColor) {
        aux.alertInformation.closeIconColor =
          this.finalConfiguration.alertInformation!.closeIconColor;
      }

      if (this.finalConfiguration.alertInformation!.messageFontColor) {
        aux.alertInformation.messageFontColor =
          this.finalConfiguration.alertInformation!.messageFontColor;
      }

      if (this.finalConfiguration.alertInformation!.timeBarColor) {
        aux.alertInformation.timeBarColor =
          this.finalConfiguration.alertInformation!.timeBarColor;
      }

      if (this.finalConfiguration.alertInformation!.titleFontColor) {
        aux.alertInformation.titleFontColor =
          this.finalConfiguration.alertInformation!.titleFontColor;
      }
    }

    if (this.propierties.alertSuccess) {
      aux.alertSuccess = {};

      if (this.finalConfiguration.alertSuccess!.backgroundColor) {
        aux.alertSuccess.backgroundColor =
          this.finalConfiguration.alertSuccess!.backgroundColor;
      }

      if (this.finalConfiguration.alertSuccess!.borderColor) {
        aux.alertSuccess.borderColor =
          this.finalConfiguration.alertSuccess!.borderColor;
      }

      if (this.finalConfiguration.alertSuccess!.closeIconColor) {
        aux.alertSuccess.closeIconColor =
          this.finalConfiguration.alertSuccess!.closeIconColor;
      }

      if (this.finalConfiguration.alertSuccess!.messageFontColor) {
        aux.alertSuccess.messageFontColor =
          this.finalConfiguration.alertSuccess!.messageFontColor;
      }

      if (this.finalConfiguration.alertSuccess!.timeBarColor) {
        aux.alertSuccess.timeBarColor =
          this.finalConfiguration.alertSuccess!.timeBarColor;
      }

      if (this.finalConfiguration.alertSuccess!.titleFontColor) {
        aux.alertSuccess.titleFontColor =
          this.finalConfiguration.alertSuccess!.titleFontColor;
      }
    }

    if (this.propierties.alertWarning) {
      aux.alertWarning = {};

      if (this.finalConfiguration.alertWarning!.backgroundColor) {
        aux.alertWarning.backgroundColor =
          this.finalConfiguration.alertWarning!.backgroundColor;
      }

      if (this.finalConfiguration.alertWarning!.borderColor) {
        aux.alertWarning.borderColor =
          this.finalConfiguration.alertWarning!.borderColor;
      }

      if (this.finalConfiguration.alertWarning!.closeIconColor) {
        aux.alertWarning.closeIconColor =
          this.finalConfiguration.alertWarning!.closeIconColor;
      }

      if (this.finalConfiguration.alertWarning!.messageFontColor) {
        aux.alertWarning.messageFontColor =
          this.finalConfiguration.alertWarning!.messageFontColor;
      }

      if (this.finalConfiguration.alertWarning!.timeBarColor) {
        aux.alertWarning.timeBarColor =
          this.finalConfiguration.alertWarning!.timeBarColor;
      }

      if (this.finalConfiguration.alertWarning!.titleFontColor) {
        aux.alertWarning.titleFontColor =
          this.finalConfiguration.alertWarning!.titleFontColor;
      }
    }

    if (
      this.propierties.useAlternativeTheme &&
      this.finalConfiguration.useAlternativeTheme
    ) {
      aux.useAlternativeTheme = this.finalConfiguration.useAlternativeTheme;
    }

    if (this.propierties.alternativeTheme) {
      aux.alternativeTheme = {};

      if (this.finalConfiguration.alternativeTheme!.position) {
        aux.alternativeTheme.position =
          this.finalConfiguration.alternativeTheme!.position;
      }

      if (this.finalConfiguration.alternativeTheme!.size) {
        aux.alternativeTheme.size =
          this.finalConfiguration.alternativeTheme!.size;
      }

      if (this.propierties.alternativeThemeBorder) {
        aux.alternativeTheme.border = {};

        if (this.finalConfiguration.alternativeTheme!.border!.radius) {
          aux.alternativeTheme!.border!.radius =
            this.finalConfiguration.alternativeTheme!.border!.radius;
        }

        if (this.finalConfiguration.alternativeTheme!.border!.size) {
          aux.alternativeTheme!.border!.size =
            this.finalConfiguration.alternativeTheme!.border!.size;
        }

        if (this.finalConfiguration.alternativeTheme!.border!.type) {
          aux.alternativeTheme!.border!.type =
            this.finalConfiguration.alternativeTheme!.border!.type;
        }
      }

      if (this.finalConfiguration.alternativeTheme!.fixed) {
        aux.alternativeTheme.fixed =
          this.finalConfiguration.alternativeTheme!.fixed;
      }

      if (this.finalConfiguration.alternativeTheme!.messageFontFamily) {
        aux.alternativeTheme.messageFontFamily =
          this.finalConfiguration.alternativeTheme!.messageFontFamily;
      }

      if (this.finalConfiguration.alternativeTheme!.messageFontSize) {
        aux.alternativeTheme.messageFontSize =
          this.finalConfiguration.alternativeTheme!.messageFontSize;
      }

      if (this.finalConfiguration.alternativeTheme!.showCloseIcon) {
        aux.alternativeTheme.showCloseIcon =
          this.finalConfiguration.alternativeTheme!.showCloseIcon;
      }

      if (this.finalConfiguration.alternativeTheme!.timed) {
        aux.alternativeTheme.timed =
          this.finalConfiguration.alternativeTheme!.timed;
      }

      if (this.finalConfiguration.alternativeTheme!.timedOut) {
        aux.alternativeTheme.timedOut =
          this.finalConfiguration.alternativeTheme!.timedOut;
      }

      if (this.finalConfiguration.alternativeTheme!.titleFontFamily) {
        aux.alternativeTheme.titleFontFamily =
          this.finalConfiguration.alternativeTheme!.titleFontFamily;
      }

      if (this.finalConfiguration.alternativeTheme!.titleFontSize) {
        aux.alternativeTheme.titleFontSize =
          this.finalConfiguration.alternativeTheme!.titleFontSize;
      }

      if (this.propierties.alternativeThemeAlertError) {
        aux.alternativeTheme!.alertError = {};

        if (
          this.finalConfiguration.alternativeTheme!.alertError!.backgroundColor
        ) {
          aux.alternativeTheme!.alertError!.backgroundColor =
            this.finalConfiguration.alternativeTheme!.alertError!.backgroundColor;
        }

        if (this.finalConfiguration.alternativeTheme!.alertError!.borderColor) {
          aux.alternativeTheme!.alertError!.borderColor =
            this.finalConfiguration.alternativeTheme!.alertError!.borderColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertError!.closeIconColor
        ) {
          aux.alternativeTheme!.alertError!.closeIconColor =
            this.finalConfiguration.alternativeTheme!.alertError!.closeIconColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertError!.messageFontColor
        ) {
          aux.alternativeTheme!.alertError!.messageFontColor =
            this.finalConfiguration.alternativeTheme!.alertError!.messageFontColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertError!.timeBarColor
        ) {
          aux.alternativeTheme!.alertError!.timeBarColor =
            this.finalConfiguration.alternativeTheme!.alertError!.timeBarColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertError!.titleFontColor
        ) {
          aux.alternativeTheme!.alertError!.titleFontColor =
            this.finalConfiguration.alternativeTheme!.alertError!.titleFontColor;
        }
      }

      if (this.propierties.alternativeThemeAlertInformation) {
        aux.alternativeTheme!.alertInformation = {};

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .backgroundColor
        ) {
          aux.alternativeTheme!.alertInformation!.backgroundColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.backgroundColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .borderColor
        ) {
          aux.alternativeTheme!.alertInformation!.borderColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.borderColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .closeIconColor
        ) {
          aux.alternativeTheme!.alertInformation!.closeIconColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.closeIconColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .messageFontColor
        ) {
          aux.alternativeTheme!.alertInformation!.messageFontColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.messageFontColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .timeBarColor
        ) {
          aux.alternativeTheme!.alertInformation!.timeBarColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.timeBarColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertInformation!
            .titleFontColor
        ) {
          aux.alternativeTheme!.alertInformation!.titleFontColor =
            this.finalConfiguration.alternativeTheme!.alertInformation!.titleFontColor;
        }
      }

      if (this.propierties.alternativeThemeAlertSuccess) {
        aux.alternativeTheme!.alertSuccess = {};

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!
            .backgroundColor
        ) {
          aux.alternativeTheme!.alertSuccess!.backgroundColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.backgroundColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!.borderColor
        ) {
          aux.alternativeTheme!.alertSuccess!.borderColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.borderColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!.closeIconColor
        ) {
          aux.alternativeTheme!.alertSuccess!.closeIconColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.closeIconColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!
            .messageFontColor
        ) {
          aux.alternativeTheme!.alertSuccess!.messageFontColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.messageFontColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!.timeBarColor
        ) {
          aux.alternativeTheme!.alertSuccess!.timeBarColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.timeBarColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertSuccess!.titleFontColor
        ) {
          aux.alternativeTheme!.alertSuccess!.titleFontColor =
            this.finalConfiguration.alternativeTheme!.alertSuccess!.titleFontColor;
        }
      }

      if (this.propierties.alternativeThemeAlertWarning) {
        aux.alternativeTheme!.alertWarning = {};

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!
            .backgroundColor
        ) {
          aux.alternativeTheme!.alertWarning!.backgroundColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.backgroundColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!.borderColor
        ) {
          aux.alternativeTheme!.alertWarning!.borderColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.borderColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!.closeIconColor
        ) {
          aux.alternativeTheme!.alertWarning!.closeIconColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.closeIconColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!
            .messageFontColor
        ) {
          aux.alternativeTheme!.alertWarning!.messageFontColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.messageFontColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!.timeBarColor
        ) {
          aux.alternativeTheme!.alertWarning!.timeBarColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.timeBarColor;
        }

        if (
          this.finalConfiguration.alternativeTheme!.alertWarning!.titleFontColor
        ) {
          aux.alternativeTheme!.alertWarning!.titleFontColor =
            this.finalConfiguration.alternativeTheme!.alertWarning!.titleFontColor;
        }
      }
    }
    // end alternativeTheme

    if (this.propierties.smallScreenConfig) {
      aux.smallScreenConfig = {};

      if (this.finalConfiguration.smallScreenConfig!.position) {
        aux.smallScreenConfig.position =
          this.finalConfiguration.smallScreenConfig!.position;
      }

      if (this.finalConfiguration.smallScreenConfig!.size) {
        aux.smallScreenConfig.size =
          this.finalConfiguration.smallScreenConfig!.size;
      }

      if (this.propierties.smallScreenConfigBorder) {
        aux.smallScreenConfig.border = {};

        if (this.finalConfiguration.smallScreenConfig!.border!.radius) {
          aux.smallScreenConfig!.border!.radius =
            this.finalConfiguration.smallScreenConfig!.border!.radius;
        }

        if (this.finalConfiguration.smallScreenConfig!.border!.size) {
          aux.smallScreenConfig!.border!.size =
            this.finalConfiguration.smallScreenConfig!.border!.size;
        }

        if (this.finalConfiguration.smallScreenConfig!.border!.type) {
          aux.smallScreenConfig!.border!.type =
            this.finalConfiguration.smallScreenConfig!.border!.type;
        }
      }

      if (this.finalConfiguration.smallScreenConfig!.fixed) {
        aux.smallScreenConfig.fixed =
          this.finalConfiguration.smallScreenConfig!.fixed;
      }

      if (this.finalConfiguration.smallScreenConfig!.messageFontFamily) {
        aux.smallScreenConfig.messageFontFamily =
          this.finalConfiguration.smallScreenConfig!.messageFontFamily;
      }

      if (this.finalConfiguration.smallScreenConfig!.messageFontSize) {
        aux.smallScreenConfig.messageFontSize =
          this.finalConfiguration.smallScreenConfig!.messageFontSize;
      }

      if (this.finalConfiguration.smallScreenConfig!.showCloseIcon) {
        aux.smallScreenConfig.showCloseIcon =
          this.finalConfiguration.smallScreenConfig!.showCloseIcon;
      }

      if (this.finalConfiguration.smallScreenConfig!.timed) {
        aux.smallScreenConfig.timed =
          this.finalConfiguration.smallScreenConfig!.timed;
      }

      if (this.finalConfiguration.smallScreenConfig!.timedOut) {
        aux.smallScreenConfig.timedOut =
          this.finalConfiguration.smallScreenConfig!.timedOut;
      }

      if (this.finalConfiguration.smallScreenConfig!.titleFontFamily) {
        aux.smallScreenConfig.titleFontFamily =
          this.finalConfiguration.smallScreenConfig!.titleFontFamily;
      }

      if (this.finalConfiguration.smallScreenConfig!.titleFontSize) {
        aux.smallScreenConfig.titleFontSize =
          this.finalConfiguration.smallScreenConfig!.titleFontSize;
      }

      if (this.propierties.smallScreenConfigAlertError) {
        aux.smallScreenConfig!.alertError = {};

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!.backgroundColor
        ) {
          aux.smallScreenConfig!.alertError!.backgroundColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.backgroundColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!.borderColor
        ) {
          aux.smallScreenConfig!.alertError!.borderColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.borderColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!.closeIconColor
        ) {
          aux.smallScreenConfig!.alertError!.closeIconColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.closeIconColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!
            .messageFontColor
        ) {
          aux.smallScreenConfig!.alertError!.messageFontColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.messageFontColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!.timeBarColor
        ) {
          aux.smallScreenConfig!.alertError!.timeBarColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.timeBarColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertError!.titleFontColor
        ) {
          aux.smallScreenConfig!.alertError!.titleFontColor =
            this.finalConfiguration.smallScreenConfig!.alertError!.titleFontColor;
        }
      }

      if (this.propierties.smallScreenConfigAlertInformation) {
        aux.smallScreenConfig!.alertInformation = {};

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .backgroundColor
        ) {
          aux.smallScreenConfig!.alertInformation!.backgroundColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.backgroundColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .borderColor
        ) {
          aux.smallScreenConfig!.alertInformation!.borderColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.borderColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .closeIconColor
        ) {
          aux.smallScreenConfig!.alertInformation!.closeIconColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.closeIconColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .messageFontColor
        ) {
          aux.smallScreenConfig!.alertInformation!.messageFontColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.messageFontColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .timeBarColor
        ) {
          aux.smallScreenConfig!.alertInformation!.timeBarColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.timeBarColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertInformation!
            .titleFontColor
        ) {
          aux.smallScreenConfig!.alertInformation!.titleFontColor =
            this.finalConfiguration.smallScreenConfig!.alertInformation!.titleFontColor;
        }
      }

      if (this.propierties.smallScreenConfigAlertSuccess) {
        aux.smallScreenConfig!.alertSuccess = {};

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!
            .backgroundColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.backgroundColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.backgroundColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!.borderColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.borderColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.borderColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!
            .closeIconColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.closeIconColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.closeIconColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!
            .messageFontColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.messageFontColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.messageFontColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!.timeBarColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.timeBarColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.timeBarColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertSuccess!
            .titleFontColor
        ) {
          aux.smallScreenConfig!.alertSuccess!.titleFontColor =
            this.finalConfiguration.smallScreenConfig!.alertSuccess!.titleFontColor;
        }
      }

      if (this.propierties.smallScreenConfigAlertWarning) {
        aux.smallScreenConfig!.alertWarning = {};

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!
            .backgroundColor
        ) {
          aux.smallScreenConfig!.alertWarning!.backgroundColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.backgroundColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!.borderColor
        ) {
          aux.smallScreenConfig!.alertWarning!.borderColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.borderColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!
            .closeIconColor
        ) {
          aux.smallScreenConfig!.alertWarning!.closeIconColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.closeIconColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!
            .messageFontColor
        ) {
          aux.smallScreenConfig!.alertWarning!.messageFontColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.messageFontColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!.timeBarColor
        ) {
          aux.smallScreenConfig!.alertWarning!.timeBarColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.timeBarColor;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alertWarning!
            .titleFontColor
        ) {
          aux.smallScreenConfig!.alertWarning!.titleFontColor =
            this.finalConfiguration.smallScreenConfig!.alertWarning!.titleFontColor;
        }
      }

      if (this.finalConfiguration.smallScreenConfig!.useAlternativeTheme) {
        aux.smallScreenConfig.useAlternativeTheme =
          this.finalConfiguration.smallScreenConfig!.useAlternativeTheme;
      }

      if (this.propierties.smallScreenConfigAlternativeTheme) {
        aux.smallScreenConfig!.alternativeTheme = {};

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!.position
        ) {
          aux.smallScreenConfig!.alternativeTheme.position =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.position;
        }

        if (this.finalConfiguration.smallScreenConfig!.alternativeTheme!.size) {
          aux.smallScreenConfig!.alternativeTheme.size =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.size;
        }

        if (this.propierties.smallScreenConfig!.alternativeTheme) {
          aux.smallScreenConfig!.alternativeTheme.border = {};

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!
              .radius
          ) {
            aux.smallScreenConfig!.alternativeTheme!.border!.radius =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!.radius;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!
              .size
          ) {
            aux.smallScreenConfig!.alternativeTheme!.border!.size =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!.size;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!
              .type
          ) {
            aux.smallScreenConfig!.alternativeTheme!.border!.type =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.border!.type;
          }
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!.fixed
        ) {
          aux.smallScreenConfig!.alternativeTheme.fixed =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.fixed;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!
            .messageFontFamily
        ) {
          aux.smallScreenConfig!.alternativeTheme.messageFontFamily =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.messageFontFamily;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!
            .messageFontSize
        ) {
          aux.smallScreenConfig!.alternativeTheme.messageFontSize =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.messageFontSize;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!
            .showCloseIcon
        ) {
          aux.smallScreenConfig!.alternativeTheme.showCloseIcon =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.showCloseIcon;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!.timed
        ) {
          aux.smallScreenConfig!.alternativeTheme.timed =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.timed;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!.timedOut
        ) {
          aux.smallScreenConfig!.alternativeTheme.timedOut =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.timedOut;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!
            .titleFontFamily
        ) {
          aux.smallScreenConfig!.alternativeTheme.titleFontFamily =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.titleFontFamily;
        }

        if (
          this.finalConfiguration.smallScreenConfig!.alternativeTheme!
            .titleFontSize
        ) {
          aux.smallScreenConfig!.alternativeTheme.titleFontSize =
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!.titleFontSize;
        }

        if (this.propierties.smallScreenConfigAlternativeThemeAlertError) {
          aux.smallScreenConfig!.alternativeTheme!.alertError = {};

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.backgroundColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.backgroundColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.backgroundColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.borderColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.borderColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.borderColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.closeIconColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.closeIconColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.closeIconColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.messageFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.messageFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.messageFontColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.timeBarColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.timeBarColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.timeBarColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertError!.titleFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertError!.titleFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertError!.titleFontColor;
          }
        }

        if (
          this.propierties.smallScreenConfigAlternativeThemeAlertInformation
        ) {
          aux.smallScreenConfig!.alternativeTheme!.alertInformation = {};

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.backgroundColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.backgroundColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertInformation!.backgroundColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.borderColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.borderColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertInformation!.borderColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.closeIconColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.closeIconColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertInformation!.closeIconColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.messageFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.messageFontColor =
              this.finalConfiguration.alternativeTheme!.alertInformation!.messageFontColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.timeBarColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.timeBarColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertInformation!.timeBarColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertInformation!.titleFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertInformation!.titleFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertInformation!.titleFontColor;
          }
        }

        if (this.propierties.smallScreenConfigAlternativeThemeAlertSuccess) {
          aux.smallScreenConfig!.alternativeTheme!.alertSuccess = {};

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.backgroundColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.backgroundColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.backgroundColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.borderColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.borderColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.borderColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.closeIconColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.closeIconColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.closeIconColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.messageFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.messageFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.messageFontColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.timeBarColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.timeBarColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.timeBarColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertSuccess!.titleFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertSuccess!.titleFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertSuccess!.titleFontColor;
          }
        }

        if (this.propierties.smallScreenConfigAlternativeThemeAlertWarning) {
          aux.smallScreenConfig!.alternativeTheme!.alertWarning = {};

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.backgroundColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.backgroundColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.backgroundColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.borderColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.borderColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.borderColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.closeIconColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.closeIconColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.closeIconColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.messageFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.messageFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.messageFontColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.timeBarColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.timeBarColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.timeBarColor;
          }

          if (
            this.finalConfiguration.smallScreenConfig!.alternativeTheme!
              .alertWarning!.titleFontColor
          ) {
            aux.smallScreenConfig!.alternativeTheme!.alertWarning!.titleFontColor =
              this.finalConfiguration.smallScreenConfig!.alternativeTheme!.alertWarning!.titleFontColor;
          }
        }
      }
      // end smallCScreenConfigAlternativeTheme
    }
    // end smallScreenConfig

    navigator.clipboard
      .writeText(JSON.stringify(aux, undefined, 2))
      .then()
      .catch((e) => console.log(e));

    this._ngxAlertMessage.success(`Configuration copied to clicpboard!`);
  }

  showColorPicker(id: string) {
    const colorPicker = document.querySelector<HTMLElement>(`#${id}`);

    colorPicker?.click();
  }
}
