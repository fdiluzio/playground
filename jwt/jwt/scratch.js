[].slice.call(document.querySelectorAll('.ifs-hitlist-checkbox .ifs-icon-checkbox-checked'), 0).forEach(el => {
    let parent = el.parentNode;
    console.log(parent);
    while (!parent.dataset.docId && parent.nodeName != 'body') {
            parent = el.parentNode;
        }
        console.log(parent);
})

[].slice.call(document.querySelectorAll('.ifs-hitlist-checkbox .ifs-icon-checkbox-checked'), 0).forEach(el => {
    let parent = el.parentNode;
    while (parent != document.body && !parent.dataset.docId) {
        parent = parent.parentNode;
    }
    console.log(parent.dataset.docId);
   
})