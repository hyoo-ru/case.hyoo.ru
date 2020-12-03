namespace $.$$ {
	export class $hyoo_case_entity_snippet extends $.$hyoo_case_entity_snippet {

		title() {
			return this.entity().title()
		}

		property_list(): $mol_view_content[] {
			
			const main = this.entity().properties_main()
			if( main.length === 0 ) return [ this.entity().id() ]

			return main.map( prop => this.Property( prop.id() ) )
		}

		property( id: string ) {
			return this.entity().property( id )
		}

	}
}
