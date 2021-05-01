let forwardPaths = []; //array of paths
let forwardGains = []; //array of gains

let visited = []

export function solveforwardpath(graph){
	//reset
	forwardPaths.length = 0;
	forwardGains.length = 0;

	visited = new Array(graph.length).fill(false);
  const startVertex = 0;

  forwarddfs(graph,startVertex);

  // for(let i = 0; i < forwardPaths.length; i++) {
  //   const path = forwardPaths[i];
  //   for(let j = 1; j < path.length; j++) {
  //     if (path[j-1] > path[j]){
  //       forwardPaths.splice(i, 1);
  //       break;
  //     }
  //   }
  // } 

  return { paths:forwardPaths , gains:forwardGains }
}

function forwarddfs(graph,v,currpath=[],currgain=[]){
    visited[v] = true ;
    currpath.push(v)
    //if we reached end node
    if(v == graph.length -1){
        //add path and gain
        forwardPaths.push([...currpath])
        forwardGains.push([...currgain].reduce( (a,b) => a*b))
    }
    else {
			for (var i = 0; i < graph.length; i++){
				if (!visited[i] && graph[v][i] != 0){
					currgain.push(graph[v][i])
					forwarddfs(graph,i,currpath,currgain)
				}
			}
    }
    //remove last node ,as it is visited or the end node in path
    currpath.pop()
    //to append a new path make the nodes which form it as non visited
    //so it can be found by dfs
    if(currgain.length > 0){
      currgain.pop()
      visited[v] = false
    }
}
