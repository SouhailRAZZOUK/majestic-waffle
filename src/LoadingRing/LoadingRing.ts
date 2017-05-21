(function() {

  class LoadingRing {
    private _element: HTMLElement;

    constructor(element: HTMLElement, options?: any) {
      let self = this;
      this._element = element;

      WinJS.UI.Fragments.render(MajesticWaffle.UI.controlsPath + "/LoadingRing/LoadingRing.html", this._element).done(function () {
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

  WinJS.Namespace.define("MajesticWaffle.UI", { LoadingRing: LoadingRing });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.LoadingRing);
