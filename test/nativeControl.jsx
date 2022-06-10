//@include "../tree.jsx"

// var elements = Tree.parse({
//     button: [],
//     checkbox: [],
//     dropdownlist: [],
//     edittext: [],
//     flashplayer: [],
//     group: [],
//     iconbutton: [],
//     image: [],
//     listbox: [],
//     panel: [],
//     progressbar: [],
//     radiobutton: [],
//     scrollbar: [],
//     slider: [],
//     statictext: [],
//     tabbedpanel: [],
//     treeview: [],
// });

var window = new Window('palette');
var panel = window.add('panel');
var editText = panel.add('edittext');
var button = panel.add('button');
window.show();

var window = new Window('palette { \
    panel: Panel { \
        editText: EditText { }, \
        button: Button { } \
    }, \
}');
window.show();

var window = Tree.parse({
    panel: {
        editText: [],
        button: [],
    },
});
