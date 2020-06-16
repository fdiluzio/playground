import './styles.scss';
import marked from 'marked';
import DOMPurify from 'dompurify';
import {dataSet} from './data/data';

const input = document.querySelector('textarea');
const output = document.getElementById('output');
const actions = document.querySelectorAll('[data-action]');
let counter = 0;


// ##################################################
// Custom handlers to override default implementation
// ##################################################

const renderer = {
  // check if link is an open new tab in searchbar type
  link(href, title, displayText) {
    if (href.indexOf('ifs:') === 0) {
      href = href.replace('ifs:', '');
      return `<button class="searchTab-btn" data-action="ifs-tab" data-tab="${href}" title="${title}">${displayText}</button>`;
    } else {
      return `<a href="${href}" title="${title}" rel="noreferrer" target="_blank">${displayText}</a>`
    }
  }
};

marked.use({renderer});


DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  // Limit Iframe URL
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') || '';
    if (src.indexOf('www.youtube-nocookie.com') < 0) {
      return node.parentNode?.removeChild(node)
    }
  }
});


function displayClean(string) {
  string += '\n\r' + String(counter);
  var config = {
    KEEP_CONTENT: false, // remove content from non-white-listed nodes too
    ADD_TAGS: ['iframe'], // permit additional custom tags
    FORBID_TAGS: ['style', 'script']
  };

  const html = marked(string);
  const cleaned = DOMPurify.sanitize(html, config);
  output.innerHTML = marked(cleaned);
  enableActions();
}

function enableActions() {
  // IFS.openNewInternalTab('sSearchTerm:Micheal Jackson;facets:[_facet.application|[Word],_facet.language|[en]]');
  const actionElements = output.querySelectorAll('[data-action]');
  actionElements.forEach(el => {

    switch (el.dataset.action) {
      case 'ifs-tab':
        console.log(el.dataset);
        el.addEventListener('click', evt => IFS.openNewInternalTab(el.dataset.tab));
        break
    }
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Application Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function renderMarkDown(e) {
  counter++;
  switch (this.dataset.action) {
    case 'clean':
      displayClean(input.value);
      break;
    case 'populate':
      if (e.target.nodeName === 'INPUT') {
        const string = getDataSource(document.querySelector('[name="source"]:checked').value);
        input.value = string;
        displayClean(string);
      }
      break;
    case 'input':
      display();
      break;

  }
}

function display() {
  let string = input.value;
  string += String(counter);
  output.innerHTML = marked(string);
}

function getDataSource(sourceName) {
  if (dataSet[sourceName])
    return dataSet[sourceName];
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Start Application State
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
input.value = dataSet.complete;
displayClean(input.value);

actions.forEach(el => {
  el.addEventListener('click', renderMarkDown, false);
});

input.addEventListener('keyup', function (){displayClean(input.value)}, false);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Make Link
// http://localhost:8001/?&ifs_app_states_0=id:a5a68c31-8e2c-422e-b203-7ab23f1fbdbb;title:Product%2520Information;type:internal;sSearchTerm:Product%20Information;iSearchIndex:1%23%23c2VhcmNocHJvZmlsZS1zdGFuZGFyZA%3D%3D;facets:%5B_facet.indexname%7C%5BShare%2540ml-monster-indexer%5D%2C_facet.application%7C%5BPDF%5D%2C_facet.language%7C%5Bde%5D%5D;connectorId:all
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function makeLink(link) {
  return 'ifs:' + window.location.search.split('=')[1];
}

