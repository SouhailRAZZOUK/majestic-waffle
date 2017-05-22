(function() {

  class Link {

    private _element: HTMLElement;
    private _title: string;
    private _href: string;
    private _scenario: MajesticWaffle.Utilities.IScenario;

    constructor(element: HTMLElement, options?: any) {
      let self = this;
      this._element = element;
      this._title = options["title"];
      this._scenario = options["scenario"];
      this._href = element.getAttribute("href") || options["href"];

      if (this._title) {
        this._element.innerText = this._title;
      }

      // if there is a scenario object, href is not used
      if (this._scenario) {
        this._href = this._scenario.url;
      }

      this._element.addEventListener("click", function (event) {
        event.preventDefault();
        if (self._scenario) {
          return MajesticWaffle.Navigation.navigate(self._scenario);
        }
        WinJS.Navigation.navigate(self._href);
      });
    }

    get element(): HTMLElement {
      return this._element;
    }

    get href(): string {
      return this._href;
    }

    get scenario(): Object {
      return this._scenario;
    }

    dispose(): void {

    }

  }

  WinJS.Namespace.define("MajesticWaffle.UI", { Link: Link });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.Link);
