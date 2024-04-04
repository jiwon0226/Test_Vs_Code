//날짜를 가져옴
let date = new Date();
//한달치 달력을 가져오는 함수
const renderCalendar = () => {
  const viewYear = date.getFullYear(); //오늘의 연도를(full) 담는 변수 viewYear
  const viewMonth = date.getMonth(); //오늘의 달을 담는 변수 viewMonth, 그렇지만 getMonth는 +1과 같이 쓰여야함 (작은 오류)

  // 달력 상단에 연도와 월 표시, 클래스 year-month (이하 빈 div임)의 텍스트 내용을 아래와 같이 바꿈
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 지난 달의 마지막 날짜와 이번 달의 마지막 날짜를 구함
  const prevLast = new Date(viewYear, viewMonth, 0); //이전달의 마지막 날, date파라미터 부분에 0을 넣으면 마지막날을 뜻함
  const thisLast = new Date(viewYear, viewMonth + 1, 0);//현재달의 마지막 날, 이전달+1

  const PLDate = prevLast.getDate(); // 지난 달의 마지막 날짜(날짜만 가져옴)
  const PLDay = prevLast.getDay(); // 지난 달의 마지막 요일(요일만 가져옴)

  const TLDate = thisLast.getDate(); // 이번 달의 마지막 날짜(날짜만 가져옴)
  const TLDay = thisLast.getDay(); // 이번 달의 마지막 요일(요일만 가져옴)

  // 이전 달, 이번 달, 다음 달의 날짜들을 계산
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 이번 달의 날짜들, .key()는 31개면 0~30의 숫자를 반환함
  //...은 반환된 Iterator를 개별 요소로 확장하여, 그 값들을 새로운 배열에 담음. slice(1)은 배열을 복사 할 수 있는데 1~복사함
  const nextDates = [];

  // prevDates 계산
  if (PLDay !== 6) { //토요일은 6으로 꽉차서,일~금인 0~5
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i); //unshift 메서드는 배열의 맨 앞에 하나 이상의 요소를 추가하고, 배열의 새 길이를 반환
    } 
  }

  // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i)
  }

  // 모든 날짜를 합침
  const dates = prevDates.concat(thisDates, nextDates);

  // 각 날짜에 "this" 또는 "other" 클래스를 마킹하여 속하는 달을 구분
  const firstDateIndex = dates.indexOf(1); // 현재 달의 첫 날짜의 인덱스 1일
  const lastDateIndex = dates.lastIndexOf(TLDate); // 현재 달의 마지막 날짜의 인덱스 막일 즉 1~막일
  const dateElements = dates.map((date, i) => {
    let state_day_num = `${viewYear}${viewMonth+1}${date}`;
    const condition = i >= firstDateIndex && i <= lastDateIndex ? 'this' : 'other';
    return `<div class="date"><span class="${condition}" id='${state_day_num}'>${date}</span></div>`;
  });

  // 달력에 날짜들을 렌더링
  document.querySelector('.dates').innerHTML = dateElements.join(''); //join()은 , join('')은 그냥 아무것도 없이 붙인다는 뜻
  
  const select_date = document.querySelector("#state_day_num");

  // 표시된 달과 연도가 오늘과 일치하는 경우 오늘 날짜를 강조
  const today = new Date();
  if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
    document.querySelectorAll('.this').forEach(dateDiv => {
      if (+dateDiv.textContent === today.getDate()) {
        dateDiv.classList.add('today');
      }
    });
  }
}

// 달력의 초기 렌더링을 실행
renderCalendar();

// 월을 넘기는 기능들
const prevMonth = () => {
  date.setDate(1); //31일달 -> 30달인 달로 넘어갈때(혹은반대) 생기는 오류 방지로, 해당달의 1일로 날짜 설정후
  date.setMonth(date.getMonth() - 1)//달을 옮긴다. 8월 31일일에서 9월 31일로 넘어가면 없는 날짜라 10월로 넘어가기 때문
  renderCalendar();
}

const nextMonth = () => {
  date.setDate(1); 
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

const goToday = () => {
  date = new Date();
  renderCalendar();
}

//000000000000000000000000000000000000000000
//const selectStateButs = document.querySelectorAll("#todo_state button");
const todoInput = document.querySelector("#input_put input");
const hardEasyButs = document.querySelectorAll("#input_put button");
//const hardEasyList = ["낮음", "보통", "높음", "아주 높음"];
//let hardNum;
const addButton = document.getElementById("add_but");
const todoContainer = document.getElementById("todoes_box");
const selectss = document.querySelectorAll(".dates date");

selectss.forEach((element) => {
    element.addEventListener("click", (a) => {
      selectss.forEach((element) => element.classList.remove("IsSelect"));
      a.target.classList.add("IsSelect"); //날짜 선택
  
      const todoList = document.querySelectorAll("#todoes_box div");
      
        todoList.forEach((element) => {
          if (a.target.children[0].id!=element.children[0].class) {
            element.style = "display:none";
          } else {
            element.style = "display:block";
          }
        });
      } 
    )
   
  });
/*
// 완료, 미완료 상태
selectStateButs.forEach((element) => {
  element.addEventListener("click", (a) => {
    selectStateButs.forEach((element) => element.classList.remove("IsSelect"));
    a.target.classList.add("IsSelect");

    const todoList = document.querySelectorAll("#todoes_box div");
    if (a.target.innerText == "완료") {
      todoList.forEach((element) => {
        if (!element.children[0].checked) {
          element.style = "display:none";
        } else {
          element.style = "display:block";
        }
      });
    } else if (a.target.innerText == "미완료") {
      todoList.forEach((element) => {
        if (element.children[0].checked) {
          element.style = "display:none";
        } else {
          element.style = "display:block";
        }
      });
    } else {
      todoList.forEach((element) => {
        element.style = "display:block";
      });
    }
  });
});
*/

/*
// 난이도 버튼
hardEasyButs.forEach((element) => {
  if (element.id !== "add_but") {
    element.addEventListener("click", (a) => {
      hardEasyButs.forEach((element) => element.classList.remove("IsSelect"));
      a.target.classList.add("IsSelect");
      hardNum = a.target.value;
    });
  }
});
*/

const write_todolist=()=>{
  const div = document.createElement("div");
  selectss.forEach((element) => {
    if (element.class == "IsSelect")
    div.classList.add(element.children[0].id);
})
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  div.appendChild(checkbox);

  const span = document.createElement("span");
  span.innerText = todoInput.value;
  todoInput.value = "";

  div.appendChild(span);
}

// todo list 추가 버튼
addButton.addEventListener("click", () => {
  if (todoInput.value == "") {
    alert("할 일을 입력해주세요.");
    return;
  }
  /*
  if (hardNum == undefined) {
    alert("난이도를 선택해주세요.");
    return;
  }
  */

  write_todolist()
  

  /*
  const button = document.createElement("span");
  button.innerText = " [ "+hardEasyList[Number(hardNum)]+" ]";
  switch (Number(hardNum)) {
    case 0:
      button.classList.add("blue-text");
      break;
    case 1:
      button.classList.add("yellow-text");
      break;
    case 2:
      button.classList.add("orange-text");
      break;
    case 3:
      button.classList.add("red-text");
      break;
    default:
      break;
  }
  button.value = Number(hardNum);
  hardNum = null;
  hardEasyButs.forEach((element) => element.classList.remove("IsSelect"));

  div.appendChild(button);
  */
  todoes_box.appendChild(div);
});
