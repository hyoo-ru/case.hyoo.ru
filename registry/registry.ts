namespace $ {

	export class $hyoo_case_registry extends $mol_store<
		Record< string,
			ReturnType< $hyoo_case_entity['data'] >
		>
	> {

		id() { return '' }
		domain() { return undefined as any as $hyoo_case_domain }

		scheme() { return this.domain().scheme().entity( this.id() ) }

		@ $mol_mem_key
		entity( id : string ) {

			const store = new $hyoo_case_entity({})

			store.id = $mol_const( id )
			store.registry = $mol_const( this )
			
			return this.sub( id , store )
		}

		@ $mol_mem
		entity_list() {
			return Object.keys( this.data() )
		}

		entity_new() {
			const id = $mol_guid( id => id in this.data() )
			return this.entity( id )
		}

	}

}
