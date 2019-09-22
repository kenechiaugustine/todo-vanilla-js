// Javascript todo List script
// ----------------------------
var removeIcon = '<i class="fa fa-trash"></i>';
var completeIcon = '<i class="fa fa-check"></i>';

//store data in object
data = localStorage.getItem("todoListFile")
	? JSON.parse(localStorage.getItem("todoListFile"))
	: {
			todo: [],
			complete: []
	  };

//working on date
const dateElement = document.getElementById("dateItem");
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Render item to the DOM
renderTodoList();

// Adding item to list when add btn is clicked
document.getElementById("add").addEventListener("click", function() {
	var value = document.getElementById("item").value;
	if (value) {
		data.todo.push(value);
		addItemtodo(value);
		document.getElementById("item").value = "";
		DOU();
	}
});
// Adding item by clicking Enter key
document.addEventListener("keyup", function(even) {
	if (even.keyCode == 13) {
		var value = document.getElementById("item").value;
		if (value) {
			data.todo.push(value);
			addItemtodo(value);
			document.getElementById("item").value = "";
			DOU();
		}
	}
});

//Adding item to DOM function
function addItemtodo(text) {
	var list = document.getElementById("todo");

	var item = document.createElement("li");
	item.innerText = text;

	var buttons = document.createElement("div");
	buttons.classList.add("buttons");

	var remove = document.createElement("button");
	remove.classList.add("remove");
	remove.innerHTML = removeIcon;
	remove.addEventListener("click", removeItem);

	var completed = document.createElement("button");
	completed.classList.add("complete");
	completed.innerHTML = completeIcon;
	completed.addEventListener("click", completedItem);

	buttons.appendChild(remove);
	buttons.appendChild(completed);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]);
}
// Adding completed item to DOM
function renderCompletedItemToDom(text) {
	var list = document.getElementById("todo");

	var item = document.createElement("li");
	item.innerText = text;
	item.classList.add("check");

	var buttons = document.createElement("div");
	buttons.classList.add("buttons");

	var remove = document.createElement("button");
	remove.classList.add("remove");
	remove.innerHTML = removeIcon;
	remove.addEventListener("click", removeItem);

	var completed = document.createElement("button");
	completed.classList.add("complete");

	completed.innerHTML = completeIcon;
	completed.addEventListener("click", completedItem);

	buttons.appendChild(remove);
	buttons.appendChild(completed);
	item.appendChild(buttons);
	list.appendChild(item);
}

//Removing item function
function removeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	parent.removeChild(item);
	var value = item.innerText;

	if (item.classList.toggle("check")) {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.complete.splice(data.complete.indexOf(value), 1);
	}
	DOU();
}

//completed item
function completedItem() {
	item = this.parentNode.parentNode;
	var value = item.innerText;

	if (item.classList.toggle("check")) {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.complete.push(value);
	} else {
		data.complete.splice(data.complete.indexOf(value), 1);
		data.todo.push(value);
	}
	DOU();
}

//Local Storage - Update localStorage && render item to DOM
function DOU() {
	localStorage.setItem("todoListFile", JSON.stringify(data));
}
function renderTodoList() {
	if (!data.todo.length && !data.complete.length) return;
	for (var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemtodo(value);
	}
	for (var i = 0; i < data.complete.length; i++) {
		var value = data.complete[i];
		renderCompletedItemToDom(value);
	}
}

//clear all item in Localstorage
// window.localStorage.removeItem("todoListFile");
