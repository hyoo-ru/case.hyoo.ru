namespace $.$$ {
	export class $hyoo_case_entity_page extends $.$hyoo_case_entity_page {

		scheme() {
			return this.entity().entity_kind()[0]
		}

		@ $mol_mem
		property_list() {
			let props = this.entity().entity_properties()
			if( !this.editable() ) {
				props = props.filter( prop => prop.kind().property_least() )
			}
			return props.map( property => this.Property( property.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

		config_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				this.entity().entity_kind()[0]
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
