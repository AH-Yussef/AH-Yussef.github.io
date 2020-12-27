//Gauss Elimination
const test = [[25,5,1,106.8],[64,8,1,177.2],[144,12,1,279.2]];

solution = {
    luCanBeFound: true, //or false
    systemBeSolved: true, //or false
    cholesky:{
        l:   [[25, 5, 1],
                     [0, -4.8, -1.56],
                     [0, 0, 0.7]],

        l_t:   [[1, 0, 0],
                     [2.56, 1, 0],
                     [5.76, 3.5	, 1]],
    },
    finalAnswer:[0.29047, 19.690, 1.0857], //X1, X2, X3
    steps: [
        {
            discreption: "row2 = row2 - (2.56)row1",
            u_matrix: [[25, 5, 1],
                        [0, -4.8, -1.56],
                        [144,12,1,]],
            l: [2, 1, 2.56] //row index, col index, value of l21
        },
        {
            discreption: "row3 = row3 - (5.76)row1",
            u_matrix: [[25, 5, 1],
                        [0, -4.8, -1.56],
                        [0, -16.8, -4.76]],
            l:[3, 1, 5.76] //row index, col index, value of l21
        },
        {
            discreption: "row3 = row3 - (3.5)row2",
            u_matrix: [[25, 5, 1],
                        [0, -4.8, -1.56],
                        [0, 0, 0.7]],
            l:[3, 2, 3.5] //row index, col index, value of l21
        },
    ],
    backwardSub:[
        {   //example => 0 + 0 + 2z = 6
            formula: [6, 2],//const coofZ
            subValues: []
        }, //example => 0 + 5y + 3z = 10
        {
            formula: [10, -3, 5],//const, coofz, coofy
            subValues: [3] //result of z
        },
        { //example => 3x + 7y + 11z = 30
            formula: [30, -7, -11],//const, coofy, coofz, coofx
            subValues: [1.4, 3] //result of y, result of z
        }
    ],
    forwardElim:[
        {//example => 2x + 0 + 0 = 6
            formula: [6, 2],//const coofx
            subValues: []
        },
        {//example => 2x + 3y + 0 = 12
            formula: [12, -2, 3],//const ,coofx, coofy
            subValues: [3]//result of x
        },
        {//example => 3x + 5y + 8z = 100
            formula: [],
            subValue: []
            //write so i make sure you understand
        }
    ]
}

function Step(discreption, matrix){
    this.discreption = discreption;
    this.matrix = matrix;
}

//how to use it
solution.steps.push(new Step("some discreption"), [])

