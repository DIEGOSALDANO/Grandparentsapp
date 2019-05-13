const fs = require('fs');
const path = require('path');

module.exports.getDescription = function(id, success) {

    if (isNaN(id)) {
        success("Código inválido");
    } else {
        fs.readFile(path.join(__dirname, 'pacientes.json'), (err, data) => {
            let pacientesList = JSON.parse(data);
            let pacientes = pacientesList.find(pacientes => pacientes.id == id);

            console.log(pacientes);

            if (pacientes !== undefined) {
                success(pacientes.description);
            } else {
                success("producto no encontrado");
            }
        });
    }

}