var Tree = function () {
    var ROOT = this;
    var GLOBAL = getGlobal($);
    var BRIDGETALK = getBridgeTalk(GLOBAL);
    var SUPPORT_HOST = ['aftereffects', 'photoshop', 'illustrator', 'indesign', 'estoolkit'];

    if (!isValidHost(BRIDGETALK, SUPPORT_HOST)) return null;

    var TREE = {};

    var VERSION = '0.3.1';

    var INFINITY = 1 / 0;

    var reEscapeNumber = /\d/g;

    var reEscapeChar = /\\(\\)?/g;

    var reEscapeParentheses = /\)$|^\(/g;

    var reIsFontStyleFlag = /REGULAR|BOLD|ITALIC|BOLDITALIC/i;

    var reMapFullHex = /^#?([a-f\d])([a-f\d])([a-f\d])$/gi,
        reIsHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/gi;

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    var HOST_NAME = BRIDGETALK.appName,
        IS_AE_HOST = isHost('aftereffects'),
        IS_PS_HOST = isHost('photoshop'),
        IS_AI_HOST = isHost('illustrator'),
        IS_ID_HOST = isHost('indesign'),
        IS_TK_HOST = isHost('estoolkit'),
        IS_AE_2019 = IS_AE_HOST && isAppVersion(16),
        IS_NO_FONT_SIZE_HOST = IS_AI_HOST || IS_ID_HOST;

    var MAIN_CONTAINER_COLLECTION = [];

    var FIX_PS_STROKE_ISSUE = IS_PS_HOST ? 1 : 0,
        FIX_HEIGHT_MEASURE_ISSUE = IS_AI_HOST ? 4.5 : 5,
        PS_WIDTH_MEASURE_FACTOR = 2.4;

    var SUPPORT_CONTAINER_TYPE_REFERENCES = { aftereffects: ['dialog', 'palette', 'window'], photoshop: 'dialog', illustrator: ['dialog', 'palette', 'window'], indesign: 'dialog', estoolkit: ['dialog', 'palette', 'window'] },
        SUPPORT_CONTAINER_TYPE = SUPPORT_CONTAINER_TYPE_REFERENCES[HOST_NAME];

    var MAIN_CONTAINER_TYPE_REFERENCES = { aftereffects: 'palette', photoshop: 'dialog', illustrator: 'palette', indesign: 'dialog', estoolkit: 'palette' },
        MAIN_CONTAINER_TYPE_DEFAULT = MAIN_CONTAINER_TYPE_REFERENCES[HOST_NAME];

    var CONTROL_PARAM_REFERENCES = { button: 3, checkbox: 3, dropdownlist: 3, edittext: 3, iconbutton: 3, image: 3, listbox: 3, progressbar: 4, radiobutton: 3, scrollbar: 5, slider: 5, statictext: 3, treeview: 3 },
        CONTAINER_PARAM_REFERENCES = { group: 2, panel: 3, tab: 3, tabbedpanel: 3 },
        CUSTOM_CONTROL_PARAM_REFERENCES = { rectbutton: 3, roundbutton: 3, angle: 3 };

    var CONTROL_TYPE_FLAG = {
        button: 'A',
        checkbox: 'B',
        dialog: 'C',
        dropdownlist: 'D',
        edittext: 'E',
        group: 'G',
        iconbutton: 'H',
        image: 'I',
        item: 'J',
        listbox: 'K',
        node: 'L',
        palette: 'M',
        panel: 'N',
        progressbar: 'O',
        radiobutton: 'P',
        scrollbar: 'Q',
        slider: 'R',
        statictext: 'S',
        tab: 'T',
        tabbedpanel: 'U',
        treeview: 'V',
        window: 'W',
        rectbutton: 'X',
        roundbutton: 'Y',
        // angle: 'Z',
    };

    if (IS_TK_HOST) _assign(CONTROL_TYPE_FLAG, { flashplayer: 'F' });
    if (IS_PS_HOST) _unset(CONTROL_TYPE_FLAG, 'treeview');

    var reCombination = /[CGMNTW][ABDEFGHIKNOPQRSUVXYZ]|[DK]J|[VL][LJ]|UT/,
        reIsContainer = /[DGKLNTUV]/,
        reIsListItemContainer = /[DKLV]/,
        reIsSelectableContainer = /[DKUV]/,
        reIsCustomControl = /[XYZ]/,
        reIsCustomButton = /[XY]/,
        reIsNativeContainer = /[GNTU]/,
        reIsNativeControl = /[ABDEFHIKOPQRSV]/;

    var MOUSE_LEFT_CLICK_FLAG = 0,
        MOUSE_RIGHT_CLICK_FLAG = 2;

    var MOUSE_EVENT_REFERENCES = ['mouseover', 'mouseout', 'mousedown', 'mouseup'];

    var CUSTOM_BUTTON_FONT_PROPERTIES = ['fontName', 'fontStyle', 'fontSize'],
        CUSTOM_BUTTON_PENS_PROPERTIES = ['fontColor', 'fillColor', 'strokeColor', 'fontOpacity', 'fillOpacity', 'strokeOpacity', 'strokeWidth'],
        CUSTOM_BUTTON_CONFIG_PROPERTIES = ['enableText', 'enableFill', 'enableStroke', 'fontOffset'],
        CUSTOM_BUTTON_AUTO_FILL_PROPERTIES = ['fontColor', 'fillColor', 'strokeColor', 'fontOpacity', 'fillOpacity', 'strokeOpacity', 'strokeWidth'];

    var CUSTOM_ELEMENT_TYPE_REFERENCES = { rectbutton: 'customView', roundbutton: 'customView', angle: 'customBoundedValue' };

    var RECT_BUTTON_VALID_PROPERTIES = ['enableText', 'enableFill', 'enableStroke', 'fontName', 'fontStyle', 'fontSize', 'fontOffset', 'fontColor', 'fillColor', 'strokeColor', 'fontOpacity', 'fillOpacity', 'strokeOpacity', 'strokeWidth'],
        ROUND_BUTTON_VALID_PROPERTIES = RECT_BUTTON_VALID_PROPERTIES;

    var STROKE_WIDTH_REFERENCES = { aftereffects: 2, photoshop: 1, illustrator: 2, indesign: 2, estoolkit: 2 },
        STROKE_WIDTH_DEFAULT = _times(4, _constant(STROKE_WIDTH_REFERENCES[HOST_NAME]));

    var TEXT_LOCATION_REFERENCES = { aftereffects: [0, 0], photoshop: [0, 0], illustrator: [0, 2], indesign: [0, 3], estoolkit: [0, -1] },
        FIX_TEXT_LOCATION = TEXT_LOCATION_REFERENCES[HOST_NAME];

    var FONT_COLOR_REFERENCES = {
        aftereffects: ['#161616', '#8a8a8a', '#161616', '#ffffff'],
        photoshop: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#ffffff'],
        illustrator: ['#4b4b4b', '#ffffff', '#ffffff', '#ffffff'],
        indesign: ['#4b4b4b', '#ffffff', '#ffffff', '#ffffff'],
        estoolkit: ['#000000', '#000000', '#000000', '#000000'],
    };
    var FONT_COLOR_DEFAULT = FONT_COLOR_REFERENCES[HOST_NAME];

    var FILL_COLOR_REFERENCES = {
        aftereffects: ['#8a8a8a', '#232323', '#636363', '#2d8ceb'],
        photoshop: ['#454545', '#454545', '#363636', '#454545'],
        illustrator: ['#ffffff', '#535353', '#46a0f5', '#46a0f5'],
        indesign: ['#ffffff', '#535353', '#46a0f5', '#46a0f5'],
        estoolkit: ['#e5f1fb', '#e1e1e1', '#cce4f7', '#e5f1fb'],
    };
    var FILL_COLOR_DEFAULT = FILL_COLOR_REFERENCES[HOST_NAME];

    var STROKE_COLOR_REFERENCES = {
        aftereffects: ['#8a8a8a', '#8a8a8a', '#636363', '#2d8ceb'],
        photoshop: ['#666666', '#666666', '#636363', '#1473e7'],
        illustrator: ['#ffffff', '#ffffff', '#46a0f5', '#46a0f5'],
        indesign: ['#ffffff', '#ffffff', '#46a0f5', '#46a0f5'],
        estoolkit: ['#0078d7', '#adadad', '#005499', '#0078d7'],
    };
    var STROKE_COLOR_DEFAULT = STROKE_COLOR_REFERENCES[HOST_NAME];

    var RECT_BOUNDS_REFERENCES = {
        aftereffects: [0, 0, 80, 28],
        photoshop: [0, 0, 65, 25],
        illustrator: [0, 0, 80, 26],
        indesign: [0, 0, 80, 28],
        estoolkit: [0, 0, 78, 23],
    };
    var RECT_BOUNDS_DEFAULT = RECT_BOUNDS_REFERENCES[HOST_NAME];

    var ROUND_BOUNDS_REFERENCES = {
        aftereffects: [0, 0, 30, 30],
        photoshop: [0, 0, 28, 28],
        illustrator: [0, 0, 28, 28],
        indesign: [0, 0, 30, 30],
        estoolkit: [0, 0, 23, 23],
    };
    var ROUND_BOUNDS_DEFAULT = ROUND_BOUNDS_REFERENCES[HOST_NAME];

    var RECT_STYLE_DEFAULT = { text: '', bounds: RECT_BOUNDS_DEFAULT },
        ROUND_STYLE_DEFAULT = { text: '', bounds: ROUND_BOUNDS_DEFAULT };

    var MAIN_CONTAINER_DEFAULT = {
        dockable: true,
        show: true,
        singleton: false,
    };

    var RECT_CREATION_DEFAULT = {
        enableText: true,
        enableFill: true,
        enableStroke: true,
        fontName: 'Tahoma',
        fontStyle: 'REGULAR',
        fontSize: 12,
        fontOffset: [0, 0],
        fontColor: FONT_COLOR_DEFAULT,
        fillColor: FILL_COLOR_DEFAULT,
        strokeColor: STROKE_COLOR_DEFAULT,
        fontOpacity: [1, 1, 1, 1],
        fillOpacity: [1, 1, 1, 1],
        strokeOpacity: [1, 1, 1, 1],
        strokeWidth: STROKE_WIDTH_DEFAULT,
    };
    var ROUND_CREATION_DEFAULT = RECT_CREATION_DEFAULT;

    var RECT_BUTTON_PARAM_VALIDATOR = {
        enableText: _isBoolean,
        enableFill: _isBoolean,
        enableStroke: _isBoolean,
        fontName: _isString,
        fontStyle: isFontStyleFlag,
        fontSize: isBetween(1, 24),
        fontOffset: [_isNumber, _isNumber],
        fontColor: [isHex, isHex, isHex, isHex],
        fillColor: [isHex, isHex, isHex, isHex],
        strokeColor: [isHex, isHex, isHex, isHex],
        fontOpacity: [isBetween(0, 1), isBetween(0, 1), isBetween(0, 1), isBetween(0, 1)],
        fillOpacity: [isBetween(0, 1), isBetween(0, 1), isBetween(0, 1), isBetween(0, 1)],
        strokeOpacity: [isBetween(0, 1), isBetween(0, 1), isBetween(0, 1), isBetween(0, 1)],
        strokeWidth: [isBetween(0, 10), isBetween(0, 10), isBetween(0, 10), isBetween(0, 10)],
    };
    var ROUND_BUTTON_PARAM_VALIDATOR = RECT_BUTTON_PARAM_VALIDATOR;

    function _and() {
        var index = -1,
            length = arguments.length;
        while (++index < length) if (!arguments[index]) return false;
        return true;
    }

    function _apply(func, thisArg, args) {
        switch (args.length) {
            case 0:
                return func.call(thisArg);
            case 1:
                return func.call(thisArg, args[0]);
            case 2:
                return func.call(thisArg, args[0], args[1]);
            case 3:
                return func.call(thisArg, args[0], args[1], args[2]);
            default:
                return func.apply(thisArg, args);
        }
    }

    function _arrayEach(array, iteratee) {
        var index = -1;
        var length = array.length;
        while (++index < length) iteratee(array[index], index, array);
    }

    function _arrayMap(array, iteratee) {
        var index = -1;
        var length = array.length;
        var result = Array(length);
        while (++index < length) result[index] = iteratee(array[index], index, array);
        return result;
    }

    function _arraySome(array, predicate) {
        var index = -1;
        var length = array.length;
        while (++index < length) {
            if (predicate(array[index], index, array)) return true;
        }
        return false;
    }

    function _assign(object) {
        _objectEach([].slice.call(arguments, 1), function (source) {
            if (_isObject(source)) {
                for (var property in source) object[property] = source[property];
            }
        });
        return object;
    }

    function _baseGet(object, path) {
        path = _castPath(path, object);
        var index = 0;
        var length = path.length;
        while (object != null && index < length) object = object[_toKey(path[index++])];
        return index && index == length ? object : undefined;
    }

    function _baseObjectToString(value) {
        return Object.prototype.toString.call(value);
    }

    function _basePick(object, keys) {
        return _basePickBy(object, keys, function (value, key) {
            return _has(object, key);
        });
    }

    function _basePickBy(object, keys, predicate) {
        var result = {};
        _arrayEach(keys, function (key) {
            var value = object[key];
            if (predicate(value, key)) result[key] = value;
        });
        return result;
    }

    function _baseToString(value) {
        if (typeof value == 'string') return value;
        if (_isArray(value)) return _arrayMap(value, _baseToString) + '';
        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }

    function _castPath(value, object) {
        if (_isArray(value)) return value;
        return _isKey(value, object) ? [value] : _stringToPath(_toString(value));
    }

    function _chunk(array, count) {
        if (count == null || count < 1) return [];
        var result = [];
        var i = 0;
        var length = array.length;
        while (i < length) result.push([].slice.call(array, i, (i += count)));
        return result;
    }

    function _clone(object) {
        if (!_isObjectLike(object)) return object;
        return _isArray(object) ? object.slice() : _assign({}, object);
    }

    function _cloneDeep(object) {
        var result = _isArray(object) ? [] : {};
        if (_isObjectLike(object)) {
            _each(object, function (value, key, object) {
                if (_has(object, key)) result[key] = _isObjectLike(value) ? _cloneDeep(value) : value;
            });
        }
        return result;
    }

    function _constant(value) {
        return function () {
            return value;
        };
    }

    function _contains(array, value) {
        var index = -1;
        var length = array.length;
        while (++index < length) if (array[index] === value) return true;
        return false;
    }

    function _each(object, iterator) {
        var func = _isArray(object) ? _arrayEach : _objectEach;
        return func(object, iterator);
    }

    function _get(object, key, defaultValue) {
        var result = object == null ? undefined : object[key];
        return result === undefined ? defaultValue : result;
    }

    function _has(object, key) {
        return object != null && Object.prototype.hasOwnProperty.call(object, key);
    }

    function _isArray(object) {
        return _baseObjectToString(object) === '[object Array]';
    }

    function _isBoolean(value) {
        return value === true || value === false;
    }

    function _isFunction(object) {
        return typeof object === 'function';
    }

    function _isKey(value, object) {
        if (_isArray(value)) return false;
        var type = typeof value;
        if (type == 'number' || type == 'boolean' || value == null) return true;
        return _or(reIsPlainProp.test(value), !reIsDeepProp.test(value), object != null && value in Object(object));
    }

    function _isNil(value) {
        return value == null;
    }

    function _isNull(value) {
        return value === null;
    }

    function _isNumber(value) {
        return typeof value == 'number';
    }

    function _isObject(value) {
        var type = typeof value;
        return _and(value != null, type == 'object' || type == 'function');
    }

    function _isObjectLike(value) {
        return value != null && typeof value == 'object';
    }

    function _isString(value) {
        return typeof value == 'string';
    }

    function _keys(object) {
        var keys = [];
        for (var key in object) {
            if (object.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
    }

    function _mapValues(object, iteratee) {
        var result = {};
        _objectEach(object, function (value, key, object) {
            result[key] = iteratee(value, key, object);
        });
        return result;
    }

    function _object(list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            values ? (result[list[i]] = values[i]) : (result[list[i][0]] = list[i][1]);
        }
        return result;
    }

    function _objectEach(object, iteratee) {
        _arrayEach(_keys(object), function (key) {
            iteratee(object[key], key, object);
        });
    }

    function _or() {
        var index = -1,
            length = arguments.length;
        while (++index < length) if (arguments[index]) return true;
        return false;
    }

    function _pluck(object, key) {
        return _arrayMap(object, _property(key));
    }

    function _property(key) {
        return function (object) {
            return object[key];
        };
    }

    function _stringToPath(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) result.push('');
        string.replace(rePropName, function (match, number, quote, subString) {
            result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
        });
        return result;
    }

    function _stubFalse() {
        return false;
    }

    function _times(n, iteratee) {
        var index = -1;
        var result = Array(n);
        while (++index < n) result[index] = iteratee(index);
        return result;
    }

    function _toKey(value) {
        if (typeof value == 'string') return value;
        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }

    function _toString(value) {
        return value == null ? '' : _baseToString(value);
    }

    function _uniq() {
        var result = [];
        var array = [].concat.apply([], arguments);
        _arrayEach(array, function (value) {
            if (!_contains(result, value)) result.push(value);
        });
        return result;
    }

    function _unset(object, key) {
        delete object[key];
        return object;
    }

    function _values(object) {
        var keys = _keys(object);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = object[keys[i]];
        }
        return values;
    }

    function _zip() {
        var length = _apply(Math.max, null, _pluck(arguments, 'length').concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _pluck(arguments, '' + i);
        }
        return results;
    }

    function addContainer(container, value, type, collector) {
        var func = isNode(type) ? addNodeContainer : addGeneralContainer;
        return _apply(func, null, arguments);
    }

    function addControl(container, value) {
        var func = isListItemContainer(container.type) ? addListItem : addGeneralControl;
        _assign(_apply(func, null, arguments), getElementStyle(value));
    }

    function addGeneralContainer(container, value, type, collector) {
        var style = getElementStyle(value);
        var container = nativeAddContainer(container, type, wrapElementParam(value, type));

        if (isSelectableContainer(type) && _has(style, 'selection')) {
            collector.listContainer.push({ container: container, itemIndex: style.selection });
            return _assign(container, _unset(style, 'selection'));
        }

        return _assign(container, getElementStyle(value));
    }

    function addGeneralControl(container, value, type, collector) {
        type = IS_AE_2019 && isCustomButton(type) ? 'button' : type;
        var func = isCustomControl(type) ? customAddControl : nativeAddControl;
        var control = func(container, type, wrapElementParam(value, type));
        return control;
    }

    function addListItem(container, value, type, collector) {
        return nativeAddItem(container, getListItemParam(value));
    }

    function addNodeContainer(container, value, type, collector) {
        var style = getElementStyle(value);
        var node = nativeAddNode(container, getListItemParam(value));
        if (style.expanded) collector.nodes.push(node);
        return _assign(node, _unset(style, 'expanded'));
    }

    function assignCustomParam(customParam, defaultParam, validator) {
        eachPathDeep(defaultParam, function (value, key, path, object) {
            var _value = _baseGet(customParam, path);
            if (_baseGet(validator, path)(_value)) object[key] = _value;
        });
        return defaultParam;
    }

    function baseEachElement(container, accumulator, breaker, predicate) {
        var containers = [];
        var isDone = _arraySome(container.children, function (element) {
            if (isNativeContainer(element.type)) containers.push(element);
            if (predicate(element)) accumulator.push(element);
            return breaker(accumulator);
        });

        if (isDone) return;

        _arrayEach(containers, function (container) {
            baseEachElement(container, accumulator, breaker, predicate);
        });
    }

    function baseEachPath(object, accumulator, iteratee) {
        _each(object, function (value, key) {
            iteratee(value, key, accumulator.concat(key), object);
            if (_isObjectLike(value)) baseEachPath(value, accumulator.concat(key), iteratee);
        });
    }

    function baseEachSource(object, container, containerIteratee, controlIteratee, collector) {
        _objectEach(object, function (value, key) {
            key = escapeNumber(key).toLowerCase();
            if (!(isValidElement(key) && isValidCombination(container.type, key))) return;
            if (isContainer(key)) {
                var newContainer = containerIteratee(container, value, key, collector);
                baseEachSource(value, newContainer, containerIteratee, controlIteratee, collector);
            } else controlIteratee(container, value, key, collector);
        });
    }

    function baseGetConfig(value) {
        return _get(value, 'config');
    }

    function baseGetElementId(element) {
        var properties = element.properties;
        return properties && properties.name;
    }

    function baseGetListItemParam(value) {
        return _get(value, 'param');
    }

    function baseGetParam(value) {
        var result = _get(value, 'param');
        return _isArray(result) ? mapNullValue(result) : [];
    }

    function baseGetStyle(value) {
        var result = _get(value, 'style');
        return _isObject(result) ? result : {};
    }

    function bulidElements(resource, context) {
        var container = initMainContainer(resource, context);
        var collector = new ElementCollector();

        baseEachSource(resource, container, addContainer, addControl, collector);

        selectListItem(collector.listContainer);
        expandTreeViewNodes(collector.nodes);

        return container;
    }

    function buildNativeWindow(resource, context, showWindow, layoutMode) {
        var container = bulidElements(resource, context);
        initLayout(container, layoutMode);
        if (isWindow(container) && showWindow) container.show();
        return container;
    }

    function buildSingletonWindow(resource, context, showWindow, layoutMode) {
        var container = null;
        return function () {
            if (isInvisibleContainer(container)) container = bulidElements(resource, context);
            initLayout(container, layoutMode);
            if (isWindow(container) && showWindow) container.show();
            return container;
        };
    }

    function buildWindow(isSingletonWindow) {
        var func = isSingletonWindow ? buildSingletonWindow : buildNativeWindow;
        return _apply(func, null, [].slice.call(arguments, 1));
    }

    function calculateTextLocation() {
        var rawSize = this.graphics.measureString(this.text, this.font);
        var drawSize = this.graphics.measureString(this.text, this.font, rawSize[0]);
        var drawWidth = IS_PS_HOST ? fixPsWidthMeasureIssue(drawSize[0], this.text) : drawSize[0];
        var width = (this.width - drawWidth) / 2 + this.left + this.fontOffset[0];
        var height = IS_NO_FONT_SIZE_HOST ? FIX_HEIGHT_MEASURE_ISSUE : (this.height - drawSize[1]) / 2 + this.top + this.fontOffset[1];
        return [width + FIX_TEXT_LOCATION[0], height + FIX_TEXT_LOCATION[1]];
    }

    function createFont(param) {
        return ScriptUI.newFont(param.fontName, mapFontStyleFlag(param.fontStyle), param.fontSize);
    }

    function createPens(graphics, pensParam) {
        var pens = _arrayMap(pensParam, function (param) {
            return _apply(newPens, graphics, param);
        });
        return _object(MOUSE_EVENT_REFERENCES, pens);
    }

    function createRectButton(container, type, param) {
        var rawProperties = getCreationProperties(param, type);
        if (_isNil(rawProperties)) rawProperties = {};
        var bounds = _get(param, 1, RECT_STYLE_DEFAULT.bounds);
        var text = _get(param, 2, RECT_STYLE_DEFAULT.text);
        var baseElementParam = { text: text, properties: { name: rawProperties.name } };
        var control = container.add(createResourceSpecification(type, baseElementParam), bounds);
        var drawParam = _assign(_basePick(rawProperties, RECT_BUTTON_VALID_PROPERTIES), { bounds: bounds, text: text });
        drawParam = assignCustomParam(mapFullParam(drawParam), _cloneDeep(RECT_CREATION_DEFAULT), RECT_BUTTON_PARAM_VALIDATOR);
        return drawControl(control, type, drawParam);
    }

    function createResourceSpecification(type, param) {
        return mapCustomElementType(type) + createStringCode(param);
    }

    function createRoundButton(container, type, param) {
        var rawProperties = getCreationProperties(param, type);
        if (_isNil(rawProperties)) rawProperties = {};
        var bounds = _get(param, 1, ROUND_STYLE_DEFAULT.bounds);
        var text = _get(param, 2, ROUND_STYLE_DEFAULT.text);
        var baseElementParam = { text: text, properties: { name: rawProperties.name } };
        var control = container.add(createResourceSpecification(type, baseElementParam), bounds);
        var drawParam = _assign(_basePick(rawProperties, ROUND_BUTTON_VALID_PROPERTIES), { bounds: bounds, text: text });
        drawParam = assignCustomParam(mapFullParam(drawParam), _cloneDeep(ROUND_CREATION_DEFAULT), ROUND_BUTTON_PARAM_VALIDATOR);
        return drawControl(control, type, drawParam);
    }

    function createStringCode(param) {
        return escapeParentheses(uneval(param));
    }

    function customAddControl(container, type, param) {
        var addStrategies = { rectbutton: createRectButton, roundbutton: createRoundButton };
        return addStrategies[type](container, type, param);
    }

    function customDraw(control, type) {
        var graphics = control.graphics;
        var definePathmethod = type === 'rectbutton' ? 'rectPath' : 'ellipsePath';
        var drawValue = type === 'rectbutton' ? DrawRectValues : DrawRoundValues;
        control.onDraw = function () {
            var param = new drawValue(control);
            graphics[definePathmethod](param.left, param.top, param.width, param.height);
            if (param.enableFill) graphics.fillPath(param.pen.fill);
            if (param.enableStroke) graphics.strokePath(param.pen.stroke);
            if (param.enableText) graphics.drawString(param.text, param.pen.text, param.textX, param.textY, param.font);
        };
        return control;
    }

    function drawControl(control, type, param) {
        var graphics = control.graphics;
        var pens = createPens(graphics, mapPensParam(param));
        var font = createFont(mapFontParam(param));
        _assign(graphics, _basePick(param, CUSTOM_BUTTON_CONFIG_PROPERTIES), { pen: pens.mouseout, font: font });
        return customDraw(wrapOnClickEvent(wrapPensState(control, pens)), type);
    }

    function DrawRectValues(control) {
        this.graphics = control.graphics;
        this.enableText = this.graphics.enableText;
        this.enableFill = this.graphics.enableFill;
        this.enableStroke = this.graphics.enableStroke;
        this.fontOffset = this.graphics.fontOffset;
        this.pen = this.graphics.pen;
        this.text = control.text;
        this.font = this.graphics.font;
        this.left = 0;
        this.top = 0;
        this.width = control.size[0] - FIX_PS_STROKE_ISSUE;
        this.height = control.size[1] - FIX_PS_STROKE_ISSUE;
        this.textLocation = calculateTextLocation.call(this);
        this.textX = this.textLocation[0];
        this.textY = this.textLocation[1];
    }

    function DrawRoundValues(control) {
        this.graphics = control.graphics;
        this.enableText = this.graphics.enableText;
        this.enableFill = this.graphics.enableFill;
        this.enableStroke = this.graphics.enableStroke;
        this.fontOffset = this.graphics.fontOffset;
        this.pen = this.graphics.pen;
        this.text = control.text;
        this.font = this.graphics.font;
        this.left = this.pen.stroke.lineWidth;
        this.top = this.pen.stroke.lineWidth;
        this.width = control.size[0] - this.left * 2 - FIX_PS_STROKE_ISSUE;
        this.height = control.size[1] - this.top * 2 - FIX_PS_STROKE_ISSUE;
        this.textLocation = calculateTextLocation.call(this);
        this.textX = this.textLocation[0];
        this.textY = this.textLocation[1];
    }

    function eachPathDeep(object, iteratee) {
        baseEachPath(object, [], function (value) {
            if (!_isObjectLike(value)) _apply(iteratee, null, arguments);
        });
    }

    function ElementCollector() {
        this.nodes = [];
        this.listContainer = [];
    }

    function escapeNumber(string) {
        return string.replace(reEscapeNumber, '');
    }

    function escapeParentheses(string) {
        return string.replace(reEscapeParentheses, '');
    }

    function expandTreeViewNodes(nodes) {
        _arrayEach(nodes, function (node) {
            node.expanded = true;
        });
    }

    function fixPsWidthMeasureIssue(rawWidth, text) {
        var textNum = text.length;
        return rawWidth / ((textNum + PS_WIDTH_MEASURE_FACTOR) / textNum);
    }

    function getBridgeTalk(object) {
        return !!object && isBridgeTalkObject(object.BridgeTalk) && object.BridgeTalk;
    }

    function getCreationProperties(param, key) {
        return param[getCreationPropertiesIndex(key)];
    }

    function getCreationPropertiesIndex(key) {
        if (isNativeControl(key)) return CONTROL_PARAM_REFERENCES[key];
        if (isCustomControl(key)) return CUSTOM_CONTROL_PARAM_REFERENCES[key];
        if (isContainer(key)) return CONTAINER_PARAM_REFERENCES[key];
    }

    function getElementParam(value) {
        return _isArray(value) ? mapNullValue(value) : baseGetParam(value);
    }

    function getElementsById(targetId) {
        targetId = String(targetId);
        var result = [];

        function breaker(accumulator) {
            return accumulator.length > 0;
        }

        baseEachElement(this, result, breaker, function (element) {
            var elementId = baseGetElementId(element);
            if (_isNil(elementId)) return false;
            return targetId === elementId;
        });

        return result.length === 0 ? null : result[0];
    }

    function getElementsByName() {
        targetNames = wrapFindElementInput(arguments);
        var seen = [];
        var result = [];

        function breaker() {
            return targetNames.length === seen.length;
        }

        baseEachElement(this, result, breaker, function (element) {
            var elementId = baseGetElementId(element);
            if (_isNil(elementId)) return false;
            return _contains(targetNames, elementId) && !_contains(seen, elementId) && seen.push(elementId);
        });

        return result.length === 0 ? null : result;
    }

    function getElementsByType() {
        var targetTypes = wrapFindElementInput(arguments);
        var result = [];

        baseEachElement(this, result, _stubFalse, function (element) {
            return _contains(targetTypes, element.type);
        });

        return result.length === 0 ? null : result;
    }

    function getElementStyle(value) {
        return _isArray(value) ? {} : baseGetStyle(value);
    }

    function getGlobal(object) {
        return isHelperObject(object) && isGlobalObject(object.global) && object.global;
    }

    function getListItemParam(value) {
        var result = _isObject(value) ? baseGetListItemParam(value) : value;
        return String(result);
    }

    function getMainContainer(param, context) {
        return isPanel(context) ? context : new Window(param[0], param[1], param[2], param[3]);
    }

    function hexToArray(hex) {
        return _arrayMap(hexToRgb(hex), function (value) {
            return value / 255;
        });
    }

    function hexToRgb(hex) {
        var result;
        hex = hex.replace(reMapFullHex, '$1$1$2$2$3$3');
        hex.replace(reIsHex, function (match, $1, $2, $3) {
            result = [parseInt($1, 16), parseInt($2, 16), parseInt($3, 16)];
        });
        return result;
    }

    function hexToRgba(hex, alpha) {
        return hexToArray(hex).concat(alpha);
    }

    function initLayout(container, layoutMode) {
        container.layout.layout(layoutMode);
        container.layout.resize();
    }

    function initMainContainer(resource, context) {
        var mainContainer = getMainContainer(wrapWindowType(baseGetParam(resource)), context);
        mainContainer.onResizing = mainContainer.onResize = resizeHandle;
        return _assign(mainContainer, baseGetStyle(resource));
    }

    function isAppVersion(number) {
        return parseInt(BRIDGETALK.appVersion) === number;
    }

    function isBetween(start, end) {
        return function (value) {
            return _isNumber(value) && value >= start && value <= end;
        };
    }

    function isBridgeTalkObject(value) {
        return value != null && _baseObjectToString(value) === '[object BridgeTalk]';
    }

    function isContainer(type) {
        return reIsContainer.test(CONTROL_TYPE_FLAG[type]);
    }

    function isCustomButton(type) {
        return reIsCustomButton.test(CONTROL_TYPE_FLAG[type]);
    }

    function isCustomControl(type) {
        return reIsCustomControl.test(CONTROL_TYPE_FLAG[type]);
    }

    function isFontStyleFlag(value) {
        return _or(isBetween(0, 3)(value), _isString(value) && reIsFontStyleFlag.test(value));
    }

    function isGlobalContext(value) {
        return value === GLOBAL;
    }

    function isGlobalObject(value) {
        return value != null && _baseObjectToString(value) === '[object global]';
    }

    function isHelperObject(value) {
        return value != null && _baseObjectToString(value) === '[object $]';
    }

    function isHex(hex) {
        return _isString(hex) && reIsHex.test(hex);
    }

    function isHost(hostName) {
        return HOST_NAME === hostName;
    }

    function isInvisibleContainer(container) {
        return container === null || !container.visible;
    }

    function isLeftClick(event) {
        return event.button === MOUSE_LEFT_CLICK_FLAG;
    }

    function isListItemContainer(type) {
        return reIsListItemContainer.test(CONTROL_TYPE_FLAG[type]);
    }

    function isNativeControl(type) {
        return reIsNativeControl.test(CONTROL_TYPE_FLAG[type]);
    }

    function isNativeContainer(type) {
        return reIsNativeContainer.test(CONTROL_TYPE_FLAG[type]);
    }

    function isNode(type) {
        return type === 'node';
    }

    function isPanel(container) {
        return container instanceof Panel;
    }

    function isPanelContext(global) {
        return isPanel(global);
    }

    function isRightClick(event) {
        return event.button === MOUSE_RIGHT_CLICK_FLAG;
    }

    function isSelectableContainer(type) {
        return reIsSelectableContainer.test(CONTROL_TYPE_FLAG[type]);
    }

    function isTabbedpanel(type) {
        return type === 'tabbedpanel';
    }

    function isValidCombination(parentType, childType) {
        var flagCombination = CONTROL_TYPE_FLAG[parentType] + CONTROL_TYPE_FLAG[childType];
        return reCombination.test(flagCombination);
    }

    function isValidContext(global) {
        return isGlobalContext(global) || isPanelContext(global);
    }

    function isValidElement(type) {
        return _has(CONTROL_TYPE_FLAG, type);
    }

    function isValidHost(bridgetalk, supportlist) {
        return !!bridgetalk && _contains(supportlist, bridgetalk.appName);
    }

    function isWindow(container) {
        return container instanceof Window;
    }

    function mapCustomElementType(customControlType) {
        return CUSTOM_ELEMENT_TYPE_REFERENCES[customControlType];
    }

    function mapFontParam(param) {
        return _basePick(param, CUSTOM_BUTTON_FONT_PROPERTIES);
    }

    function mapFontStyleFlag(value) {
        return _isString(value) ? ScriptUI.FontStyle[value.toUpperCase()] : value;
    }

    function mapFullParam(param) {
        return _mapValues(param, function (value, key) {
            return _contains(CUSTOM_BUTTON_AUTO_FILL_PROPERTIES, key) && !_isArray(value) ? _times(4, _constant(value)) : value;
        });
    }

    function mapNullValue(array) {
        return _arrayMap(array, function (value) {
            return _isNull(value) ? undefined : value;
        });
    }

    function mapPensParam(param) {
        return _arrayMap(_apply(_zip, null, _values(_basePick(param, CUSTOM_BUTTON_PENS_PROPERTIES))), function (values) {
            var result = _chunk(values, 3);
            var colorValue = _zip(result[0], result[1]);
            var colorArray = _arrayMap(colorValue, function (value) {
                return _apply(hexToRgba, null, value);
            });
            return colorArray.concat(result[2]);
        });
    }

    function nativeAddContainer(container, type, param) {
        return container.add(type, param[1], param[2], param[3]);
    }

    function nativeAddControl(container, type, param) {
        return container.add(type, param[1], param[2], param[3], param[4], param[5]);
    }

    function nativeAddItem(node, param) {
        return node.add('item', param);
    }

    function nativeAddNode(container, param) {
        return container.add('node', param);
    }

    function newPens(fontColor, fillColor, strokeColor, strokeWidth) {
        return {
            text: this.newPen(this.PenType.SOLID_COLOR, fontColor, 1),
            fill: this.newBrush(this.BrushType.SOLID_COLOR, fillColor),
            stroke: this.newPen(this.PenType.SOLID_COLOR, strokeColor, strokeWidth),
        };
    }

    function resizeHandle() {
        this.layout.resize();
    }

    function runInContext(resource) {
        if (!_isObject(resource)) return null;
        var container = _apply(buildWindow, null, WindowBuildValue(resource, TREE));
        MAIN_CONTAINER_COLLECTION.push(container);
        return container;
    }

    function selectListItem(listContainer) {
        _arrayEach(listContainer, function (value) {
            var container = value.container;
            var itemIndex = value.itemIndex;
            if (isTabbedpanel(container.type)) return (container.selection = value.itemIndex);
            var items = _arrayMap(_isArray(itemIndex) ? itemIndex : [itemIndex], function (indexValue) {
                return container.items[indexValue];
            });
            container.selection = items;
        });
    }

    function WindowBuildValue(resource, parserSelf) {
        var config = _assign(_clone(MAIN_CONTAINER_DEFAULT), baseGetConfig(resource));
        var showWindow = !!config.show;
        var dockable = !!config.dockable;
        var isSingletonWindow = !!config.singleton;
        var context = wrapContext(parserSelf.context, dockable, isSingletonWindow);
        var layoutMode = wrapLayoutMode(parserSelf.layoutMode, config.layoutMode);
        return [isSingletonWindow, resource, context, showWindow, layoutMode];
    }

    function wrapContext(global, dockable, isSingletonWindow) {
        if (isSingletonWindow || !dockable) return Window;
        if (isValidContext(ROOT)) return ROOT;
        return isValidContext(global) ? global : Window;
    }

    function wrapElementParam(value, type) {
        return wrapNodeName(getElementParam(value), type);
    }

    function wrapFindElementInput(input) {
        return _uniq(_arrayMap([].concat.apply([], input), String));
    }

    function wrapGetElementMethods(constructors) {
        _arrayEach(constructors, function (constructor) {
            var prototype = constructor.prototype;
            prototype.getElementById = getElementsById;
            prototype.getElementsByName = getElementsByName;
            prototype.getElementsByType = getElementsByType;
        });
    }

    function wrapLayoutMode(setAll, setAlone) {
        if (isBetween(0, 2)(setAlone)) return setAlone;
        if (isBetween(0, 2)(setAll)) return setAll;
        return 0;
    }

    function wrapMouseClickEvent(control, handle) {
        _arrayEach(MOUSE_EVENT_REFERENCES, function (eventName) {
            control.addEventListener(eventName, handle);
        });
    }

    function wrapNodeName(param, type) {
        var nodedName = param[0];
        if (_isNil(nodedName)) return param;
        var index = getCreationPropertiesIndex(type);
        var creationProperties = param[index];
        if (!_isObject(creationProperties)) param[index] = {};
        if (_has(creationProperties, 'name')) return param;
        param[index].name = nodedName;
        return param;
    }

    function wrapOnClickEvent(control) {
        control.addEventListener('mouseup', function (event) {
            event.stopPropagation();
            if (_isFunction(control.onClick) && isLeftClick(event)) control.onClick();
        });
        return control;
    }

    function wrapPensState(control, pens) {
        wrapMouseClickEvent(control, function (event) {
            event.stopPropagation();
            if (isRightClick(event)) return;
            control.graphics.pen = pens[event.type];
            control.notify('onDraw');
        });
        return control;
    }

    function wrapWindowType(param) {
        var type = String(param[0]);
        param[0] = _contains(SUPPORT_CONTAINER_TYPE, type) ? type : MAIN_CONTAINER_TYPE_DEFAULT;
        return param;
    }

    wrapGetElementMethods([Window, Panel, Group]);

    TREE.parse = runInContext;
    TREE.version = VERSION;

    return TREE;
}.call(this);
