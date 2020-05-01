/*$(document).ready(function (role, nom, iPth){
    gritter : (function(){
        var unique_id = $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Espace ' + role + '!',
            // (string | mandatory) the text inside the notification
            text: 'Bienvenue à vous : ' + nom,
            // (string | optional) the image to display on the left
            image: iPth,
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: true,
            // (int | optional) the time you want it to be alive for before fading out
            time: '',
            // (string | optional) the class name you want to apply to that specific message
            class_name: 'my-sticky-class'
        });

        // You can have it return a unique id, this can be used to manually remove it later using

        setTimeout(function () {

            $.gritter.remove(unique_id, {
                fade: true,
                speed: 'slow'
            });

        }, 6000)


        return false;
    })
})*/
$(document).ready(function(){
        var unique_id = $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Espace ' + role + '!',
            // (string | mandatory) the text inside the notification
            text: 'Bienvenue à vous : ' + nom,
            // (string | optional) the image to display on the left
            image: iPth,
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: true,
            // (int | optional) the time you want it to be alive for before fading out
            time: '',
            // (string | optional) the class name you want to apply to that specific message
            class_name: 'my-sticky-class'
        });

        // You can have it return a unique id, this can be used to manually remove it later using

        setTimeout(function () {

            $.gritter.remove(unique_id, {
                fade: true,
                speed: 'slow'
            });

        }, 6000)


        return false;
    
})