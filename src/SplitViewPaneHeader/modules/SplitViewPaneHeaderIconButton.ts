namespace MajesticWaffle.UI {

  export class SplitViewPaneHeaderIconButton {
    public element: HTMLElement;
    private _icon: any;
    private _iconContainer: HTMLElement;
    private _backButton: HTMLElement;
    private _url: string;

    constructor(element: HTMLElement, options: any) {
      this.element = element;

      this._generateElements();
      this.element.appendChild(this._iconContainer);
      this.element.appendChild(this._backButton);

      this.showIcon();
      this._wireUpEvents();
    }

    private _generateElements() {
      this._iconContainer = document.createElement("a");
      WinJS.Utilities.addClass(this._iconContainer, "splitview-pane-header__logo-area__icon-container");
      (<HTMLLinkElement>this._iconContainer).href = "/";
      this._backButton = document.createElement("a");
      WinJS.Utilities.addClass(this._backButton, "splitview-pane-header__logo-area__navigation-button");
    }

    public showIcon() {
      // WinJS.UI.Animation.fadeOut(this._backButton);
      return WinJS.UI.Animation.exitPage(this._backButton)
        .then(() => {
          WinJS.Utilities.addClass(this._backButton, "hidden");
          WinJS.Utilities.removeClass(this._iconContainer, "hidden");
          return WinJS.UI.Animation.fadeIn(this._iconContainer);
        });
    }

    public showBackButton() {
      return WinJS.UI.Animation.fadeOut(this._iconContainer)
        .then(() => {
          // WinJS.UI.Animation.fadeIn(this._backButton);
          WinJS.Utilities.addClass(this._iconContainer, "hidden");
          WinJS.Utilities.removeClass(this._backButton, "hidden");
          return WinJS.UI.Animation.enterPage(this._backButton);
        });
    }

    public set icon(value: any) {
      let icon = WinJS.UI.AppBarIcon[value];
      if (icon) {
        this._icon = icon;
        this._iconContainer.textContent = icon;
      } else if (/url\S[\/\w+]\S/.test(value)) {
        this._iconContainer.style.backgroundImage = value;
      } else {
        WinJS.UI.Fragments.render(value, this._iconContainer);
      }
    }

    public set url(value: any) {
      (<HTMLLinkElement>this._iconContainer).href = value;
    }

    private _wireUpEvents() {
      let self = this;
      WinJS.Navigation.addEventListener("navigated", (event: any) => {
        let url = event.detail.location;
        let path = window.location.pathname;
        if (WinJS.Navigation.history.backStack.length === 0) {
          [...self._backButton.classList].some((className) => className === "hidden") ? null : self.showIcon();
        } else {
          [...self._iconContainer.classList].some((className) => className === "hidden") ? null : self.showBackButton();
        }
      });

      this._backButton.addEventListener("click", (event) => {
        WinJS.Navigation.back();
        event.preventDefault();
      });
    }
  }
}