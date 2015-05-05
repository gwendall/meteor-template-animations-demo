var getPic = function() {
  return "http://accounts-cdn.9gag.com/media/default-avatar/1_" + _.random(0, 182) + "_100_v0.jpg";
}

Items = new Mongo.Collection("items", { connection: null });
_.each(_.range(0, 3), function(i) {
  Items.insert(_.extend(Fake.user(), { pic: getPic() }));
});

Template.items.helpers({
  items: function() {
    return Items.find().fetch().reverse();
  }
});

Template.items.events({
  "click [data-add-item]": function(e, tpl) {
    Items.insert(_.extend(Fake.user(), { pic: getPic() }));
  },
  "click [data-remove-item]": function(e, tpl) {
    Items.remove({ _id: this._id });
  }
});

Logs = new Mongo.Collection("logs", { connection: null });
Template.logs.helpers({
  logs: function() {
    return Logs.find().fetch().reverse();
  }
});


Template.items.animations({
  ".item": {
    animateInitial: true, // animate the intial elements
    animateInitialStep: 200, // Step between each animation for each initial item
    animateInitialDelay: 0,
    container: ".container-items", // container of the ".item" elements
    in: "animated fast fadeInLeft", // class applied to inserted elements (animations courtesy of animate.css)
    out: "animated fast fadeOutRight", // class applied to removed elements
    inCallback: function() {
      var title = $(this).find(".title").text();
      Logs.insert({ text: "Inserted " + title + " to the DOM" });
    },
    outCallback: function() {
      var title = $(this).find(".title").text();
      Logs.insert({ text: "Removed " + title + " from the DOM" });
    }
  }
});
