namespace $ {

	export class $hyoo_case_domain extends $mol_store<
		Record< string,
			ReturnType< $hyoo_case_entity['data'] >
		>
	> {

		@ $mol_mem_key
		entity( id : string ) {

			const store = new $hyoo_case_entity({ 'meta-kind': [] })

			store.id = $mol_const( id )
			store.domain = $mol_const( this )
			
			return this.sub( id , store )
		}

		@ $mol_mem
		entity_list() {
			return Object.keys( this.data() )
		}

		entity_new( ... kind: $hyoo_case_entity[] ) {
			const id = $mol_guid( id => id in this.data() )
			const entity = this.entity( id )
			entity.property( 'meta-kind' ).target_join( ... kind )
			return entity
		}

	}

}
