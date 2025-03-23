import { formatCurrency } from "../utils/money.js";
console.log("test suite:format currency");
console.log("Converts cents into dollars");
if(formatCurrency(2045)==='20.45'){
console.log("Passed");
}
else{
console.log("Failed");
}
console.log("works with 0");
if(formatCurrency(0)==='0.00'){
console.log("Passed");
}
else{
console.log("Failed");
}
console.log("rounds up to the nearst cent");
if(formatCurrency(2045.5)==='20.46'){
console.log("Passed");
}
else{
console.log("Failed");
}
