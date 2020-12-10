namespace $.$$ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_case_entity_page, {

		Config: {
			padding: 0,
			flex: {
				grow: 1,
			},
		},

		Snippet: {
			textShadow: '0 0',
		},
		
		flex: {
			basis: rem(30),
		},

		Property_list: {
			padding: $mol_gap.block,
		},

		Property: {
			padding: rem(.25),
		},

	} )

}
