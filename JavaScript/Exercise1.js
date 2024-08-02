
const arr = [1,3,5,7,-1];

function minMax(arr)
{
   
    let obj = {
        min:arr[0],
        max:arr[0]
    };
    


    for(let i = 0;i<5;i++)
    {
        if(arr[i]<obj.min)
        {
            obj.min = arr[i];
        }
        if(arr[i]>obj.max)
        {
            obj.max = arr[i];
        }
    }

    
    return obj;

    
}

const res = minMax(arr);
console.log(res);