class Commitment{
    static PENDING = '待定';
    static REJECTED ='拒绝';
    static FULFILLED ='成功';
    // 接收传来的函数 @kofeine,2023-02-16-10:31:05
    constructor(func){
        // 初始化状态 status 为 PENDING 待定 @kofeine,2023-02-16-10:52:56
        this.status = Commitment.PENDING;
        // 初始化结果
        this.result = null;
        // 执行func函数，传入 resolve 和 reject 参数
        // 这两个参数也是函数，是类的方法 @kofeine,2023-02-16-10:38:18
         func(this.resolve.bind(this),this.reject)
    }
    // resolve 与 reject 的任务 @kofeine,2023-02-16-10:40:20
    // 首先是改变 Promise 的状态，分别为 PENDING -> FULFILLED，PENDING -> REJECTED
    // 注意:这两个函数执行的时候在实例的外部函数中执行,this指向会发生改变  @kofeine,2023-02-16-11:28:54
    // 因此可以修改成箭头函数,或者使用 bind 改变指向
    resolve(result){
        if(this.status = Commitment.PENDING){
            this.status = Commitment.FULFILLED;    
            this.result = result;
        }
        console.log(result);
        
    }
    reject = (result) => {
        if(this.status = Commitment.PENDING){
            this.status = Commitment.REJECTED;
            this.result = result;
        }
        console.log(result);

    }
}

let commitment = new Commitment((resolve,reject)=>{
    reject('这次一定一定');
})