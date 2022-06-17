//@include "../tree.jsx"

var elements = Tree.parse({
    button1: ['a1'],
    group1: {
        param: ['G1'],
        group1: ['G1-1'],
        slider1: ['a1'],
        button2: ['a2'],
        button3: ['a3'],
    },
    group2: {
        param: ['G2'],
        group1: ['G2-1'],
        button1: ['b1'],
        button2: ['b2'],
        button3: ['b3'],
    },
    group3: {
        param: ['G3'],
        group1: ['G3-1'],
        button1: ['c1'],
        button2: ['c2'],
        button3: ['c3'],
    },
});

var myButton1 = elements.getElementsByType('slider');
$.writeln(myButton1);
