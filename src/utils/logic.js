export const createNumbersForCell = (count) => {
    return [...Array(count).keys()];
  };


 export const paginationHelper =(pagesCount,portionNumber)=>{
   const portionSize =5
  let portionCount
  let leftPortionPageNumber
  let rightPortionPageNumber
 
  if(pagesCount){
   
    portionCount = Math.ceil(pagesCount.length/portionSize)
    leftPortionPageNumber = (portionNumber-1)*portionSize
    rightPortionPageNumber =  portionNumber * portionSize 
  }
 
  return {
    portionCount,
    leftPortionPageNumber,
    rightPortionPageNumber
  }
 } 

export const renameResponse=(response, responseItems,oldName,newName)=>{
  const arr = [];
  responseItems.map((item ) => {
    let clone = {};
    for (let key in item) {
      if (key === oldName) {
        clone[newName] = item[key];
      } else {
        clone[key] = item[key];
      }
    }
    arr.push(clone);
  });
  const myResponse = {
    totalPages: response.pagesCount,
    items: arr
  }
  return myResponse;
 }