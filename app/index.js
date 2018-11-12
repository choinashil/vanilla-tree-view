// Load application styles
import 'styles/index.less';

// Load tree data
import TREE_DATA from './data';

// ================================
// START YOUR APP HERE
// ================================
var content = document.querySelector('.content');

// title
document.querySelector('h1').innerText=TREE_DATA.name;

makeList(content, TREE_DATA);

// 초기구조 생성
function makeList (target, data) {

  var ul = document.createElement('ul');
  ul.className='ul'
  target.appendChild(ul);

  for(var i=0; i<data.children.length;i++){
    var li=document.createElement('li');
    li.className='li';
    li.innerText=data.children[i].name;
    ul.appendChild(li);

    // 더블클릭하면 파일->폴더 변경
    li.addEventListener('dblclick', changeToFolder.bind(li, data.children[i]));

    if(data.children[i].children){
      // 폴더 펼침 버튼 만들기 [+][-]
      var span= document.createElement('span');
      span.innerText=' [-]';
      li.appendChild(span);
      // 자식요소 생성
      makeList(li, data.children[i]);
    }
  }

  // 폴더마다 제일 밑에 +버튼 만들고, 클릭하면 폴더내 li 추가
  if(li.childNodes){
    var li=document.createElement('li');
    li.className='plus';
    li.innerText='+';
    ul.appendChild(li);

    li.addEventListener('click', addFile.bind(ul, data));
  }
}

// addFile
function addFile(data, e){
  var li=document.createElement('li');
  li.className='li';
  var child = {name: 'new stuff'};
  data.children.push(child);
  li.innerText=child.name;

  li.addEventListener('dblclick', changeToFolder.bind(li, child));
  this.insertBefore(li, this.lastChild);

  console.log(TREE_DATA);
}


function changeToFolder(data, e){
  e.stopPropagation();

  // console.log(this);
  var clickedli=this;

  // 파일일때만 폴더로 변경가능
  if(data.children){
    foldToggle.call(clickedli);
    return;
  }else{
    data.children=[];
  }

  var newFolder = e.target;

  var span = document.createElement('span');
  span.innerText=' [-]';
  newFolder.appendChild(span);

  var ul = document.createElement('ul');
  ul.className='ul';
  newFolder.appendChild(ul);

  var li=document.createElement('li');
  li.className='li';
  var child = {name: 'new stuff'};
  data.children.push(child);

  li.innerText=child.name;
  li.addEventListener('dblclick', changeToFolder.bind(li, child));

  ul.appendChild(li);

  // 폴더마다 제일 밑에 +버튼 만들고, 클릭하면 폴더내 li 추가
  var li=document.createElement('li');
  li.className='plus';
  li.innerText='+';
  ul.appendChild(li);
  li.addEventListener('click', addFile.bind(ul, data));

  console.log(TREE_DATA);
}

// 폴더 접었다 폈다
function foldToggle(){
  if(this.childNodes[2].style.display === 'none'){
    this.childNodes[1].innerText = ' [-]';
    this.childNodes[2].style.display = 'block';
  }else{
    this.childNodes[1].innerText = ' [+]';
    this.childNodes[2].style.display = 'none';
  }
}

console.log(TREE_DATA);


/* DO NOT REMOVE */
module.hot.accept();
/* DO NOT REMOVE */
