import {numberOfEquations} from "../app.js";
import {parameters} from "./find.js";

const solutionArea = document.getElementById("solution");

export function printEquations(){
    const equationsLabel = document.createElement('div');
    equationsLabel.className = "solutions-label";
    equationsLabel.innerHTML = "$$\\underline{Equations:}$$";
    solutionArea.appendChild(equationsLabel);
  
    const matrix = parameters.matrix;
    const equations = document.createElement('div');
    equations.className = "equatinos-display";
    
    for(let row = 0; row < numberOfEquations; row++){
      let equation = document.createElement('div');
      equation.innerHTML = `$$`;
  
      let firstNonZeroCoofFound = false;
      for(let col = 0; col < numberOfEquations; col++){
        let coof = +matrix[row][col];
        let varSubScript = col +1;
        if(coof === 0) {
          continue
        };
        if(coof > 0) {
          if(!firstNonZeroCoofFound){
            equation.innerHTML += `${coof} x_${varSubScript} `;
            firstNonZeroCoofFound = true;
          }
          else equation.innerHTML += `+${coof} x_${varSubScript} `;
        }
        else {
          equation.innerHTML += `${coof} x_${varSubScript} `;
          firstNonZeroCoofFound = true;
        }
      }
      let constant = matrix[row][numberOfEquations];
      equation.innerHTML += `= ${constant}$$`;
      equation.style.height = "1.8rem"
  
      equations.appendChild(equation);
    }
  
    solutionArea.appendChild(equations);
  }