## Riverside.io SDK

This is a simple wrapper for Riverside.io's Api [victoria club](https://github.com/riversideio/victoria-club), so the api is alot easier to interface with in frontend applications.

### Requirements

Right now at its current state there are three requirements: `jQuery, Handlebars, and requireJS` please install all three and setup this in your `main` script.

```javascript
require.config({
    paths: {
    	jquery : '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        handlebars : 'path/to/handlebars',
        io : 'path/to/sdk'
    }
});
```

Then to use the sdk in a script do

```javascript
require(['io'], function ( io ) {
	// yeah you can use io
})
```

### Api

Right now the api is very focus on users but hopefully in the near future we will be expanding it to more then just users.

#### io

The main object that holds the `classes` of the api.

##### io.users

Currently the only class in the api. Harbors many endpoints.

###### users.create

Create a user, takes two params: `email, password`. The api responds with a error or success. If response is successful api will return `user` key with the users `session_token`. The sdk will hold onto the users `session_token` and use it with any new calls made.

```javascript
io.users.create({
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
io.users.login({
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
io.users.get(function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('list of users', res.users );
})
```

###### users.update

Update a users profile data, one parameter is required: `id`. The api responds with a error or success. Requires user to have `session_token` before usage.

```javascript
io.users.update({
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
io.users.show({
	id : '123',
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('user', res.user );
})
```

###### users.updateCard

Update a users card information, five parameters are required: `id, card_number, card_cvc, card_exp_month, card_exp_year`. The api responds with a error or success. Requires user to have `session_token` before usage.

```javascript
io.users.updateCard({
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
io.users.checkin({
	id : '123'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('checkedin', res );
})
```

###### users.resetPassword

Send an email to reset password, one parameters is required: `email`. The api responds with a error or success.

```javascript
io.users.resetPassword({
	email : 'bob@example.com'
}, function ( err, res ) {
	if ( err ) console.warn( err );
	console.log('reset requested', res );
})
```

