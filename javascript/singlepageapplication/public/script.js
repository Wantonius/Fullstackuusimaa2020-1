window.onload = function() {
	createForm();
}

createForm = () => {
	const anchor = document.getElementById("anchor");
	let centeringDiv = document.createElement("div");
	let shoppingForm = document.createElement("form");
	centeringDiv.setAttribute("class","col-xs-1");
	centeringDiv.setAttribute("align","center");
	
	// item type input
	
	let typeinput = document.createElement("input");
	typeinput.setAttribute("type","text");
	typeinput.setAttribute("value","");
	typeinput.setAttribute("name","typeinput");
	typeinput.setAttribute("id","typeinput");
	let typeinputlabel = document.createElement("label");
	typeinputlabel.setAttribute("for","typeinput");
	let typeinputtext = document.createTextNode("Type:");
	typeinputlabel.appendChild(typeinputtext);
	
	//price input
	
	let priceinput = document.createElement("input");
	priceinput.setAttribute("type","number");
	priceinput.setAttribute("name","priceinput");
	priceinput.setAttribute("id","priceinput");
	let priceinputlabel = document.createElement("label");
	priceinputlabel.setAttribute("for","priceinput");
	let priceinputtext = document.createTextNode("Price:");
	priceinputlabel.appendChild(priceinputtext);
	
	//count input
	
	let countinput = document.createElement("input");
	countinput.setAttribute("type","number");
	countinput.setAttribute("name","countinput");
	countinput.setAttribute("id","countinput");
	let countinputlabel = document.createElement("label");
	countinputlabel.setAttribute("for","countinput");
	let countinputtext = document.createTextNode("Count:");
	countinputlabel.appendChild(countinputtext);

	//submit button
	
	let submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","Add");
	submit.setAttribute("class","btn btn-primary");
	
	let br = document.createElement("br");
	
	shoppingForm.appendChild(typeinputlabel);
	shoppingForm.appendChild(typeinput);
	shoppingForm.appendChild(br);
	
	shoppingForm.appendChild(priceinputlabel);
	shoppingForm.appendChild(priceinput);
	shoppingForm.appendChild(br.cloneNode());

	shoppingForm.appendChild(countinputlabel);
	shoppingForm.appendChild(countinput);
	shoppingForm.appendChild(br.cloneNode());

	shoppingForm.appendChild(submit);
	
	centeringDiv.appendChild(shoppingForm);
	anchor.appendChild(centeringDiv);
	let tableanchor = document.createElement("div");
	tableanchor.setAttribute("id","tableanchor");
	anchor.appendChild(tableanchor);
}