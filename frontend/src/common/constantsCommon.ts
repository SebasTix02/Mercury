export const CustomColors = {
    WHITE: 'white',
    PRIMARY: '#0096FF',
    SUCCESS: '#3CB371',
    DANGEROUS: '#D70040',
}

export const verifyIdNumber = (rule:any, value:any, callback:any) => {
    const cedula = value;
    let sum = 0;
    let dig02 = parseInt(cedula.substring(0, 2), 10);
    let dig3 = parseInt(cedula.charAt(2), 10);
    let ultDigOri = parseInt(cedula.charAt(9), 10);
    let aux, ultDigito;

    if (cedula.length === 10) {
        for (let i = 0; i < 9; i++) {
            if (i % 2 === 0) {
                aux = 2 * parseInt(cedula.charAt(i), 10);
            } else {
                aux = parseInt(cedula.charAt(i), 10);
            }

            sum += aux;

            if (aux >= 10) {
                sum -= 9;
            }
        }

        ultDigito = 10 - (sum % 10);
        
        if (
            (dig02 >= 0 && dig02 <= 24) &&
            (dig3 < 6) &&
            (parseInt(cedula.charAt(9), 10) === ultDigito) ||
            (ultDigito == 10 && ultDigOri == 0)
        ) {
            callback();
        } else {
            callback('¡La cédula ingresada no es válida!');
        }
    } else {
        callback('¡La cédula debe tener 10 dígitos!');
    }
};