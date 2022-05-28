# scriptUI-parser
基于对象的 `ScriptUI` 解析器，支持 `Ae` `Ps` `Ai` `Id`。

# 用法
将 `src` 目录下 的 `scriptUI-parser-min.jsx` 文件中的代码粘贴到自己编写的脚本文件的头部即可。

# 上下文配置
Q:为什么会有上下文配置环节？\
A:受限于Ae中可停靠UI的实现逻辑，需要向解析器传递全局环境作为判断依据，否则解析后的UI从ScriptUI Panels文件夹下运行时面板将无法停靠。

## 全局环境
如果你的脚本运行在全局环境下，解析器会自动侦测上下文，无需进行任何配置。

```javaScript
//此处是解析器代码 parseScriptUI(resource) { ... }

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
配置主容器特性\
config 支持以下参数：\
1、`dockable` 类型：`Boolean`。配置主容器是否可以在AE中停靠，默认为 true。\
2、`show` 类型：`Boolean`。配置主容器是否在创建后显示，默认为 true。\
3、`singleton` 类型：`Boolean`。单例模式。启用后解析器返回一个方法，调用该方法可创建单例面板，无论调用该方法多少次，面板只会被创建一次,特别适用于构建脚本的参数配置面板。默认为 false。

单例面板案例演示
```javaScript
var configWindow = parseScriptUI({
    config: { singleton: true },
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

自定义按钮\
解析器实现了对常规按钮进行外观配置的能力，我们可以对按钮四种状态下（即鼠标悬停、移出、点击、抬起）的按钮颜色，文字颜色、描边颜色等进行自定义配置。

⚠ 请勿在Ae CC 2019 版本中使用自定义按钮，会出现严重的按钮渲染延迟。因为该版本的Script UI自定义绘图接口存在Bug，该问题非开发者所能解决，Adobe也并无任何解决此问题的意愿。\
2022/5/28：以上问题已在 0.0.7 版采用新的处理机制，如果侦测到 Ae CC 2019 会自动把自定义按钮映射为普通按钮，也就是 "button" ，所有已经配置的样式均会被忽略。
### 矩形按钮
创建一个空白的矩形按钮：

```javaScript
parseScriptUI({ rectbutton: [] });
```
### 圆形按钮
创建一个空白的圆形按钮：

```javaScript
parseScriptUI({ roundbutton: [] });
```

### 属性

- 圆形按钮和矩形按钮有着完全一致的可配置属性，两者的区别仅仅是定义名称及外观差异而已。

- 与ScriptUI现有的按钮一样，自定义按钮的传参顺序依次为：

```javaScript
rectbutton: [节点名称, 按钮大小, 按钮文字, {创建属性}]
roundbutton: [节点名称, 按钮大小, 按钮文字, {创建属性}]
```
- 按钮的外观配置主要指对于`{创建属性}`的配置，它是一个对象。

- 我们通过一个实际案例来演示如何配置这些属性。为了方便参照，以下属性皆使用默认值。

```javaScript
parseScriptUI({
    rectbutton: [
        'button',
        undefined,
        '按钮',
        {
            enableText: true, //是否显示按钮上的文字
            enableFill: true, //是否启用对按钮的填充
            enableStroke: true, //是否启用对按钮的描边
            fontName: 'Tahoma', //按钮字体，你一定很想知道都可以换成哪些字体，并且应该怎么输入。方法就是打开你的AE，然后开启字符面板，将面板右上角的三横杠菜单点开，勾选“显示英文字体名称，然后你会发现，字符面板里的所有字体名称都变成了英文，没错，这些英文就是可以写在这里的参数，复制粘贴即可（嗯，真的有很多字体，所以我并无打算把他们都列在文档里）。”
            fontStyle: 'REGULAR', //按钮字体样式，可选参数有：REGULAR|BOLD|ITALIC|BOLDITALIC
            fontSize: 12, //按钮文字大小
            fontOffset: [0, 0], //按钮文字的偏移量。这可能是个莫名其妙的属性，因为ScriptUI对字体边界的计算，相对不同字体而言总是不一致的（没错，这是个BUG，Adobe很擅长写BUG），所以百分之两百，你在更换某个字体后，会发现文字并没有水平垂直居中，身为强迫症的你，这个属性可能是救命稻草。该属性是有2个元素的数组，分别对应横向与纵向的文字偏移量（单位是像素），正值向右/下偏，负值向左/下偏。
            fontColor: ['#161616', '#8a8a8a', '#161616', '#ffffff'], //按钮在四个阶段分别对应的文字颜色
            fillColor: ['#8a8a8a', '#232323', '#636363', '#2d8ceb'], //按钮在四个阶段分别对应的填充颜色
            strokeColor: ['#8a8a8a', '#8a8a8a', '#636363', '#2d8ceb'], //按钮在四个阶段分别对应的描边颜色
            fontOpacity: [1, 1, 1, 1], //按钮在四个阶段分别对应的字体透明度
            fillOpacity: [1, 1, 1, 1], //按钮在四个阶段分别对应的填充透明度
            strokeOpacity: [1, 1, 1, 1], //按钮在四个阶段分别对应的描边透明度
            strokeWidth: [2, 2, 2, 2], //按钮在四个阶段分别对应的描边粗细
        },
    ],
});
```

- 所有的属性都是可以缺省的，这意味着，你只需配置你关注的属性，而不必把所有属性都罗列出来。
- 例如，你只是想将按钮上文字的字体换成楷体：
```javaScript
parseScriptUI({ rectbutton: ['button', undefined, '按钮', { fontName: 'KaiTi' }] });
```
- 又或者，你想把默认状态下按钮的填充色改成红色，并且把讨厌的描边去掉（我猜大家还是更喜欢简洁一点的按钮），你可以这么写：
```javaScript
parseScriptUI({ rectbutton: ['button', undefined, '按钮', { enableStroke: false, fillColor: [, '#e81123'] }] });
```
- 细心的你可能已经发现了，fillColor是一个四个元素的数组，但示例中只传了一个参数。的确是这样，你完全可以在数组对应位置（显然逗号还是不能省的）只传入一个参数，解析器知道你想做什么。
- 不仅如此，颜色、透明度和描边属性还可以直接按以下方式传参，他表示四种状态下都使用同一个参数：
```javaScript
parseScriptUI({ rectbutton: ['button', undefined, '按钮', { enableStroke: false, fillColor: '#e81123' }] });
```
- 这时候你就拥有了一个纯红色的按钮，并且任何鼠标状态下都是这个颜色。
- 所有参数都是支持缺省的，另外如果你发现配置了参数之后，按钮的外观并没有发生改变，那么只有两种可能，一是你的参数是无效的，二是你的参数超出了最大限制。我并没有选择在这种时候用弹窗的方式向你展示错误（相信大家都讨厌弹窗，尤其是错误的弹窗），所有非法输入被检测到后，都会使用默认参数进行替补，所以你可以大胆的往参数里写任何内容。

## example 8
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
