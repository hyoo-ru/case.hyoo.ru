namespace $.$$ {
	export class $hyoo_case extends $.$hyoo_case {

		pages() {
			const params = this.$.$mol_state_arg.dict()
			return [
				this.Menu(),
				... Object.keys( params ).map(
					id => this.Entity_page( id ),
				)
			]
		}

		@ $mol_mem
		domain() {
			return this.$.$mol_store_local.sub( '$hyoo_case' , super.domain() )
		}

		entity( id: string ) {
			return this.domain().entity( id )
		}

		editable( id: string, next?: boolean ) {
			const arg = next === undefined ? undefined : next ? 'edit' : '' 
			return this.$.$mol_state_arg.value( id, arg ) === 'edit'
		}

	}
}
