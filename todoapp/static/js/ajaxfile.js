$(document).ready(function(){
    $('#taskAdd').on('click',function(e){
        e.preventDefault();

        $title = $('#description').val();
        $category =$('#category').val();
        $date =$('#dueDate').val();


        console.log($date);

        if($('#description').val()=="" || $('#category').val()=="" || $('#date').val()==""){
            /*$('#style').text("Please fill the all fields")*/
            alert("Please fill up the required field");
        }else{
            console.log("ajax calling");
            $.ajax({
                type: 'POST',
                url: 'task',
                data: {
                    title : $title,
                    category : $category,
                    date : $date,
                    csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val()
                },

                success:function(data){
                 console.log(data);
                 alert(data)
                 location.reload();
       

                }

            });
        }
    });

});

$(document).ready(function(){
    $('#delete').on('click',function(e){
        e.preventDefault();

        var arr = [];
        $.each($('input[name="checkedbox"]:checked'), function() {
         var value = $(this).val()

         arr.push(value)

      })
        console.log(arr)
       
        if($('#checked').not(':checked').length){
            alert("click checked button to delete the task")
        }
        else{
            $.ajax({
                type : 'POST',
                url : 'delete',
                data : {
                    arr:arr,
                    csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val()
                },

            success:function(data) {
                alert("task is deleted :"+arr)
                location.reload();
            }

            });
        }


    });

});


$(document).ready(function(){

    $('#edits').on('click',function(){


        $category =$('#category').val();
      
        var arr;
        $.each($('input[name="checkedbox"]:checked'), function() {
         var value = $(this).val();

         arr=value;

      });
        console.log(arr)
       
        $.ajax({
            type:'POST',
            url:'edit',
            data:{
                arr:arr,
                category:$category,
                csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val()
            },
           
            success:function(data) {
            console.log(data.title);
                 console.log(data);
                $("#exampleModal").modal("show");
                $('.taskid').val(data.id);
                $(".taskNames").val(data.title);
                //$('.taskCategorys').append('<option value='+data.category+'>'+data.category+'</option>');
                $(".taskDates").val(data.date);
               
        }

 });
    });
    

});

setTimeout(function() {
    //post your ajax code here
     remindercall();
    }, 1000);

function remindercall(){
    

    console.log("reminder")

}
