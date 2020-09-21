namespace $ {
	$mol_test({
		'done'() {
			$mol_ambient({}).$mol_log3_done({
				place : '$hyoo_api:test' ,
				message : 'All tests passes' ,
			})
			process.exit(0)
		}
	})
}
