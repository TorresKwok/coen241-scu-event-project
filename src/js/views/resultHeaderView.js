import View from "./View"

import icons from "url:../../img/icons.svg"

class ResultHeaderView extends View {
	_parentElement = document.querySelector(".result-header")
	_date = new Date()

	constructor() {
		super()
		this._generateDateTag()
	}

	_generateMarkup = function () {}

	_generateDateTag = function () {
		const dateTag = this._parentElement.querySelector(".result-header-date")
		dateTag.innerText = this._date.toLocaleDateString("en-us", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	updateDate = function (newDate = this._date) {
		this._date = newDate
		this._generateDateTag()
	}

	addHandlerDateChange = function (handler) {
		this._parentElement.addEventListener("click", function (e) {
			handler(this._date)
		})
	}
}

export default new ResultHeaderView()
