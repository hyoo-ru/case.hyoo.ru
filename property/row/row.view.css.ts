namespace $.$$ {

	const { rem, per, px } = $mol_style_unit

	$mol_style_define( $hyoo_case_property_row, {

		alignItems: 'flex-start',
		maxWidth: rem(60),
		flex: {
			wrap: 'wrap',
		},

		'@': {
			hyoo_case_property_row_size: {
				large: {
					padding: rem(.75),
				},
				small: {
					padding: [ 0, rem(.75) ],
				},
			},
		},

		Numb: {
			margin: [ 0, rem(.75) ],
			flex: {
				grow: 1,
			},
		},

		Link_form: {
			padding: $mol_gap.block
		},

		Link_link: {
			padding: 0,
			flex: {
				grow: 1,
			},
		},

		Content: {
			flex: {
				direction: 'column',
				grow: 1,
				basis: per(100),
			},
		},

		Expand: {
			margin: [ 0, rem(-1.25) ],
			zIndex: 1,
		},

		Title: {
			padding: 0,
			flex: {
				grow: 0,
			},
			color: $mol_theme.shade,
		},

		Add_option: {
			padding: 0,
		},

		Add_option_snippet: {
			flex: {
				wrap: 'nowrap',
			},
		},

		Pick: {
			flex: {
				grow: 1000,
			},
			width: rem(8),
			margin: [ 0, rem(.75) ],
		},

		Link_drop:{
			'@': {
				mol_drop_status: {
					drag: {
						boxShadow: `0 -1px 0 0px ${ $mol_theme.focus }`,
					},
				},
			},
		},

	} )

}
