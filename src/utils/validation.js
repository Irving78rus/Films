
export function ratingTest(rating) {
   if((rating<=10&&rating>=0)||typeof(year)==="undefined"){
     return true
   }
   else return false
}
export function yearTest(year) {
  if((year>=1000&&year<=3000)|| (year)===""){
    return true
  }
  else return false
}

export function keywordTest(keyword) {
  if(typeof(keyword)==='string'||typeof(keyword)==="undefined"){
    return true
  }
  else return false
}
 
 