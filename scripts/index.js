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

editProfileButton.addEventListener("click", function () {
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;

  editProfile.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfile.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
  newPost.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPost.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  editProfile.classList.remove("modal_is-opened");
}

profileFormElement.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostImage.value);
  console.log(newPostCaption.value);
  newPost.classList.remove("modal_is-opened");
}

newPostFormElement.addEventListener("submit", handleNewPostSubmit);
