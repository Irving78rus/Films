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