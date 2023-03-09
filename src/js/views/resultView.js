import View from "./View"

import icons from "url:../../img/icons.svg"

class ResultView extends View {
	_parentElement = document.querySelector(".card-container")

	render = function (data) {
		if (!data) return this._renderError()

		this._data = data
		let markup = this._generateMarkup()

		if (!markup) {
			markup = `
				<div class="message">
					<div>
						<svg>
							<use
								href="${icons}#icon-smile"
							></use>
						</svg>
					</div>
					<p>
						No SCU event found. Try to modify your filters. Have fun!
					</p>
				</div>
			`
		}

		this.clear()
		this._parentElement.insertAdjacentHTML("afterbegin", markup)
	}

	_generateMarkup = function () {
		return this._data
			.map(result => this._generateSingleMarkup(result))
			.join("")
	}

	_generateSingleMarkup = function (result) {
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
