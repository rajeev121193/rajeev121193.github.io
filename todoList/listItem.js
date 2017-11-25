define([
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/_base/fx",
	"dojox/timing"
], function(declare, dom, domConstruct, on, fx, timing) {
	return declare("listItem", null, {
		//Text of the todo item
		val: "",

		//ID of the todo item
		id: 0,

		//Creates the todo item
		create: function(pos) {
			var id = this.id;
			//Decide to place at the beginning or the end
			if (pos === 0) {
				//New list item
				domConstruct.place("<div style='opacity: 0;' class='listItem' id='listItem" + id + "'>" + this.val + "</div>", "listOfItems", "first");
				domConstruct.place("<button class='listItem' id='doneButton" + id + "'>Done</button>", "listItem" + id);

				var doneButton = dom.byId("doneButton" + id);
				on(doneButton, "click", this.done.bind(this));
			} else {
				//Done list item
				domConstruct.place("<div style='font-style: italic; color: grey; opacity: 0;' class='listItem' id='listItem" + id + "'><strike>" + this.val + "</strike></div>", "listOfItems");
			}

			domConstruct.place("<button class='listItem' id='closeButton" + id + "'>Remove</button>", "listItem" + id);

			//Animate the creation of the item
			fx.fadeIn({
				node: "listItem" + this.id
			}).play();

			var closeButton = dom.byId("closeButton" + id);
			on(closeButton, "click", this.close.bind(this));
		},

		//Performed on click of "Done" Button
		done: function() {
			var closingNode = "listItem" + this.id;
			domConstruct.destroy(closingNode);
			var doneItem = new listItem(this.val, this.id, 1);
		},

		//Performed on click of "Remove" Button
		close: function() {
			var closingNode = "listItem" + this.id;

			//Animate the deletion of the item
			fx.fadeOut({
				node: closingNode
			}).play();
			var t = new timing.Timer(350);
			t.onTick = function() {
				domConstruct.destroy(closingNode);
			};
			t.start();
		},

		//Constructor
		constructor: function(txt, id, pos) {
			this.val = txt;
			this.id = id;
			this.create(pos);
		}
	});
});