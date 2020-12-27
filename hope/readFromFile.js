const fileInput = document.getElementById("file-input");

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    });
}

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

    console.log(matrix);
    return matrix;
}