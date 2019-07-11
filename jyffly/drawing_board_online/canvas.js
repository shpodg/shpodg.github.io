//工具和形状选中一个，设置被选中状态
    
//很常见的一个错误：getElementById ()只有在文档加载,完成成功，才能获取,所以，引入canvas.js要放在后面。
    var canvas = document.getElementById('mycanvas');
	var cxt = canvas.getContext("2d");
	cxt.strokeStyle = "#000";
	cxt.fillStyle = "#000";
    var brush = document.getElementById('brush');
	var eraser = document.getElementById('eraser');
	var paint = document.getElementById('paint');
	var straw = document.getElementById('straw');
	var text = document.getElementById('text');
	var magnifier = document.getElementById('magnifier');
	var line = document.getElementById('line');
	var rect = document.getElementById('rect');
	var arc = document.getElementById('arc');
	var poly = document.getElementById('poly');
	var rectfill = document.getElementById('rectfill');
	var arcfill = document.getElementById('arcfill');
	var tools=[brush,eraser,paint,straw,text,magnifier,line,rect,arc,poly,rectfill,arcfill];	
//e:具体工具  type:工具数组   flag:2种不同的显示法(工具和形状,线宽中，背景变色;颜色中，边框变色)	
function choice_tools(e,type,flag) {
	
	for(var i = 0; i<type.length;i++){
		if (flag) {
			if(i==e){type[i].style.backgroundColor="yellow";}
			else{type[i].style.backgroundColor="#ccc";}
		} else {
			if(i==e){type[i].style.borderColor="white";}
			else{type[i].style.borderColor="black";}
		}
		

		//html中onclick="choice_tools('brush')"
		//if(tools[i].id==event){$("#"+event).css({"background-color":"yellow"});}
		//else{event.css({"background-color":"#ccc"});}
		//if(tools[i].id==event){document.getElementById(event).style.backgroundColor="yellow";}
		//else{document.getElementById(event).style.backgroundColor="#ccc";}


		//html中onclick="choice_tools(this)"
		//$(event)把一个普通的dom对象转化成jquery对象
		//if(tools[i].id==event.id){$(event).css({"background-color":"yellow"});}
		//else{$(event).css({"background-color":"yellow"});}

		//if(tools[i].id==event.id){event.style.backgroundColor="yellow";}
		//else{event.style.backgroundColor="#ccc";}

	}
}

//保存图片
function Saveing() {
	//canvas中的toDataURl()方法可以把画布中的图案转化成base64格式的png图片，，然后返回 Data URL数据
	var imageData = canvas.toDataURL("image/jpeg");
	var b64 = imageData.substring(23);
	var data = document.getElementById("data");
	data.value = b64;
	var form = document.getElementById("form");
	form.submit();//调用系统的自动提交表单
}
//清空画板
function Clear() {
	cxt.beginPath();
	cxt.strokeStyle = "#fff";
	cxt.fillStyle ="#fff";
	cxt.fillRect(0,0,880,380);
	cxt.strokeStyle ="#000";
	cxt.fillStyle ="#000";
	cxt.closePath();
}

//注意function 不要打错
//工具
function Brush(e){
	choice_tools(0,tools,true);
	cxt.beginPath();
	var flag = false;//判断鼠标是否按下
	canvas.onmousedown = function (e) {
		flag = true;
//e是鼠标按下事件，this是画布canvas.
//pageX是相对于浏览器的，offsetLeft是相对于父级容器的
		var startx = e.pageX-this.offsetLeft;
		var starty = e.pageY-this.offsetTop;
		cxt.moveTo(startx,starty);
	}
    canvas.onmousemove = function (e) {
    	var endx = e.pageX-this.offsetLeft;
		var endy = e.pageY-this.offsetTop;
		if(flag){
			cxt.lineTo(endx,endy);
		  	cxt.stroke();
		}
		
    }
    canvas.onmouseup = function(){
    	flag = false;
    }
   
    canvas.onmouseout = function(){
    	flag = false;
    }
	cxt.closePath();

}

//橡皮擦(和铅笔工具一样，只是白色的)
function Eraser(e){
	choice_tools(1,tools,true);
	cxt.fillStyle = "#fff";
	cxt.strokeStyle = "#fff";
	cxt.beginPath();
	var flag = false;//判断鼠标是否按下
	canvas.onmousedown = function (e) {
		flag = true;
//e是鼠标按下事件，this是画布canvas.
//pageX是相对于浏览器的，offsetLeft是相对于父级容器的
		var startx = e.pageX-this.offsetLeft;
		var starty = e.pageY-this.offsetTop;
		cxt.moveTo(startx,starty);
	}
    canvas.onmousemove = function (e) {
    	var endx = e.pageX-this.offsetLeft;
		var endy = e.pageY-this.offsetTop;
		if(flag){
			cxt.lineTo(endx,endy);
		  	cxt.stroke();
		}
		
    }
    canvas.onmouseup = function(){
    	flag = false;
    }
   
    canvas.onmouseout = function(){
    	flag = false;
    }
	cxt.closePath();

}

//油漆桶
function Paint(e){
	choice_tools(2,tools,true);
	cxt.fillRect(0,0,880,380);
}

//吸管工具
function Straw(e){
	choice_tools(3,tools,true);
	var x = 0;
	var y = 0;
	var imagedata;
	canvas.onmousedown = function (e) {
		x = e.pageX-this.offsetLeft;
		y = e.pageY-this.offsetTop; 
		imagedata = cxt.getImageData(x,y,1,1);
		//data[0],data[1],data[2],data[3],是红绿蓝和透明度
		var red = imagedata.data[0];
		var green = imagedata.data[1];
		var blue = imagedata.data[2];
		//注意这里的拼接字符串,rgb要是一个字符串
		cxt.fillStyle = 'rgb('+red+','+green+','+blue+')';
		cxt.strokeStyle ='rgb('+red+','+green+','+blue+')';
		Brush(0);
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;


}
//文本工具
function Text(e){
	choice_tools(4,tools,true);
	var x = 0;
	var y = 0;
	cxt.font = "20px Georgia";
	canvas.onmousedown = function (e) {
		x = e.pageX-this.offsetLeft;
		y = e.pageY-this.offsetTop; 
		cxt.fillText(window.prompt("请输入文字",""),x,y);
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}
//放大镜(尽是画布成比例放大缩小)
function Magnifier(e){
	choice_tools(5,tools,true);
	//prompt返回值是字符串
	var s =parseInt(window.prompt("请输入放大比例","100")); 
	canvas.style.whith =parseInt(880*s/100)+'px';
	canvas.style.height =parseInt(380*s/100)+'px';
}

//形状
function Line(e){
	choice_tools(6,tools,true);
	//直线起点
	cxt.beginPath();
	canvas.onmousedown = function(e){
		var startx = e.pageX-this.offsetLeft;
		var starty = e.pageY-this.offsetTop;
		cxt.moveTo(startx,starty);
			
	}
	//直线终点
	canvas.onmouseup = function(e){
		var endx = e.pageX-this.offsetLeft;
		var endy = e.pageY-this.offsetTop;
		cxt.lineTo(endx,endy);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	
}
function Rect(e){
	choice_tools(7,tools,true);
	//矩形左上角的点
	cxt.beginPath();
	var startx = 0;
	var starty = 0;
	var endx = 0;
	var endy = 0;
	canvas.onmousedown = function(e){
		startx = e.pageX-this.offsetLeft;
	    starty = e.pageY-this.offsetTop;
	}
	//矩形右下角的点
	canvas.onmouseup = function(e){
		endx = e.pageX-this.offsetLeft;
		endy = e.pageY-this.offsetTop;
		cxt.strokeRect(startx,starty,endx-startx,endy-starty);
		cxt.closePath();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
function Arc(e){
	choice_tools(8,tools,true);
	var startx = 0;
	var starty = 0;
	var endx = 0;
	var endy = 0;
	var r = 0; //半径
	canvas.onmousedown = function(e){
		startx = e.pageX-this.offsetLeft;
	    starty = e.pageY-this.offsetTop;
	}
	
	canvas.onmouseup = function(e){
		endx = e.pageX-this.offsetLeft;
		endy = e.pageY-this.offsetTop;
		r = Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
		cxt.beginPath();
		cxt.arc(startx,starty,r,0,360,false);
		cxt.stroke();
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
function Poly(e){
	//等边三角形，已知两点(上和右),求第三个点坐标公式：
	//tanα=(y1-y2)/(x1-x2) ，x3=x2+L*cos(α+60)；y3=y2+L*sin(α+60)
	choice_tools(9,tools,true);
	var startx = 0;
	var starty = 0;
	var endx = 0;
	var endy = 0;
	var L = 0;
	var tanα = 0;
	var x3 = 0;
	var y3 = 0;
	canvas.onmousedown = function(e){
		startx = e.pageX-this.offsetLeft;
	    starty = e.pageY-this.offsetTop;
	}
	canvas.onmouseup = function(e){
		endx = e.pageX-this.offsetLeft;
		endy = e.pageY-this.offsetTop;
		L = Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
	    tanα = (endy - starty)/(endx-startx);
	    //注意：Math.atan(s)中的s是弧度不是角度
	    x3=startx+L*Math.cos(Math.atan((endy - starty)/(endx-startx))+Math.PI/3);
	    y3=starty+L*Math.sin(Math.atan((endy - starty)/(endx-startx))+Math.PI/3);
	    cxt.beginPath();
		cxt.moveTo(startx,starty);//三角形上面的点(startx,starty)
		cxt.lineTo(endx,endy);//三角形右面的点(endx,endy)
		cxt.lineTo(x3,y3);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
function Rectfill(e){
	choice_tools(10,tools,true);
	cxt.beginPath();
	var startx = 0;
	var starty = 0;
	var endx = 0;
	var endy = 0;
	canvas.onmousedown = function(e){
		startx = e.pageX-this.offsetLeft;
	    starty = e.pageY-this.offsetTop;
	}
	//矩形右下角的点
	canvas.onmouseup = function(e){
		endx = e.pageX-this.offsetLeft;
		endy = e.pageY-this.offsetTop;
		cxt.fillRect(startx,starty,endx-startx,endy-starty);
		cxt.closePath();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

function Arcfill(e){
	choice_tools(11,tools,true);
	cxt.beginPath();
	var startx = 0;
	var starty = 0;
	var endx = 0;
	var endy = 0;
	var r = 0; //半径
	canvas.onmousedown = function(e){
		startx = e.pageX-this.offsetLeft;
	    starty = e.pageY-this.offsetTop;
	}
	
	canvas.onmouseup = function(e){
		endx = e.pageX-this.offsetLeft;
		endy = e.pageY-this.offsetTop;
		r = Math.sqrt((endx-startx)*(endx-startx)+(endy-starty)*(endy-starty));
		cxt.arc(startx,starty,r,0,360,false);
		cxt.closePath();
		cxt.fill();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
//默认选中铅笔
window.onload=function () {
    cxt.fillStyle = "#fff";
	cxt.fillRect(0,0,880,380);
	cxt.fillStyle = "#000";
	Brush(0);
}
//设置线粗选中的背景
var line1px = document.getElementById("line1px");
var line3px = document.getElementById("line3px");
var line5px = document.getElementById("line5px");
var line8px = document.getElementById("line8px");
var lines = [line1px,line3px,line5px,line8px];

function Line1px(e) {
	choice_tools(0,lines,true);
	cxt.beginPath();
	cxt.lineWidth= 1;
	cxt.closePath();
}
function Line3px(e) {
	choice_tools(1,lines,true);
	cxt.beginPath();
	cxt.lineWidth = 3;
	cxt.closePath();
}
function Line5px(e) {
	choice_tools(2,lines,true);
	cxt.beginPath();
	cxt.lineWidth = 5;
	cxt.closePath();
}
function Line8px(e) {
	choice_tools(3,lines,true);
	cxt.beginPath();
	cxt.lineWidth = 8;
	cxt.closePath();
}

//设置颜色选择时，线框变白色
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var yellow = document.getElementById("yellow");
var white = document.getElementById("white");
var black = document.getElementById("black");
var pink = document.getElementById("pink");
var purple = document.getElementById("purple");
var cyan = document.getElementById("cyan");
var orange = document.getElementById("orange");
var colors = [red,green,blue,yellow,white,black,pink,purple,cyan,orange];
function Red(e){
	choice_tools(0,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="red";
	cxt.fillStyle="red";
	cxt.closePath();
}
function Green(e) {
	choice_tools(1,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="green";
	cxt.fillStyle="green";
	cxt.closePath();
}
function Blue(e){
	choice_tools(2,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="blue";
	cxt.fillStyle="blue";
	cxt.closePath();
}
function Yellow(e){
	choice_tools(3,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="yellow";
	cxt.fillStyle="yellow";
	cxt.closePath();
}
function White(e){
	choice_tools(4,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="white";
	cxt.fillStyle="white";
	cxt.closePath();
}
function Black(e){
	choice_tools(5,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="black";
	cxt.fillStyle="black";
	cxt.closePath();
}
function Pink(e){
	choice_tools(6,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="pink";
	cxt.fillStyle = "pink";
	cxt.closePath();
}
function Purple(e){
	choice_tools(7,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="purple";
	cxt.fillStyle="purple";
	cxt.closePath();
}
function Cyan(e){
	choice_tools(8,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="cyan";
	cxt.fillStyle="cyan";
	cxt.closePath();
}
function Orange(e){
	choice_tools(9,colors,false);
	cxt.beginPath();
	cxt.strokeStyle="orange";
	cxt.fillStyle="orange";
	cxt.closePath();
}
 








