class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f6f442cc-a414-4c27-9271-835636579062",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

// export the class
