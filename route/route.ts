namespace $ {

	export function $hyoo_case_route_arg(
		this: $mol_ambient_context,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity,
	) {

		const key_source = source.scheme().id()
		const key_target = target.scheme().id()

		const arg = { ... this.$.$mol_state_arg.dict() } as Record< string, string|null >
		let keys = Object.keys( arg )
		
		for( const key of keys.slice( keys.indexOf( key_source ) + 1 ) ) {
			arg[ key ] = null
		}

		keys = keys.slice( 0, keys.indexOf( key_source ) + 1 )

		for( const key of keys.slice( 0, keys.indexOf( key_target ) + 1 ) ) {
			arg[ key ] = null
		}

		const save = {}
		for( let key in arg ) {
			if( arg[ key ] !== null ) {
				save[ key ] = arg[ key ]
			}
		}

		const add = { [ key_target ]: target.id() }
		
		return { ... save, ... arg, ... add }

	}

	export function $hyoo_case_route_link(
		this: $mol_ambient_context,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity,
	) {
		return this.$mol_state_arg.make_link(
			this.$hyoo_case_route_arg( source, target ),
		)
	}

	export function $hyoo_case_route_go(
		this: $mol_ambient_context,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity,
	) {
		this.$.$mol_dom_context.location.href = this.$hyoo_case_route_link( source, target )
	}

}
