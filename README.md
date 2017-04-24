# Majestic Waffle

A set of controls and tools made for WinJS applications, it contains a lot of controls, that can be used in a declarative way or via code, the same way as of WinJS UI controls, and a set of tools that I find interesting, and helped me accomplish the tools

## Requirements

To use these controls you will have to install WinJS in your project, and all WinJS scripts have to be called before calling any control of Majestic Waffle.

Head over to WinJS Git Repo to get informations about how to use WinJS in your app here

## Installation

| Provider | Command |
| -------- | ------- |
| npm | `$ npm i -S majestic-waffle` |
| bower | `$ bower install majestic-waffle` |
| yarn | `$ yarn add majestic-waffle` |
| clone/download via Git | `$ git clone https://github.com/Souhail_Razzouk/majestic-waffle.git` |

## Usage

Inorder to include any needed control in your app, you have to follow these steps

1- Add a script tag where the `src` attribut points to the script of the desired control:

``` html
<script src="path/to/control.js"/>

example: (Alert control)

<script src="bower_components/majestic-waffle/dist/Alert/Alert.js"/>

```

2- If you want to use 