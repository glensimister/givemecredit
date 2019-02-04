function getDate() {
     var d = new Date();
     var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let day = d.getDate();
     let month = monthNames[d.getMonth()];
     let year = d.getFullYear();
     let date = `${day} ${month}, ${year}`;
     return date;
 }
