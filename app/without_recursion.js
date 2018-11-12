// Load application styles
import 'styles/index.less';

// Load tree data
import TREE_DATA from './data';

// ================================
// START YOUR APP HERE
// ================================
var content = document.querySelector('.content');
var stage=0;

// title
document.querySelector('h1').innerText=TREE_DATA.name;


makeList(content, TREE_DATA);

// 재귀로 ul,li 생성
function makeList (target, data) {
  stage++;
  var ul = document.createElement('ul');
  ul.className='ul_'+stage;
  target.appendChild(ul);

  for(var i=0; i<data.children.length;i++){
    var li=document.createElement('li');
    li.className='li';
    li.innerText=data.children[i].name;
    ul.appendChild(li);

    // 더블클릭하면 파일->폴더 변경
    li.addEventListener('dblclick', changeToFolder.bind(li, data.children[i]));

    if(data.children[i].children){
      makeList(li, data.children[i]);
    }
  }

  // 폴더마다 제일 밑에 +버튼 만들고, 클릭하면 폴더내 li 추가
  if(li.childNodes){
    var li=document.createElement('li');
    li.className='li';
    li.innerText='+';
    ul.appendChild(li);

    li.addEventListener('click', addFile);
  }
}

// addFile
function addFile(e){
  var li=document.createElement('li');
  li.className='li';
  var child = {name: 'new stuff'};
  data.children.push(child);

  li.innerText=child.name;
  li.addEventListener('dblclick', changeToFolder.bind(li, child));

  ul.appendChild(li);

  console.log(TREE_DATA);
}


//재귀 돌기 전 for문 돌렸던 코드

//첫번째 계층
// ul_1=document.createElement("ul");
// content.appendChild(ul_1);
// for(var i=0; i<TREE_DATA.children.length;i++){
//   li_1=document.createElement("li");
//   li_1.innerText=TREE_DATA.children[i].name;
//   ul_1.appendChild(li_1);
//
//   // 두번째 계층
//   if(TREE_DATA.children[i].children){
//     ul_2=document.createElement("ul");
//     li_1.appendChild(ul_2);
//       for(var j=0; j<TREE_DATA.children[i].children.length;j++){
//         li_2=document.createElement("li");
//         li_2.innerText=TREE_DATA.children[i].children[j].name;
//         ul_2.appendChild(li_2);
//
//         // 세번째 계층
//         if(TREE_DATA.children[i].children[j].children){
//           ul_3=document.createElement("ul");
//           li_2.appendChild(ul_3);
//             for(var k=0; k<TREE_DATA.children[i].children[j].children.length;k++){
//               li_3=document.createElement("li");
//               li_3.innerText=TREE_DATA.children[i].children[j].children[k].name;
//               ul_3.appendChild(li_3);
//             }
//         }
//       }
//   }
// }

// 파일 더블클릭하면 폴더로 변신 !
// 1. ul 생성하고, 안에 파일(li) 1개 기본적으로 생성하기
// 2. TREE_DATA에 구조 추가하기

// bind 공부하기
// 새로 생성된 li에 이벤트 걸기
// ul 더블클릭시 새파일 생기지 않게 ul, li 구분하기

// data = data.children[i] -> testㅇㅔ서는 hello

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

  console.log(TREE_DATA);
}

function foldToggle(){
  console.log(this);
  console.log(this.childNodes[1]);

  var display = this.childNodes[1].style.display;

  if(this.childNodes[1].style.display === 'none'){
    this.childNodes[1].style.display = 'block';
  }else{
    this.childNodes[1].style.display = 'none';
  }
}


console.log(TREE_DATA);

/* DO NOT REMOVE */
module.hot.accept();
/* DO NOT REMOVE */
