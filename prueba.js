//Inputs
 
let contratos = [
	{
		"saldoContrato": 1117456.83,
		"contratoBase": "148678",
		"contratos": [
			{
				"idContrato": "148679",
				"descripcion": "INVERSION POCHA",
				"saldo": 1115213.43,
				"indImagen": 1,
				"tipoServicio": "Asesoría",
			},
			{
				"idContrato": "148678",
				"descripcion": "Disponibilidad",
				"saldo": 2243.4,
				"indImagen": 1,
				"tipoServicio": "Asesoría"
			}
		]
	},
	{
		"saldoContrato": 1117456.83,
		"contratoBase": "149610",
		"contratos": [
			{
				"idContrato": "149611",
				"descripcion": "INVERSION SARA",
				"saldo": null,
				"indImagen": 1,
				"tipoServicio": "Asesoría"
			},
			{
				"idContrato": "149610",
				"descripcion": "Disponibilidad",
				"saldo": null,
				"indImagen": 1,
				"tipoServicio": "Asesoría"
			}
		]
	}
];


let contratos_complementarios =  [
	{
		"contratoBase": "148678",
		"metasContrato": [
			{
				"idContrato": "148678",
				"conMeta": false,
				"saldoMeta": 0,
				"porcentajeMeta": 0,
				"saldoAlDia": 0,
				"saldoRestante": 0
			},
			{
				"idContrato": "148679",
				"conMeta": true,
				"saldoMeta": 115927,
				"porcentajeMeta": 962,
				"saldoAlDia": 1115213.43,
				"saldoRestante": 0
			}
		]
	},
	{
		"contratoBase": "149610",
		"metasContrato": [
			{
				"idContrato": "149610",
				"conMeta": false,
				"saldoMeta": 0,
				"porcentajeMeta": 0,
				"saldoAlDia": 0,
				"saldoRestante": 0
			},
			{
				"idContrato": "149611",
				"conMeta": true,
				"saldoMeta": 3130040,
				"porcentajeMeta": 170.38,
				"saldoAlDia": 5333088.34,
				"saldoRestante": 0
			}
		]
	}
]

//Output

const final = [
	{
		"saldoContrato": 1117456.83,
		"contratoBase": "148678",
		"contratos": [
			{
				"idContrato": "148679",
				"descripcion": "INVERSION POCHA",
				"saldo": 1115213.43,
				"indImagen": 1,
				"tipoServicio": "Asesoría",
				"conMeta": true,
				"saldoMeta": 115927,
				"porcentajeMeta": 962,
				"saldoAlDia": 1115213.43,
				"saldoRestante": 0
			},
			{
				"idContrato": "148678",
				"descripcion": "Disponibilidad",
				"saldo": 2243.4,
				"indImagen": 1,
				"tipoServicio": "Asesoría",
				"conMeta": false,
				"saldoMeta": 0,
				"porcentajeMeta": 0,
				"saldoAlDia": 0,
				"saldoRestante": 0
			}
		]
	},
	{
		"saldoContrato": 1117456.83,
		"contratoBase": "149610",
		"contratos": [
			{
				"idContrato": "149611",
				"descripcion": "INVERSION SARA",
				"saldo": null,
				"indImagen": 1,
				"tipoServicio": "Asesoría",
				"conMeta": true,
				"saldoMeta": 3130040,
				"porcentajeMeta": 170.38,
				"saldoAlDia": 5333088.34,
				"saldoRestante": 0
			},
			{
				"idContrato": "149610",
				"descripcion": "Disponibilidad",
				"saldo": null,
				"indImagen": 1,
				"tipoServicio": "Asesoría",
				"conMeta": false,
				"saldoMeta": 0,
				"porcentajeMeta": 0,
				"saldoAlDia": 0,
				"saldoRestante": 0
			}
		]
	}
];

// Se hace la mezcla de los arrays
function merge(contratos, contratos_complementarios, key1, key2, key3) {
	let result = [];
	contratos = contratos.map(contrato => {
		contratos_complementarios.forEach(contrato_compl => {
			if(contrato[key1] === contrato_compl[key1] ) {
					if (key2){
						contrato[key2] = merge(contrato[key2], contrato_compl[key2], key3)
					}
					result = result.concat({...contrato, ...contrato_compl})
			}
		})
		return contrato
	})
	return !key2 ? result : contratos
}


// Se cambia la key para mayor facilidad en el manejo
contratos_complementarios.map(comp => {
	comp['contratos'] = comp['metasContrato'] 
	delete comp['metasContrato']
	return comp
})


const output = merge(contratos, contratos_complementarios, 'contratoBase', 'contratos', 'idContrato')
console.log(JSON.stringify(output, null, 4));