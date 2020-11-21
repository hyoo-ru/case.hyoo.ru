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
		scheme() { return this.domain().entity( this.id() ) }

		filled() {
			return this.data() != null
		}

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

		list( next?: $hyoo_case_entity[] ): $hyoo_case_entity[] {
			const domain = this.domain()
			const arg = next === undefined ? undefined : next.map( item => item.id() )
			return ( ( this.data( arg ) as any ?? [] ) as string[] ).map( id => domain.entity( id ) )
		}

		target( index: number ) {
			return this.domain().entity( this.item( index ) )
		}

		back( index: number ) {
			return this.target( index ).property( this.scheme().back() )
		}

		target_new() {
			const target = this.scheme().target().instance_new()
			this.target_join( target )
			return target
		}

		target_join( target: $hyoo_case_entity ) {
			this.list([ ... this.list(), target ])
			const back = target.property( this.scheme().back() )
			back.list([ ... back.list(), this.entity() ])
		}

		target_tear( index: number ) {
			
			if( index < 0 ) return

			const back = this.back( index )
			
			const list = this.list().slice()
			list.splice( index, 1 )
			this.list( list )

			back.target_tear( back.list().indexOf( this.entity() ) )

		}

	}

}
