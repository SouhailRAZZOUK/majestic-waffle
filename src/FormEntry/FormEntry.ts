(function() {

  class FormEntry {
    private _element: HTMLElement;
    private _label: HTMLLabelElement;
    private _name: string;
    private _input: MajesticWaffle.UI.FormInput;
    private _type: string;
    private _hint: string;
    private _confirm: MajesticWaffle.UI.FormInput;
    private _validation: any;
    public validationMessages: HTMLElement;
    public confirmValidationMessages: HTMLElement;
    private _validator: MajesticWaffle.UI.FormEntryValidator;
    private _constraints: Object;
    private _value: string;

    constructor(element: HTMLElement, options: any) {
      let self = this;
      let noConfirmInputTypes = ["select", "WinJS.UI.DatePicker", "WinJS.UI.TimePicker", "MajesticWaffle.UI.FormDropDown"];
      this._element = element;
      this._name = options["name"];
      this._type = options["type"];
      this._hint = options["hint"];
      this._validation = options["validation"];
      this._element.setAttribute("id", `${options["name"]}-entry`);
      WinJS.UI.Fragments.render("./FormEntry/FormEntry.html", this._element).done(function () {
        self._input = new MajesticWaffle.UI.FormInput(self._type, {
          dataOptions: options["dataOptions"] || {},
          name: self._name,
          hint: self._hint,
          required: true,
          isConfirm: false
        });

        if (options["confirm"] && !MajesticWaffle.Utilities.exists(self._type, noConfirmInputTypes))
          self._confirm = new MajesticWaffle.UI.FormInput(self._type, {
            name: `confirm-${self._name}`,
            hint: `Re-enter the ${self._name}`,
            required: true,
            isConfirm: true
          });

        if (self._validation) {
          self._constraints = options["constraints"];
          self._validator = new MajesticWaffle.UI.FormEntryValidator(self, self._validation, self._constraints);
        }

        self._wireupEvents();
        self.display();
      });

    }

    public get element(): HTMLElement {
      return this._element;
    }

    public get input(): MajesticWaffle.UI.FormInput {
      return this._input;
    }

    public get name(): string {
      return this._name;
    }

    public get confirm(): MajesticWaffle.UI.FormInput {
      return this._confirm;
    }

    public get value(): string {
      return this._value;
    }

    public get validator(): MajesticWaffle.UI.FormEntryValidator {
      return this._validator;
    }

    public addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
      this._element.addEventListener(name, listener, useCapture);
    }

    public removeEventListener(name: string): void {
      this._element.removeEventListener(name);
    }

    public dispatchEvent(name: string) {
      this._element.dispatchEvent(new Event(name));
    }

    public displayInput() {
      this._element.appendChild(this._input.label);
      this._element.appendChild(this._input.hint);
      this._element.appendChild(this._input.element);
      if (this._validation) {
        this.validationMessages = this.generateValidationMessagesElement();
        this._element.appendChild(this.validationMessages);
      }
    }

    public displayConfirm() {
      this._element.appendChild(this._confirm.hint);
      this._element.appendChild(this._confirm.element);
      this.confirmValidationMessages = this.generateValidationMessagesElement();
      this._element.appendChild(this.confirmValidationMessages);
    }

    public display() {
      this.displayInput();
      if (this._confirm) {
        this.displayConfirm();
      }
    }

    public generateValidationMessagesElement(): HTMLElement {
      let validationMessagesElement: HTMLElement = document.createElement("div");
      WinJS.Utilities.addClass(validationMessagesElement, "validation-messages");
      return validationMessagesElement;
    }

    public _wireupEvents(): void {
      let self = this;
      this._input.onchange = function () {
        self._value = self._input.value;
        self.dispatchEvent("changed");
      };

      if (this._confirm) {
        this._confirm.onchange = function () {
          self.dispatchEvent("confirmchanged");
        };
      }

    }

  }

  WinJS.Namespace.define("MajesticWaffle.UI", { FormEntry: FormEntry });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.FormEntry);
