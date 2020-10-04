/****************************************
 ==== Global Search
 ****************************************/
$(function() {
  window.sajari = {
    count: 0
  };
  var s = window.sajari;
  s.load = function () {
    return (function (w, d, x, a, e, s, c, r) {
      s = [];
      var b = function () {
        s.push(arguments);
      }, q = "ui";
      b.arr = s;
      w[a] = w[a] || [];
      w[a][q] = w[a][q] || [];
      w[a][q].push(b);
      c = d.createElement(x);
      c.async = 1;
      c.src = e;
      r = d.getElementsByTagName(x)[0];
      r.parentNode.insertBefore(c, r);
      return b;
    })(window, document, "script", "sajari", "https://cdn.sajari.net/js/integrations/website-search-1.3.0.js")
  };

  s.defaultSettings = {
    project: "1517403709749308252",
    collection: "unity3d-com",
    pipeline: "website",
    instantPipeline: "autocomplete",
    attachSearchBox: $("#search-panel .search-box").get(0),
    attachSearchResponse: $("#search-panel .search-results").get(0),
    inputPlaceholder: "Search...",
    inputAutoFocus: false,
    maxSuggestions: 5,
    results: {"showImages": false},
    values: {},
    urlQueryParam: 'gq',
    tabFilters: {
      defaultTab: "All",
      tabs: [
        {
          title: "All",
          filter: ""
        },
        {
          title: "Support",
          filter: "domain='docs.unity3d.com' OR domain='support.unity3d.com' OR domain='issuetracker.unity3d.com' OR domain='feedback.unity3d.com'"
        },
        {
          title: "Community",
          filter: "domain='forum.unity.com' OR domain='answers.unity.com' OR domain='blogs.unity3d.com'"
        }
      ]
    }
  };

  s.setup = function (options) {
    options = $.extend({}, s.defaultSettings, options);

    if ($(options.attachSearchBox).length === 0)
      return null;

    var ui = s['searchUI' + s.count++] = s.load();

    ui("inline", options);

    ui("sub", "pipeline.response-updated", function (_, query) {
      var $this;
      var reg = new RegExp(query.queryValues.q, 'gi');
      var sanitizedText;
      $(options.attachSearchResponse).find(".sj-result-description").each(function (i, e) {
        $this = $(this);
        sanitizedText = sanitizeHtml($this.text().replace(reg, '<strong>$&</strong>'));
        $this.html(sanitizedText);
      })
    });

    return ui;
  }

  // Default load search in search-panel.
  s.setup();

  // If inpage search exists (404 page), initialize it.
  if ($(".content-wrapper .search-container").length) {
    s.setup({
      attachSearchBox: $(".content-wrapper .search-box").get(0),
      attachSearchResponse: $(".content-wrapper .search-results").get(0),
    });
  }

  // Enable search button
  $('.search-input button').on('click', function() {
    var event = new KeyboardEvent("keydown", {
      keyCode: 13,
      which: 13,
      bubbles: true
    });

    $(this).closest('.search-input').find('.sj-search-bar-input-common').get(0).dispatchEvent(event);
  })

});
