let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //modal container here
  // let modalContainer = document.querySelector(".modal-container");

  function showModal(pokemon) {
    // let modal = document.createElement("div");
    // modal.classList.add("modal");
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "Close";
    // closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = "Pokemon name" + ": " + pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Pokemon height" + ": " + pokemon.height;

    let myImage = document.createElement("img");
    myImage.src = pokemon.imageUrl;
    modalBody.appendChild(myImage);

    modalTitle.appendChild(closeButtonElement);
    modalBody.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    // modalContainer.appendChild(modal);
    // modalContainer.classList.add("is-visible");
  }

  // let dialogPromiseReject;

  //   function hideModal() {
  //     let modal = document.querySelector(".modal");
  //     modal.remove();

  //     if (dialogPromiseReject) {
  //         dialogPromiseReject();
  //         dialogPromiseReject = null;
  //     }
  // }

  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideModal();
  //   }
  // });

  // modalContainer.addEventListener("click", (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

  function addListItem(pokemon) {
    let element = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    element.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
    listItem.classList.add("list-group-item");
    button.classList.remove("button-class");
    button.classList.add("btn btn-outline-info");
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            imageUrl: item.myImage,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    getAll: function () {
      return pokemonList;
    },
    add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
