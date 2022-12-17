
function loadTable() {
    $.getJSON("http://localhost:3001/getUsers", function (data) {
        console.log("Success");
        // console.log(data);
        if (data.error == false) {
            $("#dataTable tbody").empty();
            data.data.forEach(user => {
                console.log(user);
                const tr = "<tr><td>" + user.userID +
                    "</td><td>" + user.username + "</td><td>" + user.password +
                    "</td><td>" + user.fname +
                    "</td><td>" + user.lname +
                    "</td><td>" + user.autority +
                    "</td><td>" + user.activeflag + 
                    "</td><td>"+'<a type="button" class="btn btn-outline-secondary me-2" onclick="showUpdateBox(\'' + user.userID + '\')"><i class="fas fa-edit"></i></a>'+
                    "</td><td>"+'<a type="button" class="btn btn-outline-danger" onclick="showDeleteBox(\'' + user.userID + '\')"><i class="fas fa-trash"></i></a>'+"</td></tr>";
                $("#dataTable tbody").append(tr);
            });
        }
    }).fail(function () {
        console.log("get json Fail");
    });
}

function loadQueryTable() {
    var searchID = $("#searchBox").val()
    var url = "http://localhost:3001/getUser/" + searchID
    console.log("Search = " + searchID)
    if (searchID != "") {
        $.getJSON(url, function (data) {
            console.log("Success");
            // console.log(data);
            if (data.error == false) {
                $("#dataTable tbody").empty();
                data.data.forEach(user => {
                    console.log(user);
                    const tr = "<tr><td>" + user.userID +
                        "</td><td>" + user.username +
                        "</td><td>" + user.password +
                        "</td><td>" + user.fname +
                        "</td><td>" + user.lname +
                        "</td><td>" + user.autority +
                        "</td><td>" + user.activeflag + "</td></tr>";
                    $("#dataTable tbody").append(tr);
                });
            }
        })
    } else {
        loadTable()
    }
}

function showCheckbox(){
    Swal.fire({
        title: "Check Username!",
        html:

            '<div class="mb-3"><label for="checkBox" class="form-label">Username</label>' +
            '<input class="form-control" id="checkBox" placeholder="Username"></div>' ,

        focusConfirm: false,
        preConfirm: () => {
            checkUsername();
        },
    });
}

function checkUsername() {
    var checkBox = $("#checkBox").val()
    var url = "http://localhost:3001/checkUsername/" + checkBox
    console.log("Check = " + checkBox)
    if (checkBox != "") {
        $.getJSON(url, function (data) {
            console.log(data)
            var result = data.msg
            if (result!="1"){
                iconX = 'error'
                textX = "Usernameนี้ยังไม่มีการใช้งาน"
            }else{
                iconX = 'success'
                textX = "Usernameนี้มีการใช้งานแล้ว"
            }
            Swal.fire({
                title: textX,
                text: '',
                icon: iconX,
                confirmButtonText: 'OK'
              })
        })
    } else {
        loadTable()
    }
}

function showCreatebox(){
    Swal.fire({
        title: "Create into database",
        html:

            '<div class="mb-3"><label for="username" class="form-label">Username</label>' +
            '<input class="form-control" id="username" placeholder="Username"></div>' +

            '<div class="mb-3"><label for="password" class="form-label">Password</label>' +
            '<input class="form-control" id="password" placeholder="password"></div>' +

            '<div class="mb-3"><label for="fname" class="form-label">First Name</label>' +
            '<input class="form-control" id="fname" placeholder="fname"></div>' +
            
            '<div class="mb-3"><label for="lname" class="form-label">Last name</label>' +
            '<input class="form-control" id="lname" placeholder="lname"></div>' +

            '<div class="mb-3"><label for="autority" class="form-label">Autority</label>' +
            '<input class="form-control" id="autority" placeholder="autority"></div>' +

            '<div class="mb-3"><label for="activeflag" class="form-label">Activeflag</label>' +
            '<input class="form-control" id="activeflag" placeholder="activeflag"></div>' ,

        focusConfirm: false,
        preConfirm: () => {
            createUser();
        },
    });
}

function createUser(){
    const username = $("#username").val()
    const password = $("#password").val()
    const fname = $("#fname").val()
    const lname = $("#lname").val()
    const autority = $("#autority").val()
    const activeflag = $("#activeflag").val()

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3001/createUser");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            username: username,
            password: password,
            fname: fname,
            lname: lname,
            autority: autority,
            activeflag: activeflag
        })
    );
    loadTable()
}

function showUpdateBox(userID){
    console.log("edit", userID);
    var url = "http://localhost:3001/getUser/" + userID
    $.getJSON(url, function (data) {
        if (data.error == false) {
            data.data.forEach(user =>{
                console.log(user);
                Swal.fire({
                    title: "Update into database",
                    html:
                        '<input class="form-control" id="userID" placeholder="userID" type="hidden" value='+user.userID+'></div>' +
            
                        '<div class="mb-3"><label for="username" class="form-label">Username</label>' +
                        '<input class="form-control" id="username" placeholder="Username" value='+user.username+'></div>' +
            
                        '<div class="mb-3"><label for="password" class="form-label">Password</label>' +
                        '<input class="form-control" id="password" placeholder="password" value='+user.password+'></div>' +
            
                        '<div class="mb-3"><label for="fname" class="form-label">First Name</label>' +
                        '<input class="form-control" id="fname" placeholder="fname" value='+user.fname+'></div>' +
                        
                        '<div class="mb-3"><label for="lname" class="form-label">Last name</label>' +
                        '<input class="form-control" id="lname" placeholder="lname" value='+user.lname+'></div>' +
            
                        '<div class="mb-3"><label for="autority" class="form-label">Autority</label>' +
                        '<input class="form-control" id="autority" placeholder="autority" value='+user.autority+'></div>' +
            
                        '<div class="mb-3"><label for="activeflag" class="form-label">Activeflag</label>' +
                        '<input class="form-control" id="activeflag" placeholder="activeflag" value='+user.activeflag+'></div>' ,
            
                    focusConfirm: false,
                    preConfirm: () => {
                        updateUser();
                    },
                });
            })
        }
    })
}

function updateUser(){
    const userID = $("#userID").val()
    const username = $("#username").val()
    const password = $("#password").val()
    const fname = $("#fname").val()
    const lname = $("#lname").val()
    const autority = $("#autority").val()
    const activeflag = $("#activeflag").val()

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3001/updateUser");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            userID: userID,
            username: username,
            password: password,
            fname: fname,
            lname: lname,
            autority: autority,
            activeflag: activeflag
        })
    );
    loadTable()
}