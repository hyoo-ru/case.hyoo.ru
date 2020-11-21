namespace $.$$ {
	export class $hyoo_case_property_row extends $.$hyoo_case_property_row {

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
				this.title(),
				... [ 'link_set', 'link_list' ].includes( this.type() ) ? [ this.Add() ] : [],
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
				case "link": return [ this.Link_view( 0 ) ]
				case "link_set": return this.property().list().map( ( _, i )=> this.Link_view( i ) )
				case "link_list": return this.property().list().map( ( _, i )=> this.Link_view( i ) )
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

		@ $mol_mem_key
		link_arg( index: number ) {

			return this.$.$hyoo_case_route_arg(
				this.property().entity(),
				this.property().target( index )
			)

		}

		link_entity( index: number ) {
			return this.property().target( index )
		}

		drop( index: number, event?: Event ) {
			event?.preventDefault()
			return this.property().tear( index )
		}

		add() {
			const prop = this.property()
			const target = prop.populate()
			this.$.$hyoo_case_route_go( prop.entity(), target )
		}

	}
}
