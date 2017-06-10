/**
 * Main Namespace, for Majestic-Waffle, a set of controls and utilities made for WinJS Applications
 */

declare namespace MajesticWaffle {

  /**
   * UI's controls holding sub-namespace
   */

  namespace UI {

    /** 
     * Contains the folder where controls are existing.
     */

    let controlsPath: string;

    class Alert {
      private _element;
      private _title;
      private _text;
      private _type;
      private _isInline;
      private _duration;
      private _timer;
      closeButton: HTMLElement;
      constructor(element: HTMLElement, options?: any);
      show(): WinJS.IPromise<void>;
      hide(): WinJS.IPromise<void>;
      close(): void;
      private _wireUpEvents();
    }

    class Link {
      private _element;
      private _title;
      private _href;
      private _scenario;
      constructor(element: HTMLElement, options?: any);
      readonly element: HTMLElement;
      readonly href: string;
      readonly scenario: Object;
      dispose(): void;
    }

    class Step {
      private _element;
      private _title;
      private _status;
      private _entries;
      private _showAnimation;
      private _hideAnimation;
      constructor(element: HTMLElement, options?: Object);
      status: string;
      element: HTMLElement;
      hide(): WinJS.Promise<any>;
      show(): WinJS.Promise<any>;
      dispose(): void;
    }

    class StepsAssistant {
      private _element;
      private _steps;
      private _progressElement;
      private _currentStep;
      private _nextCommand;
      private _finalCommands;
      private _eventsHandlers;
      private _disposed;
      private _events;
      onready: Function;
      onsubmit: Function;
      oncancel: Function;
      constructor(element: HTMLElement, options?: any);
      dispose(): void;
      addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
      removeEventListener(name: string): void;
      dispatchEvent(name: string): void;
      readonly element: HTMLElement;
      generateSteps(stepsElements?: Array<HTMLElement>): void;
      createFinalCommands(): Array<HTMLElement>;
      private _wireupEvents();
      goToStep(index: number): any;
      nextStep(): void;
      updateCommands(): void;
      submit(): WinJS.Promise<any>;
    }

    class FlyingDots {
      private _element;
      constructor(element: HTMLElement, options?: any);
      show(): WinJS.IPromise<any>;
      hide(): WinJS.IPromise<any>;
    }

    class LoadingRing {
      private _element;
      constructor(element: HTMLElement, options?: any);
      show(): WinJS.IPromise<any>;
      hide(): WinJS.IPromise<any>;
    }

    class FormEntry {
      private _element;
      private _label;
      private _name;
      private _input;
      private _type;
      private _hint;
      private _confirm;
      private _validation;
      validationMessages: HTMLElement;
      confirmValidationMessages: HTMLElement;
      private _validator;
      private _constraints;
      private _value;
      constructor(element: HTMLElement, options?: any);
      readonly input: MajesticWaffle.UI.FormInput;
      readonly name: string;
      readonly confirm: MajesticWaffle.UI.FormInput;
      readonly value: string;
      readonly element: HTMLElement;
      readonly validator: MajesticWaffle.UI.FormEntryValidator;
      addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
      removeEventListener(name: string): void;
      dispatchEvent(name: string): void;
      displayInput(): void;
      displayConfirm(): void;
      display(): void;
      generateValidationMessagesElement(): HTMLElement;
      _wireupEvents(): void;
    }

    class FormDropDown {
      private _element;
      private _selectElement;
      private _dataSource;
      private _repeater;
      private _value;
      private _selectedIndex;
      onchange: Function;
      constructor(element: HTMLElement, options?: any);
      readonly element: HTMLElement;
      readonly value: string;
      readonly selectedIndex: number;
      getItem(index: number): any;
      getItemByKey(key: any): any;
      addItem(item: any): number;
      removeItem(index: number): Array<any>;
      private _wireupEvents();
    }

    class FormEntriesSummery {
      constructor(element: HTMLElement, options?: Object)
    }

    class FormInput {
      private _type;
      private _dataOptions;
      private _name;
      private _label;
      private _hint;
      private _element;
      private _required;
      private _isConfirm;
      private _value;
      onchange: Function;
      constructor(type: string, options?: any);
      readonly label: HTMLElement;
      readonly hint: HTMLElement;
      readonly element: HTMLElement;
      readonly value: string;
      generateLabel(labelText: string): HTMLLabelElement;
      generateHint(hintText: string): HTMLLabelElement;
      generateElement(inputType: any): any;
      private _wireupEvents();
    }

    class FormEntryValidator {
      private _entry;
      private _constraints;
      private _validation;
      private _errors;
      private _confirmErrors;
      constructor(entry: MajesticWaffle.UI.FormEntry, validation: any, constraints: any, checkpoint?: string);
      generateValidationsMessagesElement(): HTMLElement;
      validateInput(): Array<string>;
      validateAsyncInput(): Promise<any>;
      resetValidationMessages(): void;
      showValidationMessages(errors: Array<string>): void;
      updateValidationMessages(): void;
      private validateConfirm();
      private resetConfirmValidationMessages();
      private showConfirmValidationMessages(errors);
      updateConfirmValidationMessages(): void;
      private _wireupEvents();
    }

    class MarkdownViewer {
      private _element;
      private _viewer;
      private _HTMLContent;
      private _markdownContent;
      private _url;
      constructor(element: HTMLElement, options?: any);
      setContent(md: any): void;
      show(): WinJS.IPromise<any>;
      hide(): WinJS.IPromise<any>;
    }

    class FilePicker {
      private _element;
      private _fileInputElement;
      private _browseButtonElement;
      private _fileDropElement;
      private _files;
      constructor(element: HTMLElement, options?: any);
      addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
      removeEventListener(name: string): void;
      dispatchEvent(name: string): void;
      updateBrowseButtonText(): void;
      fileDropHandler(e: any): void;
      fileDragHover(e:Event): void;
      private _wireupEvents();
    }

  }


  /**
   * Navigation holding sub-namespace
   */

  namespace Navigation {

    let scenario: MajesticWaffle.Utilities.IScenario;
    let state: string;
    let location: string;
    function navigate(scenario: Object): WinJS.Promise<boolean>;

  }

  /**
   * Utilities holding sub-namespace
   */

  namespace Utilities {

    interface IScenario {
      title: string;
      url: string;
      state: any;
    }

    interface ISwitchCase {
      case: any;
      callback: (matchedCase?: any) => any;
    }


    let underage: number;
    function generateUUID(): string;
    function trexPatch(): void;
    function capitalize(str: string): string;
    function prettify(str: any): any;
    function switchcase(key: any, cases: Array<ISwitchCase>): any;
    function validateEntries(entries: Array<Element>): Array<any>;
    function containsError(errors: Array<any>): boolean;
    function exists(item: any, collection: Array<any>): boolean;
  }

}