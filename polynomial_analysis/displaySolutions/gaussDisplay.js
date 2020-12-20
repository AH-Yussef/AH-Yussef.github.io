import { numberOfEquations } from "../app.js";
import {printEquations} from "./generalFunctions.js";

const solutionArea = document.getElementById("solution");

function printSolutionStatus(solution){
  const solutionsStatus = +solution.solutionStatus;
  const solutionStatusContainer = document.createElement('div');
  if(solutionsStatus === 0){
    solutionStatusContainer.innerHTML = "$$\\text{The system has no solution}$$";
    return false;
  }
  else if(solutionsStatus === 1){
    solutionStatusContainer.innerHTML = "$$\\text{The system has a unique solution}$$";
    solutionArea.appendChild(solutionStatusContainer);
    return true;
  }
  else{
    solutionStatusContainer.innerHTML = "$$\\text{The system has an infinite number of Solutions}$$";
    solutionArea.appendChild(solutionStatusContainer);
    return false;
  }
}
function printFinalAnswer(solution){
  const finalAnswerLabel = document.createElement('div');
  finalAnswerLabel.className = "solutions-label";
  finalAnswerLabel.innerHTML = "$$\\underline{\\text{Final answer:}}$$";
  solutionArea.appendChild(finalAnswerLabel);

  const finalAnswer = solution.finalAnswer;
  const finalAnswerContainer = document.createElement('div');
  finalAnswerContainer.className = "answers-display";

  for(let i = 0; i < numberOfEquations; i++){
    const singleAnswer = document.createElement('div');
    singleAnswer.innerHTML = `$$x_${i+1}=${finalAnswer[i]}$$`;
    singleAnswer.className = "single-step";
    finalAnswerContainer.appendChild(singleAnswer);
  }

  solutionArea.appendChild(finalAnswerContainer);
}

function printMatrixSteps(solution){
  const matrixStepsLabel = document.createElement('div');
  matrixStepsLabel.className = "solutions-label";
  matrixStepsLabel.innerHTML = "$$\\underline{Steps:}$$";
  solutionArea.appendChild(matrixStepsLabel);

  const steps = solution.steps;
  const numberOfSteps = steps.length;

  const allStepsContainer = document.createElement('div');
  allStepsContainer.className = "steps-display";

  for(let step = 0; step < numberOfSteps; step++){
    const currentStep = steps[step];
    const discreption =  currentStep.discreption;
    const matrix = currentStep.matrix;

    const stepContaineer = document.createElement('div');
    stepContaineer.className = "step-container";

    const discreptionContainer = document.createElement('div');
    discreptionContainer.innerHTML = `$$\\text{${discreption}}$$`;
    discreptionContainer.className = "single-step";
    stepContaineer.appendChild(discreptionContainer);

    const matrixContainer = document.createElement('div');
    matrixContainer.className = "single-step";
    matrixContainer.innerHTML = `$$\\begin{bmatrix}`;
    for(let i = 0; i < numberOfEquations; i++){
      const matrixRow = matrix[i];
      for(let j = 0; j < numberOfEquations; j++){
        matrixContainer.innerHTML += `${matrixRow[j]} &`;
      }
      matrixContainer.innerHTML += `${matrixRow[numberOfEquations]} \\\\`;
    }
    matrixContainer.innerHTML += `\\end{bmatrix}$$`;
    stepContaineer.appendChild(matrixContainer);
    allStepsContainer.appendChild(stepContaineer);
  }
  solutionArea.appendChild(allStepsContainer);
}

function printBackwardSub(solution){
  const backWardSubLabel = document.createElement('div');
  backWardSubLabel.className = "solutions-label";
  backWardSubLabel.innerHTML = "$$\\underline{\\text{Backward substitution:}}$$";
  solutionArea.appendChild(backWardSubLabel);

  const backwardSubContainer = document.createElement('div');
  backwardSubContainer.className = "answers-display";

  const backSubSteps = solution.backwardSub;

  for(let i = 0; i < numberOfEquations; i++){
    const currVarIndex = i+1;
    const step = backSubSteps[i];
    const formula = step.formula;
    const subValues = step.values;
    const finalAnswer = solution.finalAnswer;

    let stepStr = `$$x_${i+1}=\\frac`;
    let numerator = `${formula[0]}`;
    let denominator = `${formula[formula.length -1]}`
    let varIndex = 1;
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
      console.log(subValues[j-1]);
      if(coof == 0) continue;
      else if(coof > 0) numerator += `+${coof}(${subValues[j-1]})`;
      else numerator += `${coof}(${subValues[j-1]})`;
    }
    stepStr += `{${numerator}}{${denominator}} = ${finalAnswer[i]}$$`;

    const stepContainer = document.createElement('div');
    stepContainer.className = "single-step";
    stepContainer.innerHTML = stepStr;

    backwardSubContainer.appendChild(stepContainer);
  }
  solutionArea.appendChild(backwardSubContainer);
}

export function displayGaussSolution(solution){
  printEquations();
  const hasUniqueSoln = printSolutionStatus(solution);
  if(hasUniqueSoln) printFinalAnswer(solution);
  printMatrixSteps(solution);
  if(hasUniqueSoln) printBackwardSub(solution);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub])
} 