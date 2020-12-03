namespace $.$$ {
	export class $hyoo_case extends $.$hyoo_case {

		@ $mol_memo.field
		get $() {

			const $$ = super.$
			const lang = ()=> this.lang()
			
			return $$.$mol_ambient({
				$mol_locale: class extends $$.$mol_locale {
					static lang() { return lang() }
				}
			})
			
		}

		lang() {
			return this.domain().entity( 'case' ).property( 'case-language' ).links()[0]?.id() ?? 'en'
		}

		Placeholder() {
			return /#/.test( this.$.$mol_state_arg.href() ) ? null! : super.Placeholder()
		}

		pages() {
			const params = this.$.$mol_state_arg.dict()
			return [
				this.Root_page( 'case' ),
				... Object.keys( params )
				.filter( key => key !== 'case' )
				.map(
					id => this.Entity_page( id ),
				)
			]
		}

		@ $mol_mem
		domain(): $hyoo_case_domain {
			return this.$.$mol_store_local.sub( '$hyoo_case' , super.domain() )
		}

		entity( id: string ) {
			return this.domain().entity( id )
		}

		editable( id: string, next?: boolean ) {
			const arg = next === undefined ? undefined : next ? 'edit' : '' 
			return this.$.$mol_state_arg.value( id, arg ) === 'edit'
		}

		reset() {
			this.domain().reset()
			this.$.$mol_state_arg.dict({})
		}

	}
}
