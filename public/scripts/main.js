
$.ajax('config.yaml').done(function(data) {
  var config = jsyaml.load(data);
  init(config);
  game();
});


var init = function(config) {
  var app = new Vue({
    el: '#app',
    data: {
      query: '',
      items: config.items,
      tags: [
        {
          name: 'app',
          active: false,
        },
      ]
    },
    methods: {
      clear: function() {
        this.query = '';
      },
      toggleTag: function(tag) {
        tag.active = !tag.active;
      },
      activeTag: function(tagName) {
        var target = this.tags.find(function(tag) {
          return tag.name === tagName;
        });
        target.active = true;
      },
    },
    filters: {
      hoge: function(value) {
        var tags = this.tags.filter(function(tag) {
          return tag.active;
        }).map(function(tag) {
          return tag.name;
        });

        if (tags.length) {
          value = value.filter(function(v) {
            return v.tags && v.tags.some(function(tag) {
              return tags.indexOf(tag) !== -1;
            });
          });
        }

        value = value.filter(function(v) {
          var name = v.name.toLowerCase();
          return name.indexOf(this.query) !== -1;
        }, this);

        return value;
      },
    },
  });

  var tags = config.items.reduce(function(tags, item) {
    item.tags && item.tags.forEach(function(tag) {
      if (tags.indexOf(tag) === -1) {
        tags.push(tag);
      }
    });

    return tags;
  }, []);

  app.tags = tags.map(function(tag) {
    return {
      name: tag,
      active: false,
    }
  });
};

var game = function() {
  var canvas = document.querySelector('.game');
  var width = canvas.width = canvas.parentNode.clientWidth;
  var height = canvas.height = canvas.parentNode.clientHeight;
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'hsl(200, 80%, 80%)';
  ctx.fillRect(0, 0, width, height);
};
