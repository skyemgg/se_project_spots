import {
  enableValidation,
  config,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import "../pages/index.css";
//import "../../utils/helper.js";
import { renderLoading, handleSubmit } from "../../utils/helper.js";
import Api from "../../utils/Api.js";
import logoImg from "../images/Logo-min.jpg";
import avatarImg from "../images/avatar.jpg";
import penImg from "../images/pen.svg";
import postImg from "../images/post.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "63415261-ce45-47a6-b061-e9eb5a8e36aa",
    "Content-Type": "application/json",
  },
});

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

document.querySelector(".header__logo").src = logoImg;
document.querySelector(".profile__edit img").src = penImg;
document.querySelector(".profile__post img").src = postImg;

const editProfileButton = document.querySelector(".profile__edit");
const editProfile = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfile.querySelector(".modal__close-button");
const editProfileFormElement = editProfile.querySelector(".modal__form");

const editNameInput = editProfile.querySelector("#name-input");
const editDescriptionInput = editProfile.querySelector("#description-input");

const newPostButton = document.querySelector(".profile__post");
const newPost = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPost.querySelector(".modal__close-button");
const newPostImage = newPost.querySelector("#image-link-input");
const newPostCaption = newPost.querySelector("#caption-input");
const newPostFormElement = newPost.querySelector(".modal__form");
const newPostSubmitButton = newPost.querySelector(".modal__submit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__preview-title");

const profileAvatar = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileAvatar.src = userInfo.avatar;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    cards.forEach((card) => renderCard(card, "append"));
  })
  .catch(console.error);

let selectedCard, selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-icon");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));
  deleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id),
  );

  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalTitle.textContent = data.name;
    openModal(previewModal);
  });

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  return cardElement;
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-icon_active");

  api
    .changeLikeStatus(id, isLiked)
    .then((updatedCard) => {
      evt.target.classList.toggle("card__like-icon_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const deleteBtn = deleteForm.querySelector(".modal__button-delete");
  deleteBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteBtn.textContent = "Delete";
    });
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("click", handleOverlayClick);
}

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

editProfileButton.addEventListener("click", function () {
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  const inputList = [editNameInput, editDescriptionInput];
  resetValidation(editProfile, inputList, config);
  openModal(editProfile);
});

function handleEditProfileSubmit(evt) {
  function makeRequest() {
    return api
      .editUserInfo({
        name: editNameInput.value,
        about: editDescriptionInput.value,
      })
      .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editProfile);
      });
  }
  handleSubmit(makeRequest, evt);
}

editProfileFormElement.addEventListener("submit", handleEditProfileSubmit);

avatarModalBtn.addEventListener("click", () => openModal(avatarModal));

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return api.editAvatarInfo(avatarInput.value).then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

newPostButton.addEventListener("click", () => openModal(newPost));

function handleNewPostSubmit(evt) {
  function makeRequest() {
    return api
      .createCard({
        name: newPostCaption.value,
        link: newPostImage.value,
      })
      .then((newCard) => {
        renderCard(newCard);
        disableButton(newPostSubmitButton, config);
        closeModal(newPost);
      });
  }
  handleSubmit(makeRequest, evt);
}

newPostFormElement.addEventListener("submit", handleNewPostSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

const deleteCancelBtn = deleteModal.querySelector(".modal__button");
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

const previewCloseBtn = previewModal.querySelector(".modal__close-button");
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

enableValidation(config);
