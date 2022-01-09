$(document).ready(onReady)


function onReady(){
    console.log('jQuery loaded');
    $('#submitId').on('click', sendTask);
    getTask()


}// end function onREady




// This function gathers my input and save it as object inputData 
function sendTask(evt){
    evt.preventDefault()
let inputData = {
    task: $('#taskId').val(),
    date: $('#dateId').val(),
    priority: $('#priorityId').val()
}
console.log('this is inputData', inputData);

// use AJAX to send data to server to add to database

$.ajax({
    method: 'POST',
    url: '/todo',
    data: inputData
})
    .then(function(response){
        $('#taskId').val(''),
        $('#dateId').val(''),
        $('#priorityId').val('')
    // then run the function that gets the 
    //posted data from server and renders it
    // i.e. run AJAX get
        getTask()
    })
    .catch(function(err) {
        console.log('error in POST', err)
    });

} // end function sendTask


function renderTask(data){
    $('#tableBody').empty();
    for(let i = 0; i < data.length; i++){
        let todo=data[i]
    $('#tableBody').append(`
        <tr data-id="${todo.id}">
            <td>${todo.task}</td>
            <td>${todo.priority}</td>
            <td>${todo.date}</td>
            <td><button class="statusButton">Completed</button>
        </tr>
    `)
    }
} // end function renderTask


function getTask(){
    console.log('in getTask');
    //ajax GET call to server to get task
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response){
        console.log('response from server is', response);
        renderTask(response)
    })
    .catch(function (error){
        console.log('error in GET', error)
    })
} // end function getTask