namespace $ {

	export class $hyoo_case_property extends $mol_object2 {

		id() { return '' }
		entity() { return undefined as any as $hyoo_case_entity }

		base_data() {
			return {} as any
		}
		
		domain() { return this.entity().domain() }
		kind() { return this.domain().entity( this.id() ) }

		@ $mol_mem
		state() {
			return this.entity().state().sub( this.id() )
		}
		
		@ $mol_mem
		filled() {
			switch( this.kind().property_kind_id() ) {
				case 'link': return this.links().length > 0
				case 'text': return this.text().length > 0
				case 'integer': return ( this.state().value() ?? this.value_default() ) != null
				case 'boolean': return ( this.state().value() ?? this.value_default() ) != null
			}
		}

		@ $mol_mem
		text( next? : string ) {

			const lang = this.kind().property_locale()
				? this.$.$mol_locale.lang()
				: 'en'

			if( next !== undefined ) {
				return String( this.state().sub( lang ).value( next ) || '' )
			}
			
			return String(
				this.state().sub( lang ).value()
				?? this.state().sub( 'en' ).value()
				?? ( this.value_default() ?? {} )[ lang ]
				?? ''
			)

		}

		@ $mol_mem
		integer( next? : number ) {
			const data = this.state().value( next ) ?? this.value_default()
			return Number( data )
		}
		
		@ $mol_mem
		bool( next? : boolean ) {
			const data = this.state().value( next ) ?? this.value_default()
			return Boolean( data || false )
		}

		@ $mol_mem
		links( next?: $hyoo_case_entity[] ): $hyoo_case_entity[] {
			
			const domain = this.domain()
			const arg = next === undefined ? undefined : next.map( item => item.id() )
			
			let val = this.state().list( arg )
			if( !val.length ) val = this.base_data() ?? []
			
			return ( val as string[] ).map( id => domain.entity( id ) )
		}

		value_default() {
			const kind = this.kind()
			return kind.property( `${ kind.property_kind_id() }-default` ).state().value() ?? this.base_data()
		}

		back( index: number ) {
			return this.links()[ index ]?.property( this.kind().property_mutual()[0]?.id() ) ?? null
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
				
				for( const Back of this.kind().property_mutual() ) {
					const back = target.property( Back.id() )
					back.links([ entity, ... back.links() ])
				}

			}

		}

		target_tear( target: $hyoo_case_entity ) {

			let list = this.links()
			
			const index = list.indexOf( target )
			if( index < 0 ) return

			const back = this.back( index )
			list = [ ... list.slice( 0 , index ), ... list.slice( index + 1 ) ]
			this.links( list )

			back.target_tear( this.entity() )

		}

	}

}
