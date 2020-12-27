const fileInput = document.getElementById("file-input");

fileInput.onchange = () => {
    if ('files' in fileInput && fileInput.files.length > 0){
      const file = fileInput.files[0];
      readFileContent(file)
      .then( content => {
        getMatrix(content);
        fileInput.value = "";
      })
      .catch( error => console.log(error))
    }
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    });
}


function getMatrix(content){
    const matrix = [];
    const matrixRows = content.split("\n");
    for(const row of matrixRows){
        if(row == "") continue;
        const matrixRow = [];
        const cols = row.split(' ');
        for(const elem of cols){
            matrixRow.push(+elem);
        }
        matrix.push(matrixRow);
    }

    changeAutomatically(matrix);
}

function changeAutomatically(matrix){
    const inputValue = matrix.length;
    if(inputValue < 2){
      numberOfEquationsInput.value = numberOfEquations;
      return;
    }
    if(inputValue == numberOfEquations) return;
    if(inputValue < numberOfEquations){
      const numOfEqnToBeDeleted = numberOfEquations - inputValue;
      for(let i = 0; i < numOfEqnToBeDeleted; i++){
        deleteEquation();
      }
    }
    if(inputValue > numberOfEquations){
      const numOfEqnToBeCreated = inputValue - numberOfEquations;
      for(let i = 0; i < numOfEqnToBeCreated; i++){
        createNewEquation();
      }
    }
  
    for(let i = 0; i < matrix.length; i++){
      let numberOfCurrentEqn = i + 1;
      for(let j = 0; j < matrix.length; j++){
        let coofInputId = `coof-${numberOfCurrentEqn}-${j+1}`;
        let currentCoofInput = document.getElementById(coofInputId);
        icurrentCoofInput.value = matrix[i][j];
      }
      let constInput = document.getElementById(`const-${numberOfCurrentEqn}`);
      constInput.value = matrix[i][matrix.length];
    }  
  }