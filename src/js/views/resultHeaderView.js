import View from "./View"

import icons from "url:../../img/icons.svg"

class ResultHeaderView extends View {
	_parentElement = document.querySelector(".result-header")
	_date = new Date()

	constructor() {
		super()
		const dateTag = this._parentElement.querySelector(".result-header-date")
		dateTag.innerText = this._date.toLocaleDateString("en-us", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	_generateMarkup = function () {}
}

export default new ResultHeaderView()
