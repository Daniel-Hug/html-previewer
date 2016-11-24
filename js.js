// get elements
var renderParent = document.getElementById('result'),
main             = document.getElementById('main'),
sourceParent     = document.getElementById('source'),
//sidebar        = document.getElementById('sidebar'),
savedGismos      = document.getElementById('savedGismos'),
savebtn          = document.getElementById('save');


// Create a CodeMirror instance
var editor = CodeMirror(main, {
	lineNumbers: true,
	mode: 'htmlmixed'
});

/*function parseURL(hash) {
	if(!hash) {
		if(location.href.split('#')[1]) {
			var hash = location.href.split('#')[1];
		}
	}
	var ls   = localStorage,
	    lst  = ls.title.split(','),
	    lstl = lst.length;
	for(var i = 0; i < lstl; i++) {
	    if( lst[i] === escape(hash) ) {
			sourceParent.textContent = unescape(ls.sourceParent.split(',')[i]);
		}
	}
	return false;
} parseURL();*/

/*gismoLinks = document.querySelectorAll('#savedGismos a');
for (i=0; i<document.querySelectorAll('#savedGismos a').length; i++) {
	alert(document.querySelectorAll('#savedGismos a')[i]);
	document.querySelectorAll('#savedGismos a')[i].onClick = parseURL(document.querySelectorAll('#savedGismos a')[i].href.split('#')[1]);
}*/


/* Update preview panel when changes are made to the HTML panel and when page loads. */
function updatePreview() {
	renderParent.innerHTML = editor.getValue();
}
editor.on('change', updatePreview);

/* Update HTML panel when changes are made to the preview panel. */
function updateHTML() {
	editor.setValue(renderParent.innerHTML);
} updateHTML();
renderParent.oninput = updateHTML;

/* Make the preview panel editable. */
renderParent.contentEditable = "true";
// for iframe:
// frames[0].document.designMode = "on";



/* localStorage stuff:
 * Save the users gismo
 */
function saveGismo() {
	var title = prompt('Give it a name:'),
	     html = renderParent.innerHTML;
	if (localStorage.title) {
		localStorage.title += ',' + escape(title);
		localStorage.html += ',' + escape(html);
	} else {
		localStorage.title = escape(title);
		localStorage.html = escape(html);
	}
	updateGismos();
}
savebtn.onclick = saveGismo;

/* Update sidebar with links to previously saved gismos */
function listGismos() {
	if (localStorage.title) {
		var titles = localStorage.title.split(','),
		    listItems = document.createDocumentFragment(),
		    i = titles.length;

		while (i--) {
			titles[i] = unescape(titles[i]);
			var li = document.createElement('li');
			li.innerHTML = '<a href="#' + titles[i] + '">' + titles[i] + '</a>';
			listItems.appendChild(li);
		}
		savedGismos.appendChild(listItems);
	}
} listGismos();

// update gismo list:
function updateGismos() {
	var titles = localStorage.title.split(','),
	title = unescape(titles[titles.length - 1]),
    li = document.createElement('li');
    li.innerHTML = '<a href="#' + title + '">' + title + '</a>';
	savedGismos.insertBefore(li,savedGismos.children[1]);
}