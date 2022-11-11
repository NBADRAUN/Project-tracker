//GLOBAL VARIABLES/// 
var projectid = localStorage.length+1; 
var tabledata = document.getElementById('tblData');
var projectname = document.getElementById('formprojectname').value;
var projecttype = document.getElementById('formprojecttype').value;
var projectdate = document.getElementById('formprojectduedate').value;


//current time on hero banner///
function updateTime(){ 
    var now = dayjs();
    var date = now.format('MMM D, YYYY'); 
    var time = now.format('h:mm:ss A'); 
    $('#time').text(date +' '+ time); 
}
setInterval(updateTime,1000); 

///date picker for form////
$(function () {
    $("#formprojectduedate").datepicker();
});

///drop down menu for project types////
$(function () {
    $("#formprojecttype").selectmenu();
});

//this is the id of the submit element///
var formbutton = document.getElementById('submit');
var row = 1;

/// event listener
formbutton.addEventListener('click', formsubmit);


function formsubmit(e) {
    e.preventDefault();
    ///form variables //// 
    var projectname = document.getElementById('formprojectname').value;
    var projecttype = document.getElementById('formprojecttype').value;
    var projectdate = document.getElementById('formprojectduedate').value;

    //// script to prevent missing form items////
    if (!projectname || !projecttype || !projectdate) {
        alert("Form missing values");
        return;
    }

    ///adding a row and row cells
    var newRow = tabledata.insertRow(row);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
 
    /// adding the data to the cells
    cell1.innerHTML = projectname;
    cell2.innerHTML = projecttype;
    cell3.innerHTML = projectdate;

    /// JSON stringify the data /// 
    localStorage.setItem(projectid, JSON.stringify({
        'projectname': projectname,
        'projecttype': projecttype,
        'projectdate': projectdate,
    }));

    row++;  //iterating to the next table row
    projectid++;  //iterating to the next project id number 
}

/// looping through the local storage data to populate the table after the form reload//

for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) ///setting the key to iterate 
  
    var destring = localStorage.getItem(key); //getting the itterated key
    var test = JSON.parse(destring);  //destringing the JSON
  
    /// creating the table row and cells /// 
    var newRow = tabledata.insertRow(row);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    /// populating the cell data //// 
    cell1.innerHTML = test.projectname;
    cell2.innerHTML = test.projecttype;
    cell3.innerHTML = test.projectdate;
}   
