class Commitment {
    static PENDING = '待定';
    static REJECTED = '拒绝';
    static FULFILLED = '成功';
    // 接收传来的函数 @kofeine,2023-02-16-10:31:05
    constructor(func) {
        // 初始化状态 status 为 PENDING 待定 @kofeine,2023-02-16-10:52:56
        this.status = Commitment.PENDING;
        // 初始化结果
        this.result = null;
        this.callBackFulfilled = [];
        this.callBackRejected = [];
        // 执行func函数，传入 resolve 和 reject 参数
        // 这两个参数也是函数，是类的方法 @kofeine,2023-02-16-10:38:18
        func(this.resolve.bind(this), this.reject);
    }
    // resolve 与 reject 的任务 @kofeine,2023-02-16-10:40:20
    // 首先是改变 Promise 的状态，分别为 PENDING -> FULFILLED，PENDING -> REJECTED
    // 注意:这两个函数执行的时候在实例的外部函数中执行,this指向会发生改变  @kofeine,2023-02-16-11:28:54
    // 因此可以修改成箭头函数,或者使用 bind 改变指向
    // resolve 和 reject 需要在时间循环末尾执行，因此需要包上 setTimeout
    resolve(result) {
        setTimeout(() => {
            if (this.status = Commitment.PENDING) {
                this.status = Commitment.FULFILLED;
                this.result = result;
                this.callBackFulfilled.forEach(callback => {
                    callback(result);
                })
            }

        })

    }
    reject = (result) => {
        setTimeout(() => {
            if (this.status = Commitment.PENDING) {
                this.status = Commitment.REJECTED;
                this.result = result;
                this.callBackRejected.forEach(callback => {
                    callback(result);
                })
            }

        })

    }

    // then方法 @kofeine,2023-02-17-15:21:57
    then(onFulfilled, onRejected) {
        // 由于在下面会调用到 onFulfilled onRejected 这两个函数其中的一个，需要考虑他们可能为函数一外的类型、或者为空的情况 @kofeine,2023-02-17-15:49:14

        // 1.非函数类型 -> 转为空函数 @kofeine,2023-02-17-15:51:27

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { };
        onRejected = typeof onRejected === 'function' ? onRejected : () => { };

        if (this.status === Commitment.FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.result);

            })
        }
        if (this.status === Commitment.REJECTED) {
            setTimeout(() => {
                onRejected(this.result);

            })
        }
        // 当状态为待定时需要将本将执行的回调传入数组中 @kofeine,2023-02-17-16:59:53
        if (this.status === Commitment.PENDING) {
            this.callBackFulfilled.push(onFulfilled);
            this.callBackRejected.push(onRejected);
        }

    }
}
console.log('第一步 开始创建 Promise 实例');
let commitment = new Commitment((resolve, reject) => {
    console.log('第二步 创建 Promise 实例');
    setTimeout(() => {
        console.log(commitment.status);
        console.log('第四步 执行异步任务');
        resolve('这次一定一定');
        console.log(commitment.status);

    })
})

commitment.then(res => {
    console.log('第五步 执行异步任务的成功回调', res);
})
console.log('第三步 结束创建 Promise 实例');


