import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

import View from "./View"

class UploadEventView extends View {
	_parentElement = document.querySelector(".upload")
	_message = "Recipe was successfully uploaded :)"

	_window = document.querySelector(".add-recipe-window")
	_overlay = document.querySelector(".overlay")
	_btnOpen = document.querySelector(".nav__btn--add-recipe")
	_btnClose = document.querySelector(".btn--close-modal")

	constructor() {
		super()
		this._addHandlerShowWindow()
		this._addHandlerCloseWindow()
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

	showToast(flag) {
		const node = document.createElement("div")
		node.classList.add("progress-bar")
		node.classList.add("fadeOut")
		node.innerHTML = `
			<div class="toast">
				<div class="toast-content">
					<i class="fas fa-solid fa-${flag ? "check" : "xmark"} check"></i>

					<div class="toast-message">
						<span class="toast-text toast-text-1">${flag ? "Success" : "Fail"}</span>
						<span class="toast-text toast-text-2"
							>${flag ? "Your event has been posted😊" : "Please use another host name☹️"}
						</span>
					</div>
				</div>

				<div class="progress"></div>
			</div>
		`

		Toastify({
			node: node,
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "top", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: "progress fadeOut",
			style: {
				background: "#fff",
				fontSize: "16px",
				fontWeight: 400,
				opacity: 0.95,
				borderRadius: "20px",
				color: "#666666",
			},
			onClick: () => {},
		}).showToast()
	}

	_generateMarkup = function () {}
}

export default new UploadEventView()
