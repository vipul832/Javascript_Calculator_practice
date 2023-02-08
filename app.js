const intext = document.querySelector("input");

const btn = document.querySelectorAll(".btn");

let result = 0;

for (item of btn) {
  item.addEventListener("click", (e) => {
    let btnId = e.target.id;
    switch (btnId) {
      case "C":
        intext.value = "";
        break;
      case "0":
        intext.value += btnId;
        break;
      case "1":
        intext.value += btnId;
        break;
      case "2":
        intext.value += btnId;
        break;
      case "3":
        intext.value += btnId;
        break;
      case "4":
        intext.value += btnId;
        break;
      case "5":
        intext.value += btnId;
        break;
      case "6":
        intext.value += btnId;
        break;
      case "7":
        intext.value += btnId;
        break;
      case "8":
        intext.value += btnId;
        break;
      case "9":
        intext.value += btnId;
        break;
      case "-":
        intext.value += btnId;
        break;
      case "+":
        intext.value += btnId;
        break;
      case "/":
        intext.value += btnId;
        break;
      case "*":
        intext.value += btnId;
        break;
      case "(":
        intext.value += btnId;
        break;
      case ")":
        intext.value += btnId;
        break;
      case "fact":
        let newinput = intext.value;
        intext.value += "!";
        result = factorial(newinput);
        break;
      case "1/x":
        intext.value += "1/";
        break;
      case "rl":
        let l = intext.value.length;
        intext.value = intext.value.slice(0, l - 1);
        break;
      case "=":
        solution(intext.value);
        intext.value = result;
        result = 0;
        break;
    }
  });
}

function solution(expression) {
  var stackarr = [];

  // Variable topp initialized with -1
  var topp = -1;

  // Push function for pushing
  // elements inside stack
  function push(e) {
    topp++;
    stackarr[topp] = e;
  }

  // Pop function for returning top element
  function pop() {
    if (topp == -1) return 0;
    else {
      var popped_ele = stackarr[topp];
      topp--;
      return popped_ele;
    }
  }
  InfixtoPostfix();

  function InfixtoPostfix() {
    // Postfix array created
    var postfix = [];
    var temp = 0;
    push("@");
    var infixval = expression;
    console.log(infixval);
    // Iterate on infix string
    for (let i = 0; i < infixval.length; i++) {
      let el = infixval[i];

      // Checking whether operator or not
      if (operator(el)) {
        if (el == ")") {
          while (stackarr[topp] != "(") {
            postfix[temp++] = pop();
          }
          pop();
        }

        // Checking whether el is (  or not
        else if (el == "(") {
          push(el);
        }

        // Comparing precedency of el and
        // stackarr[topp]
        else if (precedency(el) > precedency(stackarr[topp])) {
          push(el);
        } else {
          while (precedency(el) <= precedency(stackarr[topp]) && topp > -1) {
            postfix[temp++] = pop();
          }
          push(el);
        }
      } else {
        postfix[temp++] = el;
      }
    }

    // Adding character until stackarr[topp] is @
    while (stackarr[topp] != "@") {
      postfix[temp++] = pop();
    }

    let fpostfix = "";
    let l = postfix.length - 1;
    for (i = 0; i <= l; i++) {
      fpostfix += postfix[i];
    }

    console.log(postfixEval(fpostfix));
  }

  function postfixEval(exp) {
    let stack1 = [];

    // Scan all characters one by one
    for (let i = 0; i < exp.length; i++) {
      let c = exp[i];

      // If the scanned character is an operand (number here),
      // push it to the stack.
      if (!isNaN(parseInt(c))) stack1.push(c.charCodeAt(0) - "0".charCodeAt(0));
      //  If the scanned character is an operator, pop two
      // elements from stack apply the operator
      else {
        let val1 = stack1.pop();
        let val2 = stack1.pop();

        switch (c) {
          case "+":
            stack1.push(val2 + val1);
            break;

          case "-":
            stack1.push(val2 - val1);
            break;

          case "/":
            stack1.push(val2 / val1);
            break;

          case "*":
            stack1.push(val2 * val1);
            break;
        }
      }
    }
    return stack1.pop();
  }

  function operator(op) {
    if (
      op == "+" ||
      op == "-" ||
      op == "^" ||
      op == "*" ||
      op == "/" ||
      op == "(" ||
      op == ")"
    ) {
      return true;
    } else return false;
  }

  function precedency(pre) {
    if (pre == "@" || pre == "(" || pre == ")") {
      return 1;
    } else if (pre == "+" || pre == "-") {
      return 2;
    } else if (pre == "/" || pre == "*") {
      return 3;
    } else if (pre == "^") {
      return 4;
    } else return 0;
  }
}

//Factorial function
function factorial(newinput) {
  let f = parseInt(newinput),
    ans = 1;
  while (f > 0) {
    ans *= f;
    f--;
  }
  return ans;
}
