namespace $ {

	export class $hyoo_case_domain extends $mol_object2 {
		
		@ $mol_mem
		state() {
			return new $mol_state_shared
		}
		
		base_data() {
			return {} as any
		}
		
		@ $mol_mem_key
		entity( id : string ) {

			const entity = new $hyoo_case_entity

			entity.id = $mol_const( id )
			entity.domain = $mol_const( this )
			entity.base_data = ()=> this.base_data()[ id ] ?? {}
			
			return entity
		}

		entity_new( ... kind: $hyoo_case_entity[] ) {
			const id = $mol_guid( 8 )//, id => id in this.data() )
			const entity = this.entity( id )
			entity.property( 'meta-kind' ).target_join( ... kind )
			return entity
		}

	}

}
