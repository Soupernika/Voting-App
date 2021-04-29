var express = require('express');
var mysql = require('mysql2');
var app = express();
var path = require('path');
var bodyParser =require('body-parser');
const session = require('express-session');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname));
app.use(express.json());

/*Handling session for login and logout*/
app.use(session({secret:"qwerty18052001",
                resave:false,
                saveUninitialized:false}))

/*Creating the connection to Database*/
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
    database : 'voting_app',
    insecureAuth:true
});


/*Displaying the front page which consists of redirection to Admin and register page*/
app.get('/',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/citizen.html'));
})


/*Page where admin logs in to view scores*/
app.get('/admin',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/admin.html'));
})


/*Returning the page where citizen can log in*/
app.get('/citizen',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/citizen.html'));
})

/*Register page for new citizens*/
app.get('/register',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/register.html'));
})


/*Post method to insert the user's email and password in database*/
app.post('/register',(req,res) => 
{
    var email=req.body.email;
    var pass=req.body.password;
    connection.query('INSERT INTO citizen_info VALUES(?,?,?)',[email,pass,0],(err) => 
    {
        if(err)
        {
            throw err;
        }
        else
        {
            /*Returning to home page after registering*/
            res.sendFile(path.join(__dirname + '/views/citizen.html'));
        }
    })
})

/*Validating the admin's email and password*/
app.post('/validateAdmin',(req,res) => 
{
    var username=req.body.name;
    var pass=req.body.pass;
    var obj={};
    /*Only a single user can be a admin*/
    if(username === 'soubyshree2001@gmail.com' && pass === '12345')
    {
        req.session.loggedin = true;
        req.session.username = username;
        /*Query to count the votes as per name*/
        connection.query("SELECT name,count(name) AS count FROM votes GROUP BY name",(err,result) => 
        {
            if(err)
            {
                throw err;
            }
            else
            {
                /*Used to render the ejs file to diplay the votes counted*/
                obj = {print:result};
                res.render('print',obj);
            }
        })
    }
    else
    {
        res.sendFile(path.join(__dirname + '/views/admin.html'));
    }
})


/*Validating the credentials of the citizen*/
app.post('/validateCitizen',function(req,res)
{
    var username=req.body.name;
    var password=req.body.pass;
    if(username && password)
    {
        connection.query("SELECT password,voted FROM citizen_info where email = ?",[username],(err,rows) => 
        {
            if(err)
            {
                throw err;
            }
            else if(rows[0].password === password && rows[0].voted === 0)
            {
                req.session.loggedin = true;
                req.session.username = username;
                res.sendFile(path.join(__dirname + '/views/dashboard.html'));
                /*Updates the database telling that the person has voted*/
                connection.query("UPDATE citizen_info SET voted=1 WHERE email = ?",[username],(err,rows) => 
                {
                    if(err)
                    {
                        throw err;
                    }
                })                
            }
            else if((rows[0].password != password))
            {
                /*Returns to home page if the email and password doesn't match*/
                res.sendFile(path.join(__dirname + '/views/citizen.html'));
            }
            else
            {
                res.sendFile(path.join(__dirname + '/views/voted.html'));
            }
        })
    }
    else 
    {
		res.send('Please enter Username and Password!');
	}

})


/*Logs out and destroys the session*/
app.post('/logout',(req,res) => {
    req.session.destroy();
    res.sendFile(path.join(__dirname + '/views/citizen.html'));
})


/*Final page after voting*/
app.get('/thanks',function(request,respond) 
{
    if (request.session.loggedin)
    {
        request.session.destroy();
    }
    else
    {
        respond.send("Please login to open this Page");
    }
        
})


/*Redirects to home page after voting and automatically destroys the session*/
app.post('/redirection',(req,res) => 
{
    req.session.destroy();
    res.sendFile(path.join(__dirname + '/views/citizen.html'));
})


/*Dashboard to be displayed only if the user logs in*/
app.get('/dashboard', function(request, response) 
{
	if (request.session.loggedin) 
    {
        response.send('Please login to view this page!');
	} 
    else 
    {
		response.send('Please login to view this page!');
	}
});


/*Updating the count in database for each person*/
app.post('/nelson',function(request,respond) 
{
    connection.query("INSERT INTO votes VALUES('Nelson',1)",(err) => 
    {
        if(err)
            throw err;
    });
    respond.sendFile(path.join(__dirname + '/views/citizen.html'));
      
})


app.post('/motherteresa',function(request,respond) 
{
    connection.query("INSERT INTO votes VALUES('Mother Teresa',1)",(err) => 
    {
        if(err)
            throw err;
    });
    respond.sendFile(path.join(__dirname + '/views/thanks.html'));

})

app.post('/abrahamlincoln',function(request,respond) 
{
    connection.query("INSERT INTO votes VALUES('Abraham Lincoln',1)",(err) => 
    {
        if(err)
            throw err;
    });
    respond.sendFile(path.join(__dirname + '/views/thanks.html'));

})

app.post('/diana',function(request,respond) 
{
    connection.query("INSERT INTO votes VALUES('Princess Diana',1)",(err) => 
    {
        if(err)
            throw err;
    });
    respond.sendFile(path.join(__dirname + '/views/thanks.html'));

})


app.post('/gandhi',function(request,respond) 
{
    connection.query("INSERT INTO votes VALUES('Mahathma Gandhi',1)",(err) => 
    {
        if(err)
            throw err;
    });
    respond.sendFile(path.join(__dirname + '/views/thanks.html'));

})


/*Returns 404 page if there is an access to unknown page*/
app.get('*',(req,res) => 
{
    res.sendFile(path.join(__dirname + '/views/Page404.html'));
})


/*Async await to connect to the server*/
async function fun1(req, res){
    let response = await app.listen(1819);
      if (response.err) { console.log('error');}
      else { console.log('fetched response');
  }}

fun1();