import View from "./View"

import icons from "url:../../img/icons.svg"

class CalendarView extends View {
	_parentElement = document.querySelector(".calendar-container")
	_prevNextIcon = document.querySelectorAll(".icons span")
	_date = new Date()
	_today = new Date()
	_nowYear = this._today.getFullYear()
	_nowMonth = this._today.getMonth()
	_nowDate = this._today.getDate()
	_curYear = this._date.getFullYear()
	_curMonth = this._date.getMonth()
	_curDate = this._date.getDate()
	_monthArr = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]

	constructor() {
		super()
		this.render("Calendar rendered")
		this._parentElement.addEventListener(
			"click",
			this._clickIcon.bind(this),
		)
	}

	updateDate = function (newDate = Date.parse(this._date)) {
		this._date = new Date(newDate)
		this.render("update date")
	}

	addHandlerDateChange = function (handler) {
		this._parentElement.addEventListener("click", e => {
			const dayTag = e.target.closest(".day")
			if (!dayTag || dayTag.classList.contains("inactive")) return

			if (this._curDate === dayTag.textContent) {
				this._curDate = new Date().getDate()
				this.render("click again")
			} else {
				this._curDate = dayTag.textContent
				this._date = new Date(
					this._curYear,
					this._curMonth,
					this._curDate,
				)
				this.render("render again")
			}

			handler(this._date)
		})
	}

	_generateMarkup = function () {
		const firstDateOfMonth = new Date(
			this._curYear,
			this._curMonth,
			1,
		).getDay() // Getting first day of month

		const lastDateOfMonth = new Date(
			this._curYear,
			this._curMonth + 1,
			0,
		).getDate() // Getting last date of Month

		const lastDayOfMonth = new Date(
			this._curYear,
			this._curMonth + 1,
			0,
		).getDay() // Getting last day of Month

		const lastDateOfLastMonth = new Date(
			this._curYear,
			this._curMonth,
			0,
		).getDate() // Getting last date of last Month

		let liTag = ""

		for (let i = firstDateOfMonth; i > 0; i--) {
			liTag += `<li class="day inactive">${
				lastDateOfLastMonth - i + 1
			}</li>`
		}

		for (let i = 1; i <= lastDateOfMonth; i++) {
			const isClick =
				this._data !== "click again" &&
				i === this._date.getDate() &&
				this._curMonth === this._date.getMonth() &&
				this._curYear === this._date.getFullYear()

			const isToday =
				i === this._today.getDate() &&
				this._curMonth === this._today.getMonth() &&
				this._curYear === this._today.getFullYear()

			if (isToday) {
				liTag += `<li class="active day">${i}</li>`
			} else
				liTag += `<li class="${
					isClick ? "click day" : "day"
				}">${i}</li>`
		}

		for (let i = lastDayOfMonth; i < 6; i++) {
			liTag += `<li class="day inactive">${i - lastDayOfMonth + 1}</li>`
		}

		return `
			<div class="wrapper">
				<header>
					<p class="current-date">${this._monthArr[this._curMonth]} ${this._curYear}</p>
					<div class="icons">
						<span id="prev" class="icon material-symbols-rounded"
							>chevron_left</span
						>
						<span id="next" class="icon material-symbols-rounded"
							>chevron_right</span
						>
					</div>
				</header>
				<div class="calendar">
					<ul class="weeks">
						<li>Sun</li>
						<li>Mon</li>
						<li>Tue</li>
						<li>Wed</li>
						<li>Thu</li>
						<li>Fri</li>
						<li>Sat</li>
					</ul>
					<ul class="days">${liTag}</ul>
				</div>
			</div>
		`
	}

	// Event handler
	addHandlerClickIcon = function (handler) {
		this._parentElement.addEventListener("click", handler)
	}

	_clickIcon = function (e) {
		const icon = e.target.closest(".icon")
		if (!icon) return

		this._curMonth =
			icon.id === "prev" ? this._curMonth - 1 : this._curMonth + 1
		if (this._curMonth === -1) {
			this._curMonth = 11
			this._curYear -= 1
		}
		if (this._curMonth === 12) {
			this._curMonth = 0
			this._curYear += 1
		}
		this.render("Render again")
	}
}

export default new CalendarView()
