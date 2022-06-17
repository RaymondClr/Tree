//@include "../tree.min.jsx"
// function _arrayEach(array, iteratee) {
//     var index = -1;
//     var length = array.length;
//     while (++index < length) iteratee(array[index], index, array);
// }

var configWindow = Tree.parse({
    config: { singleton: true },
    checkbox: [undefined, undefined, '启用'],
});

var mainWindow = Tree.parse({
    button: {
        style: { onClick: configWindow },
        param: [undefined, undefined, '设置'],
    },
});

var elements = Tree.parse({
    config: { show: false },
    group: {
        style: { orientation: 'row' },
        param: ['myGroup'],
        button1: ['myButton1'],
        button2: ['myButton2'],
    },
});
var myButton1 = elements.findElement('myButton1');
myButton1.text = 'YOOO';

elements.show();

// var found = new Array(50);

// var elements = Tree.parse({
//     // param: ['dialog'],
//     progressbar: ['pbar', undefined, 0, found.length],
// });

// var pbar = elements.getElementById('pbar');

// _arrayEach(found, function (value, index) {
//     pbar.value = index + 1;
//     $.sleep(200);
// });

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
// config: { show: false },
// style: { alignChildren: ['fill', ''] },
// param: [, , , { resizeable: true }],
// button1: [],
// edittext1: [],
// button2: [],
// edittext2: [],
// button3: [],
// edittext3: [],
// button4: [],
// edittext4: [],
// button5: [],
// edittext5: [],
// button6: [],
// edittext6: [],
// button7: [],
// edittext7: [],
// button8: [],
// edittext8: [],
// button9: [],
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

// elements.show();

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

// function foo() {
//     alert('Yoooooo!!!');
// }

// var elements = Tree.parse({
//     style: { margins: 5, alignChildren: ['fill', 'fill'] },
//     param: ['palette', '', undefined, { resizeable: true }],
//     group1: {
//         style: { margins: 0, spacing: 0, orientation: 'column', alignChildren: ['fill', 'fill'] },
//         param: ['mainGroup1', undefined, undefined],
//         edittext1: {
//             style: { preferredSize: [180, 230] },
//             param: ['console', undefined, 'console', { multiline: true, scrolling: true }],
//         },
//     },
//     group2: {
//         style: { orientation: 'column', alignChildren: ['fill', 'fill'], alignment: ['fill', 'bottom'] },
//         param: ['paramGroup1', undefined, undefined],
//         group1: {
//             style: { orientation: 'row', alignment: ['fill', 'bottom'] },
//             param: ['dropdownlistGroup'],
//             statictext1: [undefined, [0, 0, 30, 25], '方向'],
//             dropdownlist1: {
//                 style: { alignment: ['fill', ''], selection: 3 }, //定义下拉列表的默认选项
//                 param: ['direction', [0, 0, 170, 25], ['+x', '-x', '+y', '-y']],
//             },
//         },
//         group2: {
//             style: { spacing: 5, orientation: 'row', alignChildren: ['fill', 'fill'], alignment: ['fill', 'bottom'] },
//             param: ['settingGroup'],
//             group1: {
//                 style: { orientation: 'column', alignment: ['left', 'bottom'] },
//                 param: ['mainGroup'],
//                 statictext1: ['time', [0, 0, 30, 25], '时间'],
//                 statictext2: ['transition', [0, 0, 30, 25], '过渡'],
//                 statictext3: ['distance', [0, 0, 30, 25], '距离'],
//             },
//             group2: {
//                 style: { orientation: 'column', alignChildren: ['fill', 'fill'] },
//                 param: ['mainGroup'],
//                 slider1: ['time', [0, 0, 140, 25], 1, 0, 3],
//                 slider2: ['transition', [0, 0, 140, 25], 1, 0, 3],
//                 slider3: ['distance', [0, 0, 140, 25], 1, 0, 3],
//             },
//             group3: {
//                 style: { orientation: 'column', alignment: ['right', 'bottom'] },
//                 param: ['mainGroup'],
//                 edittext1: ['time', [0, 0, 45, 25], '10'],
//                 edittext2: ['transition', [0, 0, 45, 25], '10'],
//                 edittext3: ['distance', [0, 0, 45, 25], '10'],
//             },
//         },
//     },
//     button1: {
//         style: { onClick: foo }, //添加事件侦听
//         param: ['button', undefined, '添加'],
//     },
// });

// _arrayEach(elements.getElementsByType('edittext', 'statictext', 'button'), function (element) {
//     element.text = 'YOOOO';
// });

// _arrayEach(elements.getElementsByType('slider'), function (element) {
//     element.value = 0;
// });

// elements.getElementById('direction').selection = 1;

// Tree.parse({
//     param: ['', , , { resizeable: false }],
//     style: { margins: 5, spacing: 10, alignChildren: undefined },
//     rectbutton01: [null, , , { enableStroke: false, fillColor: '#000000', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton02: [, , , { enableStroke: false, fillColor: '#b53838', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton03: [, , , { enableStroke: false, fillColor: '#e4d84c', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton04: [, , , { enableStroke: false, fillColor: '#a9cbc7', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton05: [, , , { enableStroke: false, fillColor: '#e5bcc9', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton06: [, , , { enableStroke: false, fillColor: '#a9a9ca', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton07: [, , , { enableStroke: false, fillColor: '#e7c19e', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton08: [, , , { enableStroke: false, fillColor: '#b3c7b3', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton09: [, , , { enableStroke: false, fillColor: '#677de0', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton10: [, , , { enableStroke: false, fillColor: '#4aa44c', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton11: [, , , { enableStroke: false, fillColor: '#8e2c9a', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton12: [, , , { enableStroke: false, fillColor: '#e8920d', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton13: [, , , { enableStroke: false, fillColor: '#7f452a', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton14: [, , , { enableStroke: false, fillColor: '#f46dd6', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton15: [, , , { enableStroke: false, fillColor: '#3da2a5', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton16: [, , , { enableStroke: false, fillColor: '#a89677', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton17: [, , , { enableStroke: false, fillColor: '#1e401e', fillOpacity: [0.8, 1, 0.6, 1] }],
//     rectbutton18: [, , '运行', { enableStroke: false }],
//     rectbutton19: [, , '菜单', { enableStroke: false }],
//     rectbutton20: [, , '设置', { enableStroke: false }],
// });

// var elements = Tree.parse({
//     treeview: {
//         param: [{}, [0, 0, 500, 500]],
//         node2: { param: 1 },
//         node: {
//             style: { image: File('/D/icon.png'), expanded: true },
//             param: {},
//             item: {
//                 style: { image: File('/D/icon.png') },
//                 param: '你好世界',
//             },
//             node: {
//                 style: { image: File('/D/icon.png'), expanded: true },
//                 param: 'node',
//                 item: {
//                     style: { image: File('/D/icon.png') },
//                     param: '你好世界',
//                 },
//             },
//         },
//     },
// });

// var elements = Tree.parse({
//     treeview: {
//         param: ['A', [0, 0, 500, 500], [1, 2, 3, 4, 5, 6]],
//         item: {
//             style: { image: new File('/d/icon.png') },
//             param: 'ssss',
//         },
//         node: {
//             style: { expanded: true, image: new File('/d/icon.png') },
//             param: '一级',
//             item: '1',
//             node: {
//                 param: '二级',
//                 node: {
//                     param: '三级',
//                     node: {
//                         param: '四级',
//                         node: '2',
//                     },
//                 },
//             },
//         },
//         node1: {
//             param: '一级',
//             node: {
//                 param: '二级',
//                 node: {
//                     param: '三级',
//                     node: {
//                         param: '四级',
//                         node: '2',
//                     },
//                 },
//             },
//         },
//     },
// });

// var elements = Tree.parse({
//     param: ['dialog', '', undefined, { resizeable: true }],
//     style: { margins: 5, spacing: 5, alignChildren: ['center', 'top'] },
//     button1: [],
//     panel: {
//         style: { margins: [5, 5, 0, 5], orientation: 'row', size: [189, 29] },
//         radiobutton1: [, [0, 0, 50, 15], '应用'],
//         radiobutton2: [, [0, 0, 50, 15], '参数'],
//     },
//     panel1: {
//         style: { margins: [5, 0, 0, 0] },
//         statictext: {
//             param: [, [0, 0, 180, 25], '© 2022 Raymond Yan', 1],
//             style: { alignment: ['left', 'center'] },
//         },
//     },
//     panel2: {
//         style: { margins: 5, spacing: 10, alignChildren: ['fill', 'top'] },
//         group1: {
//             style: { margins: 0, alignment: 'left' },
//             radiobutton: [, [0, 0, 170, 15], '帧指示器'],
//         },
//         group2: {
//             style: { margins: 0, spacing: 10, alignChildren: ['fill', ''], orientation: 'column' },
//             radiobutton: [, [0, 0, 170, 15], '外部数据'],
//             group1: {
//                 style: { margins: 0, spacing: 5, alignChildren: ['fill', ''] },
//                 rectbutton1: [, [0, 0, 145, 26], 'Final Cut Pro XML'],
//                 rectbutton2: {
//                     param: [, [0, 0, 25, 26], '?'],
//                     style: { alignment: ['right', ''] },
//                 },
//             },
//         },
//         group3: {
//             style: { margins: 0, spacing: 5, alignChildren: ['fill', ''], orientation: 'column' },
//             radiobutton: [, , '自定义时间'],
//             group1: {
//                 style: { spacing: 5, alignChildren: ['fill', ''] },
//                 edittext1: [, [0, 0, 40, 26], '0'],
//                 edittext2: [, [0, 0, 40, 26], '0'],
//                 edittext3: [, [0, 0, 40, 26], '0'],
//                 edittext4: [, [0, 0, 40, 26], '0'],
//             },
//             group2: {
//                 style: { spacing: 5, alignChildren: ['fill', ''] },
//                 edittext1: [, [0, 0, 85, 26], '0:00:00:000'],
//                 edittext2: [, [0, 0, 85, 26], '00000'],
//             },
//         },
//     },
//     panel3: {
//         style: { margins: 5, spacing: 5, alignChildren: ['fill', ''], orientation: 'row' },
//         rectbutton1: ['fo', [0, 0, 55, 26], '缩短'],
//         rectbutton2: [, , '匹配'],
//         rectbutton3: [, , '延长'],
//     },
//     treeview: {
//         param: [, [0, 0, 500, 500]],
//         node: {
//             style: { expanded: true },
//             node: {
//                 node: {
//                     style: { expanded: true },
//                     item1: 1,
//                     item2: 2,
//                     item3: 3,
//                     item4: 4,
//                     item5: 5,
//                 },
//                 item2: 2,
//                 item3: 3,
//                 item4: 4,
//                 node2: {
//                     item1: 1,
//                     item2: 2,
//                     item3: 3,
//                     item4: 4,
//                     item5: 5,
//                 },
//             },
//             item2: 2,
//             item3: 3,
//             item4: 4,
//             item5: 5,
//         },
//     },
// });
