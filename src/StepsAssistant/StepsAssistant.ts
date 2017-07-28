(function () {

  interface IStepsAssistantOptions extends Object {
    onready: Function;
    onsubmit: Function;
    oncancel: Function;
  }

  class StepsAssistant {
    private _element: HTMLElement;
    private _steps: Array<MajesticWaffle.UI.Step>;
    private _progressElement: HTMLElement;
    private _currentStep: MajesticWaffle.UI.Step;
    private _nextCommand: HTMLElement;
    private _finalCommands: Array<HTMLElement>;
    private _eventsHandlers: Array<Object>;
    private _disposed: Boolean;
    private _events: Array<string>;
    public onready: Function = new Function;
    public onsubmit: Function = new Function;
    public oncancel: Function = new Function;

    constructor(element: HTMLElement, options?: IStepsAssistantOptions) {
      let self = this;
      let commandsContainer = document.createElement("div");

      this._element = element;
      this._element.style.display = "none";
      this._nextCommand = document.createElement("button");
      this._events = new Array;
      this._finalCommands = this.createFinalCommands();
      this.onready = options["onready"];
      this.onsubmit = options["onsubmit"];
      this.oncancel = options["oncancel"];

      this._nextCommand.innerText = "Next";
      WinJS.Utilities.addClass(this._nextCommand, "win-button win-button-primary stepsassistant-nextcommand");
      this._element.appendChild(this._nextCommand);

      WinJS.Utilities.addClass(this._element, "stepsassistant-element");
      WinJS.Utilities.addClass(commandsContainer, "stepsassistant-commands");
      this._finalCommands.forEach(command => commandsContainer.appendChild(command));
      this._element.appendChild(commandsContainer);

      this.generateSteps();

      this._wireupEvents();

      WinJS.UI.Fragments.render(MajesticWaffle.UI.controlsPath + "/StepsAssistant/StepsAssistant.html", this._element)
        .then(() => {
          self._progressElement = <HTMLElement>self._element.getElementsByClassName("progress")[0];
          WinJS.UI.process(self._progressElement);
        })
        .done(() => {
          self._element.style.display = "block";
          self._nextCommand.style.display = "inline-block";
          self._currentStep = self._steps[0];
          self.goToStep(0);
          self.dispatchEvent("ready");
        });
    }

    public dispose(): void {
      if (this._disposed) {
        return;
      }

      this._disposed = true;

      for (let step of this._steps) {
        step.dispose();
      }

      this._steps = null;
      this._events.forEach((event: string) => self.removeEventListener(event));
    }

    public addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
      this._element.addEventListener(name, listener, useCapture);
      this._events.push(name);
    }

    public removeEventListener(name: string): void {
      this._element.removeEventListener(name);
      this._events = this._events.filter(ev => ev === name);
    }

    public dispatchEvent(name: string) {
      this._element.dispatchEvent(new Event(name));
    }

    public get element(): HTMLElement {
      return this._element;
    }

    public generateSteps(stepsElements?: Array<HTMLElement>): void {
      let elements = stepsElements || Array.from(WinJS.Utilities.query(".step", this._element));
      this._steps = elements.map((elem: HTMLElement) => new MajesticWaffle.UI.Step(elem, {}));
    }

    public createFinalCommands(): Array<HTMLElement> {
      let submitButton = document.createElement("button");
      let cancelButton = document.createElement("button");

      submitButton.innerText = "OK";
      cancelButton.innerText = "Cancel";

      WinJS.Utilities.addClass(submitButton, "win-button win-button-primary");
      WinJS.Utilities.addClass(cancelButton, "win-button");

      return [submitButton, cancelButton];
    }

    private _wireupEvents(): void {
      let self = this;

      this._nextCommand.addEventListener("click", function () {
        self.nextStep();
      });

      this._finalCommands[0].addEventListener("click", function () {
        self.submit().done(() => {
          self._progressElement.winControl.hide();
          for (let command of self._finalCommands) command.removeAttribute("disabled");
        });
      });

      this._finalCommands[1].addEventListener("click", function () {
        self.oncancel();
      });

      this.addEventListener("endreached", function () {
        self.updateCommands();
      });

      this.addEventListener("ready", function () {
        if (self.onready) {
          self.onready();
        }
      });

    }

    public goToStep(index: number) {
      let self = this;
      let promises = new Array();
      this._steps.forEach(function (step) {
        if (step.status === "shown") {
          promises.push(step.hide());
        }
      });

      if (index === this._steps.length - 1) {
        this.dispatchEvent("endreached");
      }

      this._currentStep = this._steps[index];

      return (promises.length > 0) ? WinJS.Promise.thenEach(promises, function () {
        self._currentStep.show();
        self.updateCommands();
      }) : this._currentStep.show();
    }

    public nextStep(): void {
      let self = this;
      let current = this._currentStep;
      let index = this._steps.findIndex(s => s === current);
      let next = index + 1;

      if (next < this._steps.length) {
        this._nextCommand.setAttribute("disabled", "true");
        this.goToStep(next).done(function () {
          self._nextCommand.removeAttribute("disabled");
        });
      }
    }

    public updateCommands(): void {
      let self = this;
      let current = this._steps.findIndex(s => s === self._currentStep);
      let isLast = current === this._steps.length - 1;
      if (isLast) {
        this._finalCommands.forEach(function (command) { command.style.display = "block"; });
        this._nextCommand.style.display = "none";
      } else {
        this._finalCommands.forEach(function (command) { command.style.display = "none"; });
        this._nextCommand.style.display = "block";
      }
    }

    public submit(): WinJS.Promise<any> {
      let self = this;
      for (let command of this._finalCommands) command.setAttribute("disabled", "true");
      this._progressElement.winControl.show();

      const enableCommands = () => {
        for (let command of self._finalCommands) command.removeAttribute("disabled");
        self._progressElement.winControl.hide();
      };

      return new WinJS.Promise((complete, error) => {
        self.onsubmit();
        if (complete) {
          complete();
        }
      }, enableCommands);
    }

  }

  WinJS.Namespace.define("MajesticWaffle.UI", { StepsAssistant: StepsAssistant });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.StepsAssistant);
