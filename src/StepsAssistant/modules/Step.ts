interface IStepOptions extends Object {
  title: string;
  status: string;
  showAnimation: string;
  hideAnimation: string;
}

class Step {

  private _element: HTMLElement;
  private _title: string;
  private _status: string;
  private _entries: Array<HTMLElement>;
  private _showAnimation: string;
  private _hideAnimation: string;
  protected _disposed: boolean;

  constructor(element: HTMLElement, options?: IStepOptions) {
    this._element = element;
    this._title = options["title"];
    this._status = options["status"] || "hidden";
    this._entries = WinJS.Utilities.query("input, select", this._element) || new Array();
    this._showAnimation = options["showAnimation"] || "enterPage";
    this._hideAnimation = options["hideAnimation"] || "fadeOut";
    this._status = "hidden";

    if (this._title) {
      let title: HTMLElement = document.createElement("h2");
      WinJS.Utilities.addClass(title, "win-h2");
      title.innerText = this._title;
      this._element.appendChild(title);
    }

  }

  public get status(): string {
    return this._status;
  }

  public get element(): HTMLElement {
    return this._element;
  }

  public hide(): WinJS.Promise<any> {
    let self = this;
    this._status = "hidden";
    return WinJS.UI.Animation.fadeOut(this._element).then(() => self._element.style.display = "none");
  }

  public show(): WinJS.Promise<any> {
    let self = this;
    this._status = "shown";
    this._element.style.display = "block";
    return WinJS.UI.Animation.enterPage(this._element);
  }

  public dispose(): boolean {
    return this._disposed = true;
  }

}

WinJS.Namespace.define("MajesticWaffle.UI", { Step: Step });
WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.Step);
