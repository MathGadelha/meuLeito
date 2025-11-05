const permissionsByModule = {
    GESTOR: ['gestor', 'admin'],
    SUPERVISORENFERMEIRO: ['supervisor de enfermagem', 'admin', 'gestor'],
    ENFERMEIRO: ['enfermeira', 'admin', 'supervisor de enfermagem'],
    ADMIN: ['admin'],
};

export { permissionsByModule }; 8