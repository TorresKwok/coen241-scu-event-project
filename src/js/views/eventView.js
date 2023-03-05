import View from "./View"

import icons from "url:../../img/icons.svg"
import { Fraction } from "fractional"

class RecipeView extends View {
	_parentElement = document.querySelector(".recipe")
	_errorMessage = "We could not find that recipe, please try again!"
	_message = ""

	// Publisher-Subscriber Pattern (Publisher)
	addHandlerRender = function (handler) {
		;["hashchange", "load"].forEach(e =>
			window.addEventListener(e, handler),
		)
	}

	addHandlerUpdateServings = function (handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--update-servings")
			if (!btn) return
			const updateTo = Number(btn.dataset.updateTo)

			if (updateTo > 0) handler(updateTo)
		})
	}

	addHandlerAddBookmark = function (handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--bookmark")
			if (!btn) return
			handler()
		})
	}

	_generateMarkup = function () {
		console.log(this._data)
		return `
		<figure class="recipe__fig">
			<img src=${
				this._data.image_url
				// "https://res.cloudinary.com/scuwebdev/image/upload/v1634224593/scu-stem-building-courtyard-04_cglfdm.jpg"
			} alt="${this._data.title}" class="recipe__img" />
			<h1 class="recipe__title">
			<span>${this._data.eventName}</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="${icons}#icon-clock"></use>
				</svg>
			<span class="recipe__info-data recipe__info-data--minutes">${this._data.startTime.slice(
				0,
				-3,
			)} - ${this._data.endTime.slice(0, -3)} PST</span>
			</div>
			<div class="recipe__info">
			<svg class="recipe__info-icon">
				<use href="${icons}#icon-location"></use>
			</svg>
			<span class="recipe__info-data recipe__info-data--people">${
				this._data.location
			}</span>
		</div>
		<div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
			<svg>
				<use href="${icons}#icon-user"></use>
			</svg>
	  	</div>
			<button class="btn--round btn--bookmark">
			<svg class="">
				<use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
			</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<h2 class="heading--2">Event Infomation</h2>
			<p class="news__txt">
            	${this._data.description}
          	</p>
		</div>

		<div class="recipe__directions">
			<h2 class="heading--2">More about it</h2>
			<p class="recipe__directions-text">
			This event was hosted by
			<span class="recipe__publisher">${
				this._data.publisherId
			}</span>. For more information about this event, please check out
			directions at their website.
			</p>
			<a
			class="btn--small recipe__btn"
			href="${this._data.source_url}"
			target="_blank"
			>
			<span>Directions</span>
			<svg class="search__icon">
				<use href="${icons}#icon-arrow-right"></use>
			</svg>
			</a>
		</div>
		`
	}

	_generateMarkupIngredient = function (ing) {
		return `
		<li class="recipe__ingredient">
			<svg class="recipe__icon">
				<use href="${icons}#icon-check"></use>
			</svg>
			<div class="recipe__quantity">${
				ing.quantity ? new Fraction(ing.quantity).toString() : 0
			}</div>
			<div class="recipe__description">
				<span class="recipe__unit">${ing.unit}</span>
				${ing.description}
			</div>
		</li>
		`
	}
}

export default new RecipeView() // export an object
