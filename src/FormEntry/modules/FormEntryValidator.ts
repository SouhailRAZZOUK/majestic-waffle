// Copied this code as a HACK, untill fixing the typing problem of ValidateJS
declare interface ValidateJS {
  (attributes: any, constraints: any, options?: any): any;
  async(attributes: any, constraints: any, options?: any): Promise<any>;
  single(value: any, constraints: any, options?: any): any;
}
declare let validate: ValidateJS;
// End HACK

declare interface IFormEntryValidation extends Object {
  async: boolean;
  checkPoint: string;
}

class FormEntryValidator {
  private _entry: NightlyTrex.UI.FormEntry;
  private _constraints: any;
  private _validation: Object;
  private _errors: Array<string>;
  private _confirmErrors: Array<string>;

  constructor(entry: NightlyTrex.UI.FormEntry, validation: IFormEntryValidation, constraints: Object, checkpoint?: string) {
    this._entry = entry;
    this._constraints = constraints;
    this._validation = validation;
    this._wireupEvents();
  }

  public generateValidationsMessagesElement(): HTMLElement {
    let validationMessages = document.createElement("div");
    WinJS.Utilities.addClass(validationMessages, "validation-messages");
    this._entry.element.appendChild(validationMessages);
    return validationMessages;
  }

  public validateInput(): Array<string> {
    let errors = new Array;
    errors = validate.single(this._entry.value, this._constraints);
    this._errors = errors;
    if (this._errors) return this._errors;
  }

  public validateAsyncInput(): Promise<any> {
    return validate.async(this._entry.value, this._constraints);
  }

  public resetValidationMessages(): void {
    WinJS.Utilities.removeClass(this._entry.input.element, "has-error");
    WinJS.Utilities.empty(this._entry.validationMessages);
  }

  public showValidationMessages(errors: Array<string>): void {
    WinJS.Utilities.addClass(this._entry.input.element, "has-error");
    for (let error of errors) {
      let errorElement = document.createElement("p");
      WinJS.Utilities.addClass(errorElement, "error-message");
      error = (this._constraints.date) ? error : `${this._entry.name} ${error}`;
      errorElement.innerText = NightlyTrex.Utilities.capitalize(error);
      this._entry.validationMessages.appendChild(errorElement);
    }
  }

  public updateValidationMessages(): void {
    this.resetValidationMessages();
    if (this._errors) {
      this.showValidationMessages(this._errors);
    }
  }

  private validateConfirm(): Array<string> {
    let confirmConstraints = { confirm: { presence: true, equality: { attribute: "input" } } };
    let confirmErrors = validate({ input: this._entry.value, confirm: this._entry.confirm.value }, confirmConstraints);
    this._confirmErrors = (confirmErrors) ? confirmErrors.confirm : null;
    return this._confirmErrors;
  }

  private resetConfirmValidationMessages(): void {
    WinJS.Utilities.removeClass(this._entry.confirm.element, "has-error");
    WinJS.Utilities.empty(this._entry.confirmValidationMessages);
  }

  private showConfirmValidationMessages(errors: Array<string>): void {
    WinJS.Utilities.addClass(this._entry.confirm.element, "has-error");
    for (let error of errors) {
      let errorElement = document.createElement("p");
      WinJS.Utilities.addClass(errorElement, "error-message");
      errorElement.innerText = NightlyTrex.Utilities.capitalize(error);
      this._entry.confirmValidationMessages.appendChild(errorElement);
    }
  }

  public updateConfirmValidationMessages(): void {
    this.resetConfirmValidationMessages();
    if (this._confirmErrors) {
      this.showConfirmValidationMessages(this._confirmErrors);
    }
  }

  private _wireupEvents(): void {
    let self = this;
    this._entry.addEventListener("changed", function () {
      self.validateInput();
      self.updateValidationMessages();
    });
    if (this._entry.confirm) {
      this._entry.addEventListener("confirmchanged", function () {
        self.validateConfirm();
        self.updateConfirmValidationMessages();
      });
    }
  }
}

WinJS.Namespace.define("NightlyTrex.UI", { FormEntryValidator: FormEntryValidator });
WinJS.Utilities.markSupportedForProcessing(NightlyTrex.UI.FormEntryValidator);
