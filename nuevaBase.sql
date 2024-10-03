CREATE TABLE usuario (
  id_usuario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(124) NOT NULL UNIQUE,
  password varchar(512) DEFAULT NULL,
  paterno varchar(124) DEFAULT NULL,
  materno varchar(124) DEFAULT NULL,
  nombre varchar(124) DEFAULT NULL,
  fecha_nacimiento date DEFAULT NULL,
  estado varchar(15) NOT NULL DEFAULT 'activo',
  id_rol int(11) NOT NULL,
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE rol (
  id_rol int(11) NOT NULL,
  name varchar(50) DEFAULT NULL
);

CREATE TABLE paciente (
  id_paciente int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paterno varchar(50) DEFAULT NULL,
  materno varchar(50) DEFAULT NULL,
  nombre varchar(50) DEFAULT NULL,
  fecha_nacimiento date DEFAULT NULL,
  sexo varchar(10) DEFAULT NULL,
  peso decimal(5,2) DEFAULT NULL,
  talla decimal(4,2) DEFAULT NULL
);

CREATE TABLE caso_clinico (
    id_caso_clinico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT,
    id_categoria_simulacion INT,
    autor varchar(128) NULL,
    difucultad varchar(64) NULL,
    tiempo VARCHAR(10),
    estado VARCHAR(20),
    diagnostico VARCHAR(256),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_categoria_simulacion) REFERENCES categoria_simulacion(id_categoria_simulacion)
);

CREATE TABLE puntaje_caso_clinico (
    id_puntaje_caso_clinico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
);

CREATE TABLE historia_clinica (
  id_historia_clinica int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  descripcion text DEFAULT NULL,
  historia_enfermedad_actual text DEFAULT NULL,
  id_caso_clinico int(11) DEFAULT NULL,
  FOREIGN KEY (id_caso_clinico) REFERENCES caso_clinico(id_caso_clinico)
);


CREATE TABLE categoria_simulacion (
    id_categoria_simulacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(100)
);


CREATE TABLE antecedentes_gineco_obstetricos (
	id_antecedente_gineco_obstetrico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE antecedentes_patologicos (
	id_antecedente_patologico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    alergias VARCHAR(255),
	cirugias VARCHAR(255),
    id_historia_clinica INT,
    enfermedades_congenitas VARCHAR(100),
    enfermedades_infancia VARCHAR(100),
    enfermedades_adolescencia VARCHAR(100),
    enfermedades_adulto VARCHAR(100),
    traumatismos VARCHAR(50),
    intoxicaciones VARCHAR(50),
    hospitalizaciones VARCHAR(50),
    enfermedades VARCHAR(50),
    transfusiones VARCHAR(2),
    patologia_asociada TEXT,
    medicacion_en_curso TEXT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE antecedentes_no_patologicos(
	id_antecedentes_no_patologicos INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	antecedentes_nacimiento TEXT,
	habitos TEXT,
	factores_de_riesgo TEXT,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

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

CREATE TABLE motivo_consulta (
	id_motivo_consulta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	motivo VARCHAR(255),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE anamnesis_sistemas(
    id_anamnesis_sistemas INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    tegumentario TEXT,
    feed_tegumentario TEXT,
    puntaje_tegumentario VARCHAR(2),
    cardiovascular TEXT,
    feed_cardiovascular TEXT,
    puntaje_cardiovascular VARCHAR(2),
    gastrointestinal TEXT,
    feed_gastrointestinal TEXT,
    puntaje_gastrointestinal VARCHAR(2),
    genitourinario TEXT,
    feed_genitourinario TEXT,
    puntaje_genitourinario VARCHAR(2),
    respiratorio TEXT,
    feed_respiratorio TEXT,
    puntaje_respiratorio VARCHAR(2),
    neurologico TEXT,
    feed_neurologico TEXT,
    puntaje_neurologico VARCHAR(2),
    locomotor TEXT,
    feed_locomotor TEXT,
    puntaje_locomotor VARCHAR(2),
    endocrino TEXT,
    feed_endocrino TEXT,
    puntaje_endocrino VARCHAR(2),
    hematico TEXT,
    feed_hematico TEXT,
    puntaje_hematico VARCHAR(2),
    psiquiatrico TEXT,
    feed_psiquiatrico TEXT,
    puntaje_psiquiatrico VARCHAR(2),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_fisico_general (
	id_examen_fisico_general INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	descripcion VARCHAR(512),
	pa VARCHAR(20),
	fc VARCHAR(10),
	fr VARCHAR(10),
	temperatura VARCHAR(10),
	saturacion VARCHAR(10),
	peso VARCHAR(10),
	talla VARCHAR(10),
	imc VARCHAR(10),
    feed_examen_fisico TEXT,
    puntaje_examen_fisico VARCHAR(2),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_fisico_segmentario (
	id_examen_fisico_segmentario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	cabeza TEXT,
    feed_cabeza TEXT,
    puntaje_cabeza VARCHAR(2),
	cuello TEXT,
    feed_cuello TEXT,
    puntaje_cuello VARCHAR(2),
	torax TEXT,
    feed_torax  TEXT,
    puntaje_torax  VARCHAR(2),
	corazon TEXT,
    feed_corazon TEXT,
    puntaje_corazon VARCHAR(2),
	mamas TEXT,
    feed_mamas TEXT,
    puntaje_mamas VARCHAR(2),
	abdomen TEXT,
    feed_abdomen TEXT,
    puntaje_abdomen VARCHAR(2),
	genitourinario TEXT,
    feed_genitourinario TEXT,
    puntaje_genitourinario VARCHAR(2),
	extremidades TEXT,
    feed_extremidades TEXT,
    puntaje_extremidades VARCHAR(2),
	neurologico VARCHAR(512),
    feed_neurologico TEXT,
    puntaje_neurologico VARCHAR(2),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_obstetrico (
	id_examen_obstetrico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    feed_examen_obstetrico TEXT,
    puntaje_examen_obstetrico VARCHAR(2),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_orina (
	id_examen_orina INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_fisico_orina (
	id_examen_fisico_orina INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	color VARCHAR(20),
	aspecto VARCHAR(30),
	volumen VARCHAR(15),
    feed_examen_fisico_orina TEXT,
    puntaje_examen_fisico_orina VARCHAR(2),
	id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

CREATE TABLE sedimento_urinario (
	id_sedimento_urinario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    feed_examen_sedimento_urinario TEXT,
    puntaje_examen_sedimento_urinario VARCHAR(2),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

CREATE TABLE examen_quimico_urinario (
    id_examen_quimico_urinario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    feed_examen_quimico_urinario TEXT,
    puntaje_examen_quimico_urinario VARCHAR(2),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

CREATE TABLE examenes_especiales_orina (
    id_examen_especial_orina INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proteurinaria VARCHAR(10),
    creatinuria VARCHAR(10),
    microalbuminuria VARCHAR(10),
    clearence_creatinina VARCHAR(10),
    feed_examen_especial_orina TEXT,
    puntaje_examen_especial_orina VARCHAR(2),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

CREATE TABLE examen_hematologico (
    id_examen_hematologico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    grupo_sanguineo VARCHAR(5),
    factor_rh VARCHAR(15),
    observaciones VARCHAR(256),
    feed_examen_hematologico TEXT,
    puntaje_examen_hematologico VARCHAR(2),
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE biometria_hematica (
    id_biometria_hematica INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    globulos_rojos VARCHAR(15),
    globulos_blancos VARCHAR(15),
    hemoglobina VARCHAR(15),
    hematocrito VARCHAR(15),
    ves VARCHAR(15),
    feed_examen_biometria_hematica TEXT,
    puntaje_examen_biometria_hematica VARCHAR(2),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

CREATE TABLE recuento_diferencial_hematico (
    id_recuento_diferencial_hematico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    feed_recuento_diferencial_hematico TEXT,
    puntaje_recuento_diferencial_hematico VARCHAR(2),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

CREATE TABLE indices_eritrocitarios_hematico (
    id_indices_eritrocitarios_hematico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vcm VARCHAR(10),
    hbcm VARCHAR(10),
    chbcm VARCHAR(10),
    feed_indices_eritrocitarios TEXT,
    puntaje_indices_eritrocitarios VARCHAR(2),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

CREATE TABLE examen_sanguineo (
    id_examen_sanguineo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE quimica_sanguinea (
    id_quimica_sanguinea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    feed_quimica_sanguinea TEXT,
    puntaje_quimica_sanguinea VARCHAR(2),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

CREATE TABLE hemostasia_sanguinea (
    id_hemostasia_sanguinea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tiempo_coagulacion VARCHAR(10),
    tiempo_sangria VARCHAR(10),
    tiempo_protrombina VARCHAR(10),
    actividad_protrombinica VARCHAR(10),
    inr VARCHAR(10),
    tiempo_control VARCHAR(10),
    tiempo_tromboplastina_parcial VARCHAR(10),
    dimero_d VARCHAR(10),
    fibrinogeno VARCHAR(10),
    feed_hemostasia_sanguinea TEXT,
    puntaje_hemostasia_sanguinea VARCHAR(2),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
); 

CREATE TABLE serologia_sanguinea (
    id_serologia_sanguinea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proteina_c VARCHAR(10),
    factor_reumatico VARCHAR(10),
    rpr_sifilis VARCHAR(10),
    prueba_sifilis VARCHAR(10),
    prueba_vih_sida VARCHAR(10),
    prueba_hepatitis_b VARCHAR(10),
    feed_serologia_sanguinea TEXT,
    puntaje_serologia_sanguinea VARCHAR(2),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

CREATE TABLE electrolitos_sanguineos (
    id_electrolito_sanguineo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    calcio VARCHAR(10),
    sodio VARCHAR(10),
    potasio VARCHAR(10),
    cloro VARCHAR(10),
    fosforo VARCHAR(10),
    magnesio VARCHAR(10),
    feed_electrolitos_sanguineos TEXT,
    puntaje_electrolitos_sanguineos VARCHAR(2),
    id_examen_sanguineo INT,
	FOREIGN KEY (id_examen_sanguineo) REFERENCES examen_sanguineo(id_examen_sanguineo)
);

CREATE TABLE examen_via_aerea (
    id_examen_via_aerea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
    feed_examen_via_aerea TEXT,
    puntaje_examen_via_aerea VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_respiratorio (
    id_examen_respiratorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
    feed_examen_respiratorio TEXT,
    puntaje_examen_respiratorio VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_circulatorio (
    id_examen_circulatorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
    feed_examen_circulatorio TEXT,
    puntaje_examen_circulatorio VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_piel (
    id_examen_piel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
    feed_examen_piel TEXT,
    puntaje_examen_piel VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_psicologico (
    id_examen_psicologico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
	descripcion TEXT,
    feed_examen_psicologico TEXT,
    puntaje_examen_psicologico VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE categoria_imagenologia (
    id_categoria_imagenologia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(128)
);

CREATE TABLE imagenologia (
    id_imagenologia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria_imagenologia INT,
    id_historia_clinica INT,
    nombre VARCHAR(128),
	interpretacion TEXT,
    path VARCHAR(128),
    feed_imagenologia TEXT,
    puntaje_imagenologia VARCHAR(2),
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica),
    FOREIGN KEY (id_categoria_imagenologia) REFERENCES categoria_imagenologia(id_categoria_imagenologia)
);

CREATE TABLE signos_vitales (
    id_signos_vitales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    frecuencia_cardiaca INT,
    saturacion INT,
    presion_sanguinea_sistole INT,
    presion_sanguinea_distole INT,
    temperatura INT,
    tiempo TIMESTAMP,
    feed_signos_vitales TEXT,
    puntaje_signos_vitales VARCHAR(2),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE categoria_diferencial (
    id_categoria_diferencial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	categoria VARCHAR(128)
);

CREATE TABLE diagnostico (
    id_diagnostico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria_diferencial INT,
	nombre VARCHAR(128),
    descripcion TEXT,
    FOREIGN KEY (id_categoria_diferencial) REFERENCES categoria_diferencial(id_categoria_diferencial)
);

CREATE TABLE diagnosticos_diferenciales (
    id_diagnosticos_diferenciales INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diagnostico INT,
    id_historia_clinica INT,
	feed_diagnostico_diferencial TEXT,
    puntaje_diagnostico_diferencial VARCHAR(2),
    FOREIGN KEY (id_diagnostico) REFERENCES diagnostico(id_diagnostico),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE categoria_medicamento (
    id_categoria_medicamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	categoria VARCHAR(128)
);

CREATE TABLE medicamento (
    id_medicamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria_medicamento INT,
	nombre VARCHAR(128),
    descripcion TEXT,
    FOREIGN KEY (id_categoria_medicamento) REFERENCES categoria_medicamento(id_categoria_medicamento)
);

CREATE TABLE medicamentos_suministrados (
    id_medicamentos_suministrados INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_medicamento INT,
    id_historia_clinica INT,
	feed_medicamento_diferencial TEXT,
    puntaje_medicamento_diferencial VARCHAR(2),
    FOREIGN KEY (id_medicamento) REFERENCES medicamento(id_medicamento),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE subespecialidad (
    id_subespecialidad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(128)
);

CREATE TABLE consulta_externa (
    id_consulta_externa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_subespecialidad INT,
    id_historia_clinica INT,
    descripcion TEXT,
	feed_subespecialidad TEXT,
    puntaje_subespecialidad VARCHAR(2),
    FOREIGN KEY (id_subespecialidad) REFERENCES subespecialidad(id_subespecialidad),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE traspaso (
    id_traspaso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    opcion_uno TEXT,
    feed_opcion_uno TEXT,
    puntaje_opcion_uno VARCHAR(2),
    opcion_dos TEXT,
    feed_opcion_dos TEXT,
    puntaje_opcion_dos VARCHAR(2),
    opcion_tres TEXT,
    feed_opcion_tres TEXT,
    puntaje_opcion_tres VARCHAR(2),
    diagnostico_final VARCHAR(128),
    puntaje_diagnostico_final VARCHAR(2),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE valor_puntaje (
    id_valor_puntaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    rubrica VARCHAR(124),
    codigo VARCHAR(2),
    valor INT,
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);


CREATE TABLE simulacion (
    id_simulacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
    
);

CREATE TABLE realiza_simulación (
    id_realiza_simulacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_simulacion INT,
    id_usuario INT,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP NULL,
    estado VARCHAR(20),
    diagnostico_final VARCHAR(256),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_simulacion) REFERENCES simulacion(id_simulacion)
);

CREATE TABLE accion_simulacion (
    id_accion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_simulacion INT,
    descripcion TEXT,
    tipo_accion VARCHAR(255), 
    accion_time TIMESTAMP,
    puntaje INT, 
    retroalimentacion TEXT, 
    FOREIGN KEY (id_simulacion) REFERENCES simulacion(id_simulacion)
);


CREATE TABLE mensajes_simulacion (
    id_mensajes_simulacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_caso_clinico INT,
    titulo VARCHAR(100),
    descripcion VARCHAR(100),
    tiempo VARCHAR(10),
    FOREIGN KEY (id_caso_clinico) REFERENCES caso_clinico(id_caso_clinico)
);

