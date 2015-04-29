Template.items.animations({
  ".item": {
    container: ".container-items", // container of the ".item" elements
    in: "fade-in", // class applied to inserted elements
    out: "fade-out" // class applied to removed elements
  }
});

Items = new Mongo.Collection("items", { connection: null });

Template.items.helpers({
  items: function() {
    return Items.find();
  }
});

Template.items.events({
  "click [data-add-item]": function(e, tpl) {
    Items.insert({ title: Fake.word() });
  },
  "click [data-remove-item]": function(e, tpl) {
    Items.remove({ _id: this._id });
  }
});
