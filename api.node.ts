namespace $ {

	export class $hyoo_api_server extends $mol_object2 {

		@ $mol_mem
		express() {
			const express = $node.express() as ReturnType< typeof import( 'express' ) >
			
			express.use( '/harp' , this.middleware() )
			express.use( $node.express.static( './' ) )
			
			express.listen( this.port() )
			this.$.$mol_log3_rise({
				place: `${ this }.express()`,
				message: `Started` ,
				location: `http://127.0.0.1:${ this.port() }/`
			})
			
			return express
		}

		middleware() {
			return $mol_fiber_root( (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void ,
			)=> {

				try {

					const req_id = Math.random().toString(16).substring(2,10)

					const client = this.request( req_id )
					const r = client.handle( req.url )
					if( !r ) return next()
					
					res.setHeader( 'content-type' , 'application/json' )
					res.send( r ).end()

				} catch( error ) {
					
					if( 'then' in error ) $mol_fail_hidden( error )

					$mol_fiber.run( ()=> this.$.$mol_log3_fail({
						place: this,
						message: error.message,
					}) )
					
					res.status( 500 )
					res.setHeader( 'content-type' , 'text/plain' )
					res.send( error.message ).end()

				}

			} )
		}

		@ $mol_mem_key
		request( id : string ) {
			return $hyoo_api_request.create( request => {
				request.server = $mol_const( this )
				request.id = $mol_const( id )
			})
		}
		
		@ $mol_mem
		db_client() {
			$mol_mem_persist()
			return $mol_orient_client.create()
		}
		
		@ $mol_mem
		db_pool() {
			$mol_mem_persist()
			return this.db_client().db_ensure( 'harp' ).pool( 'harp' )
		}
		
		port() {
			return 6969
		}
		
	}

	@ $mol_fiber.class
	export class $hyoo_api_request extends $mol_object2 {

		server() : $hyoo_api_server {
			return $mol_fail( new Error( `${this}.server() isn't defined` ) )
		}
		
		id() : string {
			return $mol_fail( new Error( `${this}.id() isn't defined` ) )
		}

		@ $mol_fiber.method
		handle( path : string ) {

			$mol_fiber.run( ()=> this.$.$mol_log3_come({
				place : this ,
				message : 'GET' ,
				path ,
			}) )

			//-- /OUser=5@1[name][age] --
			//select name , status from OUser where @rid = '#5:1' fetchplan *:0
			const query = $mol_harp_query.parse( path.substring( 1 ) )

			function make_projection( query : $mol_harp_query ) : string {
				
				const chunks = Object.values( query.fetch )
				.map( sub => { 
					if( Object.keys( sub.fetch ).length === 0 ) return sub.name + ':{@rid}'
					return `${ sub.name }:{${ make_projection( sub ) }}`
				} )

				chunks.push( '@rid' )
				
				return chunks.join(',')
			}

			const db_session = this.db_session()

			try {
				
				const res = db_session.query( `select ${ make_projection( query ) } from ${ query.name }` )
				
				$mol_fiber.run( ()=> this.$.$mol_log3_done({
					place: this,
					message: `OK`,
				}) )
				
				db_session.destructor()
				
				return res

			} catch( error ) {

				if(!( 'then' in error )) db_session.destructor()
				$mol_fail_hidden( error )

			}
			
		}

		@ $mol_mem
		db_session() {
			return this.server().db_pool().session()
		}

	}
	
	$hyoo_api_server.create().express()

}
