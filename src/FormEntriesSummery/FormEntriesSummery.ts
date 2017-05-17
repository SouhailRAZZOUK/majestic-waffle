(function() {

  class FormEntriesSummery {
    private _element: HTMLElement;
    private _entries: Array<MajesticWaffle.UI.FormEntry>;
    private _callbacks: any;
    private _repeater: WinJS.UI.Repeater;
    private _summeryElement: HTMLElement;

    constructor(element: HTMLElement, options?: any) {
      let self = this;

      this._element = element;
      this._entries = options.entries || [];
      this._callbacks = options.callbacks || [];

      WinJS.UI.Fragments.render("FormEntriesSummery/FormEntriesSummery.html", this._element).done(function () {
        self._summeryElement = <HTMLElement>self._element.querySelector("#summery-repeater");
        WinJS.UI.process(self._summeryElement).then(function () {
          self._repeater = self._summeryElement.winControl;
        }).done(function () {
          self.updateData();
        });
      });
    }

    public set entries(entries: Array<MajesticWaffle.UI.FormEntry>) {
      this._entries = entries;
      this.updateData();
    }

    public set callbacks(callbacks: Array<MajesticWaffle.UI.FormEntry>) {
      this._callbacks = callbacks;
      this.updateData();
    }

    public updateData() {
      let self = this;
      this._repeater.data = new WinJS.Binding.List(self._entries.map((v: MajesticWaffle.UI.FormEntry): any => {
        WinJS.Utilities.markSupportedForProcessing(self._callbacks[v.name]);
        return { key: v, callback: self._callbacks[v.name] };
      }));
    }
  }

  WinJS.Namespace.define("MajesticWaffle.UI", { FormEntriesSummery: FormEntriesSummery });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.FormEntriesSummery);
