import { TIMEOUT_SEC } from "./config.js"

import { async } from "regenerator-runtime"

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(
				new Error(`Request took too long! Timeout after ${s} second`),
			)
		}, s * 1000)
	})
}

export const getJSON = async function (url) {
	try {
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
		const data = await res.json()

		if (!res.ok) throw new Error(`${data.message} (${res.status})`)
		return data
	} catch (err) {
		throw err
	}
}

export const sendUploadEventJSON = async function (url, obj) {
	try {
		const fetchPro = fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(obj),
		})

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
		return res
	} catch (err) {
		throw err
	}
}

export const sendFilterJSON = async function (url, obj) {
	try {
		const fetchPro = fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(obj),
		})

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
		const data = await res.json()
		return data
	} catch (err) {
		throw err
	}
}

export const parseDate = function (date) {
	// Get year, month, and day part from the date
	const year = date.toLocaleString("default", { year: "numeric" })
	const month = date.toLocaleString("default", { month: "2-digit" })
	const day = date.toLocaleString("default", { day: "2-digit" })

	// Generate yyyy-mm-dd date string
	const formattedDate = `${year}-${month}-${day}`
	return formattedDate
}
