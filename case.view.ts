namespace $.$$ {
	export class $hyoo_case extends $.$hyoo_case {

		pages() {
			const params = this.$.$mol_state_arg.dict()
			return [
				this.Menu(),
				... Object.keys( params ).map( reg => {
					const entity = this.domain().registry( reg ).entity( params[ reg ] )
					return this.Entity_page( entity )
				} )
			]
		}

		@ $mol_mem
		domain() {
			return this.$.$mol_store_local.sub( '$hyoo_case' , super.domain() )
		}

		entity( entity: $hyoo_case_entity ) {
			return entity
		}

	}
}
