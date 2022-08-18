//c = console.log

//c('hola')

const $container = document.getElementById("container__courses"),
  fragmento = document.createDocumentFragment(),
  url = "https://larnu-dev-upy5mhs63a-rj.a.run.app/api/v1/categories";

let c = console.log;

function obtenercards() {
  fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((json) => {
      c(json);
      json.communityCategories.forEach((el) => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="card__img">
          <img class="card__img-background" src="${
            el.background ||
            "https://storage.googleapis.com/bucket-larnu/media/business/153/images/BO64E73I.png"
          }" alt="${el.name}">
          <img class="card__img-icon"  src="${el.icon}" alt="${el.name}">
        </div>
        <div class="card__paragraph">
          <h3 class="card__title">${el.name}</h3>
          <p class="card__texto">Total Quizzes: ${el.totalQuizzes}</p>
          <p class="card__texto">User: ${el.users}</p>
          <a href="https://larnu.app/" target="_blank"  class="btn btn-primary">Go to Larnu</a>
        </div>
        `;
        fragmento.appendChild(div);
      });
      $container.appendChild(fragmento);
    })
    .catch((err) => {
      let message = err.statusText || "Ocurrio un error";
      $container.innerHTML = `Error: ${err.status}: ${message}`;
      console.log(err);
    });
}

obtenercards();