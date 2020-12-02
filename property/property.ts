namespace $ {

	export class $hyoo_case_property extends $mol_store<
		| boolean
		| string
		| number
		| readonly string[]
		| Record< string , string >
	> {

		id() { return '' }
		entity() { return undefined as any as $hyoo_case_entity }

		domain() { return this.entity().domain() }
		kind() { return this.domain().entity( this.id() ) }

		@ $mol_mem
		filled() {
			switch( this.kind().property_kind_id() ) {
				case 'property_link': return this.links().length > 0
				case 'property_text': return this.text( $mol_locale.lang() ).length > 0
				case 'property_integer': return ( this.data() ?? this.integer_default() ) != null
				case 'property_boolean': return ( this.data() ?? this.bool_default() ) != null
			}
		}

		@ $mol_mem_key
		text( lang: string, next? : string ) {

			if( next !== undefined ) {
				if( this.kind().property_locale() ) {
					this.data({
						... this.data() as {},
						[ lang ]: next,
					})
				} else {
					this.data( next )
				}
			}

			let value = this.data() ?? this.text_default()

			if( value && ( typeof value === 'object' ) ) {
				value = value[ lang ]
			}
			
			return String( value ?? '' )
		}

		@ $mol_mem
		integer( next? : number ) {
			const data = this.data( next ) ?? this.integer_default()
			return Number( data || 0 )
		}
		
		@ $mol_mem
		bool( next? : boolean ) {
			const data = this.data( next ) ?? this.bool_default()
			return Boolean( data || false )
		}

		@ $mol_mem
		links( next?: $hyoo_case_entity[] ): $hyoo_case_entity[] {
			
			const domain = this.domain()
			const arg = next === undefined ? undefined : next.map( item => item.id() )
			
			let val = this.data( arg )
			if( !val || typeof val !== 'object' ) val = [] 	
			
			return ( val as string[] ).map( id => domain.entity( id ) )
		}

		text_default() {
			return this.kind().property( 'property_text-default' ).data()
		}

		integer_default() {
			return this.kind().property( 'property_integer-default' ).data()
		}

		bool_default() {
			return this.kind().property( 'property_boolean-default' ).data()
		}

		back( index: number ) {
			return this.links()[ index ]?.property( this.kind().property_back()[0]?.id() ) ?? null
		}

		target_new() {

			const target = this.domain().entity_new( ... this.kind().property_target() )
			this.target_join( target )
			
			return target
		}

		target_join( ... entities: $hyoo_case_entity[] ) {
			
			const entity = this.entity()
			let links = this.links()
			
			for( const target of entities ) {
				if( links.includes( target ) ) continue
				
				this.links( links = [ target, ... links ] )
				
				for( const Back of this.kind().property_back() ) {
					const back = target.property( Back.id() )
					back.links([ entity, ... back.links() ])
				}

			}

		}

		target_tear( index: number ) {
			
			if( index < 0 ) return

			const back = this.back( index )
			
			const list = this.links().slice()
			list.splice( index, 1 )
			this.links( list )

			back.target_tear( back.links().indexOf( this.entity() ) )

		}

	}

}
