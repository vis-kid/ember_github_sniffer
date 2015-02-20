Github = Ember.Application.create();

Github.Router.map(function() {
  // put your routes here
});

Github.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['Yehuda', 'Tom Dale', 'Ed'];
  }
});

Github.IndexController = Ember.ArrayController.extend({
	actions: {
  	clickedSearchButton: function(){
      alert("I've been clicked");
    }
	}
});
