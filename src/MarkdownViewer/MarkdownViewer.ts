(function() {

  class MarkdownViewer {
    private _element: HTMLElement;
    private _viewer: HTMLElement;
    private _HTMLContent: any;
    private _markdownContent: any;
    private _url: any;

    constructor(element: HTMLElement, options?: any) {
      let self = this;
      let fileXHR: any;
      this._element = element;
      this._url = options.url || "";
      this._markdownContent = options.markdown || "";

      WinJS.Utilities.addClass(this._element, "article-body");

      if (this._url) {
        fileXHR = WinJS.xhr({
          type: "GET",
          url: this._url,
          responseType: "text",
        });
      }

      WinJS.UI.Fragments.render("./MarkdownViewer/MarkdownViewer.html", this._element)
        .then(() => {
          self._viewer = WinJS.Utilities.query(".viewer", self._element)[0];
          return (fileXHR) ? fileXHR.then((result: any) => {
            self._markdownContent = result.response;
            self._HTMLContent = markdown.toHTML(self._markdownContent);
          }) : null;
        })
        .done(() => {
          self._viewer.innerHTML = self._HTMLContent || "";
          self.show();
        });
    }

    public setContent(md: any) {
      this._HTMLContent = markdown.toHTML(md);
      this._viewer.innerHTML = this._HTMLContent;
      this.show();
    }

    public show(): WinJS.IPromise<any> {
      return WinJS.UI.Animation.enterContent(this._element);
    }

    public hide(): WinJS.IPromise<any> {
      return WinJS.UI.Animation.exitContent(this._element);
    }
  }

  WinJS.Namespace.define("MajesticWaffle.UI", { MarkdownViewer: MarkdownViewer });

})();

WinJS.Utilities.markSupportedForProcessing(MajesticWaffle.UI.MarkdownViewer);
