export function transformResult(result){
    return result?.map(
        (el)=>{
            let transformedEl = {...el._doc};
            transformedEl['id'] = el.id;
            delete transformedEl._id
            return transformedEl;
        })
}