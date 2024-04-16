/**
 * @author Xemt <https://github.com/Xemt/>.
 * @description 3/8/24 - 4/16/24. Useful functions for Apex Learning. Copy and
 * paste the code, and call whatever function you intend on using.
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

var PAGENO_RE = /(?<=(\/page\/))\d+/;
var ERR_BAD_CTX = "Oops, you're using this function in the wrong context. You must use this where there are pages.";

if (/apex(vs|learning)/.test(location.hostname) === false) {
	throw new Error("Must be on an Apex page!");
}

/**
 * @description Gets the question on the test or quiz that you're doing.
 * @throws {Error} We're not on a test or a quiz.
 * @returns {String}
*/
function apex_get_question()
{
	if (location.pathname.endsWith("assessment") === false) {
		var err_msg = "apex_get_question: ".concat("Not on a test or a quiz.");
		throw new Error(err_msg);
	}
	
	/* RegExp idea is from https:///www.youtube.com/shorts/scUvtg1B9I4 */
	var html_re = /<(\/)?[^>]*>/;
	var quest_elem = document.querySelector("kp-sia-question").children.item(0).children.item(0);
	var quest_txt = quest_elem.innerHTML;

	/* Strip any, and every HTML element. */
	while (html_re.test(quest_txt) === true) {
		console.log(quest_txt);
		
		quest_txt = quest_txt.replace(html_re, function(mat) {
			var repl = null;

			/* We're dealing with an image element inside the HTML string. Only extract the
                           image's alt text. */
			if (mat.match(/alt="/) !== null) {
				repl = mat.match(/(?=(alt\=")).+(?=(\"))/);
			} else {
				repl = "";
			}

			console.log(repl);
			
			return repl;
		});
	}

	return quest_txt;
}

/**
 * @description Tries to goto whatever page of whatever you're doing in Apex.
 * @throws {Error} Using this function in the wrong context.
 * @throws {RangeError} Number is less than 1, signed, NaN, or not finite.
 * @param {Number} pageno - The page number to goto.
 * @returns {void}
*/
function apex_goto_page(pageno)
{
	if (location.hostname.test(PAGENO_RE) === false) {
		var err_msg = "apex_goto_page: ".concat(ERR_BAD_CTX);
		throw new Error(err_msg);
	}
	
	if (pageno < 1 || isNaN(pageno) === true || isFinite(pageno) === false) {
		throw new Error("apex_goto_page: Invalid argument.");
	}

	location.pathname = location.pathname.replace(PAGENO_RE, pageno);

	return undefined;
}

/**
 * @description Tries to goto the last page of whatever you're doing.
 * @throws {Error} Using this function in the wrong context.
 * @returns {void}
*/
function apex_goto_last_page()
{	
	if (location.pathname.test(PAGENO_RE) === false) {
		var err_msg = "apex_goto_last_page: ".concat(ERR_BAD_CTX);
		throw new Error(err_msg);
	}
	
	/* The first number from the page number indicator. Example: "1" from
           "1 of 5". */
	var last_pageno = document.querySelectorAll('[class="nav-section"]')[1].innerText.split(" ")[2];
	
	location.pathname = location.pathname.replace(PAGENO_RE, last_pageno);
	
	return undefined;
}
