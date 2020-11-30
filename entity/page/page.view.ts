namespace $.$$ {
	export class $hyoo_case_entity_page extends $.$hyoo_case_entity_page {

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

		config_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				this.kind()
			)
		}

		close_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				null,
			)
		}

	}
}
