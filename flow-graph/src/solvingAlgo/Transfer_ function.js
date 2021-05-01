export function transferFunction(paths, loops){
    // get the loop from loops object and path from paths object
    const path = paths.paths;
    const pathGain = paths.gains;

    const loop = loops.loops;
    const loopGain = loops.gains;
    
    const pathsNumber = path.length;

    //Mason rule = 1/deter * sum[pathGain(i) * deter(i)]

    //1st: calculate delta system
    const systemDeterminant = deltaCalculator(loop, loopGain);

    //2nd: calculate deltas path
    const deltas = deltasOfPaths(path, loop, loopGain);
    //3rd: calculate sum[pathGain(i) * deter(i)]
    let variableSum = 0;
    for(let i=0; i<pathsNumber; i++){
        variableSum += pathGain[i] * deltas[i];
    }
    
    //4th put it all together using mason's rule
    const transferFunctionValue = (1/systemDeterminant)*variableSum;
    return {
        transferFunction : transferFunctionValue,
        deltas: deltas,
        systemDelta: systemDeterminant
    };
}

function deltaCalculator(loop, loopGain){
    let delta = 1;
    //individual loop
    let individualGains = 0;
    for(let i=0; i<loop.length; i++){
        individualGains += loopGain[i];
    }
    delta -= individualGains;
    let individualsCounter = loop.length;
    let currentCombinations = [...loop];
    let currentCombinationsGains = [...loopGain];

    //getting combinations of each independent loop sing
    let sign = -1;
    while(individualsCounter > 0){
        sign *= -1;
        individualsCounter = 0;
        let combinations = [];
        let combinationsGains = [];
        for(let i=0; i<currentCombinations.length; i++){
            for(let j=i+1; j<loop.length; j++){
                //if two loops/combinations found non connecting then we add the new concat to be checked with the next concat
                //and the gain resulting becomes the new gain
                if(isIndependent(currentCombinations[i], loop[j])){
                    combinations.push(concatenateNodes(currentCombinations[i], loop[j]));
                    combinationsGains.push(currentCombinationsGains[i]*loopGain[j]);
                    individualsCounter++;
                    // add/subtract the resulting gain to delta
                    delta += sign*currentCombinationsGains[i]*loopGain[j];
                }
            }
        }
        //making the resulting concatination the new current combinations to check with individuals to make new conc
        currentCombinations = [...combinations];
        currentCombinationsGains = [...combinationsGains];
    }
    return delta;
}

function deltasOfPaths(path, loop, loopGain){
    let deltas = [];
    let remainingLoops = [];
    let remainingGains = [];
    // to check for loops that touch a certain path, if they do they will be discarded
    for(let i=0; i<path.length; i++){
        remainingLoops = [];
        remainingGains = [];
        for(let j=0; j<loop.length; j++){
            if(isIndependent(path[i], loop[j])){
                remainingLoops.push(loop[j]);
                remainingGains.push(loopGain[j]);
            }
        }
        deltas.push(deltaCalculator(remainingLoops, remainingGains));
    }
    return deltas;
}

//**********HELPER FUNCTIONS
function isIndependent(nodes1, nodes2){
    for(let i=0; i<nodes1.length; i++){
        for(let j=0; j<nodes2.length; j++){
            if(nodes1[i] == nodes2[j]){
                return false;
            }
        }
    }
    return true;
}
function concatenateNodes(loop1, loop2){
    let nodeSet = new Set();
    for(let i=0; i<loop1.length; i++) nodeSet.add(loop1[i]);
    for(let i=0; i<loop2.length; i++) nodeSet.add(loop2[i]);

    let nodeArray = [];
    for(let node of nodeSet){
        nodeArray.push(node);
    }
    return nodeArray;
}

// const loops = {
//     loop : [[3,4,3], [4,5,4], [6,6], [2,6,5,2], [2,3,4,5,2]],
//     loopGain : [-10,-4,-1,-20,-100]
// };
// const paths = {
//     path : [[1,2,3,4,5], [1,2,6,5]],
//     pathGain : [100, 20]
// }

// console.log("test---------------------");
// console.log(transferFunction(paths, loops));