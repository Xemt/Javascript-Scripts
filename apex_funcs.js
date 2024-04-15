/**
 * @author Xemt <https://github.com/Xemt/>.
 * @description 3/8/24 - 4/15/24. Useful functions for Apex Learning. Copy and
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

if ( /apex(vs|learning)/.test(location.hostname) === false ) {
	throw new Error("Must be on an Apex page!");
}

var PAGENO_RE = /(?<=(\/page\/))\d+/;

/**
 * @description Gets the question on the test or quiz that you're doing.
 * @returns {?string} Returns null if we're not on a test or a quiz.
*/
function apex_get_question()
{
	/* RegExp idea is from https:///www.youtube.com/shorts/scUvtg1B9I4. */
	var html_re = /<(\/)?[^>]*>/;

	if (location.hostname.test() ) {
		return null;
	}
	var quest_elem = document.querySelector("kp-sia-question").children.item(0).children.item(0);
	var quest_txt = quest_elem.innerHTML;

	/* Strip any, and every HTML element. */
	while ( html_re.test(quest_html) ) {
		quest_txt = quest_txt.replace(html_re, "");
	}

	return quest_txt;
}

/**
 * @description Tries to goto whatever page of whatever you're doing in Apex.
 * @throws {RangeError} Number is signed, NaN, or not finite.
 * @param {Number} pageno - The page number to goto.
 * @returns {void}
*/
function apex_goto_page(pageno)
{
	if ((pageno < 0)  || isNaN(pageno) || (isFinite(pageno) == false)) {
		throw new Error("apex_goto_page: Invalid argument.");
	}

	location.pathname = location.pathname.replace(PAGENO_RE, pageno);

	return undefined;
}

/**
 * @description Tries to goto the last page of whatever you're doing in Apex.
 * @returns {void}
*/
function apex_goto_last_page()
{	
	if ( !location.pathname.test(PAGENO_RE) ) {
		return undefined;
	}
	
	/* The first number from the page number indicator. Example: "1" from
           "1 of 5". */
	var last_pageno = document.querySelectorAll('[class="nav-section"]')[1].innerText.split(" ")[2];
	
	location.pathname = location.pathname.replace(PAGENO_RE, last_pageno);
	
	return undefined;
}
