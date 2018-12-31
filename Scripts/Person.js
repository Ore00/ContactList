//Load the Person Data in the table
$(document).ready(function () {
    loadData();   
});

//Loading Data Function
function loadData() {
        $.ajax({
        url: "Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
            dataType: "json",
        async: false,
        success: function (result) {
            var tblBody = '';
            $.each(result, function (key, item) {
                tblBody += '<tr>';
                tblBody += '<tr>';
                tblBody += '<td>' + item.person_id + '</td>';
                tblBody += '<td>' + item.first_name + '</td>';
                tblBody += '<td>' + item.last_name + '</td>';
                var stateCode = getStateByID(item.state_id );
                tblBody += '<td>' + stateCode + '</td>';
                var thisDate = new Date(parseInt(item.dob.substr(6)));                
                tblBody += '<td>' + item.gender + '</td>';
                tblBody += '<td>' + thisDate.toLocaleDateString() + '</td>';
                tblBody += '<td><a href="#" onclick="return getByID(' + item.person_id + ')">Edit</a></td>';  
                tblBody += '</tr>';
            });
            $('.tbody').html(tblBody);
        },
        error: function (errormessage) {
            
            alert(errormessage.responseText);
        }
    });
}
function loadFilterdData(){
    var sVal = $('#search').val();
    if (sVal != "") {
        $.ajax({
            url: "Home/Search/?SearchVal=" + sVal,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var tblBody = '';
                $.each(result, function (key, item) {
                    tblBody += '<tr>';
                    tblBody += '<tr>';
                    tblBody += '<td>' + item.person_id + '</td>';
                    tblBody += '<td>' + item.first_name + '</td>';
                    tblBody += '<td>' + item.last_name + '</td>';
                    var stateCode = getStateByID(item.state_id);
                    tblBody += '<td>' + stateCode + '</td>';
                    var thisDate = new Date(parseInt(item.dob.substr(6)));
                    tblBody += '<td>' + item.gender + '</td>';
                    tblBody += '<td>' + thisDate.toLocaleDateString() + '</td>';
                    tblBody += '<td><a href="#" onclick="return getByID(' + item.person_id + ')">Edit</a></td>';
                    tblBody += '</tr>';
                });
                $('.tbody').html(tblBody);
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}
//Add Person
function Add() {
   
    var response = validate();
    if (response == false) {
        return false;
    }
    var vState = getStateIDByCode($('#state_id').val());   
    var genderID = $('input[name=gender]:checked').attr('id') == "genderMale" ? "M" : "F";
    var personObj = {
        person_id: null,
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),       
        gender: genderID,
        dob: $('#DOB').val(),
        state_id: vState,
    };    
    $.ajax({
        url: "Home/Add",
        data: JSON.stringify(personObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
           
    $('#personModal').modal('hide');   
    resetForm();

            setStatus("mainStatus", "alert alert-success alert-dismissible", "Person added!");
        },
        error: function (errormessage) {
            
            alert(errormessage.responseText);
        }
    });
}
//update Person
function Update() {
    var response = validate();
    if (response == false) {
        return false;
    }
    var genderID = $('input[name=gender]:checked').attr('id').toString() == "genderMale" ? "M" : "F";
    var vState = getStateIDByCode($('#state_id').val())
    
    var personObj = {
        person_id: $('#person_id').val().trim(),
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        gender: genderID,
        dob: $('#DOB').val(),
        state_id: vState,
    };    
    $.ajax({
        url: "Home/Update",
        data: JSON.stringify(personObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            resetForm();
            $('#personModal').modal('hide');  
            setStatus("mainStatus", "alert alert-success alert-dismissible", "Update complete!");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// get Person by ID
function getByID(personID) {
    resetBorderColor('first_name', 'lightblue');
    resetBorderColor('last_name', 'lightblue');
    resetBorderColor('gender', 'lightblue');
    resetBorderColor('state_id', 'lightblue');
    resetBorderColor('DOB', 'lightblue');
    $.ajax({
    url: "Home/GetPersonByID/" + personID,
        type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
        success: function (result) {            
            var thisDate = new Date(parseInt(result.dob.substr(6))); 
            var stateCode = getStateByID(result.state_id.toString());
                        $('#person_id').val(result.person_id);
                        $('#first_name').val(result.first_name);
                        $('#last_name').val(result.last_name );                
                        $('#state_id').val(stateCode);
                        $('#DOB').val(thisDate.toISOString().slice(0, 10));
                        if (result.gender == "M") {
                            $('#genderMale').prop('checked', true);
                        } else {
                            $('#genderFemale').prop('checked', true);
                        }
                        $('#personModal').modal('show');
                        $('#btnUpdate').show();
                        $('#btnAdd').hide();
                    },
            error: function(errormessage) {
                
                alert(errormessage.responseText);
             }
    });
    return false;                     

}
//Get the State Code using the State ID
function getStateByID(stateID) {    
    
    var stateCode;
    $.ajax({        
        url: "Home/GetStateByID/" + stateID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {          
          stateCode = result.state_code;         
        },
        error: function (errormessage) {
            
            alert(errormessage.responseText);
        }
    });
    return stateCode;
}
//Get the State ID using the State Code
function getStateIDByCode(stateCode) {
  
    var stateID;
    $.ajax({
        url: "Home/GetStateByCode/?Code=" + stateCode ,         
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            stateID = result.state_id;
        },
        error: function (errormessage) {           
          
            alert(errormessage.responseText);
        }
    });
    return stateID;
}
//validate if State exist in list
function StateIsValid(stateCode) {
    return getStateIDByCode(stateCode) == undefined ? false : true;
}
// set the boarder color for a form element
function resetBorderColor(itemID, color='lightgray') {
    $('#'+ itemID).css('border-color', color);
}

//validate each box is field
function validate() {
    resetStatusBoxes();
    var isValid = true;
    
    $("input").each(function () {
       
        if ($(this).val().trim() === "" && (this.id !== "search" && this.id !== "state_id" && this.id !== "person_id" && this.id !== "genderFemale" && this.id !== "genderMale" )) {
            alert(this.id);            
            resetBorderColor(this.id, 'Red');
            isValid = false;
        } else {            
            resetBorderColor(this.id , 'lightblue');
        }        
    });
       
    if ($('input[name=gender]:checked').attr('id') == undefined) {
        resetBorderColor('genderMaleLabel', 'red');
        resetBorderColor('genderFemaleLabel', 'red');
        isValid = false;
    } else {
        resetBorderColor('genderMaleLabel', 'lightblue');
        resetBorderColor('genderFemaleLabel', 'lightblue');
    }

    if (!StateIsValid($('#state_id').val())) {
        isValid = false;
        resetBorderColor('state_id', 'red');
        setStatus("formStatus", "alert alert-danger alert-dismissible", "Enter a valid State");
    }
    return isValid;
}
//reset the all textboxes
function resetForm() {
    $("input").each(function () {
        $(this).val("");    
        resetBorderColor(this.id , 'lightblue');
    });
    resetBorderColor('genderFemaleLabel', 'lightblue');
    resetBorderColor('genderMaleLabel', 'lightblue');
    resetStatusBoxes();
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}
//reset all status boxes
function resetStatusBoxes() {
    $('#formStatus').removeClass();
    $('#formStatus').text("");
    $('#mainStatus').removeClass();
    $('#mainStatus').text("");
}

//Used to check the values of form
function checkFormInput(FormID) {
    var inputStr = "";
    var frmList = document.getElementById(FormID);
    var i;
    for (i = 0; i < frmList.length; i++) {
        if (frmList.elements[i].id !== "") {
            if (frmList.elements[i].id !== "state_id") {
                inputStr += frmList.elements[i].id + ": " + frmList.elements[i].value + "\n";
            } else {
                inputStr += frmList.elements[i].id + ": " + getStateIDByCode(frmList.elements[i].value) + "\n";
            }
        }

    }
    setStatus("formStatus", "alert alert-info  alert-dismissible", inputStr);
}
function setStatus(divID, classes, inputString) {
    var ID = "sysStatus";
    $('#' + divID).html(page_error_nohead(ID));
    $('#' + ID).removeClass();
    $('#' + ID).addClass(classes);
    $('#' + ID).append(inputString);
}
//role="alert"
function page_error_nohead(divID) {
    var box = "<div id='";
    box = box + divID;
    box = box + "'>";
    box = box + "<button type='button' class='close' data-dismiss='alert'";    
    box = box + ">";
    box = box + "&times;</button</div>";

    return box;
}