// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: calculator;
/**
 * @author Xemt <https://github.com/Xemt>
 * @description 5/12/24.
 *
 * MIT License
 *
 * Copyright (c) 2024 Xemt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

"use strict";

/**
 * @description Literally reset the number row, and reload 
 * the table.
 * @returns {void}
*/
function ui_reset_num_row()
{
  num_row = new UITableRow();
  num_row.addText(cur_num_str);
      
  table.removeAllRows();
      
  table.addRow(num_row);
  table.addRow(btn_row);

  table.reload();
    
  return (undefined);
}

/**
 * @param {Number} oper_no - Math operation the returned
 * function that should handle.
 * @returns {() => void}
*/
function
make_math_oper_handler(oper_no)
{
  let handler = function() {
    let alert = new Alert();
    let text_field = alert.addTextField("Number?");
    let input;
    let n;
  
    alert.addAction("OK");
    alert.addCancelAction("Cancel");
    
    text_field.setDecimalPadKeyboard();
  
    if (oper_no === OPER_ADD) {
      alert.title = "Add";
    } else if (oper_no === OPER_SUB) {
      alert.title = "Subtract";
    } else if (oper_no === OPER_MUL) {
      alert.title = "Multiply";
    /* TODO: Change this if there is a word for the act of getting the
       remainder/modulo of 2 numbers. */
    } else if (oper_no === OPER_DIV || oper_no === OPER_MOD) {
      alert.title = "Divide";
    }
    
    alert.title += " by:";
    
    alert.present().then((btn_idx) => {
      if (btn_idx === BTN_CANCEL) {
        console.log("Cancelled!");
        return (undefined);
      }
        
      input = alert.textFieldValue();
      n = Number(input);

      /* Don't stop the program completely. Soft error. */
      if ( isNaN(n) === true ) {
        console.error("Bad number.");
        return (undefined);
      }
      
      if (oper_no === OPER_ADD) {
        cur_num = cur_num + n;
      } else if (oper_no === OPER_SUB) {
        cur_num = cur_num - n;
      } else if (oper_no === OPER_MUL) {
        cur_num = cur_num * n;
      } else if (oper_no === OPER_DIV) {
        cur_num = cur_num / n;
      } else if (oper_no === OPER_MOD) {
        cur_num = cur_num % n;
      }
      
      cur_num_str = cur_num.toString(10);
      
      ui_reset_num_row();
      
      return (undefined);
    }, console.error);
    
    return (undefined);
  }
  
  return (handler);
}

let OPER_ADD = 1;
let OPER_SUB = 2;
let OPER_MUL = 3;
let OPER_DIV = 4;
let OPER_MOD = 5;

let BTN_CANCEL = -1;
let BTN_NO = -1;

let cur_num = 0;
let cur_num_str = cur_num.toString(10);
let table = new UITable();
let num_row = new UITableRow();
let btn_row = new UITableRow();
let add_btn = btn_row.addButton("add");
let sub_btn = btn_row.addButton("sub");
let mul_btn = btn_row.addButton("mul");
let div_btn = btn_row.addButton("div");
let mod_btn = btn_row.addButton("mod");
let res_btn = btn_row.addButton("res");
let all_btns = [add_btn, sub_btn, mul_btn, div_btn, mod_btn, res_btn];
let btn = null;

num_row.addText(cur_num_str);

for (btn of all_btns) {
  btn.leftAligned();
}

/* Could be simplified, but it should be readable instead. */
add_btn.onTap = make_math_oper_handler(OPER_ADD);
sub_btn.onTap = make_math_oper_handler(OPER_SUB);
mul_btn.onTap = make_math_oper_handler(OPER_MUL);
div_btn.onTap = make_math_oper_handler(OPER_DIV);
mod_btn.onTap = make_math_oper_handler(OPER_MOD);
res_btn.onTap = () => {
  let alert = new Alert();
  
  alert.title = "Are you sure you want to reset the number?";
  alert.addAction("OK");
  alert.addCancelAction("Cancel");
  alert.present().then((btn_idx) => {
    if (btn_idx === BTN_NO) {
      return (undefined);
    }
    
    cur_num = 0;
    cur_num_str = cur_num.toString(10);
    
    ui_reset_num_row();
  }, console.error);
  
  return (undefined);
};

table.addRow(num_row);
table.addRow(btn_row);

await table.present();
