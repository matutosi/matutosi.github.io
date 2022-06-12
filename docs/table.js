// http://scrap.php.xdomain.jp/javascript_table_control/

// add row
function addRow(id, n = 5) {
    var table = document.getElementById(id);    // get table
    const n_col = table.rows[0].cells.length;   // number of cols
    // html for cells
    var ckeckbox_cell = '<span contenteditable="true"><input type="checkbox"></span>';
    var editable_cell = '<span contenteditable="true"><pre> </pre></span>';  // enable to input easily
  //     var editable_cell = '<span contenteditable="true"><pre> </pre></span>';  // enable to input easily
    var delete_button = '<input type="button" value="DELETE" onclick="deleteRow(this)">';
    for(var Nj = 0; Nj < n; Nj++){
        var tr = document.createElement('tr');
        // date
        var td = document.createElement('td');
        td.innerHTML = getNow()+'_'+Nj;
        tr.appendChild(td);
        // delete_button
        var td = document.createElement('td');
        td.innerHTML = delete_button;
        tr.appendChild(td);
        // identified
        var td = document.createElement('td');
        td.innerHTML = ckeckbox_cell;
        tr.appendChild(td);
        // sampled
        var td = document.createElement('td');
        td.innerHTML = ckeckbox_cell;
        tr.appendChild(td);
        // 4: delete_button, date, identified, and sampled, 
        for(var Cj = 4; Cj < n_col; Cj++){
            var td = document.createElement('td');
            td.innerHTML = editable_cell;
            tr.appendChild(td);
        }
        // add a row to table
        table.appendChild(tr);
    }
}

// delete a row
function deleteRow(obj) {
    tr = obj.parentNode.parentNode;              // clicked row
    tr.parentNode.deleteRow(tr.sectionRowIndex); // delete clicked row
}

// add clumn
function addCol_2(id) {
    var table = document.getElementById(id);  // get table
    const n_row = table.rows.length;          // number of rows
    const col_name = document.getElementById('col_name');
    // th
    var tr = table.rows[0]
    var th = document.createElement('th');
    th.innerHTML = '<th>' + col_name.value + '</th>';
    tr.appendChild(th);
    // td
    const editable_cell = '<span contenteditable="true"><pre> </pre></span>';  // enable to input easily
    for(var Ri = 1; Ri < n_row; Ri++){
      var tr = table.rows[Ri]
      var td = document.createElement('td');
      td.innerHTML = editable_cell;
      tr.appendChild(td);
    }
}

// add clumn
function addCol(id) {
    var table = document.getElementById(id);  // get table
    const n_row = table.rows.length;          // number of rows
    const n_col = table.rows[0].cells.length; // number of cols
    const position = n_col - 2;               // 2: delete and date
    const col_name = document.getElementById('col_name');
    var cell = table.rows[0].insertCell(position);
    cell.innerHTML = '<th>' + col_name.value + '</th>';
    const editable_cell = '<span contenteditable="true"><pre> </pre></span>';  // enable to input easily
    for(var Ri = 1; Ri < n_row; Ri++){        // add cell
        var cell = table.rows[Ri].insertCell(position);
        cell.innerHTML = editable_cell;
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // //
// 
// No need (do not use)
// 
// // // // // // // // // // // // // // // // // // // // // // // // // // //

// delete a column
function deleteColumn(id) {
    // get table
    var table = document.getElementById(id);
    // number of rows
    var rows = table.rows.length;
    // delete last cell in each row
    for ( var i = 0; i < rows; i++) {
        var cols = table.rows[i].cells.length;
        if (cols < 2) {
            continue;
        }
        table.rows[i].deleteCell(-1);
    }
}

// add column
function insertColumn(id) {
    // get table
    var table = document.getElementById(id);
    // number of rows
    var rows = table.rows.length;
    // add cell
    for ( var i = 0; i < rows; i++) {
        var cell = table.rows[i].insertCell(-1);
        var cols = table.rows[i].cells.length;
        if (cols > 10) {
            continue;
        }
        cell.innerHTML = (i + 1) + '-' + (cols - 1);
    }
}
