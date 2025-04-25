export function cpfMask(value: string) {
	value = value.replace(/\D/g, "");
	value = value.replace(/(\d{3})(\d)/, "$1.$2");
	value = value.replace(/(\d{3})(\d)/, "$1.$2");
	value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
	return value;
}

export function cnpjMask(value: string) {
	value = value.replace(/\D/g, "");
	value = value.replace(/^(\d{2})(\d)/, "$1.$2");
	value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
	value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
	value = value.replace(/(\d{4})(\d)/, "$1-$2");

	return value;
}

type MaskProps = {
	[key: string]: {
		placeholder: string;
		maxLength?: number;
		function: (value: string) => void;
	}
}

const maskProps: MaskProps = {
	"cpf": {
		placeholder: "___.___.___-__",
		maxLength: 14,
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			value = value.replace(/(\d{3})(\d)/, "$1.$2");
			value = value.replace(/(\d{3})(\d)/, "$1.$2");
			value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
			return value;
		}
	},
	"cnpj": {
		placeholder: "__.___.___/___-__",
		maxLength: 18,
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			value = value.replace(/^(\d{2})(\d)/, "$1.$2");
			value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
			value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
			value = value.replace(/(\d{4})(\d)/, "$1-$2");

			return value;
		}
	},
	"phone": {
		placeholder: "(__) _____-____",
		maxLength: 15,
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			value = value.replace(/(\d{2})(\d)/, "($1) $2");
			value = value.replace(/(\d{5})(\d)/, "$1-$2");
			value = value.replace(/(\d{4})(\d{4})\d+?$/, "$1-$2");
			return value;
		}
	},
	"date": {
		placeholder: "__/__/____",
		maxLength: 10,
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			value = value.replace(/(\d{2})(\d)/, "$1/$2");
			value = value.replace(/(\d{2})(\d)/, "$1/$2");
			value = value.replace(/(\d{4})\d+?$/, "$1");
			return value;
		}
	},
	"currency": {
		placeholder: "R$ 000.00",
		maxLength: 6,
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			value = value.replace(/(\d)(\d{2})$/, "$1.$2");
			value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
			return value;
		}
	},
	"HH:MM": {
		placeholder: "00:00",
		maxLength: 5,
		function: (value: string) => {
			return value.replace(/\b(\d{2})(\d{2})/, (_, hh, mm) => {
				const hour = `${Math.min(hh, 23)}`.padStart(2, '0')
				const min = `${Math.min(mm, 59)}`.padStart(2, '0')
				return `${hour}:${min}`
			})
		}
	},
	"MM": {
		placeholder: "00min",
		maxLength: 2,
		function: (value: string) => {
			return value.replace(/\b(\d{2})/, (_, mm) => {
				const min = `${Math.min(mm, 60)}`.padStart(2, '0')
				return `${min}`
			})
		}
	},
	"number": {
		placeholder: "0",
		function: (value: string) => {
			value = value.replace(/\D/g, "");
			return value
		}
	},
}

export { maskProps }
