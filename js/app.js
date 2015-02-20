var devs = [
{ login: 'wycats', name: 'Yehuda Katz' },
{ login: 'tomdale', name: 'Tom Dale' },
{ login: 'vis-kid', name: 'H. Bogart' }
]


Github = Ember.Application.create();

Github.Router.map(function() {
	this.resource("user", {path: "/users/:login"}, function() {
    this.resource('repositories');
		this.resource('repository', { path: 'repositories/:reponame'});
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

Github.RepositoriesController = Ember.ArrayController.extend({
  needs: ['user'],
	user: Ember.computed.alias('controllers.user')
});

Github.RepositoryRoute = Ember.Route.extend({
  model: function(){
    var user = this.modelFor('user');
		var url = 'https://api.github.com/repos' + user.login + '/' + params.reponame;
		return Ember.$.getJSON(url);
	}
});

Ember.Handlebars.registerBoundHelper('fromDate', function(theDate) {
  var today = moment();
	var target = moment(theDate);
	return target.from(today);
});
