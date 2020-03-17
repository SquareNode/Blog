const btn = document.getElementById('reorder');

let counter = 0;

let txt = document.createTextNode('newest');
btn.appendChild(txt);

btn.addEventListener('click', function () {
	const elements = document.getElementsByClassName('post');
	const par = document.getElementById('cnt');
	
	let n = elements.length;
	while(n--) 
		par.appendChild(elements[n]);
	//change text on btn
	
	if(counter===0){
		btn.removeChild(btn.childNodes[0]);
		let txt1 = document.createTextNode('oldest');
		btn.appendChild(txt1);
		counter=1;
	}
	else {
		btn.removeChild(btn.childNodes[0]);
		counter = 0;
		let txt2 = document.createTextNode('newest');
		btn.appendChild(txt2);
	}

})


