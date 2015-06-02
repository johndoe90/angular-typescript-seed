(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/greeter/greeterPartial.html',
    '<div>\n' +
    '\n' +
    '    <img ng-src="dist/smiley.jpg" height="15" width="15"/>\n' +
    '\n' +
    '    Greeter\n' +
    '    <input id="name" type="text" ng-model="name" />\n' +
    '    <input type="button" ng-click="greet()" value="greet" />\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('states/stateOne/stateOnePartial.html',
    '<div>\n' +
    '    <h2>This is State One</h2>\n' +
    '\n' +
    '    <!--<label for="name">Name:</label>\n' +
    '    <input id="name" type="text" ng-model="stateOneController.name" />\n' +
    '    <input type="button" ng-click="stateOneController.greet()" value="greet" />-->\n' +
    '\n' +
    '    <greeter-directive></greeter-directive>\n' +
    '</div>');
}]);
})();
