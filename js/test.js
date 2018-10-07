const mysql = require('mysql');

var flag = 0;

var count = 0;
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
  clear_kart();
  clear_cust();
});

// clothes
$('#clothes').click(function() {
    remove();
    console.log("CLothes clicked");
    var sql = "select * from category where type='clothes'";
    db.query(sql, function (err, result) {
    if (err) throw err;
    for( var i = 0; i < 13; i++)
    {
    	$('#id' + i).html(result[i].item_id + "");
    	$('#name' + i).html(result[i].item_name + "");
    	$('#price' + i).html(result[i].item_price + "");
    }
  });
});


// electronics
$('#electronics').click(function() {
    remove();
    console.log("Electronics clicked");
    var sql = "select * from category where type='electronics'";
    db.query(sql, function (err, result) {
    if (err) throw err;
    for( var i = 0; i < 13; i++)
    {
    	$('#id' + i).html(result[i].item_id + "");
    	$('#name' + i).html(result[i].item_name + "");
    	$('#price' + i).html(result[i].item_price + "");
    }
  });
});

// clear
$('#remove').click(function() {
    remove();
});

// add to cart
$('#add').click(function() {
	for (var i = 0; i < 13; i++) {
		if($('#sel' + i).prop("checked") == true)
		{	
			count++;
	        var id = $('#id' + i).text();
	    	var name = $('#name' + i).text();
	    	var price = $('#price' + i).text();
	    	var sql = "insert into kart values("+parseInt(id)+",'"+name+"',"+parseInt(price)+")";
	    	db.query(sql, function (err, result) {
		    if (err) throw err;
		  });
	    }
    }
    var sql1 = "select * from kart";
    db.query(sql1, function (err, result1) {
    	if(err) throw err;
	    for( var i = 0; i < count; i++)
	    {
	    	$('#ids' + i).html(result1[i].item_id + "");
			$('#names' + i).html(result1[i].item_name + "");
			$('#prices' + i).html(result1[i].item_price + "");
		}
    })
    
    var sql2 = "select sum(item_price) as sum from kart";
    db.query(sql2, function (err, result2) {
    	if(err) throw err;
    	$('#total').html(parseInt(result2[0].sum));
    });
});

// take customer
$('#submit').click(function() {
    var id = $('#cid').val();
    var name = $('#cname').val();
    var addr = $('#addr').val();
    var phone = $('#phone').val();
    var email = $('#email').val();

    var sql = "insert into customer values("+parseInt(id)+",'"+name+"','"+addr+"',"+parseInt(phone)+",'"+email+"')";
    db.query(sql, function (err, result) {
    if (err) throw err;
  });
});

$('#get').click(function() {
    console.log("get");
    var sql = "select * from customer inner join (select sum(item_price) as price, count(*) as count from kart) p";
    db.query(sql, function (err, result) {
        if(err) throw err;
        console.log(result);
        $("#show").val("Customer ID:    " + result[0].cust_id + "\nName:  " + result[0].cust_name + 
            "\nMobile: " + result[0].phone + "\nEmail:  " + result[0].email + "\nTotal Items:    " + 
            result[0].count + "\nTotal Cost:    " + result[0].price);
    })
})

function remove()
{
    for (var i = 0; i < 13; i++) {
        $('#id' + i).html("");
        $('#name' + i).html("");
        $('#price' + i).html("");
        $('#sel' + i).prop("checked", false);
    }
}

function clear_kart()
{
    var sql = "delete from kart";
    db.query(sql, function(err){
        if (err) throw err;
    });
}

function clear_cust()
{
    var sql = "delete from customer";
    db.query(sql, function(err){
        if (err) throw err;
    });
}