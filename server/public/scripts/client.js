$(document).ready(onReady)


function onReady(){
    console.log('jQuery loaded');
    $('#submitId').on('click', sendTask);
    getTask()
    $(document).on('click', '.deleteButton',deleteTask);
    $(document).on('click', '.statusButton', taskComplete)
    $(document).on('click', '.tableRow', colorChange)


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
        <tr data-id="${todo.id}" class="tableRow">
            <td>${todo.task}</td>
            <td>${todo.priority}</td>
            <td>${todo.date}</td>
            <td><button class="statusButton">Completed</button><td>
            <td><button class="deleteButton">Remove</button></td>
            <td>${todo.completion_status}</td>
        </tr>
    `)
        $(this).parents('tr').css("background", "green")
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

function deleteTask(){
    let taskId = $(this).parents('tr').data('id')
    console.log('in deleteTask', taskId);

    // Delete the task by Id
    $.ajax({
        method: 'DELETE',
        url: `/todo/${taskId}`
    })
        .then((res) => {
            console.log('DELETE success');
            // Rerender with our new state
            getTask();
        })
         .catch((err) => {
             console.log('DELETE failed', err);
         })
} // end function deleteTask

function taskComplete (){
    //console.log('in taskComplete');
    let taskId = $(this).parents('tr').data('id');
    $(this).parents('tr').css("background", "green")
    let complete = true;
    $.ajax({
        method: 'PUT',
        url: `/todo/${taskId}`,
        data: {status: complete}
    })
    .then(() => {
        console.log('PUT success');
        // Rerender with our new state
        getTask();
        colorChange()
    })
    .catch((err) => {
        console.log('PUT failed', err);
    })
} // end function taskComplete


function colorChange (){
    $(this).parents('tr').css("background", "green")
} // end function colorChange