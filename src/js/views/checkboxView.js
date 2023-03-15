import View from "./View"

class CheckboxView extends View {
	_parentElement = document.querySelector(".checkboxs")
	_locations = [
		"SCDI Lobby",
		"Library",
		"SCU Church",
		"Lucas Hall",
		"Leavey Center",
	]
	_tags = ["Sports", "Art & Music", "Academic", "Party", "Theology", "Online"]
	_tagsArr = [...this._locations, ...this._tags]

	addHandlerTagClick = function (hanlder) {
		this._parentElement.addEventListener("click", e => {
			if (!e.target.classList.contains("checkboxClick")) return

			if (e.target.classList.contains("checkboxLocation")) {
				hanlder({
					type: "location",
					value: e.target.getAttribute("value"),
				})
			}

			if (e.target.classList.contains("checkboxTag")) {
				hanlder({ type: "tag", value: e.target.getAttribute("value") })
			}
			// hanlder(e.target.getAttribute("value"))
		})
	}

	_generateMarkup = function () {
		const locationHtml = this._locations
			.map((location, idx) =>
				this._generateSingleLocationMarkup(location, idx),
			)
			.join("")

		const tagHtml = this._tags
			.map((tag, idx) =>
				this._generateSingleTagMarkup(
					tag,
					idx + this._locations.length,
				),
			)
			.join("")

		return locationHtml + "<br />" + tagHtml
	}

	_generateSingleLocationMarkup = function (tag, idx) {
		return `
			<input class="checkbox" type="checkbox" id="box-${idx}" />
			<label class="checkbox checkboxClick checkboxLocation" for="box-${idx}" value="${tag}">
				${tag}
			</label>
		`
	}

	_generateSingleTagMarkup = function (tag, idx) {
		return `
			<input class="checkbox" type="checkbox" id="box-${idx}" />
			<label class="checkbox checkboxClick checkboxTag" for="box-${idx}" value="${tag}">
				${tag}
			</label>
		`
	}
}

export default new CheckboxView()
