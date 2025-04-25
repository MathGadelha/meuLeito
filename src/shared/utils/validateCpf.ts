function verifyCPF(cpf: string) {
	cpf = cpf.replace(/[^\d]/g, '');
  
	if (cpf.length !== 11) return false;
  
	if (/^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/.test(cpf)) {
		return false;
	}
  
	let add = 0;
	for (let i = 0; i < 9; i++) {
		add += Number(cpf.charAt(i)) * (10 - i);
	}
	let rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== Number(cpf.charAt(9))) return false;
  
	add = 0;
	for (let i = 0; i < 10; i++) {
		add += Number(cpf.charAt(i)) * (11 - i);
	}
	rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== Number(cpf.charAt(10))) return false;
  
	return true;
}
  

export { verifyCPF }