namespace $.$$ {
	export class $hyoo_case_property_row extends $.$hyoo_case_property_row {

		scheme() {
			return this.property().scheme()
		}

		title() {
			return this.property().scheme().name( $mol_locale.lang() )
		}

		@ $mol_mem
		type() {
			return this.property().scheme().type()
		}

		@ $mol_mem
		label() {
			return [
				this.Title(),
				... this.type() === 'link' && this.editable() && this.pick_options().length ? [ this.Pick() ] : [],
				... this.type() === 'link' ? [ this.Add() ] : [],
			]
		}
		
		@ $mol_mem
		content() {
			if( this.editable() ) {
				switch( this.type() ) {
				}
			}
			switch( this.type() ) {
				case "string": return [ this.editable() ? this.String() : this.Text_view() ]
				case "text": return [ this.editable() ? this.Text() : this.Text_view() ]
				case "integer": return [ this.editable() ? this.Numb() : this.Text_view() ]
				case "float": return [ this.editable() ? this.Numb() : this.Text_view() ]
				case "boolean": return [ this.Bool() ]
				case "link": return this.property().links().map( ( _, i )=> this.Link_view( i ) )
				default: return [ this.editable() ? this.String() : this.Text_view() ]
			}
		}

		link_content( id: number ) {
			return [
				this.Link_snippet( id ),
				... this.editable() ? [ this.Drop( id ) ] : [],
			]
		}

		text( next? : string ) {
			return this.property().locale( $mol_locale.lang() , next )
		}

		numb( next? : number ) {
			return this.property().data( next ) ?? 0
		}

		bool( next? : boolean ) {
			return this.property().data( next ) === true
		}

		@ $mol_mem_key
		link_arg( index: number ) {

			return this.$.$hyoo_case_route_arg(
				this.property().entity(),
				this.property().links()[ index ]
			)

		}

		link_entity( index: number ) {
			return this.property().links()[ index ]
		}

		drop( index: number, event?: Event ) {
			event?.preventDefault()
			return this.property().target_tear( index )
		}

		add() {
			const prop = this.property()
			const target = prop.target_new()
			this.$.$hyoo_case_route_go( prop.entity(), target, true )
		}

		pick_options() {

			const exists = new Set( this.property().links() )
			const options = [] as string[]
			
			for( const scheme of this.property().scheme().target() ) {

				for( const inst of scheme.instance_all() ) {
					if( exists.has( inst ) ) continue
					options.push( inst.id() )
				}
			}

			return options
		}

		entity( id: string ) {
			return this.property().domain().entity( id )
		}

		pick( id: string ) {
			if( id ) {
				this.property().target_join([ this.entity( id ) ])
			}
			return ''
		}

	}
}
