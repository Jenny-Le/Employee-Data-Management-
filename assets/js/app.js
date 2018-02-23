
var config = {
    apiKey: "AIzaSyC9trdnBBCXnWay4UOTIHWikK0c6mWwqI0",
    authDomain: "employeetracker-c96e2.firebaseapp.com",
    databaseURL: "https://employeetracker-c96e2.firebaseio.com",
    projectId: "employeetracker-c96e2",
    storageBucket: "employeetracker-c96e2.appspot.com",
    messagingSenderId: "227227629989"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();

    var empName = $("#e-name").val().trim();
    var empRole = $("#e-role").val().trim();
    var empStartDate = $("#e-start-date").val().trim();
    var empMonthlyRate = $("#e-monthly-rate").val().trim();

    database.ref().push({
        employeeName: empName,
        employeeRole: empRole,
        employeeStartDate: empStartDate,
        employeeMonthlyRate: empMonthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapShot) {
    var tableRow = $("<tr>");
    var tdName = $("<td>");
    tdName.text(childSnapShot.val().employeeName);
    var tdRole = $("<td>");
    tdRole.text(childSnapShot.val().employeeRole);
    var tdStartDate = $("<td>");
    tdStartDate.text(childSnapShot.val().employeeStartDate);
    var tdMonthsWorked = $("<td>");
    tdMonthsWorked.text("calcuated");
    var tdMonthlyRate = $("<td>");
    tdMonthlyRate.text("$" + childSnapShot.val().employeeMonthlyRate);
    var tdTotalBilled = $("<td>");
    tdTotalBilled.text("calculated");

    tableRow.append(tdName);
    tableRow.append(tdRole);
    tableRow.append(tdStartDate);
    tableRow.append(tdMonthsWorked);
    tableRow.append(tdMonthlyRate);
    tableRow.append(tdTotalBilled);
    $("#employee-table tbody").append(tableRow);
});