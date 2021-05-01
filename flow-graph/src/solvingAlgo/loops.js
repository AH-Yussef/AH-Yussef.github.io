//FindLoops is the main function, Thats the one you are gonna call and it will return you the JSON object
export function findLoops(AdjacencyMatrix){
		let LoopsArray=[]
		let GainsArray=[]
		let currentPath=[]
		let visited = []
		for(let i=0 ; i<AdjacencyMatrix.length;i++){
			visited.push(false)
		}
		for(let node=0;node<AdjacencyMatrix.length;node++){
			if(visited[node]==false){
				FindLoopsRecursion(AdjacencyMatrix,node,currentPath,visited,LoopsArray,GainsArray)
			}
		}
		const loops_obj={
			loops:LoopsArray,
			gains:GainsArray
		}
		return loops_obj
	}

	function FindLoopsRecursion(AdjacencyMatrix,currentNode,currentPath,visited,LoopsArray,GainsArray){
		visited[currentNode]=true
		currentPath.push(currentNode)
		for(let otherNodes=0;otherNodes<AdjacencyMatrix.length;otherNodes++){
			if(AdjacencyMatrix[currentNode][otherNodes]!=0){
				if(currentPath.includes(otherNodes)){
					let loop=[]
					let gain=1
					for(let i=currentPath.indexOf(otherNodes);i<currentPath.length;i++){
						loop.push(currentPath[i])
					}
					for(let j=0;j<loop.length;j++){
						gain=gain*AdjacencyMatrix[loop[j]][loop[(j+1)%loop.length]]
					}
					loop.push(otherNodes)
					AddLoop(loop,gain,LoopsArray,GainsArray)
				}
				if(!currentPath.includes(otherNodes))
					FindLoopsRecursion(AdjacencyMatrix,otherNodes,currentPath,visited,LoopsArray,GainsArray)
			}
		}
		currentPath.pop()
	}
	function AddLoop(loop,gain,LoopsArray,GainsArray){
		let loopExists = false
		for(let i=0;i<LoopsArray.length;i++){
			if(loop.length==LoopsArray[i].length && gain==GainsArray[i]){
				let delay = LoopsArray[i].indexOf(loop[0])
				if(delay!=-1){
					loopExists=true
					for(let j=0;j<loop.length-1;j++){
						if(loop[j]!=LoopsArray[i][(j+delay)%(LoopsArray[i].length-1)]){
							loopExists=false
							break
						}
					}
				}
			}
			if(loopExists){
				return
			}
		}
		LoopsArray.push(loop)
		GainsArray.push(gain)
	}
	// test function to test the output
	// function Test(){
	// 	AdjacencyMatrixTest=[	[[0,1,0,0,1,0,0,1,0],
	// 							 [0,0,1,0,0,0,1,0,1],
	// 							 [1,1,0,1,0,1,0,0,0],
	// 							 [0,0,0,0,1,0,0,0,0],
	// 							 [0,1,0,0,0,0,0,0,0],
	// 							 [0,0,0,1,0,0,0,0,0],
	// 							 [0,0,0,0,0,0,0,0,0],
	// 							 [0,0,0,0,0,0,0,0,1],
	// 							 [0,0,0,0,0,0,0,1,0]]
	// 							 ,
	// 							[[4,4],
	// 							 [3,3]]
	// 							 ,
	// 							[[0,1,4,0],
	// 							 [0,0,2,5],
	// 							 [0,6,0,3],
	// 							 [0,0,0,0]]
	// 							 ,
	// 							[[5,2,3],
	// 							 [2,3,2],
	// 							 [3,3,2]]
	// 							 ,
	// 							[[0,1,1,1,0],
	// 							 [0,0,1,0,0],
	// 							 [0,1,0,0,0],
	// 							 [0,0,0,1,0],
	// 							 [0,1,0,0,0]
	// 							 ]
	// 							 ,
	// 							[[0,1,1,0,0],
	// 							 [0,0,1,0,1],
	// 							 [0,0,0,1,0],
	// 							 [0,0,0,0,1],
	// 							 [0,0,0,0,0]]
	// 							 ,
	// 							 [[0,0,1,0,0,1,0,0,0],
	// 							  [0,0,0,0,0,0,1,0,0],
	// 							  [0,0,0,0,0,0,1,0,0],
	// 							  [0,0,0,0,1,0,0,0,0],
	// 							  [0,0,0,0,0,1,0,0,0],
	// 							  [0,0,0,1,0,0,0,1,0],
	// 							  [0,0,0,0,0,0,0,0,0],
	// 							  [0,0,1,0,0,0,0,0,1],
	// 							  [0,0,0,0,0,0,0,0,0]]
	// 							  ,
	// 							  [[0,2,0,0,0,0,0,0],
	// 							   [0,0,5,0,0,0,0,0],
	// 							   [0,0,0,7,0,0,0,0],
	// 							   [0,0,20,0,9,0,0,0],
	// 							   [0,0,0,0,7,18,0,0],
	// 							   [0,3,0,0,0,0,2,0],
	// 							   [0,0,0,0,0,0,0,6],
	// 							   [0,0,0,0,0,0,0,0]]
	// 							 //Add more tests here
	// 							 ]
	// 	for(var i=0;i<AdjacencyMatrixTest.length;i++){
	// 		console.log(FindLoops(AdjacencyMatrixTest[i]))
	// 	}
	// }
