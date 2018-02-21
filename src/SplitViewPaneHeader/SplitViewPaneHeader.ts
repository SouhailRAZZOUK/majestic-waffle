namespace MajesticWaffle.UI {

  export class SplitViewPaneHeader {

    readonly element: HTMLElement;
    private _icon: any;
    private _title: string;
    private _logoArea: MajesticWaffle.UI.SplitViewPaneHeaderIconButton;

    constructor(element: HTMLElement, options?: any) {
      let self = this;

      this.element = element;
      this._title = options.title;

      WinJS.UI.Fragments.render(MajesticWaffle.UI.controlsPath + "/SplitViewPaneHeader/SplitViewPaneHeader.html", this.element)
        .done(function () {
          let titleElement = WinJS.Utilities.query(".splitview-pane-header__title-area-container__title", self.element)[0];
          let logoAreaElement = WinJS.Utilities.query(".splitview-pane-header__logo-area", self.element)[0];

          titleElement.innerText = self.title;
          self._logoArea = new MajesticWaffle.UI.SplitViewPaneHeaderIconButton(logoAreaElement, {});
          self._logoArea.url = options.homeUrl || "/";
          self._logoArea.icon = options.icon || "home";
        });
    }

    public get title(): string {
      return this._title;
    }

    public set title(value: string) {
      this._title = value;
    }

  }

}

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.SplitViewPaneHeader);
