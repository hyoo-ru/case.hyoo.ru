namespace $.$$ {
	export class $hyoo_case_property_snippet extends $.$hyoo_case_property_snippet {

		title() {
			switch( this.property().kind().entity_kind_id() ) {
				case 'property_link': return this.property().links().length.toString()
				default: return this.text()
			}
		}

		hint() {
			return this.property().kind().entity_name( this.$.$mol_locale.lang() )
		}

		// Content() {
		// 	if( this.editable() ) {
		// 		switch( this.property().scheme().type() ) {
		// 			case "string": return this.String()
		// 			case "text": return this.Text()
		// 			case "integer": return this.Numb()
		// 			case "float": return this.Numb()
		// 			default: return this.Text()
		// 		}
		// 	} else {
		// 		switch( this.property().scheme().type() ) {
		// 			case "link": return this.Link_view()
		// 			default: return this.Text_view()
		// 		}
		// 	}
		// }

		text( next? : string ) {
			return this.property().locale( $mol_locale.lang() , next )
		}

		// numb( next? : number ) {
		// 	return this.property().data( next ) ?? 0
		// }

		// link_title() {
		// 	return String(this.property().domain().registry( this.property().scheme().target().id() ).entity( String( this.property().data() ) ).property('mn').data() )
		// 	// return this.property().data()
		// }

		// link_arg() {
		// 	return { [ this.property().scheme().target().id() ]: this.property().data() }
		// }

	}
}
