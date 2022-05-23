# scriptUI-parser
基于对象的 `Ae ScriptUI` 解析器

# 用法
将 `src` 目录下 的 `scriptUI-parser-min.jsx` 文件中的代码粘贴到自己编写的脚本文件的头部即可。

# 上下文配置
Q:为什么会有上下文配置环节？
A:受限于Ae中可停靠UI的实现逻辑，需要向解析器传递全局环境作为判断依据，否则解析后的UI从ScriptUI Panels文件夹下运行时面板将无法停靠。

## 全局环境
如果你的脚本运行在全局环境下，可通过以下方式配置上下文。

```javaScript
//此处是解析器代码 parseScriptUI(resource) { ... }
parseScriptUI.contex = this;

parseScriptUI({
    /*UI源对象*/
});

//你的脚本代码
function foo() {
    // Yoooo!
}
```

## IIFE（自执行函数）
如果你的脚本运行在自执行函数或者其他函数内部，可通过以下方式配置上下文。

```javaScript
(function (global) {
    //此处是解析器代码 parseScriptUI(resource) { ... }
    parseScriptUI.context = global;

    parseScriptUI({
        /*UI源对象*/
    });

    //你的脚本代码
    function foo() {
        // Yoooo!
    }
})(this);
```


# 示例

## example 1
最小解析：创建一个空白按钮

```javaScript
parseScriptUI({ button: '' });
```

## example 2
添加一个节点名称为 "run" 的按钮，并设置事件。
```javaScript
var elements = parseScriptUI({
    button1: ['run'],
});

elements.run.onClick = function () {
    alert('Yoooooo!');
};
```

## example 3
将事件通过样式写入
```javaScript
function foo() {
    alert('Yoooooo!');
}

var elements = parseScriptUI({
    button1: {
        style: { onClick: foo },
        param: ['run'],
    },
});
```

## example 4
为按钮添加更多样式
```javaScript
function foo() {
    alert('Yoooooo!');
}

var elements = parseScriptUI({
    button1: {
        style: { onClick: foo },
        param: ['run', [0, 0, 100, 30], '按钮'],
    },
});
```

## example 5
配置全局主容器的样式。
```javaScript
function foo() {
    alert('Yoooooo!');
}

var elements = parseScriptUI({
    style: { margins: 5, alignChildren: ['fill', 'fill'] },
    param: ['palette', '', undefined, { resizeable: true }],
    button1: {
        style: { onClick: foo },
        param: ['run', [0, 0, 100, 30], '按钮'],
    },
});
```

## example 6
配置主容器特性
config 支持以下参数：
1、`dockable` 类型：`Boolean`。配置主容器是否可以在AE中停靠，默认为 true。
2、`show` 类型：`Boolean`。配置主容器是否在创建后显示，默认为 true。
3、`singleton` 类型：`Boolean`。单例模式。启用后解析器返回一个方法，调用该方法可创建单例面板，无论调用该方法多少次，面板只会被创建一次。默认为 false。

单例面板案例演示
```javaScript
var configWindow = parseScriptUI({
    //单例窗口模式下，应当将 dockable 设置为 fasle，这样可以确保脚本在 ScriptUI Panels 文件夹下运行时弹出一个 palette，否则该面板会附加到主容器中。
    //当然如果你知道你在做什么，也可将 dockable 设置为 true。
    config: { dockable: false, singleton: true },
    checkbox: [undefined, undefined, '启用'],
});

var mainWindow = parseScriptUI({
    button: {
        style: { onClick: configWindow },
        param: [undefined, undefined, '设置'],
    },
});
```

## example 7
完整案例演示。
```javaScript
function foo() {
    alert('Yoooooo!!!');
}

var elements = parseScriptUI({
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
```
