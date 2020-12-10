namespace $.$$ {
	export class $hyoo_case_property_snippet extends $.$hyoo_case_property_snippet {

		@ $mol_mem
		type() {
			return this.property().kind().property_kind_id()
		}

		@ $mol_mem
		title() {
			switch( this.type() ) {
				case 'property_link': {
					const links = this.property().links()
					if( links.length === 0 ) return ''
					return links.length.toString()
				}
				default: return this.property().text() || '…'
			}
		}

		hint() {
			return this.property().kind().title()
		}

		max_width() {
			let max = this.property().kind().property_max()
			if( this.type() === 'property_integer' ) {
				max = Math.ceil( Math.log10( max ) )
			}
			return max + 'rem'
		}

	}
}
