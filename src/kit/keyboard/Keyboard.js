export default class Keyboard {
	// map = {
	//     37: "left arrow",
	//     38: "up arrow",
	//     39: "right arrow",
	//     40: "down arrow",
	//     87: "w",
	//     83: "s",
	//     65: "a",
	//     68: "d"
	// };

	constructor() {
		this.subscribers = {};
		this.keysPressed = [];

		document.addEventListener('keydown', this.onKeyDown.bind(this), false);
		document.addEventListener('keyup', this.onKeyUp.bind(this), false);

		// deny access to context menu
		document.oncontextmenu = function () {
			return false;
		};
	}

	/**
     * @param {string} keyCode
     * @param {Function} callback
     */
	subscribe(keyCode, callback) {
		if (!this.subscribers[keyCode]) {
			this.subscribers[keyCode] = [callback];
		} else {
			this.subscribers[keyCode].push(callback);
		}
	}

	onKeyDown(event) {
		const keyPressed = event.keyCode;

		if (!this.keysPressed[keyPressed] && this.subscribers[keyPressed]) {
			this.subscribers[keyPressed].forEach(callback => callback(event));
		}

		this.keysPressed[keyPressed] = 'pressed';
	}

	onKeyUp(event) {
		this.keysPressed[event.keyCode] = '';
	}
}
