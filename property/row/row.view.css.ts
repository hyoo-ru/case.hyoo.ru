namespace $.$$ {

	const { rem } = $mol_style_unit

	$mol_style_define( $hyoo_case_property_row, {

		Text_view: {
			padding: $mol_gap.text,
		},

		Link_view: {
			padding: 0,
		},

		Content: {
			flex: {
				direction: 'column',
			},
		},

		Add: {
			margin: rem(-.5),
			position: 'relative',
			bottom: rem(.5),
		},

	} )

}
