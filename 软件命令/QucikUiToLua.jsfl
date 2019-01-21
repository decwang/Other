
// 创建一个jsfl文件 fl.runScript('file:///E:/mg02/client/tools/uieditor/UiToLua.jsfl');
// 放到 C:\Users\Administrator\AppData\Local\Adobe\Flash CS6\zh_CN\Configuration\Commands 目录下

// 属性定义
AttrKey = {
	kName : "n",
	kType : "t",
	kPosX : "x",
	kPosY : "y",
	kWidth : "w",
	kHeight : "h",
	kRotation : "rt",
	kScaleX : "sx",
	kScaleY : "sy",
	kPath : "p",
	kPathNormal : "pn",
	kPathSelect : "ps",
	kPathDisable : "pd",
	kCapInsetsX : "cx",
	kCapInsetsY : "cy",
	kCapInsetsWidth : "cw",
	kCapInsetsHeight : "ch",
	kText : "txt",
	kTextFont : "tft",
	kTextFontSize : "tfs",
	kTextAlignment : "ta",
	kR : "r",
	kG : "g",
	kB : "b",
	kTextOutlineSize : "tos",
	kTextOutlineR : "tor",
	kTextOutlineG : "tog",
	kTextOutlineB : "tob",
	kTextShadowDistance : "tsd",
	kTextShadowX : "tsx",
	kTextShadowY : "tsy",
	kTextShadowR : "tsr",
	kTextShadowG : "tsg",
	kTextShadowB : "tsb",
	kInputMode : "imd",
	kInputFlag : "ifg",
	kPathProg : "progress",
	kPathProgBg : "bg",
};

ControlType = {
	kLayout : "layout",
	kButton : "btn",
	kButton2 : "btn2",
	kButton3 : "btn3",
	kToggle : "toggle",
	kImage : "img",
	kImage9 : "img9",
	kText : "text",
	kRich : "rich",
	kEdit : "edit",
	kProg : "prog",
	kProg9 : "prog9",
	kPh : "ph",
	kPage : "page",
	kScroll : "scroll",
};

// 保留两位小数
function formatNumber(num) {
	return Math.round(num * 100) / 100;
}

function formatFileName(name) {
	if (name.indexOf("..") < 0) {
		return name + ".png";
	}
	return name.replace("..", ".");
}

function formatCommon(element, type) {
	return AttrKey.kType + "=\"" + type + "\","
		+ AttrKey.kName + "=\"" + element.name + "\","
		+ AttrKey.kPosX + "=" + formatNumber(element.x) + ","
		+ AttrKey.kPosY + "=" + -formatNumber(element.y) + ","
		+ AttrKey.kWidth + "=" + formatNumber(element.width) + ","
		+ AttrKey.kHeight + "=" + formatNumber(element.height) + ",";
}

function formatLayout(element, type) {
	return formatCommon(element, ControlType.kLayout);
}

function getButton(element) {
	fl.getDocumentDOM().selection = [element];
	var btn = {};
	var elementAry = element.libraryItem.timeline.layers[0].frames[0].elements;
	if(elementAry.length > 1)
	{
		for(var j = 0; j < elementAry.length; j++)
		{
			var ele = elementAry[j];
			if(("libraryItem" in ele) && ele.libraryItem.itemType == "movie clip") {
				btn.image = ele
			} else if(("elementType" in ele) && ele.elementType == "text") {
				btn.textfield = ele
			}
		}
	}

	if(null == btn.image) btn.image = element;
	if(null != btn.textfield) {
		btn.text = ""
		for(var j = 0; j < btn.textfield.textRuns.length; j++) {
			var item = btn.textfield.textRuns[j];
			for(var i = 0; i < item.characters.length; i++) {
				btn.text += item.characters[i];
			}
		}
	}

	return btn;
}

function formatButton(element, type) {
	var btn = getButton(element);

	var itemname = formatFileName(btn.image.libraryItem.name);
	var str = formatCommon(element, type)
		+ AttrKey.kPathNormal + "=\"" + itemname + "\",";

	if (null != btn.text && "" != btn.text) {
		var textAttrs = btn.textfield.textRuns[0].textAttrs;
		var r = parseInt(textAttrs.fillColor.substr(1, 2), 16);
		var g = parseInt(textAttrs.fillColor.substr(3, 2), 16);
		var b = parseInt(textAttrs.fillColor.substr(5, 2), 16);
		str += AttrKey.kText + "=\"" + btn.text + "\","
		+ AttrKey.kR + "=" + r + ","
		+ AttrKey.kG + "=" + g + ","
		+ AttrKey.kB + "=" + b + ","
		+ AttrKey.kTextFontSize + "=" + textAttrs.size + ",";
	}
	return str;
}

function formatButton2(element, type) {
	var btn = getButton(element);

	var itemname = formatFileName(btn.image.libraryItem.name);
	itemname = itemname.replace("_normal", "XYXYXXY");
	itemname = itemname.replace("_select", "XYXYXXY");
	if (itemname.indexOf("XYXYXXY") < 0) {
		itemname = itemname.replace(".", "XYXYXXY.");
	}

	var str = formatCommon(element, type)
		+ AttrKey.kPathNormal + "=\"" + itemname.replace("XYXYXXY", "_normal") + "\","
		+ AttrKey.kPathSelect + "=\"" + itemname.replace("XYXYXXY", "_select") + "\",";

	if (null != btn.text && "" != btn.text) {
		var textAttrs = btn.textfield.textRuns[0].textAttrs;
		var r = parseInt(textAttrs.fillColor.substr(1, 2), 16);
		var g = parseInt(textAttrs.fillColor.substr(3, 2), 16);
		var b = parseInt(textAttrs.fillColor.substr(5, 2), 16);
		str += AttrKey.kText + "=\"" + btn.text + "\","
		+ AttrKey.kR + "=" + r + ","
		+ AttrKey.kG + "=" + g + ","
		+ AttrKey.kB + "=" + b + ","
		+ AttrKey.kTextFontSize + "=" + textAttrs.size + ",";
	}

	return str;
}

function formatButton3(element, type) {
	var btn = getButton(element);

	var itemname = formatFileName(btn.image.libraryItem.name);
	itemname = itemname.replace("_normal", "XYXYXXY");
	itemname = itemname.replace("_select", "XYXYXXY");
	itemname = itemname.replace("_disable", "XYXYXXY");
	if (itemname.indexOf("XYXYXXY") < 0) {
		itemname = itemname.replace(".", "XYXYXXY.");
	}

	var str = formatCommon(element, type)
		+ AttrKey.kPathNormal + "=\"" + itemname.replace("XYXYXXY", "_normal") + "\","
		+ AttrKey.kPathSelect + "=\"" + itemname.replace("XYXYXXY", "_select") + "\","
		+ AttrKey.kPathDisable + "=\"" + itemname.replace("XYXYXXY", "_disable") + "\",";

	if (null != btn.text && "" != btn.text) {
		var textAttrs = btn.textfield.textRuns[0].textAttrs;
		var r = parseInt(textAttrs.fillColor.substr(1, 2), 16);
		var g = parseInt(textAttrs.fillColor.substr(3, 2), 16);
		var b = parseInt(textAttrs.fillColor.substr(5, 2), 16);
		str += AttrKey.kText + "=\"" + btn.text + "\","
		+ AttrKey.kR + "=" + r + ","
		+ AttrKey.kG + "=" + g + ","
		+ AttrKey.kB + "=" + b + ","
		+ AttrKey.kTextFontSize + "=" + textAttrs.size + ",";
	}

	return str;
}

function formatImage(element, type) {
	var itemname = formatFileName(element.libraryItem.name);

	return formatCommon(element, type || ControlType.kImage)
		+ AttrKey.kPath + "=\"" + itemname + "\","
		+ AttrKey.kScaleX + "=" + formatNumber(element.matrix.a) + ","
		+ AttrKey.kScaleY + "=" + formatNumber(element.matrix.d) + ",";
}

function formatImage9(element, type) {
	var width = element.width / element.matrix.a;
	var height = element.height / element.matrix.d;

	fl.getDocumentDOM().library.selectItem(element.libraryItem.name);
	var libitem = fl.getDocumentDOM().library.getSelectedItems()[0];
	if (libitem.scalingGrid && libitem.scalingGridRect) {
		var grid = libitem.scalingGridRect;
		var rect = {x:grid.left + width / 2, y:grid.top + height / 2, w:grid.right - grid.left, h:grid.bottom - grid.top};
	} else {
		var rect = {x:width / 3, y:height / 3, w:width / 3, h:height / 3};
	}

	return formatImage(element, type)
		+ AttrKey.kCapInsetsX + "=" + formatNumber(rect.x) + ","
		+ AttrKey.kCapInsetsY + "=" + formatNumber(rect.y) + ","
		+ AttrKey.kCapInsetsWidth + "=" + formatNumber(rect.w) + ","
		+ AttrKey.kCapInsetsHeight + "=" + formatNumber(rect.h) + ",";
}

function formatEdit(element, type) {
	var itemname = formatFileName(element.libraryItem.name);

	var nameArr = element.name.split("_");
	var inputMode = nameArr[2] || 6;
	var inputFlag = nameArr[3] || 4;

	return formatCommon(element, type)
		+ AttrKey.kInputMode + "=" + inputMode + ","
		+ AttrKey.kInputFlag + "=" + inputFlag + ","
		+ AttrKey.kPath + "=\"" + itemname + "\",";
}

function formatProg(element, type) {
	var itemname = formatFileName(element.libraryItem.name);

	return formatCommon(element, type || ControlType.kImage)
		+ AttrKey.kPathProgBg + "=\"" + itemname + "\","
		+ AttrKey.kPathProg + "=\"" + element.libraryItem.name + "_progress.png" + "\","
}

function formatProg9(element, type) {
	var itemname = formatFileName(element.libraryItem.name);
	var width = element.width / element.matrix.a;
	var height = element.height / element.matrix.d;

	fl.getDocumentDOM().library.selectItem(element.libraryItem.name);
	var libitem = fl.getDocumentDOM().library.getSelectedItems()[0];
	if (libitem.scalingGrid && libitem.scalingGridRect) {
		var grid = libitem.scalingGridRect;
		var rect = {x:grid.left + width / 2, y:grid.top + height / 2, w:grid.right - grid.left, h:grid.bottom - grid.top};
	} else {
		var rect = {x:width / 3, y:height / 3, w:width / 3, h:height / 3};
	}

	return formatCommon(element, type || ControlType.kImage)
		+ AttrKey.kPathProg + "=\"" + itemname+ "\","
		+ AttrKey.kCapInsetsX + "=" + formatNumber(rect.x) + ","
		+ AttrKey.kCapInsetsY + "=" + formatNumber(rect.y) + ","
		+ AttrKey.kCapInsetsWidth + "=" + formatNumber(rect.w) + ","
		+ AttrKey.kCapInsetsHeight + "=" + formatNumber(rect.h) + ",";
}

function formatAutoMovie(element, type) {
	fl.getDocumentDOM().library.selectItem(element.libraryItem.name);
	var libitem = fl.getDocumentDOM().library.getSelectedItems()[0];
	if (libitem.scalingGrid && libitem.scalingGridRect) {
		return formatImage9(element, ControlType.kImage9);
	}

	return formatImage(element, ControlType.kImage);
}

function formatText(element, type) {
	var textAttrs = element.textRuns[0].textAttrs;

	var text = "";
	for(var j = 0; j < element.textRuns.length; j++) {
		var item = element.textRuns[j];
		for(var i = 0; i < item.characters.length; i++) {
			text += item.characters[i];
		}
	}

	// 水平对齐方式
	var alignment = 1;
	switch(textAttrs.alignment) {
		case "left" : alignment = 0; break;
		case "center" : alignment = 1; break;
		case "right" : alignment = 2; break;
	}

	var r = parseInt(textAttrs.fillColor.substr(1, 2), 16);
	var g = parseInt(textAttrs.fillColor.substr(3, 2), 16);
	var b = parseInt(textAttrs.fillColor.substr(5, 2), 16);

	return formatCommon(element, type || ControlType.kText)
		+ AttrKey.kTextFontSize + "=" + textAttrs.size + ","
		+ AttrKey.kTextAlignment + "=" + alignment + ","
		+ AttrKey.kR + "=" + r + ","
		+ AttrKey.kG + "=" + g + ","
		+ AttrKey.kB + "=" + b + ","
		+ AttrKey.kText + "=\"" + text + "\",";
}

// 控件对应的函数
movieclipFunctionMap = {}
movieclipFunctionMap[ControlType.kLayout] = formatLayout;
movieclipFunctionMap[ControlType.kButton] = formatButton;
movieclipFunctionMap[ControlType.kButton2] = formatButton2;
movieclipFunctionMap[ControlType.kButton3] = formatButton3;
movieclipFunctionMap[ControlType.kToggle] = formatButton2;
movieclipFunctionMap[ControlType.kImage] = formatImage;
movieclipFunctionMap[ControlType.kImage9] = formatImage9;
movieclipFunctionMap[ControlType.kEdit] = formatEdit;
movieclipFunctionMap[ControlType.kProg] = formatProg;
movieclipFunctionMap[ControlType.kProg9] = formatProg9;
movieclipFunctionMap[ControlType.kScroll] = formatCommon;
movieclipFunctionMap[ControlType.kPh] = formatCommon;
movieclipFunctionMap[ControlType.kPage] = formatCommon;

textFunctionMap = {}
textFunctionMap[ControlType.kText] = formatText;
textFunctionMap[ControlType.kRich] = formatText;

function formatWidget(element, type) {
	if (("libraryItem" in element) && "movie clip" == element.libraryItem.itemType) {
		var func = movieclipFunctionMap[type]
		if (func) {
			return func(element, type);
		}
		return formatAutoMovie(element, type);
	} else if (("elementType" in element) && "text" == element.elementType) {
		var func = textFunctionMap[type]
		if (func) {
			return func(element, type);
		}
		return formatText(element, ControlType.kText);
	}

	throw("==== 不支持的元件类型！ ====" + element.elementType);
	return "";
}

function hasChild(element) {
	var timeline = element.libraryItem.timeline;
	for (var i = timeline.layerCount - 1; i >= 0; i--) {
		var layer = timeline.layers[i];

		var frame = layer.frames[0];
		for (var k = 0; k < frame.elements.length; k++) {
			var element = frame.elements[k];

			if (("libraryItem" in element) && "movie clip" == element.libraryItem.itemType) {
				return true;
			} else if (("elementType" in element) && "text" == element.elementType) {
				return true;
			}
		}
	}

	return false;
}

var g_buf = ""
function formatElement(element, depth) {
	var prefix = ""
	for (var i = 0; i < depth; i++) {
		prefix = prefix + "\t"
	};

	var timeline = element.libraryItem.timeline;
	for (var i = timeline.layerCount - 1; i >= 0; i--) {
		var layer = timeline.layers[i];

		//g_buf += prefix + "-- layer:" + layer.name + "\n";

		var frame = layer.frames[0];
		for (var k = 0; k < frame.elements.length; k++) {
			var element = frame.elements[k];

			var ctrlType = element.name.split("_")[0]
			if (ControlType.kLayout == ctrlType ||
				(ControlType.kPh == ctrlType && hasChild(element))) {
				g_buf += prefix + "{" + formatCommon(element, ctrlType) + "\n";
				formatElement(element, depth + 1);
				g_buf += prefix + "},\n";
			}else if (("elementType" in element) && "shape" != element.elementType){
				g_buf += prefix + "{" + formatWidget(element, ctrlType) + "},\n";
			}
		}
	}
}

function uiToLua() {
	try{
		fl.outputPanel.clear();

		g_buf += "return {\n";
		var timeline = fl.getDocumentDOM().getTimeline();
		var index = 0;
		var cfg_file_name;
		for (var i = timeline.layerCount - 1; i >= 0; i--) {
			var layer = timeline.layers[i];
			if (!cfg_file_name) {
				var reg = /^\-\-(\w+)/(layer.name);
				if (reg)
					cfg_file_name = reg[1];
			}
			var frame = layer.frames[0];

			//g_buf += "\t-- layer:" + layer.name + "\n";

			for (var k = 0; k < frame.elements.length; k++) {
				var element = frame.elements[k];

				if (ControlType.kLayout == element.name.split("_")[0]) {
					g_buf += "\t-- index:" + (++index) + "\n";
					g_buf += "\t{" + formatLayout(element) + "\n";
					formatElement(element, 2);
					g_buf += "\t},\n";
				}
			}
		}
		g_buf += "}";

		fl.clipCopyString(g_buf)
		fl.outputPanel.trace("str len:" + g_buf.length);
		if (cfg_file_name) {
			var path = FLfile.platformPathToURI("../../../runtime/assets/scripts/gameui/config/" + cfg_file_name + ".lua");
			if (FLfile.write(path, g_buf))
				fl.outputPanel.trace(path);
		}
	} catch(e) {
		alert(e);
	}
}

uiToLua()
