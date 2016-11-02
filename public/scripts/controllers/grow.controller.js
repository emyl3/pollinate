app.controller('GrowController', GrowController);

function GrowController(prompt) {
  var ctrl = this;

prompt.getResponses(2).then(function(response) {
  console.log(response);
})
  console.log('GrowController loaded');

}
