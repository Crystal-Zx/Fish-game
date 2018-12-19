// 完成碰撞检测
// 1.创建全局函数完成大鱼与食物的碰撞检测
function momFruitsCollsion(){
    // console.log(1);
    // 1.1 循环所有食物
    for(var i=0;i<fruit.num;i++){
        // 1.2 判断当前食物是否活动
        if(fruit.alive[i]){
            // 1.3 如果当前食物与大鱼距离小于900像素
            var len = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            // 1.4 当前食物的状态修改为不活动
            if(len < 900){
                fruit.alive[i] = false;
            }
        }
    }
}
// 2.将collsion.js添加index.html
// 3.在main.js gameloop中调用全局函数