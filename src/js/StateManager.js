export default class StateManager {
  constructor() {
    this._inputTitle = document.querySelector(".title");
    this._inputURL = document.querySelector(".image_link");
    this._buttonAdd = document.querySelector(".button_add");
    this._gallery = document.querySelector(".gallery");
    this._error = document.querySelector(".error-message");
    this._modal = document.querySelector(".modal");
    this._modalCloseBtn = document.querySelector(".close_btn");
    this._modalPicture = document.querySelector(".modal_image");
    this._fileContainer = document.querySelector(".dnd-form");
    this._fileInput = document.querySelector(".overlapped");
    this._listPicture = [];
  }
}
