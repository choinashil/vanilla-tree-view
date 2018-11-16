// Load application styles
import 'styles/index.less';

// Load tree data
import TREE_DATA from './data';

// ================================
// START YOUR APP HERE
// ================================
var content = document.querySelector('.content');

document.querySelector('h1').textContent = TREE_DATA.name;

makeList(content, TREE_DATA);

function makeList(target, data) {
  var ul = document.createElement('ul');
  ul.classList.add = 'ul';
  target.appendChild(ul);

  for (var i = 0; i < data.children.length; i++) {
    var li = document.createElement('li');
    li.classList.add = 'li';
    li.textContent = data.children[i].name;
    ul.appendChild(li);
    li.addEventListener('dblclick', changeToFolder.bind(null, data.children[i]));

    if (data.children[i].children) {
      var span = document.createElement('span');
      span.textContent = ' [-]';
      li.appendChild(span);

      makeList(li, data.children[i]);
    }
  }

  if (li.childNodes) {
    var li = document.createElement('li');
    li.classList.add = 'plus';
    li.textContent = '+';
    ul.appendChild(li);
    li.addEventListener('click', addFile.bind(null, data));
  }
}

function addFile(data, e) {
  var li = document.createElement('li');
  li.classList.add = 'li';
  var child = {name: 'new stuff'};
  data.children.push(child);
  li.textContent = child.name;
  li.addEventListener('dblclick', changeToFolder.bind(null, child));

  e.target.parentElement.insertBefore(li, e.target.parentElement.lastChild);
}

function changeToFolder(data, e) {
  e.stopPropagation();

  var clickedli = e.target;

  if (data.children) {
    toggleFolder.call(clickedli);
    return;
  } else {
    data.children = [];
  }

  var span = document.createElement('span');
  span.textContent = ' [-]';
  clickedli.appendChild(span);

  var ul = document.createElement('ul');
  ul.classList.add = 'ul';
  clickedli.appendChild(ul);

  var li = document.createElement('li');
  li.classList.add = 'li';
  var child = {name: 'new stuff'};
  data.children.push(child);

  li.textContent = child.name;
  ul.appendChild(li);
  li.addEventListener('dblclick', changeToFolder.bind(null, child));

  var li = document.createElement('li');
  li.classList.add = 'plus';
  li.textContent = '+';
  ul.appendChild(li);
  li.addEventListener('click', addFile.bind(null, data));
}

function toggleFolder() {
  if (this.childNodes[2].style.display === 'none') {
    this.childNodes[1].textContent = ' [-]';
    this.childNodes[2].style.display = 'block';
  } else {
    this.childNodes[1].textContent = ' [+]';
    this.childNodes[2].style.display = 'none';
  }
}

/* DO NOT REMOVE */
module.hot.accept();
/* DO NOT REMOVE */
