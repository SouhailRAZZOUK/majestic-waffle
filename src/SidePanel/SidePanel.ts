
namespace MajesticWaffle.UI {
  enum SidePanelSides {
    right = "right",
    left = "left"
  }
  let WinJSUI = <any>WinJS.UI;

  export class SidePanel {
    public primaryAction: Function;
    public secondaryAction: Function;
    private _element: HTMLElement;
    private _side: SidePanelSides;
    private _dismissable: any;
    private _commands: Array<HTMLButtonElement>;
    private _commandsEl: HTMLElement;
    private _contentEl: HTMLElement;
    private _persistant: boolean;

    constructor(element: HTMLElement, options: any) {
      let self = this;
      this._element = element;
      let content = element ? element.innerHTML : null;
      this._commands = [];
      this._persistant = options.persistant || false;
      if (!this._element) {
        this._element = document.createElement("div");
        document.body.appendChild(this._element);
      }
      this.primaryAction = options.primaryAction;
      this.secondaryAction = options.secondaryAction;
      console.log(options);
      WinJS.Utilities.empty(this._element);
      WinJS.UI.Fragments.render(MajesticWaffle.UI.controlsPath + "/SidePanel/SidePanel.html", this._element)
        .done(() => {
          self._element.winControl = self;
          WinJS.Utilities.addClass(this._element, "mw-sidepanel");
          self.side = options.side || "right";
          if (!self._persistant) {
            self._dismissable = new WinJSUI._LightDismissService.LightDismissableElement({
              element: this._element,
              // tabIndex: -1,
              onLightDismiss: () => {
                self.hide();
              },
              onTakeFocus: () => {
                self._dismissable.restoreFocus() || null;
              }
            });
          }
          self._contentEl = WinJS.Utilities.query(".mw-sidepanel__content-box", self._element)[0];
          self._commandsEl = WinJS.Utilities.query(".mw-sidepanel__commands", self._element)[0];
          self._generateCommands(options);
          self._wireUpEvents(options);
          self._contentEl.innerHTML = content;
          self._element.winControl = self;
        });
    }

    public set side(value: SidePanelSides) {
      this._side = value;
      for (let sideType of Object.keys(SidePanelSides)) {
        if (sideType !== value) {
          WinJS.Utilities.removeClass(this._element, `mw-sidepanel--${sideType}`);
        }
      }
      WinJS.Utilities.addClass(this._element, `mw-sidepanel--${value}`);
    }

    public show() {
      WinJS.Utilities.addClass(this._element, "mw-sidepanel--open");
      if (!this._persistant) {
        WinJSUI._LightDismissService.shown(this._dismissable);
      }
    }

    public hide() {
      WinJS.Utilities.removeClass(this._element, "mw-sidepanel--open");
      if (!this._persistant) {
        WinJSUI._LightDismissService.hidden(this._dismissable);
      }
    }


    private _generateCommands(options: any) {
      if (typeof options.commands === "boolean") {
        if (options.commands) {
          let primaryCommand = document.createElement("button");
          let secondaryCommand = document.createElement("button");
          primaryCommand.innerText = "OK";
          secondaryCommand.innerText = "Close";
          WinJS.Utilities.addClass(primaryCommand, "win-button win-button-primary");
          WinJS.Utilities.addClass(secondaryCommand, "win-button");
          this._commands.push(primaryCommand, secondaryCommand);
        } else {
          WinJS.Utilities.addClass(this._contentEl, "mw-sidepanel__content-box--full-height");
        }
      } else if (options.commands === "primary") {
        let primaryCommand = document.createElement("button");
        primaryCommand.innerText = "OK";
        WinJS.Utilities.addClass(primaryCommand, "win-button win-button-primary");
        this._commands.push(primaryCommand);
      } else {
        let primaryCommand = document.createElement("button");
        primaryCommand.innerText = "Close";
        WinJS.Utilities.addClass(primaryCommand, "win-button-primary");
        this._commands.push(primaryCommand);
      }

      this._commands.map((command) => this._commandsEl.appendChild(command));
    }

    private _wireUpEvents(options: any) {
      let self = this;
      if (typeof options.commands === "boolean") {
        if (options.commands) {
          this._commands[0].addEventListener("click", (event) => self.primaryAction ? self.primaryAction(event) : null);
          this._commands[1].addEventListener("click", (event) => {
            self.secondaryAction ? self.secondaryAction(event) : null;
            self.hide();
          });
        }
      } else if (options.commands === "primary") {
        this._commands[0].addEventListener("click", (event) => self.primaryAction ? self.primaryAction(event) : null);

      } else {
        this._commands[0].addEventListener("click", (event) => self.hide());
      }
    }

  }

}

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.SidePanel);
