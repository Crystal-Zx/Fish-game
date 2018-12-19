// 1.创建fruitObj构造函数
var fruitObj = function(){
    this.alive = [];            //保存食物状态
    this.x = [];                //保存食物的位置
    this.y = [];
    this.l = [];                //食物图片的长度
    this.orange = new Image();  //橙色食物
    this.blue = new Image();    //蓝色食物
    this.fruitType = [];        //食物类型  ["blue","orange"]
    this.spd = [];              //食物速度
    this.aneNo = [];            //从哪一个海葵出生的，记录其下标
}
fruitObj.prototype.num = 30;
// 2.为fruitObj添加方法init
fruitObj.prototype.init = function(){
    console.log(ane.headx[12]);
    for(var i=0;i<this.num;i++){
        this.aneNo[i] = 0;//Math.floor(Math.random()*50);
        this.alive[i] = false;
        this.x[i] = 0;//ane.headx[this.aneNo[i]];
        this.y[i] = 0;//ane.heady[this.aneNo[i]];
        this.l[i] = 0;//1;
        this.spd[i] = 0.003+Math.random()*0.017;//0;
        this.fruitType[i] = "";//Math.random() < 0.9 ? "blue":"orange";
    }
    this.blue.src = "src/blue.png";
    this.orange.src = "src/fruit.png";
    console.log(this);
}
// 3.为fruitObj添加方法draw
fruitObj.prototype.draw = function(){
    // 3.1 判断当前食物活动状态，为true才绘制
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            // 开始绘制
            // 3.2 判断图片类型"blue" "orange"
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            // 3.3 判断图片宽度<14 宽度l+
            if(this.l[i] < 14){
                this.l[i] += this.spd[i] * 3 * deltaTime;//this.alivespd;
            }else{
                // 3.4 如果>14px 向上漂浮y-
                this.y[i] -= this.spd[i] * 3 * deltaTime;
            }
            ctx2.drawImage(pic,this.x[i],this.y[i],this.l[i],this.l[i]);
            // 当食物飘出画布消失
            if(this.y[i] < 0){
                this.alive[i] = false;
            }
        }
    }
    
    
}
// 4.将fruit.js添加到index.html
// 5.在main.js中创建食物对象并且调用相应方法

// 6.监听画布是否有15个活动食物
function fruitMonitor(){
    var sum = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) sum++;
    }
    if(sum < 15){
        sendFruit();
    }
}
// 7.挑一个不活动的食物令其出生
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i] === false){
            fruit.born(i);
            return;
        }
    }
}
// 8.出生
fruitObj.prototype.born = function(i){
    // 8.1 随机找一个海葵下标
    this.aneNo[i] = Math.floor(Math.random()*50);
    // 8.2 获取海葵终点x y
    this.x[i] = ane.headx[this.aneNo[i]];
    this.y[i] = ane.heady[this.aneNo[i]];
    // 8.3 食物宽度
    this.l[i] = 1;
    // 8.4 食物状态
    this.alive[i] = true;
    // 8.5 食物类型
    this.fruitType[i] = Math.random() < 0.9 ? "blue":"orange";
}