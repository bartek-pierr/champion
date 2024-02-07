const toggleModalEl = document.querySelectorAll('[data-click="toggleModal"]');
const offModalEl = document.querySelector('[data-click="offModal"]');
const modal = document.querySelector("#modal");
const bindID = ["title", "description", "photo"];
const modalWrapper = document.querySelector(".modal__wrapper");
const modalNavbar = document.querySelector(".modal__navbar");
const modalContent = document.querySelector(".modal__content");
const btn = document.getElementById("menuToggle");
const nav = document.getElementById("nav_burger");

const bindModalData = (idOffers) => {
  if (!dataOffers[idOffers]) return false;
  let frontsArr = [];
  if (dataOffers[idOffers]["tags"] === "front") {
    Object.keys(dataOffers).forEach((key) => {
      if (dataOffers[key]["tags"] === "front") {
        frontsArr.push(dataOffers[key]);
      }
    });
  }

  modalContent.classList.remove("modal__content--navbar");

  renderNavbar(frontsArr);

  bindID.forEach((ID) => {
    const data = dataOffers[idOffers][ID];
    const element = modal.querySelector(`#modal_${ID}`);

    if (ID === "photo") {
      element.src = data;
      element.setAttribute("alt", dataOffers[idOffers]["title"]);
    } else {
      element.innerHTML = data;
    }
  });

  return true;
};

const renderNavbar = (frontsArr) => {
  if (frontsArr.length <= 0) return false;

  while (modalNavbar.firstChild) {
    modalNavbar.firstChild.remove();
  }

  modalContent.classList.add("modal__content--navbar");

  frontsArr.forEach((element) => {
    modalNavbar.insertAdjacentHTML(
      "beforeend",
      `<li data-click="toggleModal" data-offers-id="${element.key}">${element.title}</li>`
    );
  });

  modalNavbar.querySelectorAll("li").forEach((element) => {
    addEventToOpen(element);
  });
};

const scrollToTargetAdjusted = (id) => {
    var element = document.getElementById(id);
    var headerOffset = 65;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}

const addEventToOpen = (element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const idOffers = event.currentTarget.getAttribute("data-offers-id");

    if (bindModalData(idOffers)) {
      modal.classList.add("active");
      return true;
    }

    console.error("Błąd pobrania danych");
  });
};

if (modal) {
  offModalEl.addEventListener("click", (event) => {
    modal.classList.remove("active");
  });
}

if (modal) {
  modalWrapper.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      modal.classList.remove("active");
    }
  });
}


toggleModalEl.forEach((element) => {
  addEventToOpen(element);
});


btn.addEventListener('click', () =>{
    nav.classList.toggle('active');
    btn.classList.toggle('active');
})
