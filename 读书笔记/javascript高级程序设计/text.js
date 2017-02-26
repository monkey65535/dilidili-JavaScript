function sum(num1, num2) {
    return num1 + num2;
}

function callSum1(num1,num2) {
    return sum.apply(this,arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this,[num1, num2]);
}
callSum1(1,2);
callSum2(1,2);