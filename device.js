Skip to content
Search or jump to…

Pulls
Issues
Marketplace
Explore
 
@NevErdiEkilLeR 
jue89
/
node-linux-gpib
1
31
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
node-linux-gpib/lib/device.js /
@jue89
jue89 Refactored semaphors
…
Latest commit 1f1e249 on 30 Nov 2016
 History
 1 contributor
235 lines (175 sloc)  4.02 KB
  
'use strict';

const jsonGate = require( 'json-gate' );
const libgpib = require( '../build/Release/gpib.node' );
const Status = require( './status.js' );
const IBError = require( './error.js' );

const timeoutConstants = [
	'TNONE',
	'T10us',
	'T30us',
	'T100us',
	'T300us',
	'T1ms',
	'T3ms',
	'T10ms',
	'T30ms',
	'T100ms',
	'T300ms',
	'T1s',
	'T3s',
	'T10s',
	'T30s',
	'T100s',
	'T300s',
	'T1000s'
];

const schemaConnect = jsonGate.createSchema( {
	type: 'object',
	additionalProperties: false,
	required: true,
	properties: {
		pad: {
			type: 'integer',
			required: true,
			minimum: 0,
			maximum: 30
		},
		sad: {
			type: 'integer',
			minimum: 0,
			maximum: 30,
			default: 0
		},
		timeout: {
			type: 'string',
			enum: timeoutConstants,
			default: 'T300ms'
		},
		send_eoi: {
			type: 'boolean',
			default: true
		},
		eos: {
			type: 'integer',
			default: 0,
			minimum: 0,
			maximum: 255
		}
	}
} );


class Device {

	constructor( board_index, dev, sem ) {

		schemaConnect.validate( dev );

		this._sem = sem;

		// Convert timeout and send_eoi to int
		dev.timeout = timeoutConstants.indexOf( dev.timeout );
		dev.send_eoi = dev.send_eoi ? 1 : 0;

		// Create handle
		this._ud = libgpib.ibdev(
			board_index,
			dev.pad,
			dev.sad,
			dev.timeout,
			dev.send_eoi,
			dev.eos
		);

		if( this._ud == -1 ) throw new Error( `Cannot connect to PAD ${dev.pad}` );

	}

	_getUD() {
		if( this._ud == -1 ) throw new Error( "Not connected to a device" );
		return this._ud;
	}

	_write( data ) {

		return new Promise( ( resolve, reject ) => {

			libgpib.ibwrt( this._getUD(), data.toString(), ( err, status, bytesWritten ) => {
				status = new Status( status );

				if( status.ERR ) {
					// If error bit is set, throw a new error
					reject( new IBError( err ) );
				} else {
					// Return written bytes
					resolve( bytesWritten );
				}
			} );

		} );

	}

	_read() {

		return new Promise( ( resolve, reject ) => {

			libgpib.ibrd( this._getUD(), ( err, status, data ) => {
				status = new Status( status );

				if( status.ERR ) {
					// If error bit is set, throw a new error
					reject( new IBError( err ) );
				} else {
					// Return data
					resolve( data );
				}
			} );

		} );

	}

	disconnect( goToLocal ) {

		// goToLocal is true by default
		if( typeof goToLocal != 'boolean' ) goToLocal = true;

		return this._sem.take().then( () => {

			// If the device should be set back to local, do this befor disconnect
			if( goToLocal ) libgpib.ibloc( this._getUD() );

			// Disconnect form device
			const status = libgpib.ibonl( this._getUD() );
			this._ud = -1;

			// Free resources and return status
			this._sem.leave();
			return new Status( status );

		} ).catch( ( e ) => {

			// Free resources and throw error
			this._sem.leave();
			throw e;

		} );

	}

	write( data ) {
		if( data instanceof Array ) {

			// If data is an array, fire all commands in a row
			let jobs = [];
			data.forEach( ( d ) => {
				// Due to the semaphore the commands will be issued in series
				// and not in parallel!
				jobs.push( this.write( d ) );
			} );

			// Wait for all writes to finish
			return Promise.all( jobs );

		} else {

			// Otherwise just send given data
			return this._sem.take().then( () => this._write( data ) ).then( () => {

				// Free resources
				this._sem.leave();

			} ).catch( ( e ) => {

				// Free resources and throw error
				this._sem.leave();
				throw e;

			} );

		}
	}

	read() {

		return this._sem.take().then( () => this._read() ).then( ( data ) => {

			// Free resources and return data
			this._sem.leave();
			return data;

		} ).catch( ( e ) => {

			// Free resources and throw error
			this._sem.leave();
			throw e;

		} );

	}

	query( cmd ) {

		// Write cmd to device and try to read data back
		return this._sem.take().then( () => this._write( cmd ) ).then( () => this._read() ).then( ( res ) => {

			// Free resources and return response
			this._sem.leave();
			return res;

		} ).catch( ( e ) => {

			// Free resources and throw error
			this._sem.leave();
			throw e;

		} );
	}

}

module.exports = Device;
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
