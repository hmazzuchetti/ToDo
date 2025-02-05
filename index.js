$(document).ready(function(){
    var getAndDisplayAllTasks = function () {
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1348',
        dataType: 'json',
        success: function (response, textStatus) {
          $('#todo-list').empty();
          response.tasks.forEach(function (task) {
            if (btnActive) {
              !task.completed 
               ? $('#todo-list').append(
                '<div class="row">' + 
                  '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? ' checked' : '') + '>' +
                  '<p class="col-xs-8">' + task.content + '</p>' +
                  '<button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button>' +
                '</div>' )
               : '' ; 
            } else if (btnComplete) {
              task.completed 
               ? $('#todo-list').append(
                '<div class="row">' + 
                  '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? ' checked' : '') + '>' +
                  '<p class="col-xs-8">' + task.content + '</p>' +
                  '<button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button>' +
                '</div>' )
               : '' ; 
            } else {
              $('#todo-list').append(
                '<div class="row">' +
                  '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? ' checked' : '') + '>' +
                  '<p class="col-xs-8">' + task.content + '</p>' +
                  '<button class="delete btn btn-danger" data-id="' + task.id + '">Delete</button>' +
                '</div>'
              );
            }
          });
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1348',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
          $('#new-task-content').val('');
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });
  
    var deleteTask = function (id) {
      $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1348',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    $(document).on('click', '.delete', function () {
      deleteTask($(this).data('id'));
    });

    var markTaskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1348',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }
      
      $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           markTaskComplete($(this).data('id'));
         }
       });
    
       var markTaskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1348',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

      $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           markTaskComplete($(this).data('id'));
         } else {
           markTaskActive($(this).data('id'));
         }
       });

       var btnActive = false;
       var btnComplete = false; 

       $(document).on('click', '#btn-active', function () {
        btnActive = true;
        btnComplete = false; 
        getAndDisplayAllTasks();
       });

       $(document).on('click', '#btn-complete', function () {
        btnActive = false;
        btnComplete = true; 
        getAndDisplayAllTasks();
       });

       $(document).on('click', '#btn-all', function () {
        btnActive = false;
        btnComplete = false; 
        getAndDisplayAllTasks();
       });
  
    getAndDisplayAllTasks();
  });