const pageDetail =
  'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';

let currentInd;

const contentDiv = document.createElement('div');
contentDiv.classList.add('content');
contentDiv.setAttribute('id', 'content');

const buttonDiv = document.createElement('div');
buttonDiv.classList.add(
  'btn-group',
  'me-2',
  'justify-content-center',
  'd-flex'
);
buttonDiv.setAttribute('id', 'buttondiv');
buttonDiv.setAttribute('role', 'group');
buttonDiv.setAttribute('aria-label', 'First group');

const getPageDetail = async (id) => {
  let getId = parseInt(id);
  let iStarting = getId - 1;
  const response = await fetch(pageDetail);
  const data = await response.json();
  // const newPageDiv = document.createElement('div');
  // newPageDiv.classList.add('newPage');
  // newPageDiv.setAttribute('id', id + 'newPage');
  for (let i = iStarting * 10; i < getId * 10; i++) {
    // console.log(data[i]);
    mainContent(data[i]);
  }
};

let mainContent = (data) => {
  const content = document.createElement('div');
  content.classList.add('eachperson');
  content.setAttribute('id', data.id);
  content.setAttribute('name', 'person');
  const contentName = document.createElement('h5');
  const contentEmail = document.createElement('h6');
  contentName.innerText = data.name;
  contentEmail.innerText = data.email;
  content.append(contentName, contentEmail);
  contentDiv.append(content);
  // document.body.append(contentDiv);
};

// const removePageDetail = () => {
//   console.log('Removal started ');
//   var theParent = document.getElementById('content');
//   console.log('Parent ' + theParent);
//   var theChildren = theParent.getElementsByClassName('eachperson');
//   console.log('Children ' + theChildren);
//   console.log('Children ' + theChildren.length);
//   for (var i = 0; i < theChildren.length; i++) {
//     console.log('Inside for loop ' + theChildren[i]);
//     theParent.removeChild(theChildren[i]);
//   }
// };

const createButtons = () => {
  const buttonEleFir = document.createElement('button');
  buttonEleFir.classList.add('btn', 'btn-info');
  buttonEleFir.setAttribute('type', 'button');
  buttonEleFir.addEventListener('click', (event) => {
    buttonPress(1);
  });
  buttonEleFir.innerText = 'First';
  buttonDiv.append(buttonEleFir);
  const buttonElePre = document.createElement('button');
  buttonElePre.classList.add('btn', 'btn-info');
  buttonElePre.setAttribute('type', 'button');
  buttonElePre.addEventListener('click', (event) => {
    if (currentInd > 1) {
      buttonPress(currentInd - 1);
    } else {
      alert('This is the first page');
    }
  });
  buttonElePre.innerText = 'Previous';
  buttonDiv.append(buttonElePre);

  for (let i = 1; i <= 10; i++) {
    const butName = document.createElement('button');
    butName.classList.add('btn', 'btn-primary');
    butName.setAttribute('type', 'button');
    butName.setAttribute('id', i);
    butName.addEventListener('click', (event) => {
      buttonPress(event.target.id);
    });
    butName.innerText = i;
    buttonDiv.append(butName);
  }

  const buttonEleNext = document.createElement('button');
  buttonEleNext.classList.add('btn', 'btn-info');
  buttonEleNext.setAttribute('type', 'button');
  buttonEleNext.addEventListener('click', (event) => {
    if (currentInd < 10) {
      buttonPress(currentInd + 1);
    } else {
      alert('This is the last page');
    }
  });
  buttonEleNext.innerText = 'Next';
  buttonDiv.append(buttonEleNext);
  const buttonEleLast = document.createElement('button');
  buttonEleLast.classList.add('btn', 'btn-info');
  buttonEleLast.setAttribute('type', 'button');
  buttonEleLast.addEventListener('click', (event) => {
    buttonPress(10);
  });
  buttonEleLast.innerText = 'Last';
  buttonDiv.append(buttonEleLast);

  document.body.append(contentDiv, buttonDiv);
};

function buttonPress(id) {
  if (id == null) {
    console.log('ID null is running');
    getPageDetail(1);
    createButtons();
    currentInd = 1;
  } else {
    var contDiv = document.getElementById('content');
    //e.firstElementChild can be used.
    var child = contDiv.lastElementChild;
    while (child) {
      contDiv.removeChild(child);
      child = contDiv.lastElementChild;
    }
    var buttDiv = document.getElementById('buttondiv');
    //e.firstElementChild can be used.
    var child = buttDiv.lastElementChild;
    while (child) {
      buttDiv.removeChild(child);
      child = buttDiv.lastElementChild;
    }
    console.log('ID clicked is ' + id);
    getPageDetail(id);
    createButtons();
    currentInd = id;
  }
}

buttonPress();
