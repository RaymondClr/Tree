//@include "../tree.min.jsx"

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
//         dropdownlist: {
//             item1: 1,
//             item2: 2,
//             item3: 3,
//         },
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

// var elements = Tree.parse({
//     style: { alignChildren: ['fill', ''] },
//     param: [, , , { resizeable: true }],
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

// _arrayEach(elements.getElementsByType('button'), function (element, index) {
//     element.text = index;
//     element.onClick = function () {
//         alert(this.text);
//     };
// });

// _arrayEach(elements.getElementsByType('edittext'), function (element, index) {
//     element.text = index;
// });

// elements.getElement('YAA');
// elements.getElementsByName('YAA');
// elements.getElementByType('group');

// var elements = Tree.parse({
//     tabbedpanel: {
//         param: ['TAB'],
//         style: { selection: 0 },
//         tab1: {
//             param: [, , 'A'],
//             tabbedpanel: {
//                 param: ['TAD'],
//                 style: { selection: 1 },
//                 tab1: {
//                     param: [, , 'C'],
//                     tabbedpanel: ['TAD'],
//                 },
//                 tab2: [, , 'D'],
//             },
//         },
//         tab2: [, , 'B'],
//     },
// });

// alert(elements.getElementsByName('TAB'));

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

function foo() {
    alert('Yoooooo!!!');
}

var elements = Tree.parse({
    style: { margins: 5, alignChildren: ['fill', 'fill'] },
    param: ['palette', '', undefined, { resizeable: true }],
    group1: {
        style: { margins: 0, spacing: 0, orientation: 'column', alignChildren: ['fill', 'fill'] },
        param: ['mainGroup1', undefined, undefined],
        edittext1: {
            style: { preferredSize: [180, 230] },
            param: ['console', undefined, 'console', { multiline: true, scrolling: true }],
        },
    },
    group2: {
        style: { orientation: 'column', alignChildren: ['fill', 'fill'], alignment: ['fill', 'bottom'] },
        param: ['paramGroup1', undefined, undefined],
        group1: {
            style: { orientation: 'row', alignment: ['fill', 'bottom'] },
            param: ['dropdownlistGroup'],
            statictext1: [undefined, [0, 0, 30, 25], '方向'],
            dropdownlist1: {
                style: { alignment: ['fill', ''], selection: 3 }, //定义下拉列表的默认选项
                param: ['direction', [0, 0, 170, 25], ['+x', '-x', '+y', '-y']],
            },
        },
        group2: {
            style: { spacing: 5, orientation: 'row', alignChildren: ['fill', 'fill'], alignment: ['fill', 'bottom'] },
            param: ['settingGroup'],
            group1: {
                style: { orientation: 'column', alignment: ['left', 'bottom'] },
                param: ['mainGroup'],
                statictext1: ['time', [0, 0, 30, 25], '时间'],
                statictext2: ['transition', [0, 0, 30, 25], '过渡'],
                statictext3: ['distance', [0, 0, 30, 25], '距离'],
            },
            group2: {
                style: { orientation: 'column', alignChildren: ['fill', 'fill'] },
                param: ['mainGroup'],
                slider1: ['time', [0, 0, 140, 25], 1, 0, 3],
                slider2: ['transition', [0, 0, 140, 25], 1, 0, 3],
                slider3: ['distance', [0, 0, 140, 25], 1, 0, 3],
            },
            group3: {
                style: { orientation: 'column', alignment: ['right', 'bottom'] },
                param: ['mainGroup'],
                edittext1: ['time', [0, 0, 45, 25], '10'],
                edittext2: ['transition', [0, 0, 45, 25], '10'],
                edittext3: ['distance', [0, 0, 45, 25], '10'],
            },
        },
    },
    button1: {
        style: { onClick: foo }, //添加事件侦听
        param: ['button', undefined, '添加'],
    },
});

$.writeln(elements.getElementById('transition').text);
// _arrayEach(elements.getElementsByType('edittext', 'statictext', 'button'), function (element) {
//     element.text = 'YOOOO';
// });

// _arrayEach(elements.getElementsByType('slider'), function (element) {
//     element.value = 0;
// });

// elements.getElementById('direction').selection = 1;
