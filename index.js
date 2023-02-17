// console.log('第一步');
// let promise = new Promise((resolve, reject) => {
//     console.log('第二步');
//     resolve('这次一定！！！！！');
// })

// promise.then(result => {
//     console.log(result);
// }, error => {
//     console.log(error.message);
// })

// console.log('第三步');

// 原生promise执行顺序 第一步-第二步-第三步-这次一定
// 说明 then 是异步的，需要在 then 中给执行 onFulfilled 和 onRejected 外面包上 setTimeout
// @kofeine,2023-02-17-16:28:23


console.log('第一步 开始创建 Promise 实例');
let promise = new Promise((resolve, reject) => {
    console.log('第二步 创建 Promise 实例');
    setTimeout(() => {
        resolve('这次一定！！！！！');
        console.log('第四步 执行异步任务完成');

    })
})

promise.then(result => {
    console.log('第五步 执行异步任务的成功回调', result);
}, error => {
    console.log('第五步 执行异步任务的失败回调', error.message);
})

console.log('第三步 结束创建 Promise 实例');

// Promise 实例中执行异步任务是在所有同步代码结束后的，也就是说在所有同步代码执行后才修改到 Promise实例的状态，在手写中，由于 then 方法是同步的，因此在执行 then 时，状态是待定，而之前只对成功和拒绝两种状态进行处理，现在需要针对待定状态进行处理：将该异步任务的成功与失败回调放入一个数组中暂存起来，在 resolve 和 reject 中，在修改结果和状态后，遍历该数组，执行所有回调。


//链式 promise.then().then()暂未实现