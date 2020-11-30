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

		property_target() {
			return this.property( 'property-target' ).links()
		}

		meta_kind() {
			return this.property( 'meta-kind' ).links()
		}

		property_kind() {
			return this.property( 'property-kind' ).links()
		}

		property_kind_id() {
			return ( this.property_kind()[0]?.id() ?? null ) as
			| null
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

		property_populate() {
			return Boolean( this.value( 'property-populate' ) )
		}

		property_main() {
			return Boolean( this.value( 'property-main' ) )
		}

		property_least() {
			return this.property_kind_id() === 'property_link' || !this.property_main() 
		}

		property_hidden() {
			return Boolean( this.value( 'property-hidden' ) )
		}

		property_inherit() {
			return Boolean( this.value( 'property-inherit' ) )
		}

		property_unit() {
			return String( this.value( 'property-unit' ) )
		}

		property_back() {
			return this.property( 'property-back' ).links()
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

		@ $mol_mem_key
		title( lang: string ) {

			const chunks = [] as string[]

			for( const prop of this.properties_main() ) {
				
				switch( prop.kind().property_kind_id() ) {
					
					case 'property_link':
					case 'property_boolean':
						continue
					
					case 'property_string':
					case 'property_text':
						chunks.push( prop.locale( lang ).trim() )

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
