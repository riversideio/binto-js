define('io', ['jquery', 'handlebars'], function ( $, Handlebars ) {
	var user,
		processing;

	function _sendRequest ( endpoint, data, callback, options ) {

		if ( user ) {
			data = data || {};
			data.session_token = user.session_token;
		}

		return $.ajax({
			// abstract url to allow for better dev
			url : 'https://victoria-club.herokuapp.com/api/v0/' + endpoint,
			data : data,
			type : options.method || "post",
			success : function ( res ) {
				if ( callback ) {
					if ( res.success ) {
						callback( null, res );
						if ( 
							/\/sessions.json$/g.test( this.url ) ||
							( 
								/\/users.json$/g.test( this.url ) && 
								this.type === "POST" 
							)
						){
							user = res.user;
						}
					}else{
						callback( res );
					}
				}
			},
			error : function ( err ) {
				if ( callback ) callback ( err );
			}
		})
	}

	function _setCall ( endpoint, options ) {
		options = options || {};
		if ( options.endpointVars ) {
			options.compiled = Handlebars.compile( endpoint );
		}
		return function ( values, callback ) {

			var _endpoint;

			if ( user ) {
				values.id = values.id || user.id;
			}

			if ( typeof values === 'function' ) {
				callback = values;
				values = {};
			}

			_endpoint = options.endpointVars ? 
				options.compiled( values ) :
				endpoint;

			if ( !processing ) {
				processing = true;
				return _sendRequest( _endpoint, values, function ( ) {
					processing = false;
					if ( callback ) callback.apply( null, arguments );
				}, options || {} );
			}
		}
	}

	return {
		users : {
			login : _setCall('sessions.json'),
			create : _setCall('users.json'),
			read : _setCall('users.json', { 
				method : 'get' 
			}),
			update : _setCall('users/{{id}}/update.json', {
				endpointVars : true
			}),
			show : _setCall('users/{{id}}/show.json', {
				endpointVars : true
			}),
			updateCard : _setCall('users/{{id}}/update_card.json', {
				endpointVars : true
			}),
			checkin : _setCall('checkins.json'),
			resetPassword : _setCall('users/reset_password.json')
		}

	}

});