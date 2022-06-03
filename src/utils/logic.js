//Иммитация импорта конфига
const portionSizePagination =5
//Иммитация импорта конфига


export const createNumbersForCell = (count) => {
    return [...Array(count).keys()].map(item=>item+1);
  };


 export const paginationHelper =(pagesCount,portionNumber)=>{
   
  let portionCount
  let leftPortionPageNumber
  let rightPortionPageNumber
 
  if(pagesCount){
   
    portionCount = Math.ceil(pagesCount.length/portionSizePagination)
    leftPortionPageNumber = (portionNumber-1)*portionSizePagination
    rightPortionPageNumber =  portionNumber * portionSizePagination 
  }
 
  return {
    portionCount,
    leftPortionPageNumber,
    rightPortionPageNumber
  }
 } 

export const renameResponse=(response, responseItems,oldName,newName)=>{
  const arr = [];
  let myResponse={}
  responseItems.forEach((item ) => {
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
  if(response.pagesCount){
    myResponse = {
      totalPages: response.pagesCount,
      items: arr
    }
  }
  else{
    myResponse = {
      totalPages: response.totalPages,
      items: arr
    }
  }
  
  console.log(myResponse);
  return myResponse;
 }