// 1.创建构造函数方法
var momObj = function(){
    // 1.1 大鱼位置
    this.x;
    this.y;
    // 1.2.1 大鱼眼睛
    this.bigEye = [];
    // 1.2.2 大鱼眼睛图片切换
    this.bigEyeIdx = 0;
    this.bigEyeStart = 0;
    this.bigEyeEnd = 3000;
    // 1.3 大鱼身体
    this.bigBody = [];
    // 1.4.1 大鱼尾巴
    this.bigTail = [];
    // 1.4.2 大鱼尾巴图片切换 0-7
    this.bigTailIdx = 0;
    // 1.4.3 控制尾巴摆动速度添加两个变量
    this.bigTailStart = 0;      //计时开始
    this.bigTailEnd = 300;      //计时结束
    // 1.5 大鱼旋转角度
    this.angle;
}
// 2.为构造函数方法添加init方法
momObj.prototype.init = function(){
    // 大鱼坐标(屏幕居中位置)
    this.x = canWidth/2;
    this.y = canHeight/2;
    // 大鱼角度(0)
    this.angle = 0;
    // 创建循环加载大鱼眼睛图片对象
    for(var i=0; i<2; i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "src/bigEye"+i+".png";
    }
    // 创建循环加载大鱼身体图片对象
    for(var i=0; i<8; i++){
        this.bigBody[i] = new Image();
        this.bigBody[i].src = "src/bigSwim"+i+".png";
    }
    // 创建循环加载大鱼尾巴图片对象
    for(var i=0; i<8; i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "src/bigTail"+i+".png";
    }
    console.log(this.bigEye,this.bigBody,this.bigTail)
}
// 3.为构造函数方法添加draw方法
momObj.prototype.draw = function(){
    // 特殊要求：大鱼位置不停发生改变，旋转角度，并且要考虑小鱼等其他元素，需要保存画笔状态
    // 0.1 mx my鼠标坐标赋值大鱼坐标
    this.x = lerpDistance(mx,this.x,0.99);
    this.y = lerpDistance(my,this.y,0.98);
    // 最后一步：大鱼游动角度慢慢想鼠标角度游动
    // 套路：
    // 1.计算坐标差
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    // 2.计算角度差
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;
    // 3.通过函数计算新角度
    this.angle = lerpAngle(beta,this.angle,0.9);
    // 保存画笔状态
    ctx1.save();
    // 平移原点
    ctx1.translate(this.x,this.y);
    // 旋转角度
    ctx1.rotate(this.angle);
    // 绘制
    // 计时开始  计时结束(+1)
    //    0        500
    this.bigEyeStart += deltaTime;
    if(this.bigEyeStart > this.bigEyeEnd){
        this.bigEyeIdx = (this.bigEyeIdx+1) % 2;
        this.bigEyeStart = 0;
        // 修改大鱼闭眼时间
        if(this.bigEyeIdx == 0){    //下标0是睁眼状态
            this.bigEyeEnd = 3000;
        }
        if(this.bigEyeIdx == 1){    //下标1是闭眼状态
            this.bigEyeEnd = 300;
        }
    }
    this.bigTailStart += deltaTime;
    if(this.bigTailStart > this.bigTailEnd){
        this.bigTailIdx = (this.bigTailIdx+1) % 8;
        this.bigTailStart = 0;
    }
    ctx1.drawImage(this.bigEye[this.bigEyeIdx],-this.bigEye[this.bigEyeIdx].width*0.5,-this.bigEye[this.bigEyeIdx].height*0.5);
    ctx1.drawImage(this.bigBody[0],-this.bigBody[0].width*0.5,-this.bigBody[0].height*0.5);
    ctx1.drawImage(this.bigTail[this.bigTailIdx],-this.bigTail[this.bigTailIdx].width*0.5+30,-this.bigTail[this.bigTailIdx].height*0.5);
    // 恢复画笔状态
    ctx1.restore();
}
// 4.将mom.js添加到index.html
// 5.在main.js创建大鱼对象并且调用相应方法