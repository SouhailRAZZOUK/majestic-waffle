/**
 * Alert is an Html control that displays a notification-styled closable alert box wherever declared
 * @param element HTML element to be converted to an alert
 * @param options Javascript object that contains the configuration of the Alert
 * @example var alert = new MajesticWaffle.UI.Alert(element, options);
 * @example <div data-win-control="MajesticWaffle.UI.Alert" data-win-options="{...}">
 */

interface IAlertOptions extends Object {
  title: string;
  text: string;
  isInline: boolean;
  type: string;
  duration: number;
}

class Alert {

  private _element: HTMLElement;
  private _title: string;
  private _text: string;
  private _type: string;
  private _isInline: boolean;
  private _duration: number;
  private _timer: number;
  public closeButton: HTMLElement;

  constructor(element: HTMLElement, options?: IAlertOptions) {
    let self = this;
    let textElement: HTMLElement = document.createElement("p");
    let typePrefix: string = "alert alert-";
    let stack: HTMLElement = document.getElementById("alerts-stack");

    WinJS.Utilities.addClass(textElement, "text");

    this._element = element;
    this._text = options["text"];
    this._title = options["title"];
    this._type = options["type"];
    this._isInline = options["isInline"];
    this._duration = options["duration"] === undefined ? 5000 : options["duration"];

    if (!this._element) {
      this._element = document.createElement("div");
    }

    this._element.style.display = "none";

    WinJS.Utilities.addClass(this._element, typePrefix + this._type);

    if (!this._isInline) {
      stack.appendChild(this._element);
    }

    WinJS.UI.Fragments.render("/controls/Alert/Alert.html", this._element).done(function () {
      let contentElement: HTMLElement = WinJS.Utilities.query(".content", self._element)[0];
      let closeSpan: HTMLElement = document.createElement("span");

      self.closeButton = WinJS.Utilities.query("button.close", self._element)[0];

      if (self._title) {
        let titleElement: HTMLElement = document.createElement("h3");
        WinJS.Utilities.addClass(titleElement, "win-h3");
        titleElement.innerText = self._title;
        contentElement.appendChild(titleElement);
      }

      closeSpan.innerText = WinJS.UI.AppBarIcon.cancel.toString();
      textElement.innerText = self._text;
      self.closeButton.appendChild(closeSpan);
      contentElement.appendChild(textElement);

      self._wireUpEvents();

      self.show();
    });
  }

  public show(): WinJS.IPromise<void> {
    let self = this;
    this._element.style.display = "block";
    if (this._duration > 0) {
      this._timer = setTimeout(function () {
        self.close();
      }, self._duration);
    }
    return WinJS.UI.Animation.fadeIn(this._element);
  }

  public hide(): WinJS.IPromise<void> {
    let self = this;
    return WinJS.UI.Animation.fadeOut(this._element).then(function () {
      self._element.style.display = "none";
    });
  }

  public close(): void {
    let self = this;
    let parentElement = this._element.parentElement;
    this.hide().done(function () {
      parentElement.removeChild(self._element);
      window.clearTimeout(self._timer);
    });
  }

  private _wireUpEvents(): void {
    let self = this;
    this.closeButton.addEventListener("click", function () {
      self.close();
    });
  }
}

WinJS.Namespace.define("MajesticWaffle.UI", { Alert: Alert });
WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.Alert);
