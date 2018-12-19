// 程序入口文件
// 1.声明一组全局变量 
// 1.1 can1 can2 ctx1 ctx2 canWidth canHeight
var can1 = null;
var can2 = null;
var ctx1 = null;
var ctx2 = null;
var canWidth = 0;   //画布的宽高
var canHeight = 0;
// 1.2 创建变量保存背景图片
var bgPic = null;
// 1.3 创建变量保存海葵对象
var ane = null;
// 1.4 创建两个变量，绘制帧的开始和时间差(结束-开始)
var lastTime = 0;
var deltaTime = 0;  //时间差(通常是10-70ms)
// 1.5创建一个变量，保存食物对象
var fruit = null;
// 1.6 创建一个变量，保存大鱼对象
var mom = null;
// 1.7 创建两个变量，保存鼠标位置
var mx = 0;
var my = 0;

// 2.创建全局函数 game init ganmeloop
function game(){
    init();
    lastTime = Date.now();  //记录未开始之前的时间
    deltaTime = 0;
    gameloop();

}
// 5.创建所有对象
function init(){
    // 5.1 获取画布对象 获取画笔对象
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");
    // 5.2 获取画布宽度和高度
    canWidth = can1.width;
    canHeight = can1.height;
    // console.log(canWidth,canHeight);
    // 5.3 创建背景对象并且下载图片
    bgPic = new Image();
    bgPic.src = "src/background.jpg";
    // 5.4 创建海葵对象并且调用其初始化方法
    ane = new aneObj();
    ane.init();
    // ane.draw();
    // 5.5 创建食物对象并且调用其初始化方法
    fruit = new fruitObj();
    fruit.init();
    // 5.6 创建大鱼对象并且调用其初始化方法
    mom = new momObj();
    mom.init();
    // 5.7 为画布绑定鼠标移动时间并且添加处理函数
    can1.addEventListener("mousemove",onMouseMove,false);
}
function onMouseMove(e){
    if(e.offsetX || e.layerX){
        // 三目 兼容性写法
        mx = e.offsetX == undefined ? e.layerX:e.offsetX;
    }
    if(e.offsetY || e.layerY){
        // 三目 兼容性写法
        my = e.offsetY == undefined ? e.layerY:e.offsetY;
    }
    console.log(mx+":"+my);
}
// 6
function gameloop(){
    requestAnimFrame(gameloop);
    var now = Date.now();       //当前绘制记录时间
    deltaTime = now - lastTime; //两帧时间差
    lastTime = now;             //上帧时间恢复
    // 6.1 调用绘制背景图片的函数
    drawBackground();
    // 6.2 监听画布上食物的个数
    fruitMonitor();             
    // 6.3 清除画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    // 6.9 调用collsion中的全局函数进行碰撞检测
    momFruitsCollsion();
    // 6.6 绘制海葵
    ane.draw();
    // 6.7 绘制食物
    fruit.draw();
    // 6.8 绘制大鱼
    mom.draw();
    
}
// 3.在网页加载成功后调用game
// 此处不是函数的调用，而是将函数game绑定在onload事件上，非即时调用
document.body.onload = game;
// 4.在index.html加载main.js文件