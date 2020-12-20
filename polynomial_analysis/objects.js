//Gauss Elimination
solution = {
    canBeSolved: true, //of false 
    finalAnswer:{
        u_matrix:   [[1, 2, 4],
                     [0, 1, 4],
                     [0, 0, 1]],

        l_matrix:   [[0, 0, 0],
                     [0.5, 0, 0],
                     [0.25, -0.5, 0]],
    },
    steps: [
        {
            discreption: "multiply row 2 by -2",
            u_matrix: [[1, 2, 4],
                        [0, 1, 4],
                        [0, 0, 1]],
            l_matrix: [[1, 2, 4],
                        [0, 1, 4],
                        [0, 0, 1]],
        },
        {// another one and so on....
            discreption: "multiply row 2 by -2",
            u_matrix: [[1, 2, 4],
                        [0, 1, 4],
                        [0, 0, 1]],
            l_matrix: [[1, 2, 4],
                        [0, 1, 4],
                        [0, 0, 1]],
        }
    ]
}

function Step(discreption, matrix){
    this.discreption = discreption;
    this.matrix = matrix;
}

//how to use it
solution.steps.push(new Step("some discreption"), [])

