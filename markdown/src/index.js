import './styles.scss';
import marked from "marked/lib/marked.esm";
import sanitizeHtml from 'sanitize-html';
import {dataSet} from './data/data'

const input = document.querySelector('textarea');
const output = document.getElementById('output');
const actions = document.querySelectorAll('[data-action]');
let counter = 0;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
input.value = dataSet.complete;
displayClean();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function getDataSource(sourceName) {
  if (dataSet[sourceName])
    return dataSet[sourceName];
}

function display() {
  let string = input.value;
  string += String(counter);
  output.innerHTML = marked(string);
}

function displayClean() {
  let string = input.value;
  string += '\n\r' + String(counter);

  const options = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "a", "article", "b", "blockquote", "br", "caption", "code", "del", "details", "div", "em",
      "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "ol",
      "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table",
      "tbody", "td", "th", "thead", "tr", "u", "ul"]),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'title'],
      '*': ['style'],
      img: ['src'],
      iframe: ['src', 'frameborder', 'width', 'height']
    },
    allowedIframeHostnames: ['www.youtube-nocookie.com']
  };
  const html = marked(string);
  const cleaned = sanitizeHtml(html, options);
  output.innerHTML = marked(cleaned);


}


function renderMarkDown(e) {
  console.log(e);
  counter++;

  switch (this.dataset.action) {
    case 'clean':
      displayClean();
      break;
    case 'populate':
      if (e.target.nodeName === 'INPUT') {
        const string = getDataSource(document.querySelector('[name="source"]:checked').value);
        input.value = string;
        displayClean();
      }
      break;
    case 'input':
      display();
      break;

  }
}

actions.forEach(el => {
  el.addEventListener('click', renderMarkDown, false);
});

input.addEventListener('keyup', displayClean, false);