const multiply = (a,b) => {
    let result = 0;
    
    for( i = 0; i<b;i++){
        result = result + a
    }
    return result
}
const q = multiply(500,2);
console.log(q)