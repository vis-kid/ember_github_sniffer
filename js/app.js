var devs = [
  { login: 'wycats', name: 'Yehuda Katz' },
  { login: 'tomdale', name: 'Tom Dale' },
  { login: 'vis-kid', name: 'H. Bogart' }
]
  

Github = Ember.Application.create();

Github.Router.map(function() {
	this.resource("user", {path: "/users/:login"});
});

Github.IndexRoute = Ember.Route.extend({
  model: function() { return devs }
});

Github.IndexController = Ember.ArrayController.extend({
	actions: {
  	clickedSearchButton: function(){
      alert("I've been clicked");
    }
	}
});

Github.UserRoute = Ember.Route.extend({
  model: function(params) {
		return Ember.$.getJSON("https://api.github.com/users/" + params.login);
	}
});
