namespace $.$$ {
	export class $hyoo_case_entity_page extends $.$hyoo_case_entity_page {

		scheme() {
			return this.entity().scheme()
		}

		@ $mol_mem
		property_list() {
			let props = this.entity().scheme().property_all()
			if( !this.editable() ) {
				props = props.filter( prop => this.entity().property( prop.id() ).filled() )
			}
			return props.map( property => this.Property( property.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

		config_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				this.entity().scheme()
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
