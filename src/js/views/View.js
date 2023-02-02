import icons from "url:../../img/icons.svg"

export default class View {
	_data

	render = function (data) {
		if (!data) return this._renderError()

		this._data = data
		const markup = this._generateMarkup()

		this.clear()
		this._parentElement.insertAdjacentHTML("afterbegin", markup)
	}

	update = function (data) {}

	// Render Spinner
	renderSpinner = function () {
		const markup = `
		<div class="spinner">
			<svg>
				<use href="${icons}#icon-loader"></use>
			</svg>
		</div>
		`
		this.clear()
		this._parentElement.insertAdjacentHTML("afterbegin", markup)
	}

	renderMessage = function (msg = this._message) {}

	renderError = function (msg = this._errorMessage) {}

	clear = function () {
		this._parentElement.innerHTML = ""
	}
}
