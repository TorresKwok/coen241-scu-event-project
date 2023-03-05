import View from "./View"

import icons from "url:../../img/icons.svg"

class ResultView extends View {
	_parentElement = document.querySelector(".card-container")

	_generateMarkup = function () {
		console.log(this._data)
		return this._data
			.map(result => this._generateSingleMarkup(result))
			.join("")
	}

	_generateSingleMarkup = function (result) {
		console.log(result)
		const id = window.location.hash.slice(1)

		return `
			<li class="preview">
				<a class="preview__link ${
					result.id === id ? "preview__link--active" : ""
				}" href="#${result.id}">
					<figure class="preview__fig">
						<img src="${result.image_url}" alt="Test" />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${result.title}</h4>
						<p class="preview__publisher">${result.publisher}</p>
					</div>
					<div class="preview__user-generated ${result.key ? "" : "hidden"}">
						<svg>
							<use href="${icons}#icon-user"></use>
						</svg>
					</div>
				</a>
			</li>
		`
	}
}

export default new ResultView()
