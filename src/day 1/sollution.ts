import data from './rawdata.ts'

const dialStart = 50
const dialMax = 99
const dialMin = 0
let turn = 0
let value = dialStart

let timesZero = 0

const parsedData = data.split('\n')

const testdata = ["L250", "L410", "r10", "R910", "L310"]

testdata.map((datapoint) =>{
    const number = Number(datapoint.slice(1))
    const directions = datapoint.slice(0,1)
})
console.log(testdata[0])


// testdata.forEach((dataPoint) =>{
//     const startValue = value
// let fullRotations = 0
// let number = Number(dataPoint.slice(1))
// const direction = dataPoint.slice(0,1)

// console.log('start ' + startValue)

// if (number >= 100){
//     number = Number(number.toString().slice(1))
//     fullRotations = Number(dataPoint.toString().slice(1,2))
//     timesZero = timesZero + fullRotations
// }

// if(direction == "L") {
//     turn = Number(number * -1)
// } else {
//     turn = Number(number)
// }
// console.log('turns ' + turn)

// value = Number(value + turn)
// if (value < dialMin){
//     value = value+100

//     if(startValue!=0){
//     timesZero++}

// }
// if (value > dialMax){
//     value = value-100
//     if(value !=0){
//     timesZero++}
// }

// if (value === 0) {
//     timesZero++
// } 

// console.log('times zero ' + timesZero)
// })

// parsedData.forEach((dataPoint) =>{
// const startValue = value
// let fullRotations = 0
// let number = Number(dataPoint.slice(1))
// const direction = dataPoint.slice(0,1)

// if (number >= 100){
//     number = Number(number.toString().slice(1))
//     fullRotations = Number(dataPoint.toString().slice(1,2))
//     timesZero = timesZero + fullRotations
// }

// if(direction == "L") {
//     turn = Number(number * -1)
// } else {
//     turn = Number(number)
// }

// value = Number(value + turn)
// if (value < dialMin){
//     value = value+100
//     if(startValue!=0){
//     timesZero++}

// }
// if (value > dialMax){
//     value = value-100
//     return timesZero++
// }

// if (value === 0) {
//     return timesZero++
// }

// })
// console.log(timesZero) // sollution: 5933
