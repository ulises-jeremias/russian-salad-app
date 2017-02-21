const Func = require('./functions.js');
const fs = require('fs');

// DOM manipulation functions
document.addEventListener('DOMContentLoaded', () => {

  if (Func.$('#ideas')) {
    fs.exists('./ideas.json', (exists) => {
      if (exists) {
        fs.readFile('./ideas.json', 'utf8', (error, content) => {
          if (error) {
            return console.log(error);
          }
          let data = JSON.parse(content);
          for (var i = 0; i < data.ideas.length; i++) {
            Func.$('#ideas').innerHTML += (`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    ${data.ideas[i].title} -> ${data.ideas[i].description}</h2>
                  </div>
                </div>
              </div>
            `);
          }
        });
      } else {
        console.log("JSON File not found");
      }
    });
  }

  let prepare_view = function() {
    var body = Func.$('body')[0],
        footer = document.createElement('footer'),
        p = document.createElement('p'),
        span = document.createElement('span');

    p.innerHTML = '&copy; ' + Func.$('title')[0].innerHTML;
    footer.appendChild(p);
    span.className = 'fa fa-arrow-up umd_gotop';
    body.appendChild(footer);
    body.appendChild(span);
  }();
});
