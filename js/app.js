var devs = [
{ login: 'wycats', name: 'Yehuda Katz' },
{ login: 'tomdale', name: 'Tom Dale' },
{ login: 'vis-kid', name: 'H. Bogart' }
]


Github = Ember.Application.create();

Github.Router.map(function() {
	this.resource("user", {path: "/users/:login"}, function() {
    this.resource('repositories');
	});
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

Github.UserIndexRoute = Ember.Route.extend({
	model: function(){
					 return this.modelFor('user');
				 }
});

Github.RepositoriesRoute = Ember.Route.extend({
  model: function() {
    var user = this.modelFor('user');
		return Ember.$.getJSON(user.repos_url);
	}
});
