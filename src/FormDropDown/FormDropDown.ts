(function(){

  class FormDropDown {
    private _element: HTMLElement;
    private _selectElement: HTMLSelectElement;
    private _dataSource: WinJS.Binding.List<any>;
    private _repeater: WinJS.UI.Repeater;
    private _value: string;
    private _selectedIndex: number;
    public onchange: Function;

    constructor(element: HTMLElement, options?: any) {
      let self = this;
      let data = options.data || [];
      this._element = element;
      this._dataSource = new WinJS.Binding.List(data);

      WinJS.Utilities.addClass(this._element, "form-dropdown");

      WinJS.UI.Fragments.render("FormDropDown/FormDropDown.html", this._element).done(function () {
        self._selectElement = self._element.querySelector("select");
        WinJS.Utilities.addClass(self._selectElement, "win-dropdown");
        WinJS.UI.process(self._selectElement).then(function () {
          self._repeater = self._selectElement.winControl;
        }).done(function () {
          self._repeater.data = self._dataSource;
        });
        self._wireupEvents();
      });

      this._element.winControl = this;
    }

    public get element(): HTMLElement {
      return this._element;
    }

    public get value(): string {
      return this._value;
    }

    public get selectedIndex(): number {
      return this._selectedIndex;
    }

    public getItem(index: number): any {
      return this._repeater.data.getAt(index);
    }

    public getItemByKey(key: any): any {
      let item = this._repeater.data.getItemFromKey(key);
      return { key: item.key, value: item.data };
    }

    public addItem(item: any): number {
      return this._repeater.data.push(item);
    }

    public removeItem(index: number): Array<any> {
      return this._repeater.data.splice(index, 1);
    }

    private _wireupEvents(): void {
      let self = this;
      this._selectElement.onchange = function () {
        self._value = self._selectElement.value;
        self._selectedIndex = self._selectElement.selectedIndex;
        self.onchange();
      };
    }

  }

  WinJS.Namespace.define("MajesticWaffle.UI", { FormDropDown: FormDropDown });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.FormDropDown);
