import StateManager from "./StateManager";
import Picture from "./Picture";

export default class PictureManager {
  constructor() {
    this.state = new StateManager();
    this.state._buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();
      this.addPicture();
    });

    this.state._inputURL.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addPicture();
    });

    this.state._modalCloseBtn.addEventListener("click", () =>
      this.closeModal(),
    );
    this.state._modal.addEventListener("click", () => this.closeModal());

    this.state._fileContainer.addEventListener("click", (e) => {
      this.state._fileInput.dispatchEvent(new MouseEvent("click"));
    })

    this.state._fileInput.addEventListener("change", (e) => {
      e.preventDefault();
      
      const file = this.state._fileInput.files && this.state._fileInput.files[0];

      if (!file) return;

      const url = URL.createObjectURL(file);

      this.addImageInputAndDnD("name", url)
    })

    this.state._fileContainer.addEventListener("dragover", (e) => e.preventDefault());

    this.state._fileContainer.addEventListener("drop", (e) => {
      e.preventDefault();

      const file = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0]);
      
      this.addImageInputAndDnD("name", file)
    })
  }

  addImageInputAndDnD(name, file) {
    this.createGalleryItem(name, file);
    this.addPictureToList(name, file);
  }

  urlValidator(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }

  async addPicture() {
    const title = this.state._inputTitle.value.trim();
    const url = this.state._inputURL.value.trim();

    try {
      await this.urlValidator(url);
      this.createGalleryItem(title, url);
      this.addPictureToList(title, url);
      this.clearInput();
    } catch {
      this.showError("По данному URL, нет изображения");
    }
  }

  createGalleryItem(title, url) {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = url;
    img.alt = title;
    img.addEventListener("click", () => this.openModal(url));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      galleryItem.remove();
    });

    galleryItem.insertAdjacentElement("beforeend", img);
    galleryItem.insertAdjacentElement("beforeend", deleteButton);
    this.state._gallery.insertAdjacentElement("afterbegin", galleryItem);
  }

  addPictureToList(name = "name", url) {
    const picture = new Picture(name, url);
    this.state._listPicture.push(picture);
  }

  showError(message) {
    this.state._error.textContent = message;
    this.state._error.style.display = "block";
  }

  clearInput() {
    this.state._inputTitle.value = "";
    this.state._inputURL.value = "";
    this.state._error.style.display = "none";
  }

  openModal(url) {
    this.state._modalPicture.setAttribute("src", url);
    this.state._modal.style.display = "flex";
  }

  closeModal() {
    this.state._modalPicture.src = "";
    this.state._modal.style.display = "none";
  }
}
