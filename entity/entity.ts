namespace $ {

	export class $hyoo_case_entity extends $mol_store<
		Record< string,
			ReturnType< $hyoo_case_property['data'] >
		>
	> {

		id() { return '' }
		domain() { return undefined as any as $hyoo_case_domain }

		@ $mol_mem_key
		property( id: string ) {

			const store = new $hyoo_case_property
			
			store.id = $mol_const( id )
			store.entity = $mol_const( this )
			
			return this.sub( id , store )
		}

		@ $mol_mem
		properties_id() {
			return Object.keys( this.data() )
		}

		entity_name( lang: string ): string {
			const name = this.value( 'entity-name' )
			if( name === undefined ) {
				return this.property_target().find( t => t.entity_name( lang ) )?.entity_name( lang ) ?? this.id()
			}
			return String( name[ lang ] )
		}

		property_target() {
			return this.property( 'property-target' ).links()
		}

		entity_kind() {
			return this.property( 'entity-kind' ).links()
		}

		entity_kind_id() {
			return this.entity_kind()[0].id() as
			| 'property_string'
			| 'property_text'
			| 'property_integer'
			| 'property_boolean'
			| 'property_link'
		}

		property_locale() {
			return Boolean( this.value( 'property-locale' ) )
		}

		property_suggest() {
			return Boolean( this.value( 'property-suggest' ) )
		}

		property_main() {
			return Boolean( this.value( 'property-main' ) )
		}

		property_least() {
			return this.entity_kind_id() === 'property_link' || !this.property_main() 
		}

		property_unit() {
			return String( this.value( 'property-unit' ) )
		}

		property_back() {
			return String( this.value( 'property-back' ) )
		}

		entity_parents() {
			return this.property( 'entity-parents' ).links()
		}

		@ $mol_mem
		entity_ancestors() {
			const all = [] as $hyoo_case_entity[]
			for( const parent of this.entity_parents() ) {
				all.push( ... parent.entity_ancestors(), parent )
			}
			return new Set( all )
		}

		@ $mol_mem
		entity_properties() {

			const kinds = [] as $hyoo_case_entity[]
			for( const kind of this.entity_kind() ) {
				kinds.push( ... kind.entity_ancestors() )
				kinds.push( kind )
			}

			const props = [] as $hyoo_case_property[]
			
			for( const kind of kinds ) {
				for( const prop of kind.property( 'entity-properties' ).links() ) {
					props.push( this.property( prop.id() ) )
				}
			}
			
			return props
		}

		@ $mol_mem
		entity_members() {
			const domain = this.domain()
			return ( this.value( 'enity-members' ) as string[] ?? [] ).map( id => domain.entity( id ) )
		}
		
		entity_properties_main() {
			return this.entity_properties().filter( prop => prop.kind().property_main() )
		}

		entity_properties_least() {
			return this.entity_properties().filter( prop => prop.kind().property_least() )
		}

	}

}
