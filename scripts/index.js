const editProfileButtion = document.querySelector(".profile__edit");
const editProfile = document.querySelector(".edit-profile-modal");
const editProfileCloseBtn = editProfile.querySelector(".modal__close-button");

const newPostButtion = document.querySelector(".profile__post");
const newPost = document.querySelector(".new-post-modal");
const newPostCloseBtn = newPost.querySelector(".modal__close-button");

editProfileButtion.addEventListener("click", function () {
  editProfile.classList.add("modal_is-open");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfile.classList.remove("modal_is-open");
});

newPostButtion.addEventListener("click", function () {
  newPost.classList.add("modal_is-open");
});

newPostCloseBtn.addEventListener("click", function () {
  newpost.classList.remove("modal_is-open");
});
