function eval() {
    // Do not use eval!!!
    return;
}

let iState = 0;

function expressionCalculator(expr) {
    //actions priority;
    const actpr = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1
    };

    const digits = {
        '0': true,
        '1': true,
        '2': true,
        '3': true,
        '4': true,
        '5': true, 
        '6': true,
        '7': true,
        '8': true,
        '9': true
    }

    const nums = [];
    const acts = [];
    let calcScheduled = false;
    expr = expr.replace(/ /g,'');
   

    for(let i = 0; i < expr.length; i++) {
        let char = expr.charAt(i);
        let num = '';
 
        if(char === '(') {
            let strStart = i;
            let nestedBrackets = [];
            nestedBrackets.push(char);

            while(nestedBrackets.length) {
                i++;
                if(expr.charAt(i) === '(') {
                    nestedBrackets.push(str.charAt(i));
                } 

                if(expr.charAt(i) === ')') {
                    nestedBrackets.pop();
                }

                if(i > expr.length) {
                    throw 'ExpressionError: Brackets must be paired';
                }
            }
            
            nums.push(
                expressionCalculator(
                    expr.substr(strStart+1, i-1)
                )
            );
            continue;
        }

        if(actpr[char] === 1) {
            if(actpr[acts[acts.length - 1]] === 2) {
                doCalc(nums, acts);
            }

            acts.push(char);
            continue;
        }

        if(actpr[char] === 2) {
            acts.push(char);
            continue;
        }

        if(digits[char]) {
            iState = i;
            nums.push(getNum(i, digits, num, expr, char));
            i = iState;
            continue;
        }
    }

    console.log(nums);
    console.log(acts);

    if(acts.length) {
        doCalc(nums, acts);
    }

    return nums[0];
}

function getNum(i, digits, num, expr, char) {
    num += char;
            
    while(true) {
        if(digits[expr.charAt(i+1)]) {
            i++;
            iState++;
            char = expr.charAt(i);
            num += char;
        } else {
            break;
        }
    }

    return num;
}

function doCalc(nums, acts) {
    let currNum = parseFloat(nums.pop());
    let currAct = acts.pop();

    while(currAct) {
        currNum = calc(parseFloat(nums.pop()), currNum, currAct);
        currAct = acts.pop();
    }

    nums.push(currNum);
}

function calc(op1, op2, act) {
    switch(act) {
        case '*':
            return op1 * op2;
        case '/':
            if(op2 === 0) {
                throw 'TypeError: Division by zero.';
            }
            return op1 / op2;
        case '-':
            return op1 - op2;
        case '+':
            return op1 + op2;
    }
}

module.exports = {
    expressionCalculator
}