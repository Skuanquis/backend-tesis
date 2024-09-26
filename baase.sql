--tabla para la gestion de usuarios
CREATE TABLE usuario (
  id_usuario int(11) NOT NULL,
  username varchar(124) NOT NULL,
  password varchar(512) DEFAULT NULL,
  paterno varchar(124) DEFAULT NULL,
  materno varchar(124) DEFAULT NULL,
  nombre varchar(124) DEFAULT NULL,
  fecha_nacimiento date DEFAULT NULL,
  estado varchar(15) NOT NULL DEFAULT 'activo',
  id_rol int(11) NOT NULL
) 
--tabla para la gestion de roles (administrador, medico, estudiante)
CREATE TABLE rol (
  id_rol int(11) NOT NULL,
  name varchar(50) DEFAULT NULL
)

--tabla para la informacion basica del paciente a ser simulado en este caso para el prototipo seran 3 pacientes
CREATE TABLE paciente (
	id_paciente INT NOT NULL PRIMARY KEY,
	paterno VARCHAR(50),
	materno VARCHAR(50),
	nombre VARCHAR(50),
	edad INT,
    peso DECIMAL(5,2),
    talla DECIMAL(4,2),
	fecha_nacimiento DATE,
	sexo VARCHAR(10)
);

--tabla para gestionar la hsitoria clinica asociada a paciente 
CREATE TABLE historia_clinica (
    id_historia_clinica INT NOT NULL PRIMARY KEY,
    descripcion TEXT,
    historia_enfermedad_actual TEXT,
    id_paciente INT,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);

--tabla para gestionar los datos ginecobstetricos asociadas a la historia clinica del paciente a simular
CREATE TABLE antecedentes_gineco_obstetricos (
	id_antecedente_gineco_obstetrico INT NOT NULL PRIMARY KEY,
	menarca VARCHAR(10),
	fum DATE,
	fpp DATE,
	gestaciones INT,
	partos INT,
	abortos INT,
	cesarias INT,
	cpn INT,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar los antecedentes patologicos de la historia clinica asociadas al paciente a simular
CREATE TABLE antecedentes_patologicos (
	id_antecedente_patologico INT NOT NULL PRIMARY KEY,
    alergias VARCHAR(255),
	cirugias VARCHAR(255),
    id_historia_clinica INT,
    enfermedades_congenitas VARCHAR(100),
    enfermedades_infancia VARCHAR(100),
    enfermedades_adolescencia VARCHAR(100),
    enfermedades_adulto VARCHAR(100),
    traumas VARCHAR(50),
    intoxicaciones VARCHAR(50),
    hospitalizaciones VARCHAR(50),
    enfermedades VARCHAR(50),
    transfusiones VARCHAR(2),
    patologia_asociada TEXT,
    medicacion_en_curso TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar los antecedentes no patologicos de la historia clinica asociadas al paciente a simular
CREATE TABLE antecedentes_no_patologicos(
	id_antecedentes_no_patologicos INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	antecedentes_nacimiento TEXT,
	habitos TEXT,
	factores_de_riesgo TEXT,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar los antecedentes familiares de la historia clinica asociadas al paciente a simular
CREATE TABLE antecedentes_familiares(
	id_antecedentes_familiares INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	padre TEXT,
	madre TEXT,
	hermanos TEXT,
	hijos TEXT,
	conyugue TEXT,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar las anamnesis por sistemas de la historia clinica asociadas al paciente a simular
CREATE TABLE anamnesis_sistemas(
    id_anamnesis_sistemas INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    tegumentario TEXT,
    cardiovascular TEXT,
    gastrointestinal TEXT,
    genitourinario TEXT,
    respiratorio TEXT,
    neurologico TEXT,
    locomotor TEXT,
    endocrino TEXT,
    hematico TEXT,
    psiquiatrico TEXT,
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);



--tabla para gestionar los motivos de consulta de la historia clinica asociadas al paciente a simular
CREATE TABLE motivo_consulta (
	id_motivo_consulta INT NOT NULL PRIMARY KEY,
	motivo VARCHAR(255),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar el examen fisico general de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_fisico_general (
	id_examen_fisico_general INT NOT NULL PRIMARY KEY,
	descripcion VARCHAR(512),
	pa VARCHAR(20),
	fc VARCHAR(10),
	fr VARCHAR(10),
	temperatura VARCHAR(10),
	saturacion VARCHAR(10),
	peso VARCHAR(10),
	talla VARCHAR(10),
	imc VARCHAR(10),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar el examen fisico segmentario de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_fisico_segmentario (
	id_examen_fisico_segmentario INT NOT NULL PRIMARY KEY,
	cabeza VARCHAR(512),
	cuello VARCHAR(512),
	torax VARCHAR(512),
	corazon VARCHAR(512),
	mamas VARCHAR(512),
	abdomen VARCHAR(512),
	genitourinario VARCHAR(512),
	extremidades VARCHAR(512),
	neurologico VARCHAR(512),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar el examen obstetrico de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_obstetrico (
	id_examen_obstetrico INT NOT NULL PRIMARY KEY,
	presentacion VARCHAR(50),
	dorso VARCHAR(50),
	afu VARCHAR(10),
	fcf VARCHAR(10),
	paf VARCHAR(10),
	monitorizacion VARCHAR(50),
	dilatacion VARCHAR(10),
	borramiento VARCHAR(10),
	membranas VARCHAR(50),
	plano VARCHAR(50),
	au VARCHAR(15),
	pelvis VARCHAR(50),
	vp VARCHAR(25),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar el laboratorio de examen de orina de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_orina (
	id_examen_orina INT NOT NULL PRIMARY KEY,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar el examen fisico de orina perteneciente al laboratorio de orina de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_fisico_orina (
	id_examen_fisico_orina INT NOT NULL PRIMARY KEY,
	color VARCHAR(20),
	aspecto VARCHAR(30),
	volumen VARCHAR(15),
	id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

--tabla para gestionar el sedimento urinario de orina perteneciente al laboratorio de orina de la historia clinica asociadas al paciente a simular
CREATE TABLE sedimento_urinario (
	id_sedimento_urinario INT NOT NULL PRIMARY KEY,
	hematies VARCHAR(15),
    leucocitos VARCHAR(15),
    piocitos VARCHAR(15),
    celulas_epiteliales VARCHAR(15),
    celulas_renales VARCHAR(15),
    cilindro_cereo VARCHAR(15),
    cilindros_hialianos VARCHAR(15),
    cilindros_granulosos VARCHAR(15),
    cilindros_leucocitarios VARCHAR(15),
    flora_bacteriana VARCHAR(15),
    cristales VARCHAR(30),
    filamento_mucoso VARCHAR(15),
    hifas VARCHAR(15),
    levaduras VARCHAR(15),
    otros VARCHAR(15), 
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

--tabla para gestionar el examen quimico urinario perteneciente al laboratorio de orina de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_quimico_urinario (
    id_examen_quimico_urinario INT NOT NULL PRIMARY KEY,
    ph VARCHAR(15),
    densidad VARCHAR(15),
    proteinas VARCHAR(15),
    sangre VARCHAR(15),
    glucosa VARCHAR(15),
    cetonas VARCHAR(15),
    urobilinogeno VARCHAR(15),
    bilirrubina VARCHAR(15),
    pigmentos_biliares VARCHAR(15),
    nitritos VARCHAR(15),
    leucocitos VARCHAR(15),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

--tabla para gestionar el examen especial de orina perteneciente al laboratorio de orina de la historia clinica asociadas al paciente a simular
CREATE TABLE examenes_especiales_orina (
    id_examen_especial_orina INT NOT NULL PRIMARY KEY,
    proteurinaria VARCHAR(10),
    creatinuria VARCHAR(10),
    microalbuminuria VARCHAR(10),
    clearence_creatinina VARCHAR(10),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

--tabla para gestionar el laboratorio hematologico de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_hematologico (
    id_examen_hematologico INT NOT NULL PRIMARY KEY,
    grupo_sanguineo VARCHAR(5),
    factor_rh VARCHAR(15),
    observaciones VARCHAR(256),
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar la biometria hematica perteneciente al laboratorio hematologico de la historia clinica asociadas al paciente a simular
CREATE TABLE biometria_hematica (
    id_biometria_hematica INT NOT NULL PRIMARY KEY,
    globulos_rojos VARCHAR(15),
    globulos_blancos VARCHAR(15),
    hemoglobina VARCHAR(15),
    hematocrito VARCHAR(15),
    ves VARCHAR(15),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

--tabla para gestionar el recuenteo diferencial hematico perteneciente al laboratorio hematologico de la historia clinica asociadas al paciente a simular
CREATE TABLE recuento_diferencial_hematico (
    id_recuento_diferencial_hematico INT NOT NULL PRIMARY KEY,
    cayados_relativo VARCHAR(10),
    cayados_absoluto VARCHAR(10),
    linfocitos_relativo VARCHAR(10),
    linfocitos_absoluto VARCHAR(10),
    eosinofilos_relativo VARCHAR(10),
    eosinofilos_absoluto VARCHAR(10),
    basofilos_relativo VARCHAR(10),
    basofilos_absoluto VARCHAR(10),
    segmentados_relativo VARCHAR(10),
    segmentados_absoluto VARCHAR(10),
    monocitos_relativo VARCHAR(10),
    monocitos_absoluto VARCHAR(10),
    recuento_plaquetas VARCHAR(10),
    recuento_reticulos VARCHAR(10),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

--tabla para gestionar los indices eritrocitarios hematicos perteneciente al laboratorio hematologico de la historia clinica asociadas al paciente a simular
CREATE TABLE indices_eritrocitarios_hematico (
    id_indices_eritrocitarios_hematico INT NOT NULL PRIMARY KEY,
    vcm VARCHAR(10),
    hbcm VARCHAR(10),
    chbcm VARCHAR(10),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

--tabla para gestionar el laboratorio sanguineo de la historia clinica asociadas al paciente a simular
CREATE TABLE examen_sanguineo (
    id_examen_sanguineo INT NOT NULL PRIMARY KEY,
    observaciones VARCHAR(256),
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

--tabla para gestionar la quimica sanguinea perteneciente al laboratorio sanguineo de la historia clinica asociadas al paciente a simular
CREATE TABLE quimica_sanguinea (
    id_quimica_sanguinea INT NOT NULL PRIMARY KEY,
    glicemia VARCHAR(10),
    creatinina VARCHAR(10),
    nitrogeno_ureico VARCHAR(10),
    urea VARCHAR(10),
    acido_urico VARCHAR(10),
    bilirrubina_total VARCHAR(10),
    bilirrubina_directa VARCHAR(10),
    bilirrubina_indirecta VARCHAR(10),
    transaminasa_gpt VARCHAR(10),
    transaminasa_got VARCHAR(10),
    lactato_deshidrogenasa VARCHAR(10),
    fosfatasa_alcalina VARCHAR(10),
    proteinas_totales VARCHAR(10),
    albumina VARCHAR(10),
    globulina VARCHAR(10),
    relacion_alb_glo VARCHAR(10),
    colesterol_total VARCHAR(10),
    trigliceridos VARCHAR(10),
    hdl_colesterol VARCHAR(10),
    ldl_colesterol VARCHAR(10),
    vldl_colesterol VARCHAR(10),
    glicemia_rn VARCHAR(10),
    hemoglobina_glicosilada VARCHAR(10),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

--tabla para gestionar la hemostasia sanguinea perteneciente al laboratorio sanguineo de la historia clinica asociadas al paciente a simular
CREATE TABLE hemostasia_sanguinea (
    id_hemostasia_sanguinea INT NOT NULL PRIMARY KEY,
    tiempo_coagulacion VARCHAR(10),
    tiempo_sangria VARCHAR(10),
    tiempo_protrombina VARCHAR(10),
    actividad_protrombinica VARCHAR(10),
    inr VARCHAR(10),
    tiempo_control VARCHAR(10),
    tiempo_tromboplastina_parcial VARCHAR(10),
    dimero_d VARCHAR(10),
    fibrinogeno VARCHAR(10),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
); 

--tabla para gestionar la serologia sanguinea perteneciente al laboratorio sanguineo de la historia clinica asociadas al paciente a simular
CREATE TABLE serologia_sanguinea (
    id_serologia_sanguinea INT NOT NULL PRIMARY KEY,
    proteina_c VARCHAR(10),
    factor_reumatico VARCHAR(10),
    rpr_sifilis VARCHAR(10),
    prueba_sifilis VARCHAR(10),
    prueba_vih_sida VARCHAR(10),
    prueba_hepatitis_b VARCHAR(10),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

--tabla para gestionar los electrolitos sanguineos perteneciente al laboratorio sanguineo de la historia clinica asociadas al paciente a simular
CREATE TABLE electrolitos_sanguineos (
    id_electrolito_sanguineo INT NOT NULL PRIMARY KEY,
    calcio VARCHAR(10),
    sodio VARCHAR(10),
    potasio VARCHAR(10),
    cloro VARCHAR(10),
    fosforo VARCHAR(10),
    magnesio VARCHAR(10),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

-----////////////       x   
--tabla para gestionar las simulaciones que se realicen almacenando datos de usuarios y el caso del paciente como tambien el tiempo y las fecha de inicio y fin    
CREATE TABLE simulacion (
    id_simulacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_paciente INT,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP NULL,
    estado VARCHAR(20), --activo completo cancelado
    tiempo_empleado VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);

--tabla para gestionar las acciones que se realizan en cada simulacion
CREATE TABLE accion_simulacion (
    id_accion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_simulacion INT,
    descripcion TEXT,
    tipo_accion VARCHAR(20), 
    accion_time TIMESTAMP,
    FOREIGN KEY (id_simulacion) REFERENCES simulacion(id_simulacion)c 
);

--tabla para gestionar los tipos de puntuacion que existiran (aun no tengo esta tabla bien definida por carencia de ideas)
CREATE TABLE categoria_decision (
    id_categoria_decision INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(25),
    puntos INT
);


--NUEVAS TABLAS 

CREATE TABLE examen_via_aerea (
    id_examen_via_aerea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_respiratorio (
    id_examen_respiratorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_circulatorio (
    id_examen_circulatorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_piel (
    id_examen_piel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_psicologico (
    id_examen_psicologico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

---TABLA PARA LOS SIGNOS VITALES
CREATE TABLE signos_vitales (
    id_signos_vitales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    frecuencia_cardiaca INT,
    saturacion INT,
    presion_sanguinea_sistole INT,
    presion_sanguinea_distole INT,
    temperatura INT,
    tiempo TIMESTAMP,
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE diferencial (
    id_diferencial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    categoria TEXT,
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE diagnostico_diferencia (
    id_diagnostico_diferencial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diferencial INT,
    diagnostico TEXT,
    FOREIGN KEY (id_diferencial) REFERENCES diferencial(id_diferencial)
);

CREATE TABLE 