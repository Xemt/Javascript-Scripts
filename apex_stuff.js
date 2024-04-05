/**
 * @author Xemt <https://www.github.com/Xemt>
 * @description 3/8/24 - 3/11/24. Functions for things in Apex Learning.
 *
 * This is free and unencumbered software released into the public domain.
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org/>
*/

"use strict";

if ( !/apex(vs|learning)/.test(location.hostname) ) {
	throw new Error("Must be on an Apex Learning page!");
}
	
/**
 * @description Gets the question of whatever you're doing in Apex Learning.
 * Some code from https:///www.youtube.com/shorts/scUvtg1B9I4.
 * @returns {string}
*/
function apex_get_quest()
{
	var html_re = /<(\/)?[^>]*>/;
	var quest_elem = document.querySelector("kp-sia-question").children.item(0).children.item(0);
	var quest_txt = quest_elem.innerHTML;

	while (html_re.test(quest_txt) === true) {
		quest_txt = quest_txt.replace(html_re, "");
	}

	return quest_txt;
}

/**
 * @description Tries to goto the last page of whatever you're doing in Apex
 * Learning.
 * @returns {boolean}
*/
function apex_goto_last_page()
{
	var pageno_re = /(?<=(\/page\/))\d+/;
	var last_pageno = document.querySelectorAll('[class="nav-section"]')[1].innerText.split(" ")[2];
	location.pathname = location.pathname.replace(pageno_re, last_pageno);
}

