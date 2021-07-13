var b = document.querySelector('.window-body');
b.innerHTML = '';/*insert desired text in the innerHTML*/

/*maximizing the window*/
var maximize = 0;
document.querySelector('.maximize').addEventListener('click',function(){
  if(maximize == 0){
    document.querySelector('#window').style.top = "0";
    document.querySelector('#window').style.left = "0";
    document.querySelector('#window').style.transform = "translate(0,0)";
    document.querySelector('#window').style.width = "100%";
    document.querySelector('.window-body').style.height = "80vh";
    maximize = 1;
  }
  else{
    document.querySelector('#window').style.top = "50%";
    document.querySelector('#window').style.left = "50%";
    document.querySelector('#window').style.transform = "translate(-50%,-50%)";
    document.querySelector('#window').style.width = "50%";
    document.querySelector('.window-body').style.height = "80vh";
    maximize = 0;
  }
});

/*closing the window*/
var close = document.querySelector('.close').addEventListener('click',function(){
  document.querySelector('#window').style.display = "none";
});
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function lineBreakCount(){
	var str = document.querySelector(".window-body").innerHTML;
  if(str=="") return 0;
	try {
		return((str.match(/<div(.*?)>/gi).length))+1;
	} catch(e) {
		return 1;
	}
}
function letterCount(){
	var str = document.querySelector(".window-body").textContent;
  if(str=="") return 0;
	try {
		return str.length;
	} catch(e) {
		return 1;
	}
}
var c = lineBreakCount();
var l = parseInt(letterCount()+c-1);
document.querySelector(".window-footer").innerHTML = "Lines: "+c+", Characters: "+((l>0)?l:'0');
document.querySelector('.window-body').addEventListener("keyup",function(){
  var c = lineBreakCount();
  var l = parseInt(letterCount()+c-1);
  document.querySelector(".window-footer").innerHTML = "Lines: "+c+", Characters: "+((l>0)?l:'0');
});