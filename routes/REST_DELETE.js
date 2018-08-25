// student/api/delete/?id={orderID}
module.exports = function (req,res) {
	var connection = require('../model/dbconnection');
	// Delete by order id
	var id = req.query.id;
	console.log("id...",id);

	connection.query('DELETE FROM student WHERE student_id = ?', [id], function(err, result) {
  		if (!err){
			  var response = [];
			  console.log("result....",result);

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
};
