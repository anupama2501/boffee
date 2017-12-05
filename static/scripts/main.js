$(document).ready(function() {
    
    if(localStorage){
        console.log('Clearing local storage');
        window.localStorage.clear();
    }

    console.log('ready');

    var canvas = document.getElementById('canvas');

    $('#takePhotoButton').on('click', function(e) {
        console.log('Taking user image...');
        takePhoto();
    })

    $('.item_btn').on('click', function(e) {

        var cart_id2 = document.getElementById(this.id);
        var item = cart_id2.children[0].innerHTML;
        var count = localStorage.getItem(this.id);
        console.log(this.id);

        // count=count+1;
        if (count) {
            count = parseInt(count);
            count = count + 1;
            localStorage.setItem(this.id, count);
            var crt = document.getElementById('checkout'+this.id);
            crt.innerHTML = item + "     " + count;
        } else {
            count = 1
            localStorage.setItem(this.id, 1);
            var cart_id1 = document.createElement('div');
            cart_id1.id = "checkout" + this.id;
            item += "    1"
            cart_id1.appendChild(document.createTextNode(item));
            document.getElementById('cart').appendChild(cart_id1);
        }

    })

    //Check out functionality
    $('#checkout').on('click', function(e) {
        console.log('On checkout');
        if(localStorage){
            var data = localStorage;
            console.log('Inside checkout method')
            console.log(data);

            $.post("/checkout", data, function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
            });
        }else{
            alert('Please add items to the cart before checkout');
        }
    })

    $('#clear').on('click', function(e) {
        console.log('Cleared localStorage');
        document.location.reload()
    })

    function takePhoto() {
        console.log('Inside the takePhoto method');

        var width = video.videoWidth;
        var height = video.videoHeight;
        var user = document.getElementById("user_name").value;
        if(!user){
            alert("Please enter the customer name");
            return
        }
        console.log("After the user if condition");
        console.log(user);
        var context = canvas.getContext('2d');
        $('.close').click();
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var imageData = canvas.toDataURL('image/png');
            $.post("/photo", {
                        image: imageData,
                        subject_id: user
                    },function(data,status){
                        console.log("Data from server "+data+" Status: "+status);
                        window.location.replace('/home');    
                });        }
    }
});