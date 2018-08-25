// student/api/add/?content=1,2,3,4,5,6,7
exports.addOne = function (req,res) {
	console.log("...................................")
	var connection = require('../model/dbconnection');
	var response = [];

	// split content in the url to arrays
	var arr = req.query.content.split(',');
	console.log("arr.length",arr.length)
	// make sure all required fields are provided
	if (
		typeof req.query.content !== 'undefined' &&
		arr.length == 7
	) {
		console.log("hi")
		var content = {
			
			s_name :arr[0],
   			s_surname :arr[1],
  			guardian :arr[2],
   			s_class :arr[3],
   			place :arr[4],
   			state :arr[5],
  			country :arr[6],
			
		};

		connection.query('INSERT INTO student SET ?', content,
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
};

