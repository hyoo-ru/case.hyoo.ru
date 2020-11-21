namespace $ {

	export class $hyoo_case_entity extends $mol_store<
		Record< string,
			ReturnType< $hyoo_case_property['data'] >
		>
	> {

		id() { return '' }
		domain() { return undefined as any as $hyoo_case_domain }

		scheme() { return this.property( 'scheme' ).target( 0 ) }

		@ $mol_mem_key
		property( id: string ) {

			const store = new $hyoo_case_property
			
			store.id = $mol_const( id )
			store.entity = $mol_const( this )
			
			return this.sub( id , store )
		}

		@ $mol_mem
		property_list() {
			return Object.keys( this.data() )
		}

		name( lang: string ): string {
			const name = this.value( 'name' )
			if( name === undefined ) return this.target().name( lang )
			return String( name[ lang ] )
		}

		target() {
			return this.domain().entity( String( this.value( 'target' ) ) )
		}

		color() {
			return String( this.value( 'color' ) )
		}

		type() {
			return String( this.value( 'type' ) ) as 'type' | 'string' | 'text' | 'integer' | 'float' | 'boolean' | 'duration' | 'color' | 'link' | ''
		}

		locale() {
			return Boolean( this.value( 'locale' ) )
		}

		suggest() {
			return Boolean( this.value( 'suggest' ) )
		}

		main() {
			return Boolean( this.value( 'main' ) )
		}

		unit() {
			return String( this.value( 'unit' ) )
		}

		back() {
			return String( this.value( 'back' ) )
		}

		@ $mol_mem
		property_all() {
			const domain = this.domain()
			return ( this.value( 'properties' ) as string[] ?? [] ).map( id => domain.entity( id ) )
		}

		@ $mol_mem
		instance_all() {
			const domain = this.domain()
			return ( this.value( 'instances' ) as string[] ?? [] ).map( id => domain.entity( id ) )
		}
		
		instance_new() {
			const inst = this.domain().entity_new()
			this.property( 'instances' ).target_join( inst )
			return inst
		}

		property_main() {
			return this.property_all().filter( prop => prop.main() )
		}

	}

}
