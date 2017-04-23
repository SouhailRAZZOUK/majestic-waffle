export default class BaseControl {
  public element: HTMLElement;
  protected templateUri: string;
  constructor(element: HTMLElement, templateUri: string) {
    this.element = element;
    this.templateUri = templateUri;
  }

  public render(templateUri?: string): WinJS.Promise<HTMLElement> {
    return WinJS.UI.Fragments.render(templateUri || this.templateUri, this.element);
  }
}