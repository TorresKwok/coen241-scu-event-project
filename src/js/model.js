import { API_URL, API_KEY, RES_PER_PAGE, URL } from "./config"
import { getJSON, sendJSON } from "./helper"

const cors = require("cors")

export const state = {
	event: {},
	filter: {},
	search: {
		query: "",
		result: [],
		page: 1,
		resultPerPage: RES_PER_PAGE,
	},
}

// export const loadSearchResult = async function (query) {
// 	try {
// 		const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`)
// 		state.search.query = query
// 		state.search.page = 1
// 		state.search.result = data.data.recipes.map(recipe => {
// 			return {
// 				id: recipe.id,
// 				title: recipe.title,
// 				image_url: recipe.image_url,
// 				publisher: recipe.publisher,
// 			}
// 		})
// 	} catch (err) {
// 		throw err
// 	}
// }

export const loadSCUSearchResult = async function (query) {
	try {
		state.search.query = query
		state.search.page = 1
		state.search.result = state.event.map(e => {
			return {
				id: e.eventId,
				title: e.eventName,
				image_url: e.image,
				publisher: e.publisher,
			}
		})
	} catch (err) {
		throw err
	}
}

export const loadEvent = async function (id) {
	try {
		const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`)
		state.event = data.data.recipe
		// if (state.bookmarks.some(bookmark => bookmark.id === id)) {
		// 	state.recipe.bookmarked = true
		// } else {
		// 	state.recipe.bookmarked = false
		// }
	} catch (err) {
		throw err
	}
}

export const loadSCUEventById = async function (id) {
	try {
		const data = await getJSON(`${URL}/events/${id}`)
		state.event = data
		// if (state.bookmarks.some(bookmark => bookmark.id === id)) {
		// 	state.recipe.bookmarked = true
		// } else {
		// 	state.recipe.bookmarked = false
		// }
	} catch (err) {
		throw err
	}
}

export const loadSCUEvents = async function () {
	try {
		const data = await getJSON(`${URL}/events/`)
		state.event = data
	} catch (err) {
		throw err
	}
}

export const loadSCUUser = async function () {
	try {
		const data = await getJSON(`${URL}/users/`)
		// state.event = data.data.recipe
	} catch (err) {
		throw err
	}
}

export const getSearchResultPage = function (page = state.search.page) {
	state.search.page = page
	const start = (page - 1) * state.search.resultPerPage
	const end = page * state.search.resultPerPage
	return state.search.result.slice(start, end)
}

export const uploadEvent = async function (inputEvent) {
	try {
		const event = {
			eventName: inputEvent.eventName,
			publisher: inputEvent.hostName,
			image: inputEvent.image,
			description: inputEvent.description,
			location: inputEvent.location,
			createDate: new Date(),
			eventDate: inputEvent.date,
			startTime: inputEvent.startTime,
			endTime: inputEvent.endTime,
			valid: 1,
			url: "https://www.scu.edu/events/",
		}
		const res = await sendJSON(`${URL}/events/add`, event)
		console.log(res)
		// state.event = data.data.recipe
		// addBookmark(state.recipe)
	} catch (err) {
		throw err
	}
}
