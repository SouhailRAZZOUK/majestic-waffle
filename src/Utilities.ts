(function () {

  let underage: Number;
  underage = moment().subtract(18, "years").utc();

  const generateUUID = (): string => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now();
    }
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  const capitalize = (str: string): string =>
    (typeof str === "string") ? str[0].toUpperCase() + str.slice(1) : str;

  const prettify = (str: any) => {
    if (validate.isNumber(str)) {
      // If there are more than 2 decimals round it to two
      if ((str * 100) % 1 === 0) {
        return "" + str;
      } else {
        return parseFloat(Math.round(str * 100) / 100).toFixed(2);
      }
    }

    if (validate.isArray(str)) {
      return str.map(function (s: any) { return MajesticWaffle.Utilities.prettify(s); }).join(", ");
    }

    if (validate.isObject(str)) {
      return str.toString();
    }

    // Ensure the string is actually a string
    str = "" + str;

    return str
      // Splits keys separated by periods
      .replace(/([^\s])\.([^\s])/g, "$1 $2")
      // Removes backslashes
      .replace(/\\+/g, "")
      // Replaces - and - with space
      .replace(/[_-]/g, " ")
      // Splits camel cased words
      .replace(/([a-z])([A-Z])/g, function (m0: any, m1: any, m2: any) {
        return "" + m1 + " " + m2.toLowerCase();
      })
      .toLowerCase();
  };

  const exists = (item: any, collection: Array<any>): boolean =>
    collection.find((value) => value === item) !== undefined;

  const validateEntries = (entries: Array<MajesticWaffle.UI.FormEntry>): Array<any> => {
    let errors = new Array();
    for (let entry of entries) {
      let validation = [];
      validation = entry.validator.validateInput();
      errors.push(validation);
    }
    return errors;
  };

  const containsError = (errors: Array<any>): boolean => {
    return errors.some((value) => value !== undefined);
  };

  const switchcaseMapMaker = (cases: Array<MajesticWaffle.Utilities.ISwitchCase>): Map<any, any> =>
    new Map<any, any>(<[{}, {}][]>cases.map((v) => [v.case, v.callback]));

  const getCaseCallback = (key: any, cases: Map<any, any>): Function => {
    let c;
    for (let k of cases.keys())
      c = (k instanceof Array) && exists(key, k) ? cases.get(k) :
        (k === key) ? cases.get(k) :
          (cases.get("default") && c === undefined) ? cases.get("default")
            : c;

    return c;
  };

  const switchcase = (key: any, cases: any): any => {
    let casesMap = switchcaseMapMaker(cases);
    let callback = getCaseCallback(key, casesMap);
    return (callback instanceof Function) ? callback(key) : callback;
  };



  WinJS.Namespace.define("MajesticWaffle", {
    UI: {
      controlsPath: "/bower_components/majestic-waffle"
    },
    Utilities: {
      generateUUID: generateUUID,
      underage: underage,
      exists: exists,
      capitalize: capitalize,
      prettify: prettify,
      validateEntries: validateEntries,
      containsError: containsError,
      switchcase: switchcase
    }
  });

})();
