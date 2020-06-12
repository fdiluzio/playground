import './styles.scss';
import marked from "marked/lib/marked.esm";
import sanitizeHtml from 'sanitize-html';
import {dataSet} from './data/data';

const input = document.querySelector('textarea');
const output = document.getElementById('output');
const actions = document.querySelectorAll('[data-action]');
let counter = 0;


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Override function
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const renderer = {
  link(href, title, displayText, action) {

    if (href.indexOf('ifs:') === 0){
      href = href.replace('ifs:', '');
      return `<button class="searchTab-btn" data-action="new-tab" data-tab="${href}" title="${title}">${displayText}</button>`;
    } else {
      // console.log('H:', arguments);
      return `<a href="${href}" title="${title}" rel="noreferrer" target="_blank">${displayText}</a>`
    }

  }
};

marked.use({ renderer });



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
input.value = dataSet.link;
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
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "a", "article", "b", "blockquote", "br", "button", "caption", "code", "del", "details", "div", "em",
      "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "ol",
      "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table",
      "tbody", "td", "th", "thead", "tr", "u", "ul"]),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'title'],
      '*': ['style'],
      img: ['src'],
      iframe: ['src', 'frameborder', 'width', 'height'],
      button: ['data-action', 'data-tab']
    },
    allowedIframeHostnames: ['www.youtube-nocookie.com']
  };
  const html = marked(string);
  const cleaned = sanitizeHtml(html, options);
  output.innerHTML = marked(cleaned);
  enableActions();
}

function enableActions() {
  const actionElements = output.querySelectorAll('[data-action]');
  actionElements.forEach(el=> {
    console.log(el);
  });
}


function renderMarkDown(e) {
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