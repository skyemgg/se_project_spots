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

const editProfileButton = document.querySelector(".profile__edit");
const editProfile = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfile.querySelector(".modal__close-button");
const profileFormElement = editProfile.querySelector(".modal__form");
const editNameInput = editProfile.querySelector("#name-input");
const editDescriptionInput = editProfile.querySelector("#description-input");

const newPostButton = document.querySelector(".profile__post");
const newPost = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPost.querySelector(".modal__close-button");
const newPostImage = newPost.querySelector("#image-link-input");
const newPostCaption = newPost.querySelector("#caption-input");
const newPostFormElement = newPost.querySelector(".modal__form");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const previewModal = document.querySelector("#modal_type_preview");
const previewModalClose = previewModal.querySelector(".modal__close-button");
const previewModalImage = previewModal.querySelector(".modal_image");
const previewModalTitle = previewModal.querySelector(".modal__preview-title");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.clonenode(true);
  const cardTitleL = cardElement.querySelector(".card__title");
  const cardImageL = cardElement.querySelector(".card__image");

  const cardLikeBtnL = cardElement.querySelector(".card__like-icon");
  cardLikeBtnL.addEventListener("click");
  cardLikeBtnL.classList.toggle(".card__like-icon_active");

  const cardDeleteBtnL = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnL.addEventListener("click");
  cardDeleteBtnL.closest(".card").remove();

  cardImageL.src = data.link;
  cardImageL.alt = data.name;
  cardTitleL.textContent = data.name;

  cardImageL.addEventListener("click");

  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewModalTitle.textContent = data.name;
  openModal(previewModal);
  // closeModal(previewModal);

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  openModal(editProfile);
  // editProfile.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  // editProfile.classList.remove("modal_is-opened");
  closeModal(editProfile);
});

newPostButton.addEventListener("click", function () {
  // newPost.classList.add("modal_is-opened");
  openModal(newPost);
});

newPostCloseBtn.addEventListener("click", function () {
  // newPost.classList.remove("modal_is-opened");
  closeModal(newPost);
});

previewModal.addEventListener("click", function () {
  closeModal(previewModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  // editProfile.classList.remove("modal_is-opened");
  closeModal(editProfile);
}

profileFormElement.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCaption.value.link,
    newPostImage,
    value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  // newPost.classList.remove("modal_is-opened");
  closeModal(newPost);
}

newPostFormElement.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
