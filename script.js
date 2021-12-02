
// Current submited name
var obj = '';
    
// Sumbit-button function
function submit_request(){
    
    // Create XMLHttpRequest object to handel https request
    var xhr = new XMLHttpRequest();
    // Get username from document that user has intered in name-input box 
    var username = document.getElementById("username").value;
    // Characterize request
    var url = 'https://api.genderize.io/?name=' + username;
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    
    // If a request is sent, this function will be executed
    // Response is a prediction of name which has been requested
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { 
                // Parse response
                obj = JSON.parse(xhr.responseText);
                if (obj.count == 0){
                    obj.gender = "Undefined";
                }
                // Change info of prediction tags in column2
                document.getElementById("this-name").innerHTML =  "N.&nbsp&nbsp" + obj.name;
                document.getElementById("gender").innerHTML = "G.&nbsp&nbsp" + obj.gender;
                document.getElementById("probability").innerHTML =  "P.&nbsp&nbsp" + obj.probability;
                document.getElementById("count").innerHTML = "C.&nbsp&nbsp" + obj.count;
                // show confirm massage
                document.getElementById("alert-massage").innerHTML = "Prediction is completed";
                document. getElementById('alert-massage'). style. backgroundColor = 'cadetblue';
                // Show saved resault
                var saved = localStorage.getItem(obj.name);
                if (saved){
                    document.getElementById("answer").innerHTML = saved;
                }else{
                    document.getElementById("answer").innerHTML = "No result";
                }     
            }else{
                // If any error accoured, show error massage
                document.getElementById("alert-massage").innerHTML = "Info is not valid";
                document. getElementById('alert-massage'). style. backgroundColor = 'darkorange';
            }
        }  
    };
    
    // Send request and get response
    xhr.send(null);
    // Prevent button default action request(dont change url)
    event.preventDefault();
}
    
//--------------------------------------------------------------
    
//Save-button function
function save_request(){

    // get list of radio buttons
    var radios = document.getElementsByName("radio-input");
    // find checked radio button
    var selected
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            selected = radios[i].value;
        }
    }
    if (obj){
        if(selected){
            // seve answer manually
            window.localStorage.setItem(obj.name, selected);
            window.localStorage.getItem(obj.name);
            //show confirm massage
            document.getElementById("answer").innerHTML = selected;
            document.getElementById("alert-massage").innerHTML = "Gender is saved";
            document.getElementById('alert-massage'). style. backgroundColor = 'lightseagreen';
        }else{
            // If any button is not selected, show this error message
            document.getElementById("alert-massage").innerHTML = "Info is not valid";
            document. getElementById('alert-massage'). style. backgroundColor = 'darkorange';
        }
    }else{
        // If send request before submit, show this error message
        document.getElementById("alert-massage").innerHTML = "Submission is required";
        document. getElementById('alert-massage'). style. backgroundColor = 'darkorange';
    }
    event.preventDefault();
}
    
//--------------------------------------------------------------

    
// Clear-button function
function remove_saved_request(){
    // Remove item from localStorage
    var temp = window.localStorage.getItem(obj.name);
    if (temp){
        //Remove item
        window.localStorage.removeItem(obj.name);
        //Update saved answer prediction
        document.getElementById("answer").innerHTML = "No result";
        //Show confirm massage
        document.getElementById("alert-massage").innerHTML = "Gender is removed";
        document.getElementById('alert-massage').style. backgroundColor = 'lightseagreen';
        
    }else{
        // If key is not in localStorage, show this error message
        document.getElementById("alert-massage").innerHTML = "There is no result to clear";
        document.getElementById('alert-massage').style. backgroundColor = 'darkorange';
    }
    event.preventDefault();
}

    
//--------------------------------------------------------------

// The UIEvent.which read-only property of the UIEvent interface returns a number that indicates which button was pressed on the mouse, or the numeric keyCode or the character code (charCode) of the key pressed on the keyboard.

// Make sure user input is just alphabet and space    
function ValidateAlpha(evt){
    var keyCode = (evt.which) ? evt.which : evt.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

    return false;
        return true;
}