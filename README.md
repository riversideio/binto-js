## binto-js

![](https://raw2.github.com/riversideio/binto-api/master/binto.jpg)

This is a simple wrapper for the [binto-api](https://github.com/riversideio/binto-api), so the api is alot easier to interface with in frontend applications.

### Requirements

Right now at its current state there is one requirement: `jQuery`. It is also compatiable with amd modules.

```javascript
// to import using requirejs
require.config({
    paths: {
    	jquery : '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        binto : 'path/to/binto-js.js'
    }
});
```

### To Use

first you will need to call `binto.setUrl` to point towards a database if you dont there will be a warning everytime you make a call or try to.

```javascript
binto.setUrl('http://localhost:3000');
```
then you can use all the other methods

```javascript
binto.users.all( function( err, res) {
	console.log( arguments );	
})

// or using requirejs

require(['binto'], function ( binto ) {
	binto.users.all( function( err, res) {
		console.log( arguments );	
	})
})
```

### Api

Right now the api is very focus on users but hopefully in the near future we will be expanding it to more then just users.

#### binto

The main object that holds the `classes` of the api.

##### binto.setUrl(<api_url>)

this is a function that allows you to set what api endpoint you want to run the sdk against. eg. `http://localhost:3000/api/v0/`

##### binto.users

Currently the only class in the api. Harbors many endpoints.

###### users.create

Create a user, takes two params: `email, password`. The api responds with a error or success. If response is successful api will return `user` key with the users `session_token`. The sdk will hold onto the users `session_token` and use it with any new calls made.

```javascript
binto.users.create({
	email : 'test@example.com',
	password : '123456'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('user created', res.user );
})
```

###### users.login

Very similair to user create, takes two params: `email, password`. The api responds with a error or success. If response is successful api will return `user` key with the users `session_token`. The sdk will hold onto the users `session_token` and use it with any new calls made.

```javascript
binto.users.login({
	email : 'test@example.com',
	password : '123456'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('user logged in', res.user );
})
```

###### users.read

Gets a list of all current memebers that have signed up through system.

```javascript
binto.users.get(function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('list of users', res.users );
})
```

###### users.update

Update a users profile data, one parameter is required: `id`. The api responds with a error or success. Requires user to have `session_token` before usage.

```javascript
binto.users.update({
	id : '123',
	name : 'Bob Hope'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('user updated', res.user );
})
```

###### users.show

Shows a users profile data, one parameter is required: `id`. The api responds with a error or success.

```javascript
binto.users.show({
	id : '123',
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('user', res.user );
})
```

###### users.updateCard

Update a users card information, five parameters are required: `id, card_number, card_cvc, card_exp_month, card_exp_year`. The api responds with a error or success. Requires user to have `session_token` before usage.

```javascript
binto.users.updateCard({
	id : '123',
	card_number : '4242424242424242',
	card_cvc : '123',
	card_exp_month : '03',
	card_exp_year : '20'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('card updated', res );
})
```

###### users.checkin

Checkin user, one parameters is required: `id`. The api responds with a error or success.

```javascript
binto.users.checkin({
	id : '123'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('checkedin', res );
})
```

###### users.resetPassword

Send an email to reset password, one parameters is required: `email`. The api responds with a error or success.

```javascript
binto.users.resetPassword({
	email : 'bob@example.com'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('reset requested', res );
})
```

more documentation can be found at [riversideio/binto-api](https://github.com/riversideio/binto-api)

