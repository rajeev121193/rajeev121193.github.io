require([
	"dojo/dom",
	"dojo/dom-construct",
	"dijit/registry",
	"dojo/_base/declare",
	"dijit/form/TextBox",
	"dojo/keys",
	"dojo/on",
	"listItem",
	"dojo/domReady!"
], function(dom, domConstruct, registry, declare, textBox, keys, on, listItem) {

	//Count of the todo items created
	var count = 0;

	//Box to input the TODO
	var todoBox = new textBox({
		value: "",
		placeholder: "What do you want to-do?",
		name: "todoBox",
		intermediateChanges: "true"
	}, "todoBox");

	var box = registry.byId("todoBox");
	var insertButton = dom.byId("todoItemInsert");
	var clearButton = dom.byId("todoItemClear");

	var addToList = function() {
		var val = box.get("value");
		val = val.trim();
		if (val !== "") {
			//create a list item
			var newTodoItem = new listItem(val, count, 0);
			count++;

			//clear the box
			box.set("value", "");
		}
	};

	//Adds the todo item on button click
	on(insertButton, "click", addToList);

	//Adds the todo item on ENTER
	on(box, "keypress", function(evt) {
		if (evt.charOrCode === keys.ENTER) {
			addToList();
		}
	});

	//Clears the todoBox
	on(clearButton, "click", function() {
		box.set("value", "");
	});
});