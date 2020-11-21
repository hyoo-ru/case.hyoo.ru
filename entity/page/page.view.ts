namespace $.$$ {
	export class $hyoo_case_entity_page extends $.$hyoo_case_entity_page {

		@ $mol_mem
		property_list() {
			return this.entity().scheme().property_all().map( property => this.Property( property.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

		close_arg() {
			return { [ this.entity().scheme().id() ]: null }
		}

	}
}
