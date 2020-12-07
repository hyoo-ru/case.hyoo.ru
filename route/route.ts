namespace $ {

	export function $hyoo_case_route_arg(
		this: $,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity | null,
		editable?: boolean,
	) {

		if( !target ) return { [ source.id() ]: null }

		const domain = source.domain()
		
		const arg = { ... this.$mol_state_arg.dict() }
		let keys = Object.keys( arg )
		
		const index_source = keys.indexOf( source.id() )
		keys.splice( index_source + 1, 1000 )
		
		const scheme_target = target.meta_kind()
		const index_target = keys.findIndex( id => this.$mol_compare_array( domain.entity( id ).meta_kind() , scheme_target ) )

		keys.splice( 0, index_target + 1 )
		keys.push( target.id() )
		
		if( editable !== this.undefined ) {
			arg[ target.id() ] = editable ? 'edit' : ''
		}

		const res = {} as Record< string, string|null >

		for( let key of keys ) {
			res[ key ] = arg[ key ] || ''
		}

		for( let key in arg ) {
			if( key in res ) continue
			res[ key ] = null
		}

		return res

	}

	export function $hyoo_case_route_link(
		this: $,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity,
		editable = false,
	) {
		return this.$mol_state_arg.make_link(
			this.$hyoo_case_route_arg( source, target, editable ),
		)
	}

	export function $hyoo_case_route_go(
		this: $,
		source: $hyoo_case_entity,
		target: $hyoo_case_entity,
		editable = false,
	) {
		this.$mol_dom_context.location.href = this.$hyoo_case_route_link( source, target, editable )
	}

}
