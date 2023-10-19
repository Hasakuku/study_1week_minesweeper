const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// 게임 세팅
function gameStart() {
  let mines = placeMines(18, 9, 9);  // 9X9 셀과 18개의 지뢰 세팅
  gameSet(mines);

  function gameSet(mineArr) {
    let tag = "<table border='1'>";
    for (let i = 0; i < mineArr.length; i++) {
      tag += "<tr>";
      for (let j = 0; j < mineArr[i].length; j++) {
        // 지뢰에 x,y 좌표 생성
        // mine 과 empty 클래스 삽입
        tag += `<td class="${mineArr[i][j] === 1 ? 'mine' : 'empty'}">${i}.${j}</td>`;
      }
      tag += "</tr>";
    }
    tag += "</table>";
    area.innerHTML = tag;
  }
  cellEvent(9, 9)
}

// 지뢰 랜덤 생성 함수
function placeMines(numMines, numRows, numCols) {
  // 지뢰 초기화
  let mineArr = Array(numRows).fill().map(() => Array(numCols).fill(0));
  // 지뢰 랜덤 생성
  for (let i = 0; i < numMines; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * numRows); // 지뢰 x좌표
      col = Math.floor(Math.random() * numCols); // 지뢰 y좌표
    } while (mineArr[row][col] === 1); // 지뢰 유무
    mineArr[row][col] = 1; // 지뢰생성
  }
  /*for (let i = 0; i < numMines; i++) {
    let row, col;
    while (mineArr[row][col] === 1) {
      row = Math.floor(Math.random() * numRows); // 지뢰 x좌표
     col = Math.floor(Math.random() * numCols); // 지뢰 y좌표
    } // 지뢰 유무
    mineArr[row][col] = 1; // 지뢰생성
  }*/

  return mineArr;
}

// 셀 이벤트
function cellEvent(numRows, numCols) {
  let cells = document.querySelectorAll('#area td'); // 모든 셀 접근
  cells.forEach(cell => { // 셀 순회
    cell.addEventListener('click', function () {
      if (this.classList.contains('mine')) { // 셀에 지뢰 있으면?
        this.classList.remove('mine'); // mine 클래스 제거
        this.classList.add('mineExplo'); // minExplo 클래스 추가(지뢰터짐 이미지)
      } else { // cell이 지뢰가 없다면?
        let [row, col] = this.textContent.split('.').map(Number); // cell의 좌표 숫자로 변환
        let count = 0; // 주변 지뢰 수 초기값
        for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, numRows - 1); i++) { // 인접 셀의 x범위
          for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, numCols - 1); j++) { // 인접 셀의 y범위
            let xAdj = document.querySelector(`tr:nth-child(${i + 1})`) // 인접 셀 x좌표 접근
            let yAdj = xAdj.querySelector(`td:nth-child(${j + 1})`) // 인접 셀 x좌표의 y좌표 접근
            if (yAdj.classList.contains('mine')) { // mine 클래스 존재시 카운트 증가
              count++;
            }
          }
        }
        this.textContent = count >= 1 ? count : '';
        if (this.textContent !== '') { // 숫자가 있다면?
          this.classList.remove('empty')
          this.classList.add('cellNum') // 숫자 색상 추가
        }
      }
    });
  });
}

startBtn.addEventListener('click', gameStart)
//////////////////////////////////////////


