/**
 * String of data.
 * Separated by ,
 * Range of ID's, separated by -
 * Look for invalid ID's within the given range.
 * Wrong ranges contain repeat of digits. (first half same as second half)
 * @example: 55 (twice 5)
 * @example: 6464 (twice 64)
 * 
 */

import { ListFormat } from "typescript";
import { rawData } from "./data.ts";

type Data ={
    startValue: number,
    endValue: number
}

function parseData(data:string):Data[] {
    const splitData:Data[] = data.split(',').map((dataPoint) =>{
        const splitDataPoint = dataPoint.split('-')
        const startValue = Number(splitDataPoint[0])
        const endValue = Number(splitDataPoint[1])
        return {startValue, endValue}
    })

    return splitData
}

const parsedData: Data[] = parseData(rawData)

let addedValues = 0

parsedData.forEach(({startValue, endValue}) => {
    for(let i=startValue; i<=endValue; i++){
        const valueLength = i.toString().length

        // Numbers with an odd amount of digits are always good, so only even will be processed
        if(valueLength % 2 == 0){
            
        const firstHalf = i.toString().slice(0, valueLength/2)
        const secondHalf = i.toString().slice(valueLength/2, valueLength)

        if(firstHalf == secondHalf){
            addedValues = addedValues + i
            console.log(addedValues)
        }
        }


    }
})



// part 1 answer: 28844599675 DONE!