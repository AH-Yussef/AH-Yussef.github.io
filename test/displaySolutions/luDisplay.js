import {printEquations} from '../displaySolutions/generalFunctions.js';
import { printFinalAnswer } from "./generalFunctions.js";
import { numberOfEquations } from "../app.js"
import { parameters } from "./find.js";

const solutionArea = document.getElementById("solution");

function printCholeskySolutionStatus(solution){
  const isSymmetricMatrix = solution.symmetric;
  const isPositiveDefinite = solution.canBeSolved;

  const isCholeskyPossible = isSymmetricMatrix && isPositiveDefinite;
  const symmetricStr = isSymmetricMatrix ? 'symmetric': 'not symmetric';
  const posDefStr = isPositiveDefinite ? 'positive definite': 'not positive definite';
  const possibleStr = isCholeskyPossible ? 'possible': 'not possible';

  const solutionStatusContainer = document.createElement('div');
  solutionStatusContainer.className = "answers-dispaly";

  const info = document.createElement('div');
  info.className = "single-step";
  info.innerHTML = `$$\\text{Cholesky decomposition :} A=L⋅L^T, 
          \\text{Every symmetric positive definite matrix A can be decomposed into a product of a unique lower triangular matrix L and its transpose.}$$`;
  solutionStatusContainer.appendChild(info);

  const solutionStatus = document.createElement('div');
  solutionStatus.className = "single-step";
  solutionStatus.style.display = "flex";
  solutionStatus.style.justifyContent = "flex-start";
  
  solutionStatus.innerHTML = `$$\\text{Here A is ${symmetricStr} and ${posDefStr} so Cholesky decomposition is ${possibleStr}}$$`;
  solutionStatusContainer.appendChild(solutionStatus);

  solutionArea.appendChild(solutionStatusContainer);

  return isCholeskyPossible;
}

function printCholeskyEquations(solution){
  const stepsLabel = document.createElement('div');
  stepsLabel.className = "solutions-label";
  stepsLabel.innerHTML = "$$\\underline{Steps:}$$";
  solutionArea.appendChild(stepsLabel);

  const steps = solution.steps;
  const numberOfSteps = steps.length;

  const allStepsContainer = document.createElement('div');
  allStepsContainer.className = "steps-display";

  for(let step = 0; step < numberOfSteps; step++){
    const currentStep = steps[step];
    const discreption =  currentStep.discreption;
    const matrix = currentStep.L;

    const stepContaineer = document.createElement('div');
    stepContaineer.className = "step-container";

    const discreptionContainer = document.createElement('div');
    discreptionContainer.innerHTML = `${discreption}`;
    discreptionContainer.className = "single-step";
    stepContaineer.appendChild(discreptionContainer);

    allStepsContainer.appendChild(stepContaineer);
  }
  solutionArea.appendChild(allStepsContainer);
}

function printMatrix(solution){
  const container = document.createElement('div');
  container.className = "steps-display";
  
  const lMatrix = solution.LU.l_matrix;
  const lMatrixContainer = document.createElement('div');
  lMatrixContainer.className = "single-step";
  lMatrixContainer.innerHTML = `$$\\text{then } L=\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lMatrix[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      lMatrixContainer.innerHTML += `${matrixRow[j]} &`;
    }
    lMatrixContainer.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  lMatrixContainer.innerHTML += `\\end{bmatrix}$$`;
  container.appendChild(lMatrixContainer);

  const lTranspose = solution.LU.u_matrix;
  const lTransposeContaier = document.createElement('div');
  lTransposeContaier.className = "single-step";
  lTransposeContaier.innerHTML = `$$\\text{then } L^T=\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lTranspose[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      lTransposeContaier.innerHTML += `${matrixRow[j]} &`;
    }
    lTransposeContaier.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  lTransposeContaier.innerHTML += `\\end{bmatrix}$$`;
  container.appendChild(lTransposeContaier);

  const combined = document.createElement('div');
  combined.className = "single-step";
  combined.innerHTML = `$$\\text{then } A = \\begin{bmatrix}`;

  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lMatrix[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      combined.innerHTML += `${matrixRow[j]} &`;
    }
    combined.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  combined.innerHTML += `\\end{bmatrix}.`;

  combined.innerHTML += `\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lTranspose[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      combined.innerHTML += `${matrixRow[j]} &`;
    }
    combined.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  combined.innerHTML += `\\end{bmatrix}$$`;
  container.append(combined);

  const discreption = document.createElement('div');
  discreption.className = "single-step";
  discreption.innerHTML = `$$\\text{as } Ax = b \\text{then, }$$`;
  container.appendChild(discreption);

  const withSolution = document.createElement('div');
  withSolution.className = "single-step";
  withSolution.innerHTML = `$$\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lMatrix[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      withSolution.innerHTML += `${matrixRow[j]} &`;
    }
    withSolution.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  withSolution.innerHTML += `\\end{bmatrix}.`;

  withSolution.innerHTML += `\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lTranspose[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      withSolution.innerHTML += `${matrixRow[j]} &`;
    }
    withSolution.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  withSolution.innerHTML += `\\end{bmatrix}.\\begin{bmatrix}`;

  for(let i = 1; i < numberOfEquations; i++){
    withSolution.innerHTML += `x_${i}\\\\`;
  }
  withSolution.innerHTML += `x_${numberOfEquations}\\end{bmatrix} = \\begin{bmatrix}`;

  for(let i = 0; i < numberOfEquations-1; i++){
    withSolution.innerHTML += `${parameters.matrix[i][numberOfEquations]}\\\\`;
  }
  withSolution.innerHTML += `${parameters.matrix[numberOfEquations-1][numberOfEquations]}\\end{bmatrix}$$`

  container.appendChild(withSolution);

  solutionArea.appendChild(container); 
}

function printForwardHeader(solution){
  const label = document.createElement('div');
  label.className = "solutions-label";
  label.innerHTML = "$$\\underline{\\text{Forward elemination:}}$$";
  solutionArea.appendChild(label);

  const container = document.createElement('div');
  container.className = "steps-display";

  const lMatrix = solution.LU.l_matrix;
  container.innerHTML = `$$\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lMatrix[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      container.innerHTML += `${matrixRow[j]} &`;
    }
    container.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  container.innerHTML += `\\end{bmatrix}\\begin{bmatrix}`;

  for(let i = 1; i < numberOfEquations; i++){
    container.innerHTML += `y_${i}\\\\`;
  }
  container.innerHTML += `y_${numberOfEquations}\\end{bmatrix} = \\begin{bmatrix}`;

  for(let i = 0; i < numberOfEquations-1; i++){
    container.innerHTML += `${parameters.matrix[i][numberOfEquations]}\\\\`;
  }
  container.innerHTML += `${parameters.matrix[numberOfEquations-1][numberOfEquations]}\\end{bmatrix}$$`

  solutionArea.appendChild(container);
}

function printForwardElem(solution){
  const container = document.createElement('div');
  container.className = "answers-display";

  const forwardSteps = solution.forwardSub;
  const finalAnswer = solution.forwardRsults.reverse();

  for(let i = 0; i < numberOfEquations; i++){
    const currVarIndex = i+1;
    const step = forwardSteps[i];
    const formula = step.formula;
    const subValues = step.subValues;

    let stepStr = `$$y_${currVarIndex}=\\frac`;
    let numerator = `${formula[0]}`;
    let denominator = `${formula[formula.length -1]}`

    let varIndex = 1;
    for(let j = 1; j < formula.length -1; j++){
      if(varIndex === currVarIndex) varIndex++;
      const coof = formula[j];
      if(coof == 0) continue;
      else if(coof > 0) numerator += `+${coof} y_${varIndex++}`;
      else numerator += `${coof}y_${varIndex++}`;
    }

    stepStr += `{${numerator}}{${denominator}} = \\frac`

    numerator = `${formula[0]}`;
    for(let j = 1; j < formula.length -1; j++){
      const coof = formula[j];
      if(coof == 0) continue;
      else if(coof > 0) numerator += `+${coof}(${subValues[j-1]})`;
      else numerator += `${coof}(${subValues[j-1]})`;
    }
    stepStr += `{${numerator}}{${denominator}} = ${finalAnswer[numberOfEquations-i-1]}$$`;

    const stepContainer = document.createElement('div');
    stepContainer.className = "single-step";
    stepContainer.innerHTML = stepStr;

    container.appendChild(stepContainer);
  }
  solutionArea.appendChild(container);
}

function printBackwardSubHeader(solution){
  const label = document.createElement('div');
  label.className = "solutions-label";
  label.innerHTML = "$$\\underline{\\text{Backward substitution:}}$$";
  solutionArea.appendChild(label);

  const container = document.createElement('div');
  container.className = "steps-display";

  const lTranspose = solution.LU.u_matrix;
  const answers = solution.forwardRsults.reverse();

  container.innerHTML = `$$\\begin{bmatrix}`;
  for(let i = 0; i < numberOfEquations; i++){
    const matrixRow = lTranspose[i];
    for(let j = 0; j < numberOfEquations -1; j++){
      container.innerHTML += `${matrixRow[j]} &`;
    }
    container.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
  }
  container.innerHTML += `\\end{bmatrix}\\begin{bmatrix}`;

  for(let i = 1; i < numberOfEquations; i++){
    container.innerHTML += `x_${i}\\\\`;
  }
  container.innerHTML += `x_${numberOfEquations}\\end{bmatrix} = \\begin{bmatrix}`;

  for(let i = 0; i < numberOfEquations-1; i++){
    container.innerHTML += `${answers[i]}\\\\`;
  }
  container.innerHTML += `${answers[numberOfEquations-1]}\\end{bmatrix}$$`

  solutionArea.appendChild(container);
}

function printBackwardSub(solution){
  const backwardSubContainer = document.createElement('div');
  backwardSubContainer.className = "answers-display";

  const backSubSteps = solution.backwardSub;
  const finalAnswer = solution.finalAnswer;

  for(let i = 0; i < numberOfEquations; i++){
    const currVarIndex = numberOfEquations-i;
    const step = backSubSteps[i];
    const formula = step.formula;
    const subValues = step.subValues;

    let stepStr = `$$x_${currVarIndex}=\\frac`;
    let numerator = `${formula[0]}`;
    let denominator = `${formula[formula.length -1]}`
    let varIndex = currVarIndex;
    for(let j = 1; j < formula.length -1; j++){
      if(varIndex === currVarIndex) varIndex++;
      const coof = formula[j];
      if(coof == 0) continue;
      else if(coof > 0) numerator += `+${coof} x_${varIndex++}`;
      else numerator += `${coof}x_${varIndex++}`;
    }

    stepStr += `{${numerator}}{${denominator}} = \\frac`

    numerator = `${formula[0]}`;
    for(let j = 1; j < formula.length -1; j++){
      const coof = formula[j];
      if(coof == 0) continue;
      else if(coof > 0) numerator += `+${coof}(${subValues[j-1]})`;
      else numerator += `${coof}(${subValues[j-1]})`;
    }
    stepStr += `{${numerator}}{${denominator}} = ${finalAnswer[numberOfEquations-i-1]}$$`;

    const stepContainer = document.createElement('div');
    stepContainer.className = "single-step";
    stepContainer.innerHTML = stepStr;

    backwardSubContainer.appendChild(stepContainer);
  }
  solutionArea.appendChild(backwardSubContainer);
}

export function displayLUSolution(solution, luType){
    printEquations();
    if(luType == 3) {
      printCholesky(solution);
    }

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function printCholesky(solution){
  const showSteps = printCholeskySolutionStatus(solution);
  if(!showSteps) return;

  printFinalAnswer(solution);
  printCholeskyEquations(solution);
  printMatrix(solution);
  printForwardHeader(solution);
  printForwardElem(solution);
  printBackwardSubHeader(solution);
  printBackwardSub(solution);
}