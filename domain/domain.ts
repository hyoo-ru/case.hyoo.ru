namespace $ {

	export class $hyoo_case_domain extends $mol_object2 {
		
		@ $mol_mem
		state() {
			return new $hyoo_sync_yard
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

		@ $mol_action
		entity_new( ... kind: $hyoo_case_entity[] ) {
			const land = this.state().land_grab( [''], ['0_0'] )
			const entity = this.entity( land.id() )
			entity.property( 'meta-kind' ).target_join( ... kind )
			return entity
		}

	}

}
