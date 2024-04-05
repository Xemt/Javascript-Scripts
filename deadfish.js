/* Xemt, 7/28/22 - 4/5/24. */

"use strict";

/**
 * @description Quick and dirty version of prompt that works with Scriptable.
 * @param {?string} msg
 * @returns {any}
*/
function my_prompt(msg = null)
{
	/* We're using Scriptable, use Alert instead. */
	if ( typeof(_scriptable_run) == "function" ) {
		let alert = new Alert();
		let btn;

		alert.title = "Prompt";
		alert.message = msg;

		alert.addAction("OK");
		alert.addCancelAction("Cancel");

		btn = alert.present().then(undefined, (err) => { throw err; });

		if (btn == BTN_CANCEL) {
			return "";
		}

		return alert.textFieldValue(0);
	}
	
	return prompt(msg);
}

var input = my_prompt("Deadfish code?");
var acc = 0;
var i = 0;

while (i < input.length) {
	if (acc > 255 || acc < -1) {
		acc = 0;
	}

	switch (input.at[i]) {
		case "i":
			acc++;
		break;
		case "d":
			acc--;
		break;
		case "s":
			acc *= acc;
		break;
		case "o":
			console.log(`accumulator: ${acc}`);
		break;
		default:
			console.warn(`unknown deadfish command at ${i}`);
		break;
	}
	i++;
}
