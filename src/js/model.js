import { API_URL, API_KEY, RES_PER_PAGE, URL } from "./config"
import {
	getJSON,
	sendUploadEventJSON,
	sendFilterJSON,
	parseDate,
} from "./helper"

class Model {
	state = {
		event: {},
		filter: {
			event_date: [],
			tag: [],
			location: [],
		},
		search: {
			query: "",
			result: [],
			page: 1,
			resultPerPage: RES_PER_PAGE,
		},
	}

	loadSCUSearchResult = async function (query) {
		try {
			this.state.search.query = query
			this.state.search.page = 1
			this.state.search.result = this.state.event.map(e => {
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

	loadSCUSearchResult = async function (query) {
		try {
			this.state.search.query = query
			this.state.search.page = 1
			this.state.search.result = this.state.event.map(e => {
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

	loadEvent = async function (id) {
		try {
			const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`)
			this.state.event = data.data.recipe
			// if (state.bookmarks.some(bookmark => bookmark.id === id)) {
			// 	state.recipe.bookmarked = true
			// } else {
			// 	state.recipe.bookmarked = false
			// }
		} catch (err) {
			throw err
		}
	}

	loadSCUEventById = async function (id) {
		try {
			const data = await getJSON(`${URL}/events/${id}`)
			this.state.event = data
		} catch (err) {
			throw err
		}
	}

	loadSCUEvents = async function () {
		try {
			const data = await getJSON(`${URL}/events/`)
			this.state.event = data
		} catch (err) {
			throw err
		}
	}

	loadSCUUser = async function () {
		try {
			const data = await getJSON(`${URL}/users/`)
			// state.event = data.data.recipe
		} catch (err) {
			throw err
		}
	}

	getSearchResultPage = function (page = this.state.search.page) {
		this.state.search.page = page
		const start = (page - 1) * this.state.search.resultPerPage
		const end = page * this.state.search.resultPerPage
		return this.state.search.result.slice(start, end)
	}

	uploadEvent = async function (inputEvent) {
		try {
			const event = {
				eventName: inputEvent.eventName,
				publisher: inputEvent.hostName,
				image: inputEvent.image,
				description: inputEvent.description,
				location: inputEvent.location,
				eventDate: inputEvent.date,
				startTime: inputEvent.startTime,
				endTime: inputEvent.endTime,
				valid: 1,
				url: "https://www.scu.edu/events/",
				tag: inputEvent.tag,
			}
			const res = await sendUploadEventJSON(`${URL}/events/add`, event)
			return res.status === 200
		} catch (err) {
			throw err
		}
	}

	loadDateClick = async function (date) {
		const parsedDate = parseDate(date)
		if (parsedDate === this.state.filter.event_date[0]) {
			this.state.filter.event_date.pop()
		} else {
			this.state.filter.event_date[0] = parsedDate
		}
		await this.loadFilteredResult()
		return this.state.filter.event_date.length === 1
	}

	loadTagClick = async function (tagName) {
		const type = tagName.type
		if (type === "location") {
			const idx = this.state.filter.location.findIndex(
				tag => tag === tagName.value,
			)
			if (idx !== -1) {
				this.state.filter.location = this.state.filter.location.filter(
					tag => tag !== tagName.value,
				)
			} else {
				this.state.filter.location.push(tagName.value)
			}
		}

		if (type === "tag") {
			const idx = this.state.filter.tag.findIndex(
				tag => tag === tagName.value,
			)
			if (idx !== -1) {
				this.state.filter.tag = this.state.filter.tag.filter(
					tag => tag !== tagName.value,
				)
			} else {
				this.state.filter.tag.push(tagName.value)
			}
		}

		await this.loadFilteredResult()
	}

	loadFilteredResult = async function () {
		const data = await sendFilterJSON(
			`${URL}/events/searchEvents`,
			this.state.filter,
		)
		this.state.event = data
	}
}

export default new Model()

// export const state = {
// 	event: {},
// 	filter: {
// 		event_date: [],
// 		tag: [],
// 		location: [],
// 	},
// 	search: {
// 		query: "",
// 		result: [],
// 		page: 1,
// 		resultPerPage: RES_PER_PAGE,
// 	},
// }

// export const loadSCUSearchResult = async function (query) {
// 	try {
// 		state.search.query = query
// 		state.search.page = 1
// 		state.search.result = state.event.map(e => {
// 			return {
// 				id: e.eventId,
// 				title: e.eventName,
// 				image_url: e.image,
// 				publisher: e.publisher,
// 			}
// 		})
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const loadEvent = async function (id) {
// 	try {
// 		const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`)
// 		state.event = data.data.recipe
// 		// if (state.bookmarks.some(bookmark => bookmark.id === id)) {
// 		// 	state.recipe.bookmarked = true
// 		// } else {
// 		// 	state.recipe.bookmarked = false
// 		// }
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const loadSCUEventById = async function (id) {
// 	try {
// 		const data = await getJSON(`${URL}/events/${id}`)
// 		state.event = data
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const loadSCUEvents = async function () {
// 	try {
// 		const data = await getJSON(`${URL}/events/`)
// 		state.event = data
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const loadSCUUser = async function () {
// 	try {
// 		const data = await getJSON(`${URL}/users/`)
// 		// state.event = data.data.recipe
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const getSearchResultPage = function (page = state.search.page) {
// 	state.search.page = page
// 	const start = (page - 1) * state.search.resultPerPage
// 	const end = page * state.search.resultPerPage
// 	return state.search.result.slice(start, end)
// }

// export const uploadEvent = async function (inputEvent) {
// 	try {
// 		const event = {
// 			eventName: inputEvent.eventName,
// 			publisher: inputEvent.hostName,
// 			image: inputEvent.image,
// 			description: inputEvent.description,
// 			location: inputEvent.location,
// 			eventDate: inputEvent.date,
// 			startTime: inputEvent.startTime,
// 			endTime: inputEvent.endTime,
// 			valid: 1,
// 			url: "https://www.scu.edu/events/",
// 			tag: inputEvent.tag,
// 		}
// 		const res = await sendUploadEventJSON(`${URL}/events/add`, event)
// 		return res.status === 200
// 	} catch (err) {
// 		throw err
// 	}
// }

// export const loadDateClick = async function (date) {
// 	const parsedDate = parseDate(date)
// 	if (parsedDate === this.state.filter.event_date[0]) {
// 		this.state.filter.event_date.pop()
// 	} else {
// 		this.state.filter.event_date[0] = parsedDate
// 	}
// 	await this.loadFilteredResult()
// 	return this.state.filter.event_date.length === 1
// }

// export const loadTagClick = async function (tagName) {
// 	const type = tagName.type
// 	if (type === "location") {
// 		const idx = this.state.filter.location.findIndex(
// 			tag => tag === tagName.value,
// 		)
// 		if (idx !== -1) {
// 			this.state.filter.location = this.state.filter.location.filter(
// 				tag => tag !== tagName.value,
// 			)
// 		} else {
// 			this.state.filter.location.push(tagName.value)
// 		}
// 	}

// 	if (type === "tag") {
// 		const idx = this.state.filter.tag.findIndex(
// 			tag => tag === tagName.value,
// 		)
// 		if (idx !== -1) {
// 			this.state.filter.tag = this.state.filter.tag.filter(
// 				tag => tag !== tagName.value,
// 			)
// 		} else {
// 			this.state.filter.tag.push(tagName.value)
// 		}
// 	}

// 	await this.loadFilteredResult()
// }

// export const loadFilteredResult = async function () {
// 	const data = await sendFilterJSON(
// 		`${URL}/events/searchEvents`,
// 		this.state.filter,
// 	)
// 	state.event = data
// }
