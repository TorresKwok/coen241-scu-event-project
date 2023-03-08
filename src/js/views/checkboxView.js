import View from "./View"

class CheckboxView extends View {
	_parentElement = document.querySelector(".checkboxs")
	_locations = ["SCDI Lobby", "Library", "SCU Church", "Lucas Hall"]
	_tags = ["Sports", "Art & Music", "Academic", "Theology", "Online"]
	_tagsArr = [...this._locations, ...this._tags]

	addHandlerTagClick = function (hanlder) {
		this._parentElement.addEventListener("click", e => {
			if (!e.target.classList.contains("checkboxClick")) return

			hanlder(e.target.getAttribute("value"))
		})
	}

	_generateMarkup = function () {
		const locationHtml = this._locations
			.map((location, idx) => this._generateSingleMarkup(location, idx))
			.join("")

		const tagHtml = this._tags
			.map((tag, idx) =>
				this._generateSingleMarkup(tag, idx + this._locations.length),
			)
			.join("")

		return locationHtml + "<br />" + tagHtml
	}

	_generateSingleMarkup = function (tag, idx) {
		return `
			<input class="checkbox" type="checkbox" id="box-${idx}" />
			<label class="checkbox checkboxClick" for="box-${idx}" value="${tag}">
				${tag}
			</label>
		`
	}
}

export default new CheckboxView()
