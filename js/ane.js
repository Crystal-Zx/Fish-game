// 1.创建海葵类 aneObj
var aneObj = function(){
    // this.len = [];     //海葵高度
    // this.x = [];       //海葵位置
    
    // 起点坐标 控制点坐标 终点坐标 摆动幅度 alpha
    this.rootx = [];  //起点坐标
    this.headx = [];  //终点坐标
    this.heady = [];  //终点坐标
    this.amp = [];    //摆动幅度 默认初始值为50，为了效果自然再加上一个随机数
    this.alpha = 0;  //当前摆动的位置  -1 -0.8 .. 0.6 0.8 1
};
aneObj.prototype.num = 50;  //海葵数量
// 2.为海葵类添加方法 init
aneObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        // 初始化：起点，终点，摆动幅度
        // 起点坐标：16=800/50 这样来生成的50个海葵差不多布满画布整个宽度
        this.rootx[i] = i*16 + Math.random()*20;
        // 终点的x坐标
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 230 + Math.random()*50;
        // 摆动幅度
        this.amp[i] = 50 + Math.random()*50;
    }



    // 为50个海葵赋值 len x
    // var h = canHeight;
    // for(var i=0;i<this.num;i++){
    //     this.len[i] = Math.random()*50+200;
    //     this.x[i] = Math.random()*20+i*16;
    // }
}
// 3.为海葵类添加方法 draw
aneObj.prototype.draw = function(){
    this.alpha += deltaTime*0.0008;
    var l = Math.sin(this.alpha);
    // 保存画笔状态
    ctx2.save();
    ctx2.strokeStyle = "#3b154e";   //描边颜色
    ctx2.globalAlpha = 0.6;         //透明度
    ctx2.lineCap = "round";         //圆角
    ctx2.lineWidth = 20;            //边线宽度
    // 3.1 创建循环
    for(var i=0;i<this.num;i++){
        // 1)开始新路径
        ctx2.beginPath();
        // 2)移动起始点计算
        ctx2.moveTo(this.rootx[i],canHeight);
        // 3)重新计算终点x坐标
        this.headx[i] = this.rootx[i]+this.amp[i]*l;
        // 4)绘制贝塞尔曲线 控制点 终点
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
        // 5)描边
        ctx2.stroke();
    }
    ctx2.restore();
}
// 4.在index.html加载ane.js文件

// 5.在main.js创建海葵对象并且调用相应的方法