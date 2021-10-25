// export default function numFormat(angka) {
//     const data = Math.floor(angka)
//     if(data==null){
//         data =0;
//       }
//       return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
// }
export default function numFormat(angka) {
  const data = Math.floor(angka)
  if(angka==null){
      return '-';
  }
  return angka.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}