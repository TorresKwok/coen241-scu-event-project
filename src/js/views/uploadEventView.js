import View from "./View"

class UploadEventView extends View {
	_parentElement = document.querySelector(".upload")
	_message = "Recipe was successfully uploaded :)"

	_window = document.querySelector(".add-recipe-window")
	_overlay = document.querySelector(".overlay")
	_btnOpen = document.querySelector(".nav__btn--add-recipe")
	_btnClose = document.querySelector(".btn--close-modal")

	progressBar = document.querySelector(".progress-bar")
	toast = document.querySelector(".toast")
	closeIcon = document.querySelector(".toast-close")
	progress = document.querySelector(".progress")

	constructor() {
		super()
		this._addHandlerShowWindow()
		this._addHandlerCloseWindow()

		this.closeIcon.addEventListener("click", () => {
			this.toast.classList.remove("toast-active")

			setTimeout(() => {
				this.progress.classList.remove("toast-active")
			}, 300)
		})
	}

	_addHandlerShowWindow = function () {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this))
		this._overlay.addEventListener("click", this.toggleWindow.bind(this))
	}

	_addHandlerCloseWindow = function () {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this))
	}

	toggleWindow() {
		this._overlay.classList.toggle("hidden")
		this._window.classList.toggle("hidden")
	}

	addHandlerUpload(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault()
			const dataArr = [...new FormData(this)]
			const data = Object.fromEntries(dataArr)
			handler({
				...data,
				startTime: `${data.startTime}:00`,
				endTime: `${data.endTime}:00`,
			})
			this.reset()
		})
	}

	addProgressBar(flag) {
		const icon = this.toast.querySelector(".check")
		const title = this.toast.querySelector(".toast-text-1")
		const description = this.toast.querySelector(".toast-text-2")
		if (!flag) {
			icon.classList.remove("fa-check")
			icon.classList.add("fa-xmark")
			title.innerText = "Fail"
			description.innerText = "Please use another host name☹️"
		}

		if (flag) {
			icon.classList.remove("fa-xmark")
			icon.classList.add("fa-check")
			title.innerText = "Success"
			description.innerText = "Your event has been posted😊"
		}

		let timer1, timer2
		this.toast.classList.add("toast-active")
		this.progress.classList.add("toast-active")

		timer1 = setTimeout(() => {
			this.toast.classList.remove("toast-active")
		}, 3000) //1s = 1000 milliseconds

		timer2 = setTimeout(() => {
			this.progress.classList.remove("toast-active")
		}, 3300)

		// this.progressBar.remove()
	}

	_generateMarkup = function () {}
}

export default new UploadEventView()
