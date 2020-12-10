namespace $.$$ {

	const { rem, per, px } = $mol_style_unit

	$mol_style_define( $hyoo_case_property_row, {

		alignItems: 'flex-start',
		flex: {
			wrap: 'wrap',
		},

		$mol_string: {
			background: {
				color: 'transparent',
			},
			box: {
				shadow: 'none',
			},
			':hover': {
				background: {
					color: $mol_theme.hover,
				},
			},
			':focus': {
				background: {
					color: $mol_theme.field,
				},
				box: {
					shadow: [
						{
							x: 0,
							y: 0,
							blur: 0,
							spread: px(1),
							color: $mol_theme.focus,
						},
					],
				},
			},
		},

		Text_view: {
			padding: $mol_gap.text,
		},

		Numb: {
			margin: [ 0, rem(.75) ],
			flex: {
				grow: 1,
			},
		},

		Numb_view: {
			padding: $mol_gap.text,
		},

		Link_view: {
			padding: 0,
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
			opacity: .75,
			flex: {
				grow: 0,
			},
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
