
$.ajax('config.yaml').done(function(data) {
  var config = jsyaml.load(data);
  init(config);
});

var init = function(config) {
  var app = new Vue({
    el: '#app',
    data: {
      query: '',
      items: config.items,
    },
  });
};
