$(document).ready(function(){

$("#button").on("click", function(event){
event.preventDefault();
var trainName = $(".input1").val();
var dest = $(".input2").val();
var trainTime = $(".input3").val();
var Frequency = $(".input4").val();

console.log(trainName, dest, trainTime, Frequency);
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(trainTime),
    $("<td>").text(Frequency)
)
$(".table").append(newRow)

});


});