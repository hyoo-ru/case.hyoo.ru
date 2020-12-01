namespace $.$$ {
	export class $hyoo_case_property_row extends $.$hyoo_case_property_row {

		kind() {
			return this.property().kind()
		}

		title() {
			return this.property().kind().title( $mol_locale.lang() )
		}

		@ $mol_mem
		type() {
			return this.property().kind().property_kind_id()
		}

		@ $mol_mem
		title_arg() {
			return this.$.$hyoo_case_route_arg(
				this.property().entity(),
				this.property().kind(),
			)
		}

		@ $mol_mem
		sub() {
			return [
				this.Title(),
				... this.add_allowed() ? [ this.Add() ] : [],
				... this.pick_allowed() ? [ this.Pick() ] : [],
				... this.type() === 'property_boolean' ? [ this.Bool() ] : [],
				... this.type() === 'property_integer' ? [ this.editable() ? this.Numb() : this.Numb_view() ] : [],
				... this.content().length ? [ this.Content() ] : [],
			]
		}

		suggest() {
			return this.property().kind().property_suggest()
		}

		populate() {
			return this.property().kind().property_populate()
		}

		@ $mol_mem
		pick_allowed() {
			if( !this.editable() ) return false
			if( this.type() !== 'property_link' ) return false
			if( !this.suggest() ) return false
			if( this.pick_options().length === 0 ) return false
			return true
		}
		
		@ $mol_mem
		add_allowed() {
			if( this.type() !== 'property_link' ) return false
			if( !this.populate() ) return false
			return true
		}
		
		@ $mol_mem
		content() {
			if( this.editable() ) {
				switch( this.type() ) {
				}
			}
			switch( this.type() ) {
				case "property_string": return [ this.editable() ? this.String() : this.Text_view() ]
				case "property_text": return [ this.editable() ? this.Text() : this.Text_view() ]
				case "property_link": return this.property().links().map( ( _, i )=> this.Link_view( i ) )
				default: return []
			}
		}

		link_content( id: number ) {
			return [
				this.Link_snippet( id ),
				... this.editable() ? [ this.Drop( id ) ] : [],
			]
		}

		text( next? : string ) {
			return this.property().text( $mol_locale.lang() , next )
		}

		numb( next? : number ) {
			return this.property().integer( next )
		}

		bool( next? : boolean ) {
			return this.property().bool( next )
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
			
			for( const scheme of this.property().kind().property_target() ) {

				for( const inst of scheme.members() ) {
					if( exists.has( inst ) ) continue
					options.push( inst.id() )
				}
			}

			return options
		}

		pick_option_title( id: string ) {
			return this.property().domain().entity( id ).title( $mol_locale.lang() )
		}

		entity( id: string ) {
			return this.property().domain().entity( id )
		}

		pick( id: string ) {
			if( id ) {
				this.property().target_join( this.entity( id ) )
			}
			return ''
		}

	}
}
