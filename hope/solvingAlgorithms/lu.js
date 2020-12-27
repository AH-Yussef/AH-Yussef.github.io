class steps{
    descripton='';
    u_matrix;
    l_matrix;
}

var c= new Array(0);
var crout =false;
var pivoted =false;
var slovable=1;
var pi;
function lu(x){
   var row=x.length;
    var coul=x[0].length;
    var lower=new Array(row);
    var t;
    var m =new steps();

    for(t=0;t<row;t++){
        lower[t]=new Array(coul);
    }
    var i;
    var j;
    var k;
    pi = new Array(row);
    for(i=0;i<row;i++){
        pi[i]=0;
        for(j=0;j<coul;j++){
            if(i==j){
                lower[i][j]=1;
            }else{
                lower[i][j]=0;
            }
        }
    }
    if(!crout){
    m.descripton="we fill the lower matrix with zeros and the digonal with ones"
    m.l_matrix=JSON.parse(JSON.stringify(lower));
    m.u_matrix=JSON.parse(JSON.stringify(x));
    c.push(m);
    m=new steps();
    }
    for(i=0;i<row-1;i++){
        if(x[i][i]==0){
            x=pivot(x,i,lower);
        }
        for(j=i+1;j<row;j++){
            let factor=x[j][i]/x[i][i];
            lower[j][i]=factor;
            if(!crout){
            m.descripton="we divide "+x[j][i]+" by "+x[i][i]+" to get l["+(j+1)+"]["+(i+1)+"]";
            m.l_matrix=JSON.parse(JSON.stringify(lower));
            m.u_matrix=JSON.parse(JSON.stringify(x));
            c.push(m);
            m=new steps();
            }
            for( k=0;k<coul;k++){
                x[j][k]=x[j][k]-(factor*x[i][k]);
            }
            if(!crout){
            m.descripton="we multiply row "+(i+1)+" by "+factor+" and subtract it from row "+(j+1)+"";
            m.l_matrix=JSON.parse(JSON.stringify(lower));
            m.u_matrix=JSON.parse(JSON.stringify(x));
            c.push(m);
            m=new steps();
            }
        }
    }
    for(i=0;i<row;i++){
        if(x[i][coul-1]!=0){
            slovable=0;
            break;
        }
    }
    var ans=[lower,x];
    return ans;
    
}
function pivot(x, number,lower){
    pivoted=true;
    var y=x[number];
    var row=x.length;
    var max=number;
    var i;
    for(i=number;i<row;i++){
        if(Math.abs(x[i][number])>Math.abs(x[max][number])){
            max=i;
        }
    }
    pi[number]=max;
    x[number]=x[max];
    x[max]=y;
    if(!crout){
    m=new steps();
    m.descripton="we need to pivot to avoid dividing by zero and to do that we switch row "+(number+1)+" with "+(max+1)+"";
    m.l_matrix=JSON.parse(JSON.stringify(lower));
    m.u_matrix=JSON.parse(JSON.stringify(x));
    c.push(m);
    }
    return x
}
function solve_lu(x,is_crout){
    var row=x.length;
    var coul=x[0].length-1;
    var b = new Array(row);
    var to_send=new Array(row);
    var i;
    var j;
    var sum;
    var m =new steps();
    var p;
    var lower;
    var upper
    for(i=0;i<row;i++){
        b[i]=x[i][coul];
        to_send[i]=new Array(coul);
    }
    for(i=0;i<row;i++){
        for(j=0;j<coul;j++){
            to_send[i][j]=x[i][j];
        }
    }
    m.descripton="we decompose the matrix to LU ";
    m.l_matrix=JSON.parse(JSON.stringify(to_send));
    m.u_matrix=JSON.parse(JSON.stringify(b));
    c.push(m);
    m=new steps();
    var pivot_happend=false;
    if(!is_crout){
    p= lu(to_send);
    lower=p[0];
    upper=p[1];
     for(i=0;i<pi.length;i++){
        if(pi[i]!=0){
            pivot_happend=true;
            var hold=b[i];
            b[i]=b[pi[i]];
            b[pi[i]]=hold;
        }
    }
    if(pivot_happend){
        m.descripton="since we pivoted we need to change the order of the answers";
        m.l_matrix=JSON.parse(JSON.stringify(to_send));
        m.u_matrix=JSON.parse(JSON.stringify(b));
        c.push(m);
        m=new steps();
    }
     } else{ 
        p= lu_crout(to_send);
        lower=p[0];
        upper=p[1];

      }

    
    m.descripton="we solve the l with the answer first by forword substitution";
    m.l_matrix=JSON.parse(JSON.stringify(lower));
    m.u_matrix=JSON.parse(JSON.stringify(b));
    c.push(m);
    m=new steps();




    m.descripton="Y1 is equal to "+b [0]+ " divided by "+lower[0][0]+"";
    m.l_matrix=JSON.parse(JSON.stringify(lower));
    var temp = JSON.parse(JSON.stringify(b));
    temp[0]=b[0]/lower[0][0];
    m.u_matrix=JSON.parse(JSON.stringify(temp));
    c.push(m);
    m=new steps();





    for(i=1;i<row;i++){
        sum =0;
        for(j=0;j<i;j++){
            sum=sum+(lower[i][j]*temp[j]);
        }
        temp[i]=(b[i]-sum)/lower[i][i];
        m.descripton="Y"+(i+1)+" is equal to "+b[i]+"-"+sum+" divided by "+lower[i][i]+"";
        m.l_matrix=JSON.parse(JSON.stringify(lower));
        m.u_matrix=JSON.parse(JSON.stringify(temp));
        c.push(m);
        m=new steps();
    }



    m.descripton="we solve the U with the Y by backword substitution";
    m.l_matrix=JSON.parse(JSON.stringify(upper));
    m.u_matrix=JSON.parse(JSON.stringify(temp));
    c.push(m);
    m=new steps();






    var ans=JSON.parse(JSON.stringify(temp));
    m.descripton="x"+row+" is equal to "+temp[row-1]+ " divided by "+upper[row-1][row-1]+"";
    m.l_matrix=JSON.parse(JSON.stringify(upper));
    ans[row-1]=temp[row-1]/upper[row-1][row-1];
    m.u_matrix=[JSON.parse(JSON.stringify(ans))];
    c.push(m);
    m=new steps();



    for(i=row-2;i>=0;i--){
        sum=0;
        for(j=i+1;j<coul;j++){
            sum=sum+(upper[i][j]*ans[j]);
        }
        ans[i]=(temp[i]-sum)/upper[i][i];
        m.descripton="x"+(i+1)+" is equal to "+temp[i]+"-"+sum+" divided by "+upper[i][i]+"";
        m.l_matrix=JSON.parse(JSON.stringify(upper));
        m.u_matrix=[JSON.parse(JSON.stringify(ans))];
        c.push(m);
        m=new steps();
    }
    if(is_crout){
    for(i=0;i<pi.length;i++){
        if(pi[i]!=0){
            var hold=ans[i];
            ans[i]=ans[pi[i]];
            ans[pi[i]]=hold;
        }
    }
    }
    return {
        canBeSolved:slovable,
        finalAnswer:{
            l_matrix:JSON.parse(JSON.stringify(lower)),
            u_matrix:JSON.parse(JSON.stringify(upper)),
            answer:JSON.parse(JSON.stringify(ans))
        },
        step:JSON.parse(JSON.stringify(c))
    }
    
}


function lu_crout(x){
    crout=true;
  var row=x.length;
  var coul=x[0].length;
  m=lu(T(JSON.parse(JSON.stringify(x))));
  var upper =T(m[0]);
  var lower =T(m[1]);
  var ans= [lower,upper];
  if(!pivoted){
  var print_lower=JSON.parse(JSON.stringify(lower));
  var print_upper=JSON.parse(JSON.stringify(upper));
  var letters_lower=JSON.parse(JSON.stringify(lower));
  var letters_upper=JSON.parse(JSON.stringify(upper));
  var des=JSON.parse(JSON.stringify(upper));
  var hold="";
  var i;
  var j;
  var k;
  var m= new steps();
  for(i=0;i<row;i++){
    for(j=0;j<coul;j++){
        print_lower[i][j]=0;
        if(i==j){
            print_upper[i][j]=1;
            letters_lower[i][j]="L["+(i+1)+"]["+(j+1)+"]";
            letters_upper[i][j]="1";
        }else{
            print_upper[i][j]=0;
        }
        if(i>j){
            letters_lower[i][j]="L["+(i+1)+"]["+(j+1)+"]";
            letters_upper[i][j]="0";
        }
        if(i<j){
            letters_lower[i][j]="0";
            letters_upper[i][j]="*U["+(i+1)+"]["+(j+1)+"]";
        }

    }
}
  m.descripton="we fill both matrix with zero and make the digonal of u equal to 1";
  m.l_matrix=JSON.parse(JSON.stringify(print_lower));
  m.u_matrix=JSON.parse(JSON.stringify(print_upper));
  c.push(m);
  m=new steps();
      for(i=0;i<row;i++){
          for(j=0;j<coul;j++){
              hold="";
              for(k=0;k<row;k++){
                  if(letters_lower[i][k]=="0" || letters_upper[k][j]=="0"){

                  } else if(letters_upper[k][j]=="1"){
                      hold=hold+"+"+letters_lower[i][k];
                  }else{
                    hold=hold+"+"+letters_lower[i][k]+letters_upper[k][j];
                  }
              }
              des[i][j]=hold.substr(1);
        }
    }
    for(i=0;i<row;i++){
        for(j=0;j<coul;j++){
           if(i<j){
               m.descripton="since "+x[i][j]+" is equal to "+des[i][j]+ " we can calculate U["+(i+1)+"]["+(j+1)+"]";
               print_upper[i][j]=upper[i][j];
           }else{
               m.descripton="since "+x[i][j]+" is equal to "+des[i][j]+ " we can calculate L["+(i+1)+"]["+(j+1)+"]";
               print_lower[i][j]=lower[i][j];
           }
            m.l_matrix=JSON.parse(JSON.stringify(print_lower));
            m.u_matrix=JSON.parse(JSON.stringify(print_upper));
            c.push(m);
            m=new steps();
        }
    }
}

  return ans;

}
function T(x){
    var row=x.length;
    var coul=x[0].length;
    var i;
    var j;
    var temp=0;
    for(i=0;i<row-1;i++){
        for(j=i+1;j<coul;j++){
            temp=x[i][j];
            x[i][j]=x[j][i];
            x[j][i]=temp;
        }
    }
    return x;

}


const test = [[25,5,1,106.8],[64,8,1,177.2],[144,12,1,279.2]];
// console.log(solve_lu(test, true))

