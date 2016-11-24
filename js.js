// a few baseline variables:
var w = window,            // window object
    d = w.document,        // document object
    l = w.location,        // location object
    b = d.body,            // <body> element
    h = d.documentElement; // <html> element

var  iframe = w.frames[0].document.body,
     sourceE = d.getElementById('source'),
  //sidebar = d.getElementById('sidebar'),
savedGismos = d.getElementById('savedGismos'),
    savebtn = d.getElementById('save');

/*function parseURL(hash) {
	if(!hash) {
		if(l.href.split('#')[1]) {
			var hash = l.href.split('#')[1];
		}
	}
	var ls   = localStorage,
	    lst  = ls.title.split(','),
	    lstl = lst.length;
	for(var i = 0; i < lstl; i++) {
	    if( lst[i] === escape(hash) ) {
			sourceE.textContent = unescape(ls.sourceE.split(',')[i]);
		}
	}
	return false;
} parseURL();*/

/*gismoLinks = d.querySelectorAll('#savedGismos a');
for (i=0; i<d.querySelectorAll('#savedGismos a').length; i++) {
	alert(d.querySelectorAll('#savedGismos a')[i]);
	d.querySelectorAll('#savedGismos a')[i].onClick = parseURL(d.querySelectorAll('#savedGismos a')[i].href.split('#')[1]);
}*/


/* Update preview panel when changes are made to the HTML panel and when page loads. */
function updatePreview() {
	iframe.innerHTML = sourceE.textContent;
} updatePreview();
sourceE.oninput = updatePreview;

/* Update HTML panel when changes are made to the preview panel. */
function updateHTML() {
	sourceE.textContent = iframe.innerHTML;
}
iframe.oninput = updateHTML;

/* Make the preview panel editable. */
iframe.contentEditable = "true";
frames[0].document.designMode = "on";



/* localStorage stuff:
 * Save the users gismo
 */
function saveGismo() {
	var title = prompt('Give it a name:'),
	     html = iframe.innerHTML;
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