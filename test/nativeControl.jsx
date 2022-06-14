//@include "../tree.jsx"
function _arrayEach(array, iteratee) {
    var index = -1;
    var length = array.length;
    while (++index < length) iteratee(array[index], index, array);
}

// var elements = Tree.parse({
//     group: {
//         param: ['AHH'],
//         button: ['AHH'],
//         checkbox: [],
//         dropdownlist: ['HOO'],
//         edittext: [],
//         flashplayer: [],
//         group: ['YOO'],
//         iconbutton: [],
//         image: [],
//         listbox: ['HEI'],
//         panel: ['WOO'],
//         progressbar: [],
//         radiobutton: [],
//         scrollbar: [],
//         slider: ['POO'],
//         statictext: [],
//         tabbedpanel: ['EMM'],
//         treeview: ['YAA'],
//     },
// });

// elements.getElement('YAA');
// elements.getElementsByName('YAA');
// elements.getElementByType('group');

var elements = Tree.parse({
    tabbedpanel: {
        param: ['TAB'],
        style: { selection: 0 },
        tab1: {
            param: [, , 'A'],
            tabbedpanel: {
                param: ['TAD'],
                style: { selection: 1 },
                tab1: {
                    param: [, , 'C'],
                    tabbedpanel: ['TAD'],
                },
                tab2: [, , 'D'],
            },
        },
        tab2: [, , 'B'],
    },
});

alert(elements.getElementsByName('TAB'));

// getElementByName('a'); // 元素
// getElementByName(['a']); // [元素]
// getElementByName('a', 'b', 'c'); //[元素1,元素2,元素3]
// getElementByName(['a', 'b', 'c']); //[元素1,元素2,元素3]
// getElementByType('button');

// var win = new Window('palette');
// var group = win.add('group');

// var button = group.add('RadioButton', undefined, { name: 'btn1' });
// var button = group.add('RadioButton', undefined, { name: 'btn2' });

// Group.prototype.find = function () {
//     alert(this.children[0]);
// };

// Window Panel TabbedPanel Tab Group DropDownList ListBox

// alert(uneval(win.children[0]));

// var elements = Tree.parse({
//     button1: [],
//     edittext1: [],
//     button2: [],
//     edittext2: [],
//     button3: [],
//     edittext3: [],
//     button4: [],
//     edittext4: [],
//     button5: [],
//     edittext5: [],
//     button6: [],
//     edittext6: [],
//     button7: [],
//     edittext7: [],
//     button8: [],
//     edittext8: [],
//     button9: [],
//     edittext9: [],
// });

// var elements = Tree.parse({
//     config: { show: true },
//     panel: {
//         button: ['AHH'],
//         tabbedpanel: {
//             param: ['KKK'],
//             tab: {
//                 group: {
//                     group: {
//                         param: ['TARGETGROUP'],
//                         group: {
//                             group: {
//                                 group: {
//                                     param: ['AHHh'],
//                                     button: ['HOO'],
//                                     checkbox: [],
//                                     dropdownlist: ['HOO'],
//                                     edittext: [],
//                                     flashplayer: [],
//                                     group: {
//                                         group: ['YOOO'],
//                                     },
//                                     iconbutton: [],

//                                     scrollbar: [],
//                                     slider: ['KAA'],
//                                     statictext: [],
//                                     tabbedpanel: ['222'],
//                                     button2: ['BAAA'],
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//         iconbutton: [],
//         listbox: ['HEI'],
//         slider: ['HEI'],
//         statictext: [],
//         tabbedpanel2: ['EMM'],
//         treeview: ['YAA'],
//     },
// });

// elements.getElementById('AHH').text = 'tes';

// _arrayEach(elements.getElementById('TARGETGROUP').getElementsByType('button'), function (element, index) {
//     element.text = index;
// });
