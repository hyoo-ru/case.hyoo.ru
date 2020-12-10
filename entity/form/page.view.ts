namespace $.$$ {
	export class $hyoo_case_entity_form extends $.$hyoo_case_entity_form {

		kind() {
			return this.entity().meta_kind()[0]
		}

		@ $mol_mem
		property_list(): readonly $mol_view[] {
			let props = this.entity().properties()
			if( !this.editable() ) {
				props = props.filter( prop => prop.kind().property_least() )
				props = props.filter( prop => !prop.kind().property_hidden() )
			}
			return props.map( property => this.Property( property.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

	}
}
