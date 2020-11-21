namespace $ {

	export class $hyoo_case_domain extends $mol_store<
		Record< string,
			ReturnType< $hyoo_case_registry['data'] >
		>
	> {

		scheme() {
			return this.registry( 'scheme' )
		}

		@ $mol_mem_key
		registry( id : string ) {

			const store = new $hyoo_case_registry({})

			store.id = $mol_const( id )
			store.domain = $mol_const( this )
			
			return this.sub( id , store )
		}

		@ $mol_mem
		registry_list() {
			return Object.keys( this.data() )
		}

	}

}
