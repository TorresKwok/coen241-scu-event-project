import { API_URL, API_KEY, RES_PER_PAGE } from "./config"
import { getJSON, sendJSON } from "./helper"

export const state = {
	event: {},
	search: {
		query: "",
		result: [],
		page: 1,
		resultPerPage: RES_PER_PAGE,
	},
}

export const loadSearchResult = async function (query) {
	try {
		const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`)
		state.search.query = query
		state.search.page = 1
		state.search.result = data.data.recipes.map(recipe => {
			return {
				id: recipe.id,
				title: recipe.title,
				image_url: recipe.image_url,
				publisher: recipe.publisher,
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

export const getSearchResultPage = function (page = state.search.page) {
	state.search.page = page
	const start = (page - 1) * state.search.resultPerPage
	const end = page * state.search.resultPerPage
	return state.search.result.slice(start, end)
}
