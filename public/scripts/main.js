
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
      tags: [
        {
          name: 'app',
          active: false,
        },
      ]
    },
    methods: {
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
