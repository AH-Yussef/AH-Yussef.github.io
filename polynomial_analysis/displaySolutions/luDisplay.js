import {printEquations} from '../displaySolutions/generalFunctions.js';
import { printFinalAnswer } from "./generalFunctions.js";
import { numberOfEquations } from "../app.js"

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

    // const matrixContainer = document.createElement('div');
    // matrixContainer.className = "single-step";
    // matrixContainer.innerHTML = `$$L=\\begin{bmatrix}`;
    // for(let i = 0; i < numberOfEquations; i++){
    //   const matrixRow = matrix[i];
    //   for(let j = 0; j < numberOfEquations -1; j++){
    //     matrixContainer.innerHTML += `${matrixRow[j]} &`;
    //   }
    //   matrixContainer.innerHTML += `${matrixRow[numberOfEquations-1]} \\\\`;
    // }
    // matrixContainer.innerHTML += `\\end{bmatrix}$$`;
    // stepContaineer.appendChild(matrixContainer);
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
  container.appendChild(combined);

  solutionArea.appendChild(container); 
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
}