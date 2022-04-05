"use strict"

//timeout
    
    function printNumbers(from, to) {
    let count = from;

    let timerId = setInterval(function() {
        console.log(count);
        if(count === to) {
            clearInterval(timerId);
        };
        count++;
    }, 1000);
    console.log(++count)
    }

// printNumbers(2, 10);

function printSetNumbers (from, to) {
    let count = from;

    setTimeout(function go() {
        console.log(count)
        if(count < to) setTimeout(go, 1000);
        count++
    },1000)
}

printSetNumbers(2, 10)


// decorators call apply

function work (a, b) {
    console.log(a + b);
}
function spy (func) {
    function wrapper (...args) {
        wrapper.calls.push(args);
        return func.apply(this, arguments);
    };
    wrapper.calls = [];

    return wrapper;
    
};
work = spy(work);

work(5,2);
work(1, 7);
console.log(work.calls)  
////////////////////////////////////////////////////////////////////

function func (x) {
    alert(x);
}

function delay(f, ms) {
    return function() { 
        setTimeout(() => f.apply(this, arguments), ms)
    };
}


let f1000 = delay(console.log, 5000);

f1000('test');
//////////////////////////////////////////////////////////////////////////////////////


function debounce (f, ms) {
    let isCooldown = false;
    return function() {
        if(isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    }
}

let f = debounce(alert, 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
