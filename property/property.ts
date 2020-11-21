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

		registry() { return this.entity().registry() }
		domain() { return this.registry().domain() }
		scheme() { return this.domain().scheme().entity( this.id() ) }

		locale( lang: string, next? : string ) {

			if( next !== undefined ) {
				this.data({
					... this.data() as {},
					[ lang ]: next,
				})
			}

			let value = this.data()

			if( value && ( typeof value === 'object' ) ) {
				value = value[ lang ]
			}
			
			return String( value ?? '' )
		}

		item( index: number, next?: string ): string {
			return this.value( index as never, next as never ) as string ?? ''
		}

		list( next?: string[] ): string[] {
			return this.data( next ) as any ?? []
		}

		target( index: number ) {
			return this.domain().registry( this.scheme().target().id() ).entity( this.item( index ) )
		}

		back( index: number ) {
			return this.target( index ).property( this.scheme().back() )
		}

		populate() {
			const target = this.scheme().target().registry_sub().entity_new()
			this.join( target )
			return target
		}

		join( target: $hyoo_case_entity ) {
			this.list([ ... this.list(), target.id() ])
			const back = target.property( this.scheme().back() )
			back.list([ ... back.list(), this.entity().id() ])
		}

		tear( index: number ) {
			
			if( index < 0 ) return

			const back = this.back( index )
			
			const list = this.list().slice()
			list.splice( index, 1 )
			this.list( list )

			back.tear( back.list().indexOf( this.entity().id() ) )

		}

	}

}
