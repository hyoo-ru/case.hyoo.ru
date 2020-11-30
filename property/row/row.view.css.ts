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

		Title: {
			padding: 0,
			color: $mol_theme.shade,
			flex: {
				grow: 0,
			},
		},

	} )

}
