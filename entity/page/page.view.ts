namespace $.$$ {
	export class $hyoo_case_entity_page extends $.$hyoo_case_entity_page {
		
		@ $mol_mem
		head() {
			return [
				... this.kind() ? [ this.Config() ] : [],
				this.Snippet(),
				this.Tools(),
			]
		}

		@ $mol_mem
		kind() {
			return this.entity().meta_kind()[0] ?? null
		}
		
		@ $mol_mem_key
		property( id: string ) {
			return this.entity().property( id )
		}

		@ $mol_mem
		config_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				this.kind(),
				true,
			)
		}

		@ $mol_mem
		close_arg() {
			return this.$.$hyoo_case_route_arg(
				this.entity(),
				null,
			)
		}

		@ $mol_mem
		theme() {
			return this.editable() ? '$hyoo_case_scheme' : null
		}

	}
}
