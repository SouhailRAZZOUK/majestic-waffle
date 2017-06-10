(function() {

  class FormInput {
    private _type: string;
    private _dataOptions: any;
    private _name: string;
    private _label: HTMLElement;
    private _hint: HTMLElement;
    private _element: any;
    private _required: boolean;
    private _isConfirm: boolean;
    private _value: any;
    public onchange: Function;

    constructor(type: string, options?: any) {
      this._type = type;
      this._dataOptions = options["dataOptions"] || {};
      this._name = options["name"];
      this._required = options["required"];
      this._isConfirm = options["isConfirm"];
      if (!this._isConfirm) {
        this._label = this.generateLabel(this._name);
      }
      this._hint = this.generateHint(options["hint"]);
      this._element = this.generateElement(this._type);
      this._wireupEvents();
    }

    public get label(): HTMLElement {
      return this._label;
    }

    public get hint(): HTMLElement {
      return this._hint;
    }

    public get element(): HTMLElement {
      return this._element;
    }

    public get value(): string {
      return this._value;
    }
    public generateLabel(labelText: string): HTMLLabelElement {
      let labelElement = document.createElement("label");
      WinJS.Utilities.addClass(labelElement, "win-type-base");
      labelElement.innerText = MajesticWaffle.Utilities.capitalize(MajesticWaffle.Utilities.prettify(labelText));
      return labelElement;
    }

    public generateHint(hintText: string): HTMLLabelElement {
      let hintElement = document.createElement("label");
      WinJS.Utilities.addClass(hintElement, "form-hint");
      hintElement.innerText = hintText;
      hintElement.setAttribute("for", this._name);
      return hintElement;
    }

    public generateElement(inputType: any): any {
      let self = this;
      let element: HTMLElement;
      let control: any;
      let cases = [
        {
          case: ["text", "password", "email", "file"],
          callback: (): void => {
            element = document.createElement("input");
            WinJS.Utilities.addClass(element, "win-textbox");
            element.setAttribute("id", this._name);
            element.setAttribute("type", inputType);
            (this._required) ? element.setAttribute("required", "true") : null;
          }
        },
        {
          case: "select",
          callback: (): void => {
            if (this._isConfirm) return; // Can not be confirmed
            element = document.createElement("select");
            element.setAttribute("id", this._name);
            WinJS.Utilities.addClass(element, "win-dropdown");
          }
        },
        {
          case: "MajesticWaffle.UI.FormDropDown",
          callback: (): void => {
            if (this._isConfirm) return; // Can not be confirmed
            element = document.createElement("div");
            control = new MajesticWaffle.UI.FormDropDown(element, self._dataOptions);
          }
        },
        {
          case: "WinJS.UI.DatePicker",
          callback: (): void => {
            if (this._isConfirm) return; // Can not be confirmed
            element = document.createElement("div");
            control = new WinJS.UI.DatePicker(element, self._dataOptions);
          }
        },
        {
          case: "WinJS.UI.TimePicker",
          callback: (): void => {
            if (this._isConfirm) return; // Can not be confirmed
            element = document.createElement("div");
            control = new WinJS.UI.TimePicker(element, self._dataOptions);
          }
        },
        {
          case: "MajesticWaffle.UI.FilePicker",
          callback: (): void => {
            if (this._isConfirm) return; // Can not be confirmed
            element = document.createElement("div");
            control = new MajesticWaffle.UI.FilePicker(element, self._dataOptions);
          }
        }
      ];

      MajesticWaffle.Utilities.switchcase(inputType, cases);

      return element;

    }

    private _wireupEvents(): void {
      let self = this;
      let cases = [
        {
          case: ["WinJS.UI.DatePicker", "WinJS.UI.TimePicker"],
          callback: (machedCase: string) => {
            let format =  (machedCase === "WinJS.UI.DatePicker") ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment(self._element.winControl.current).utc().format(format);
          }
        },
        {
          case: "MajesticWaffle.UI.FormDropDown",
          callback: () => self._element.winControl.value
        },
        {
          case: "default",
          callback: () => (<HTMLInputElement>self._element).value
        }
      ];
      const onchange = () => {
        self._value = MajesticWaffle.Utilities.switchcase(self._type, cases);
        self.onchange();
      };

      (this._element.winControl) ? this._element.winControl.onchange = onchange : this._element.onchange = onchange;
    }

  }

  WinJS.Namespace.define("MajesticWaffle.UI", { FormInput: FormInput });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.FormInput);
