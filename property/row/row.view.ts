namespace $.$$ {
	export class $hyoo_case_property_row extends $.$hyoo_case_property_row {

		kind() {
			return this.property().kind()
		}

		title() {
			return this.property().kind().title()
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
				true,
			)
		}

		@ $mol_mem
		sub() {
			return [
				... this.expand_allowed() ? [ this.Expand() ] : [],
				... this.title_need() ? [ this.Title() ] : [],
				... this.add_allowed() ? [ this.Add() ] : [],
				... this.pick_allowed() ? [ this.Pick() ] : [],
				... this.type() === 'boolean' ? [ this.Bool() ] : [],
				... this.type() === 'integer' ? [ this.Numb() ] : [],
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
		title_need() {
			if( this.editable() ) return true
			//if( this.type() === 'text' ) return false
			if( this.add_allowed() ) return true
			if( this.type() === 'link' ) {
				if( !this.embed() ) {
					if( this.property().links().length === 1 ) {
						return false
					}
				}
			}
			return true
		}

		size() {
			return this.title_need() ? 'large' : 'small'
		}

		@ $mol_mem
		expand_allowed() {
			if( this.type() !== 'link' ) return false
			if( this.property().links().length < 2 ) return false
			return true
		}

		@ $mol_mem
		expanded( next?: boolean ) {
			if( !this.expand_allowed() ) return true
			const key = `$hyoo_case_property_row:expanded:${ this.property().entity().id() }:${ this.property().id() }`
			return this.$.$mol_state_session.value( key, next ) ?? true
		}

		@ $mol_mem
		pick_allowed() {
			if( this.type() !== 'link' ) return false

			const max = this.property().kind().property_max()
			if( max > 1 ) {
				if( this.property().links().length >= max ) return false
			}

			if( !this.suggest() ) return false
			if( this.pick_options().length === 0 ) return false

			
			if( !this.title_need() ) {
				return false
			}

			return true
		}
		
		@ $mol_mem
		add_allowed() {
			if( this.type() !== 'link' ) return false
			if( this.property().links().length >= this.property().kind().property_max() ) return false
			if( !this.populate() ) return false
			return true
		}


		@ $mol_mem
		drop_allowed() {
			if( !this.editable() ) return false
			if( this.type() !== 'link' ) return false
			if( this.property().links().length <= this.property().kind().property_min() ) return false
			return true
		}
		
		@ $mol_mem
		content() {
			switch( this.type() ) {
				
				case "text":
					return [ this.Text() ]
				
				case "link":
					if( !this.expanded() ) return []
					return this.property().links().map( ( _, i )=> this.Link_row( i ) )
				
				default: return []
			}
		}

		@ $mol_mem_key
		Link_view( id: number ) {
			return  this.embed() ? this.Link_form( id ) : this.Link_link( id )
		}

		link_content( id: number ) {
			return [
				this.Link_drag( id ),
				... this.drop_allowed() ? [ this.Drop( id ) ] : [],
			]
		}

		embed() {
			return this.property().kind().property_embed()
		}

		length_max() {
			return this.property().kind().property_max()
		}

		text( next? : string ) {
			return this.property().text( next )
		}

		text_hint() {
			return this.property().kind().title() + super.text_hint()
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

		add_one( event: Event ) {
			const options = this.property().kind().property_target()
			if( options.length > 1 ) return
			this.add( options[0]?.id() ?? this.property().entity().id() )
			this.add_show( false )
			event.preventDefault()
		}

		add( kind: string ) {
			const prop = this.property()
			const kinds = prop.id() === 'meta-kind' ? [] : [ prop.domain().entity( kind ) ]
			const target = prop.domain().entity_new( ... kinds )
			prop.target_join( target )
			if( !this.embed() ) {
				this.$.$hyoo_case_route_go( prop.entity(), target, true )
			}
			this.add_show( false )
		}

		@ $mol_mem
		add_options() {
			return this.property().kind().property_target().map( kind => this.Add_option( kind.id() ) )
		}

		pick_options() {

			const exists = new Set( this.property().links() )
			const options = [] as string[]
			
			for( const kind of this.property().kind().property_target() ) {

				for( const inst of kind.members() ) {
					if( exists.has( inst ) ) continue
					options.push( inst.id() )
				}
			}

			return options
		}

		pick_option_title( id: string ) {
			return this.property().domain().entity( id ).title()
		}

		entity( id: string ) {
			return this.property().domain().entity( id )
		}

		pick( id: string ) {

			if( id ) {
				
				if( this.property().kind().property_max() === 1 ) {
					this.property().target_tear_all()
				}
				
				this.property().target_join( this.entity( id ) )
			}
			
			return ''

		}

		link_title( index: string ) {
			const target = this.property().links()[ index ]
			return `#${ target.id() }`
		}
		
		link_html( index: string ) {
			const target = this.property().links()[ index ]
			return `#${ target.id() }`
		}
		
		link_uri( index: string ) {
			const target = this.property().links()[ index ]
			return this.$.$mol_state_arg.make_link({ [ target.id() ]: '' })
		}
		
		transfer_adopt( transfer : DataTransfer ) {

			const id = transfer.getData( "text/uri-list" ).replace( /^.*#/, '' )
			if( !id ) return

			const target = this.property().domain().entity( id )
			
			const kind = target.meta_kind()
			if( kind.length === 0 ) return
			if( !this.property().kind().property_target().includes( kind[0] ) ) return

			return target

		}

		receive_before( anchor: number, target : $hyoo_case_entity ) {
			const prop = this.property()
			let links = [ ... prop.links() ]
			let index = links.indexOf( target )
			if( index >=0 ) {
				links.splice( index, 1 )
				if( index < anchor ) --anchor
			}
			links.splice( anchor, 0, target )
			prop.links( links )
		}

	}
}
