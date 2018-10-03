const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '10071998',
    database : 'project'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// clothes
$('#clothes').click(function() {
    console.log("CLothes clicked");
    var sql = "select * from category where type='clothes'";
    db.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    for( var i = 0; i < 13; i++)
    {
    	// console.log(result[i].item_id);
    	$('#id' + i).html(result[i].item_id + "");
    	$('#name' + i).html(result[i].item_name + "");
    	$('#price' + i).html(result[i].item_price + "");
    	// $('#product').html(CLOTHES);
    }
  });
});


// electronics
$('#electronics').click(function() {
    console.log("Electronics clicked");
    var sql = "select * from category where type='electronics'";
    db.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    for( var i = 0; i < 13; i++)
    {
    	// console.log(result[i].item_id);
    	$('#id' + i).html(result[i].item_id + "");
    	$('#name' + i).html(result[i].item_name + "");
    	$('#price' + i).html(result[i].item_price + "");
    	// $('#product').html(CLOTHES);
    }
  });
});

// clear
$('#remove').click(function() {
    for (var i = 0; i < 13; i++) {
        $('#id' + i).html("");
    	$('#name' + i).html("");
    	$('#price' + i).html("");
    }
});

// add to cart
$('#add').click(function() {
	console.log("jdxvl");
	for (var i = 0; i < 13; i++) {
		if($('#sel' + i).prop("checked") == true)
		{	
			console.log("hey");
	        var id = $('#id' + i).text();
	    	var name = $('#name' + i).text();
	    	var price = $('#price' + i).text();
	    	console.log(id);
	    	var sql = "insert into kart values("+parseInt(id)+",'"+name+"',"+parseInt(price)+")";
	    	db.query(sql, function (err, result) {
		    if (err) throw err;
		    // console.log(result);
		  });
	    }
    }
})