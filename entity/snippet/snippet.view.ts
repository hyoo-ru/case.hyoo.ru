namespace $.$$ {
	export class $hyoo_case_entity_snippet extends $.$hyoo_case_entity_snippet {

		title() {

			const main = this.entity().property_main()
			if( main.length === 0 ) return this.entity().id()

			return main.map( prop => prop.locale( $mol_locale.lang() ) ).join( ' ' )

			// return this.entity().scheme().name( $mol_locale.lang() ) + ' ' + this.entity().id()
		}

		property_list() {
			
			const main = this.entity().property_main()
			if( main.length === 0 ) return [ this.entity().id() ]

			return main.map( prop => this.Property( prop.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

	}
}
