namespace $ {

	export class $hyoo_case_entity extends $mol_object2 {

		id() { return '' }
		domain() { return undefined as any as $hyoo_case_domain }
		
		@ $mol_mem
		state() {
			
			const id = $mol_int62_string_ensure( this.id() )
			if( !id ) return null
			
			return this.domain().state().land( id ).chief
		}

		base_data() {
			return {} as any
		}
		
		@ $mol_mem_key
		property( id: string ) {

			const property = new $hyoo_case_property
			
			property.id = $mol_const( id )
			property.entity = $mol_const( this )
			property.base_data = ()=> this.base_data()[ id ]
			
			return property
		}

		property_owner() {
			return this.property( 'property-owners' ).links()
		}

		property_target() {
			return this.property_mutual()[0]?.property_owner() ?? []
		}

		meta_kind() {
			const kinds = this.property( 'meta-kind' ).links()
			if( kinds.length ) return kinds
			return [ this.domain().entity( 'meta' ) ]
		}

		property_kind_id() {
			return this.meta_kind()[0]?.id() as
			| 'text'
			| 'integer'
			| 'boolean'
			| 'link'
			?? 'text'
		}
		
		value( prop: string ) {
			return this.state()?.sub( prop, $hyoo_crowd_reg ).value() ?? this.base_data()[ prop ]
		}

		property_locale() {
			return Boolean( this.value( 'property-locale' ) )
		}

		property_suggest() {
			return Boolean( this.value( 'property-suggest' ) )
		}

		property_populate() {
			return Boolean( this.value( 'property-populate' ) )
		}

		property_main() {
			return Boolean( this.value( 'property-main' ) )
		}

		property_least() {
			return this.property_kind_id() === 'link' || !this.property_main() 
		}

		property_embed() {
			return Boolean( this.value( 'property-embed' ) )
		}

		property_hidden() {
			return Boolean( this.value( 'property-hidden' ) )
		}

		property_inherit() {
			return Boolean( this.value( 'property-inherit' ) )
		}

		property_unit() {
			return String( this.value( 'property-unit' ) || '' )
		}

		property_mutual() {
			return this.property( 'property-mutual' ).links()
		}

		property_min() {
			return this.property( 'property-min' ).integer()
		}

		property_max() {
			return this.property( 'property-max' ).integer()
		}

		// entity_parents() {
		// 	return this.property( 'meta-parents' ).links()
		// }

		// entity_kids() {
		// 	return this.property( 'meta-kids' ).links()
		// }

		// @ $mol_mem
		// ancestors() {
		// 	const all = [] as $hyoo_case_entity[]
		// 	for( const parent of this.entity_parents() ) {
		// 		all.push( ... parent.ancestors(), parent )
		// 	}
		// 	return new Set( all )
		// }

		// @ $mol_mem
		// descendants() {
		// 	const all = [] as $hyoo_case_entity[]
		// 	for( const kid of this.entity_kids() ) {
		// 		all.push( ... kid.descendants(), kid )
		// 	}
		// 	return new Set( all )
		// }

		@ $mol_mem
		properties() {

			const kinds = [ ... this.meta_kind() ]

			const props = new Set< $hyoo_case_property >()
			
			while( kinds.length ) {
				const kind = kinds.pop()!
				
				for( const Prop of kind.property( 'meta-properties' ).links() ) {
					
					const prop = this.property( Prop.id() )
					if( props.has( prop ) ) continue

					props.add( prop )
					
					if( Prop.property_inherit() ) {
						for( const target of this.property( Prop.id() ).links() ) {
							if( kinds.includes( target ) ) continue
							kinds.push( target )
						}
					}

				}
			}
			
			return [ ... props ]
		}

		properties_main() {
			return this.properties().filter( prop => prop.kind().property_main() )
		}

		properties_least() {
			return this.properties().filter( prop => prop.kind().property_least() )
		}

		@ $mol_mem
		title() {

			const chunks = [] as string[]

			for( const prop of this.properties_main() ) {
				
				switch( prop.kind().property_kind_id() ) {
					
					case 'link':
					case 'boolean':
						continue
					
					case 'text':
						chunks.push( prop.text().trim() )

				}

			}
			
			return chunks.filter( Boolean ).join(' ') || this.id()
		}

		@ $mol_mem
		members() {

			const kinds = [] as $hyoo_case_entity[]
			kinds.push( this )

			const members = [] as $hyoo_case_entity[]
			
			for( const kind of kinds ) {
				for( const member of kind.property( 'meta-members' ).links() ) {
					members.push( member )
				}
			}
			
			return members
		}
		
	}

}
