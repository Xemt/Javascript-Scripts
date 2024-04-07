/**
 * @author Xemt <https://github.com/Xemt/>.
 * @description 7/28/22 - 4/5/24.
 *
 * MIT License
 * 
 * Copyright (c) 2024 Xemt
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
*/

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
		const BTN_CANCEL = -1;
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

	switch ( input.charAt(i) ) {
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
