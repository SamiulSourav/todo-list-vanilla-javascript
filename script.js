let alltask=[];
let newtask=document.querySelector('#inputTask');
var buttonFlag=0;

function addTask(){
    let addingTask={};
    let inputTask;
    inputTask=newtask.value;
    addingTask.title=inputTask;
    addingTask.check=false;
    alltask.push(addingTask);
    newtask.value="";
    newtask.focus();
    if(buttonFlag==0 || buttonFlag==1) showall();
    if(buttonFlag==2) showCompleted();
    if(buttonFlag==3) showNotCompleted();
}

let button=document.getElementById('add');
button.addEventListener("click",addTask);
newtask.addEventListener('keypress',function(e){
    if(e.key==='Enter') addTask();
});


// toggle back to default colors of the buttons

function defNot(){
    notCompletedBtn.style.backgroundColor="lightskyblue";
    notCompletedBtn.style.color="black";
}
function defCom(){
    completedBtn.style.backgroundColor="lightgreen";
    completedBtn.style.color="black";
}
function defAll(){
    showAllBtn.style.backgroundColor="rgb(190, 190, 190)";
    showAllBtn.style.color="black";
}
function defCle(){
    clearBtn.style.backgroundColor="lightcoral";
    clearBtn.style.color="black";
}




function createLI(obj,ind){
    let li=document.createElement('li');
    label=document.createElement('label');
    label.innerText=obj.title;
    li.appendChild(label);
    let chekk=document.createElement('input');
    chekk.type='checkbox';
    chekk.checked=obj.check;
    li.prepend(chekk);

    label.addEventListener('dblclick',function editTextInput(){
        let text=label.innerText;
        let input=document.createElement('input');
        input.value=text;
        label.innerText="";
        label.appendChild(input);
        input.focus();
        input.addEventListener('blur',function (){
          label.innerText=input.value;
        });
        input.addEventListener('keypress',function (event){
          if(event.key=="Enter"){
            label.innerText=input.value;
          }
        });
    });
    chekk.addEventListener('change',function done(){
        let li=this.parentNode;
        let chekk=li.firstElementChild;
        if(chekk.checked==true) alltask[ind].check=true;
        else alltask[ind].check=false;
        let label=li.querySelector('label');
        if(chekk.checked==true) label.style.textDecoration='line-through';
        else label.style.textDecoration='none';
        if(buttonFlag==0 || buttonFlag==1) showall();
        if(buttonFlag==2) showCompleted();
        if(buttonFlag==3) showNotCompleted();
    });

    let span=document.createElement('span');
    let txt=document.createTextNode('x');
    span.className='delete';
    span.addEventListener('click',function removeTask(ind){
        alltask.splice(ind,1);
        if(buttonFlag==0 || buttonFlag==1) showall();
        if(buttonFlag==2) showCompleted();
        if(buttonFlag==3) showNotCompleted();
    });
    span.appendChild(txt);
    li.appendChild(span);
    return li;
}

// show buttons

    let whichButtonIsOn=document.getElementById('buttonON');

let showAllBtn = document.getElementById('showall');
showAllBtn.addEventListener('click',showall);
function showall(){
    defCle();
    defCom();
    defNot();
    buttonFlag=1;
    whichButtonIsOn.innerText="All Tasks:"
    showAllBtn.style.color="white";
    showAllBtn.style.backgroundColor="rgb(90, 90, 90)";
    let ol=document.createElement('ol');
    let state=document.getElementById('state');
    if(alltask.length==0) {
        state.innerText="There is no tasks";
    }
    else{
        state.innerText="";
    }
    for(let i=0;i<alltask.length;i++) {
        let li=createLI(alltask[i],i);
        ol.appendChild(li);
    }
    print(ol);
}

let completedBtn=document.getElementById('completed');
completedBtn.addEventListener('click',showCompleted);
function showCompleted(){
    defAll();
    defCle();
    defNot();
    buttonFlag=2;
    whichButtonIsOn.innerText="All Completed Tasks:";
    completedBtn.style.color="white";
    completedBtn.style.backgroundColor="green";   
    let ol=document.createElement('ol');
    let cnt=0;
    for(let i=0;i<alltask.length;i++){
        let chek=alltask[i].check;
        if(chek==false) continue;
        else {
            cnt++;
            let li=createLI(alltask[i],i);
            ol.appendChild(li);
        }
    }
    let state=document.getElementById('state');
    if(cnt==0) {
        state.innerText="No completed task";
    }
    else{
        state.innerText="";
    }
    print(ol);
}


let notCompletedBtn=document.getElementById('notCompleted');
notCompletedBtn.addEventListener('click',showNotCompleted);
function showNotCompleted(){
    defAll();
    defCle();
    defCom();
    buttonFlag=3;
    whichButtonIsOn.innerText="All To-Be-Done Tasks:";
    notCompletedBtn.style.color="white";
    notCompletedBtn.style.backgroundColor="blue";
    let ol=document.createElement('ol');
    let cnt=0;
    for(let i=0;i<alltask.length;i++) {
        let chek=alltask[i].check;
        if(chek==true) continue;
        else {
            let li=createLI(alltask[i],i);
            ol.appendChild(li);
            cnt++;
        }
    }
    let state=document.getElementById('state');
    if(cnt==0) {
        state.innerText="All Completed";
    }
    else{
        state.innerText=" ";
    }
    print(ol);
}


let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click',clearCompleted);
function clearCompleted(){
    defAll();
    defNot();
    defCom();
    clearBtn.style.color="white";
    clearBtn.style.backgroundColor="coral";
    let copy=[];
    for(let i=0;i<alltask.length;i++) {
        let chek=alltask[i].check;
        if(chek==true) continue;
        else copy.push(alltask[i]);
    }
    alltask=copy;
    if(buttonFlag==0 || buttonFlag==1) {
        showall();
    }
    if(buttonFlag==2){
        showCompleted();
    }
    if(buttonFlag==3){
        showNotCompleted();
    }
}

function print(ol){
    let dd=document.getElementById('div');
    dd.outerHTML="<div id='div'> </div>";
    let cc=document.getElementById('div');
    cc.appendChild(ol);
}
