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

		@ $mol_mem
		root() {
			if( this.$.$mol_state_arg.value( 'case' ) === null ) {
				new this.$.$mol_after_tick( ()=> {
					this.$.$mol_state_arg.value( 'case', 'edit' )
				} )
			}
			return this.entity( 'case' )
		}

		lang() {
			return this.root().property( 'case-language' ).links()[0]?.id() ?? 'en'
		}

		Placeholder() {
			
			const home = this.$.$mol_state_arg.make_link({
				[ this.root().id() ]: 'edit'
			})
			
			return this.$.$mol_state_arg.href() === home ? super.Placeholder() : null!

		}

		pages() {
			const params = this.$.$mol_state_arg.dict()
			return [
				this.Root_page( this.root().id() ),
				... Object.keys( params )
				.filter( key => key !== 'case' )
				.map(
					id => this.Entity_page( id ),
				)
			]
		}

		@ $mol_mem
		upstream() {
			const store = new this.$.$mol_store_socket
			store.base = ()=> 'ws://graph.hyoo.ru/'
			return store
		}

		@ $mol_mem
		domain(): $hyoo_case_domain {
			
			// return this.$.$mol_store_local.sub( '$hyoo_case' , super.domain() )

			this.upstream().active()

			const domain = super.domain()
			domain.value = ( key, next )=> null
				?? this.upstream().value( key, next )
				?? domain.data_default![ key ]
				?? {}

			return domain
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
