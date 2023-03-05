import * as model from "./model"
import calendarView from "./views/calendarView"
import resultView from "./views/resultView"
import eventView from "./views/eventView"
import paginationView from "./views/paginationView"
import resultHeaderView from "./views/resultHeaderView"
import uploadEventView from "./views/uploadEventView"
import { MODAL_CLOSE_SEC } from "./config"

const recipeContainer = document.querySelector(".recipe")

const controlEvent = async function () {
	try {
		const id = window.location.hash.slice(1)
		if (!id) return

		// Update result view to mark selected search result
		// resultView.update(model.getSearchResultPage())
		// bookmarkView.update(model.state.bookmarks)

		// Render spinner
		eventView.renderSpinner()

		// Loading recipe
		await model.loadSCUEventById(id)

		// Rendering recipe
		eventView.render(model.state.event)
	} catch (err) {
		console.error(err)
		eventView.renderError(err)
	}
}

const controlCalendarIcon = function () {}

const controlSearchResult = async function () {
	try {
		resultView.renderSpinner()

		// Get Search Query
		const query = "pizza"
		if (!query) return

		await model.loadSCUEvents()

		// Load Search Result
		await model.loadSCUSearchResult(query)

		// Render Results
		resultView.render(model.getSearchResultPage())

		// Render initial pagination buttons
		paginationView.render(model.state.search)
	} catch (err) {
		throw err
	}
}

const controlPagination = function (goToPage) {
	model.state.search.page = goToPage

	// Load NEW Results
	resultView.render(model.getSearchResultPage(goToPage))

	// Render NEW pagination buttons
	paginationView.render(model.state.search)
}

const controlEmpthHash = function () {
	window.addEventListener("hashchange", function () {
		const hash = window.location.hash
		if (!hash) location.reload()
	})
}

const controlCalDateChange = function (newDate) {}

const controlHeaderDateChange = function (newDate) {
	resultHeaderView.updateDate(newDate)
}

const init = async function () {
	// Publish-Subscriber Pattern (Subscriber)
	calendarView.addHandlerClickIcon(controlCalendarIcon)
	calendarView.addHandlerDateChange(controlHeaderDateChange)
	resultHeaderView.addHandlerDateChange(controlCalDateChange)
	paginationView.addHandlerClick(controlPagination)
	eventView.addHandlerRender(controlEvent)
	controlSearchResult()
	controlEmpthHash()
}

init()
