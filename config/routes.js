module.exports = function(app) {

    var Kairos = require('kairos-api');
    var client = new Kairos('<API_ID>', '<API_KEY>');

    getTimestamp = function() {
        var date = new Date();
        var ts = "" + date.getFullYear() +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            ('0' + date.getDate()).slice(-2) +
            ('0' + date.getHours()).slice(-2) +
            ('0' + date.getMinutes()).slice(-2) +
            ('0' + date.getSeconds()).slice(-2) +
            ('00' + date.getMilliseconds()).slice(-3);
        return ts;
    }

    /*function mongoCalls(){
        var mongojs = require('mongojs');
        var db = mongojs('boffee', ['users']);

        //Insert User to database
        var orders = [];
        var images = [];
        var user = {
            subject_id: <TBU>,
            face_id: <>,
            orders: orders,
            images:images,
            dateTime: new Date("<YYYY-mm-ddTHH:MM:ss>")
        }

        db.users.insert(user, function(err, doc) {
            if (err) {
                res.send(err);
            }
        });

        db.users.update({
            face_id: <TBU>
            }, {
                $addToSet: {
                    orders: <TBU>,
                    images: <TBU>
                }
            }, function(err, returnvalue) {
                if (err) {
                    return console.dir(err);
                } else {
                    console.log("Updated successfully");
                }
        });


        db.users.find({
                face_id: <TBU>
            }).sort({
                priority: 1
            }, function(err, returnvalue) {
                if (err) {
                    return console.dir(err);
                }
                console.log(returnvalue);
        });
    }*/

    /*function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }*/

  /*  function enrollImage(imageData) {
        console.log("Inside user enroll");
        var params = {
              image: imageData,
              subject_id: 'ashok',
              gallery_name: 'boffee'
        };

        client.enroll(params)
          .then(function(result) {
            console.log(result.body.face_id);
            console.log(result.body.uploaded_image_url);
          })
          .catch(function(err) { 
            console.log(err);
          });
    }
*/
   /* function recognizeImage(imageData) {
        console.log("Inside recognize flow");
        var params = {
              image: imageData,
              gallery_name: 'boffee'
        };
        client.recognize(params) 
          .then(function(result) {
            //console.log(result.body.images[0].transaction);
            //console.log(result.body.images[0].candidates);
            if(result.body.images[0].transaction.status === "failure"){
                console.log("User not registerd..enrolling user");
                enrollImage(imageData , function(err, returnvalue){
                    if(err){
                       return console.dir(err);
                    }
                    else{
                        console.log('Inside the response block------------');    
                    }
                    
                });
            }else{

                console.log(result.body.images[0].candidates[0].subject_id);
                console.log(result.body.images[0].candidates[0].face_id);
                return "success";
            }
          })
          .catch(function(err) { 
            console.log(err);
          });
    }*/

    app.post('/checkout',function(req, res) {
        console.log(req.body);
        return 'Posted successfully'
    });

    app.get('/home', function(req, res) {
       res.render('home');
    });

    app.get('/', function(req, res) {
        res.render('index');
    });
    
    app.post('/photo', function(req, res) {
        var now = getTimestamp();
        var imageData = req.body.image;
        console.log(req.body.subject_id);
        console.log("Inside submission")
        if (imageData == undefined) {
            console.log('/photo - MISSING image');
            res.render('index');
        } else {
            //Define parameters
              console.log("Inside recognize flow");
        var params = {
              image: imageData,
              gallery_name: 'boffee'
        };
        client.recognize(params) 
          .then(function(result) {
            //console.log(result.body.images[0].transaction);
            //console.log(result.body.images[0].candidates);
            if(result.body.images[0].transaction.status === "failure"){
                console.log("User not registerd..enrolling user");
                //enrollImage(imageData);
             var params = {
              image: imageData,
              subject_id: 'ashok',
              gallery_name: 'boffee'
        };

        client.enroll(params)
          .then(function(result) {
            
            console.log(result.body.face_id);
            console.log(result.body.uploaded_image_url);
            res.redirect("/home");
          })
          .catch(function(err) { 
            console.log(err);
          });

            }else{
                console.log("Rendering the homepage")    
                console.log(result.body.images[0].candidates[0].subject_id);
                console.log(result.body.images[0].candidates[0].face_id);
                res.send('home');
            }
          })
          .catch(function(err) { 
            console.log(err);
          });
           
            console.log('doneWorks');
        }
    })
}