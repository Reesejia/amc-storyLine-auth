console.log('customFunc');
    /*
 * @description添加水印
 * @param {Obj} settings水印配置参数
 */
    function waterMark(markElement) {
        $('#' + markElement.waterMarkId).find('.markElement').remove();
        var settings = {
            waterMarkId: "t1",
            waterMarkContent: "我是水印内容",
            waterMarkX: -10,
            waterMarkY: 40,
            waterMarkRows: 100,
            waterMarkCols: 200,
            waterMarkXSpace: 140,
            waterMarkYSpace: 80,
            waterMarkColor: 'gray',
            waterMarkAlpha: 0.3,
            waterMarkFontSize: '25px',
            waterMarkFont: '微软雅黑',
            waterMarkWidth: 150,
            waterMarkHeight: 100,
            waterMarkAngle: 15
        };
        if (arguments.length === 1 && typeof arguments[0] === "object") {
            var src = arguments[0] || {};
            for (key in src) {
                if (src[key] && settings[key] && src[key] === settings[key])
                    continue;
                else if (src[key])
                    settings[key] = src[key];
            }
        }
        var obj = document.getElementById(settings.waterMarkId);
        var tmpObj = document.createDocumentFragment();
        var pageWidth = obj.clientWidth;
        console.log('pageWidth', pageWidth)
        var pageHeight = obj.offsetHeight;
        if (settings.waterMarkCols == 0 || (parseInt(settings.waterMarkX + settings.waterMarkWidth * settings.waterMarkCols + settings.waterMarkXSpace * (settings.waterMarkCols - 1)) > pageWidth)) {
            settings.waterMarkCols = parseInt((pageWidth - settings.waterMarkX + settings.waterMarkXSpace) / (settings.waterMarkWidth + settings.waterMarkXSpace));
            settings.waterMarkXSpace = parseInt((pageWidth - settings.waterMarkX - settings.waterMarkWidth * settings.waterMarkCols) / (settings.waterMarkCols - 1));
        }
        if (settings.waterMarkRows == 0 || (parseInt(settings.waterMarkY + settings.waterMarkHeight * settings.waterMarkRows + settings.waterMarkYSpace * (settings.waterMarkRows - 1)) > pageHeight)) {
            settings.waterMarkRows = parseInt((settings.waterMarkYSpace + pageHeight - settings.waterMarkY) / (settings.waterMarkHeight + settings.waterMarkYSpace));
            settings.waterMarkYSpace = parseInt(((pageHeight - settings.waterMarkY) - settings.waterMarkHeight * settings.waterMarkRows) / (settings.waterMarkRows - 1));
        }
        var x;
        var y;
        settings.waterMarkRows = settings.waterMarkRows == 0 ? 6 : settings.waterMarkRows;
        for (var i = 0; i < settings.waterMarkRows; i++) {
            y = settings.waterMarkY + (settings.waterMarkYSpace + settings.waterMarkHeight) * i;
            y = isNaN(y) ? 40 : y;
            for (var j = 0; j < settings.waterMarkCols; j++) {
                x = settings.waterMarkX + (settings.waterMarkWidth + settings.waterMarkXSpace) * j;
                var markElement = document.createElement('div');
                markElement.id = 'markElement' + i + j;
                markElement.appendChild(document.createTextNode(settings.waterMarkContent));
                //设置水印div倾斜显示
                markElement.style.webkitTransform = "rotate(-" + settings.waterMarkAngle + "deg)";
                markElement.style.MozTransform = "rotate(-" + settings.waterMarkAngle + "deg)";
                markElement.style.msTransform = "rotate(-" + settings.waterMarkAngle + "deg)";
                markElement.style.OTransform = "rotate(-" + settings.waterMarkAngle + "deg)";
                markElement.style.transform = "rotate(-" + settings.waterMarkAngle + "deg)";
                markElement.style.visibility = "";
                markElement.style.position = "absolute";
                markElement.style.left = x + 'px';
                markElement.style.top = y + 'px';
                markElement.style.overflow = "hidden";
                markElement.style.opacity = settings.waterMarkAlpha;
                markElement.style.fontSize = settings.waterMarkFontSize;
                markElement.style.fontFamily = settings.waterMarkFont;
                markElement.style.color = settings.waterMarkColor;
                markElement.style.textAlign = "center";
                markElement.style.width = settings.waterMarkWidth + 'px';
                markElement.style.height = settings.waterMarkHeight + 'px';
                markElement.style.display = "block";
                markElement.style['pointer-events'] = "none";

                markElement.style.filter = "alpha(opacity=" + settings.waterMarkAlpha * 100 + ")";
                markElement.setAttribute("class", "markElement");
                tmpObj.appendChild(markElement);
            };
        };
        obj.appendChild(tmpObj);
    }

    setTimeout(() => {
        const storyInfo = JSON.parse(window.sessionStorage.getItem('storyInfo')) || {}
        const arr = ['13911762084','18612978153', '13811810647']
        if(!arr.includes(storyInfo.mobile)){
            waterMark({
                waterMarkContent: storyInfo.name || 'newbanker',
                waterMarkId: 'outerContainer'//需要做水印的元素的id
            });
        }
    }, 200);
