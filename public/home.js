//sort by newest/oldest button

const btn = document.getElementById('reorder');

if(btn == null)
	throw new Error('home.js: btn #reorder not present');

let counter = 0;

let txt = document.createTextNode('newest first');
btn.appendChild(txt);

btn.addEventListener('click', function () {
	const elements = document.getElementsByClassName('post');
	const par = document.getElementById('cnt');
	
	if(elements.length === 0 || par == null)
		throw new Error('home.js: cannot reach elements that should be sorted');
	
	let n = elements.length;
	while(n--) 
		par.appendChild(elements[n]);
	//change text on btn
	
	if(counter===0){
		btn.removeChild(btn.childNodes[0]);
		let txt1 = document.createTextNode('oldest first');
		btn.appendChild(txt1);
		counter=1;
	}
	else {
		btn.removeChild(btn.childNodes[0]);
		counter = 0;
		let txt2 = document.createTextNode('newest first');
		btn.appendChild(txt2);
	}

})

//scroll top button 

const scrollbtn = document.getElementById('topscroll');
if(scrollbtn == null)
	throw new Error('home.js: scroll top button not present');

let display = false;
scrollbtn.style.opacity = '0';

function toggleVis(pos) {
	if(pos > 500 && display === false) {
		//scrollbtn.style.visibility = 'visible';
		fadeIn(scrollbtn);
		display = true;
	}
	else if(pos < 500 && display === true) {
		//scrollbtn.style.visibility = 'hidden';
		fadeOut(scrollbtn);
		display = false;
	}
}

document.addEventListener('scroll', function () {
	
	let pos = window.scrollY;
	
	window.requestAnimationFrame(function () {
		toggleVis(pos);
	});
		
});

// https://chrisbuttery.com/articles/fade-in-fade-out-with-javascript/

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .01) < 0) {
      el.style.visibility = 'hidden';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el){
  el.style.opacity = 0;
  el.style.visibility = 'visible';

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
































