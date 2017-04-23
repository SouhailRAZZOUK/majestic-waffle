class LoadingRing {
  private _element: HTMLElement;

  constructor(element: HTMLElement, options?: any) {
    let self = this;
    this._element = element;

    WinJS.UI.Fragments.render("/controls/LoadingRing/LoadingRing.html", this._element).done(function () {
      if (options.showOnRender) return self.show();
      self.hide();
    });
  }

  public show(): WinJS.IPromise<any> {
    return WinJS.UI.Animation.fadeIn(this._element);
  }

  public hide(): WinJS.IPromise<any> {
    return WinJS.UI.Animation.fadeOut(this._element);
  }
}

WinJS.Namespace.define("NightlyTrex.UI", { LoadingRing: LoadingRing });
WinJS.Utilities.markSupportedForProcessing(NightlyTrex.UI.LoadingRing);