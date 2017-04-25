# Majestic Waffle

A set of controls and tools made for WinJS applications, it contains a lot of controls, that can be used in a declarative way or via code, the same way as of WinJS UI controls, and a set of tools that I find interesting, and helped me accomplish the tools

## Requirements

To use these controls you will have to install WinJS in your project, and all WinJS scripts have to be called before calling any control of Majestic Waffle.

Head over to WinJS Git Repo to get informations about how to use WinJS in your app [here]()

## Installation

| Provider | Command |
| -------- | ------- |
| npm | `$ npm i -S majestic-waffle` |
| bower | `$ bower install majestic-waffle` |
| yarn | `$ yarn add majestic-waffle` |
| clone/download via Git | `$ git clone https://github.com/SouhailRazzouk/majestic-waffle.git` |

## Usage

Inorder to include any needed control in your app, you have to follow these steps

1. Add a script tag where the `src` attribut points to the script of the desired control:

``` html
<script src="path/to/control.js"/>

example: (Alert control)

<script src="bower_components/majestic-waffle/dist/Alert/Alert.js"/>

```

2. Call the desired control in your app:

  - Declarative : 
  
  ```html

  <div id="myControl" data-win-control="MajesticWaffle.UI.[control_name]" data-win-options="{...}"></div>

  example: (Alert control)

  <div id="myAlert" data-win-control="MajesticWaffle.UI.Alert" data-win-options="{...}"></div>
  
  ```

  - Via code (Javascript)

  ```javascript
  
  let control = new MajesticWaffle.UI.[control_name](element, options);

  // example: (Alert control)

  let alertElement = document.getElementById('some-element-id');

  let alert = new MajesticWaffle.UI.Alert(alertElement, {...});

  ```

`element` is the HTML element where you want to display the control, and `options` is the initialization options object, you can get more details about `options` [here](dist/Alert/Alert.js)

> **Note:** _Some controls have more dependencies then their own script, you may need to include the `Utilities.js` or `Navigation.js` script or both of them._

## 