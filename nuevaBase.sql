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
        diagnostico VARCHAR(256) 
        FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
        FOREIGN KEY (id_categoria_simulacion) REFERENCES categoria_simulacion(id_categoria_simulacion)
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
    transfusiones VARCHAR(50),
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
    img_tegumentario VARCHAR(200),
    cardiovascular TEXT,
    feed_cardiovascular TEXT,
    puntaje_cardiovascular VARCHAR(2),
    img_cardiovascular VARCHAR(200),
    gastrointestinal TEXT,
    feed_gastrointestinal TEXT,
    puntaje_gastrointestinal VARCHAR(2),
    img_gastrointestinal VARCHAR(200),
    genitourinario TEXT,
    feed_genitourinario TEXT,
    puntaje_genitourinario VARCHAR(2),
    img_genitourinario VARCHAR(200),
    respiratorio TEXT,
    feed_respiratorio TEXT,
    puntaje_respiratorio VARCHAR(2),
    img_repiratorio VARCHAR(200),
    neurologico TEXT,
    feed_neurologico TEXT,
    puntaje_neurologico VARCHAR(2),
    img_neurologico VARCHAR(200),
    locomotor TEXT, 
    feed_locomotor TEXT,
    puntaje_locomotor VARCHAR(2),
    img_locomotor VARCHAR(200),
    endocrino TEXT,
    feed_endocrino TEXT,
    puntaje_endocrino VARCHAR(2),
    img_endocrino VARCHAR(200),
    hematico TEXT,
    feed_hematico TEXT,
    puntaje_hematico VARCHAR(2),
    img_hematico VARCHAR(200),
    psiquiatrico TEXT,
    feed_psiquiatrico TEXT,
    puntaje_psiquiatrico VARCHAR(2),
    img_psiquiatrico VARCHAR(200),
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
    img_cabeza VARCHAR(200),
	cuello TEXT,
    feed_cuello TEXT,
    puntaje_cuello VARCHAR(2),
    img_cuello VARCHAR(200),
	torax TEXT,
    feed_torax  TEXT,
    puntaje_torax  VARCHAR(2),
    img_torax VARCHAR(200),
	corazon TEXT,
    feed_corazon TEXT,
    puntaje_corazon VARCHAR(2),
    img_corazon VARCHAR(200),
	mamas TEXT,
    feed_mamas TEXT,
    puntaje_mamas VARCHAR(2),
    img_mamas VARCHAR(200),
	abdomen TEXT,
    feed_abdomen TEXT,
    puntaje_abdomen VARCHAR(2),
    img_abdomes VARCHAR(200),
	genitourinario TEXT,
    feed_genitourinario TEXT,
    puntaje_genitourinario VARCHAR(2),
    img_genitourinario VARCHAR(200),
	extremidades TEXT,
    feed_extremidades TEXT,
    puntaje_extremidades VARCHAR(2),
    img_extremidades VARCHAR(200),
	neurologico VARCHAR(512),
    feed_neurologico TEXT,
    puntaje_neurologico VARCHAR(2),
    img_neurologico VARCHAR(200),
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
    tiempo_empleado VARCHAR(20),
    puntaje_porcentaje VARCHAR(10)
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_simulacion) REFERENCES simulacion(id_simulacion)
);

CREATE TABLE accion_simulacion (
    id_accion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_simulacion INT,
    descripcion TEXT,
    tipo_accion VARCHAR(255), 
    accion_time TIMESTAMP,
    puntaje VARCHAR(2), 
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

CREATE TABLE puntaje_anamnesis (
    id_puntaje_anamnesis INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_examen (
    id_puntaje_examen INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_diferencial (
    id_puntaje_diferencial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_laboratorio (
    id_puntaje_laboratorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_intervenir (
    id_puntaje_intervenir INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_externa (
    id_puntaje_externa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE puntaje_traspaso (
    id_puntaje_traspaso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_historia_clinica INT,
    puntaje_a int,
    puntaje_b INT,
    puntaje_c INT,
    puntaje_d INT,
    puntaje_e INT
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE categoria_analisis (
    id_categoria_analisis INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100)
);

CREATE TABLE subcategoria_analisis (
    id_subcategoria_analisis INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria_analisis INT,
    nombre_subcategoria VARCHAR(100),
    FOREIGN KEY (id_categoria_analisis) REFERENCES categoria_analisis(id_categoria_analisis)
);

CREATE TABLE solicitud_analisis (
    id_solicitud_analisis INT PRIMARY KEY AUTO_INCREMENT,
    id_historia_clinica INT,
    id_categoria_analisis INT,  
    puntaje_analisis VARCHAR(2),
    feed_analsis TEXT,
    FOREIGN KEY (id_categoria_analisis) REFERENCES categoria_analisis(id_categoria_analisis)
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE detalle_subanalisis (
    id_detalle_subanalisis INT PRIMARY KEY AUTO_INCREMENT,
    id_solicitud_analisis INT,  
    id_subcategoria_analisis INT,  
    resultado VARCHAR(50), 
    FOREIGN KEY (id_solicitud_analisis) REFERENCES solicitud_analisis(id_solicitud_analisis),
    FOREIGN KEY (id_subcategoria_analisis) REFERENCES subcategoria_analisis(id_subcategoria_analisis)
);


INSERT INTO categoria_analisis(nombre_categoria) VALUES("Hematologia");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Electrolitos");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Alergias");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Prueba de embarazo");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Orina");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Pruebas ortomoleculares");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Quimica sanguinea");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Perfil de hierro");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Perfil lipidico y cardiaco");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Perfil hepatico");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Heces Fecales");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Inmunologia");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Gastroenterologia");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Liquidos organicos");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Microscopia optica");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Enzimas antioxidantes");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Marcadores tumorales");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Hormonas");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Neurotransmisores");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Vitaminas");
INSERT INTO categoria_analisis(nombre_categoria) VALUES("Microbiologia");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Hemograma automatizado VES");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Hematocrito HTO");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Hemoglobina HB");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Recuento de plaquetas");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Grupo sanguineo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Coombs directo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Coombs indirecto");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Celulas LE");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Tiempo de coagulacion");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Tiempo de protombina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Tiempo de sangria");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"APTT");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Fragilidad capilar");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Fibrinogeno");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Dimero D");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Gota gruesa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Recuento de reticulocitos");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(1,"Recuento de eosinofilos");


INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Sodio");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Cloro");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Potasio");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Calcio");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Calcio Ionico");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Fosforo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(2,"Magnesio");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"Intolerancia alimenticia");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"IGE total");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"PA pediatricos");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"PA respiratorios");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"PA alimenticios");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(3,"Citologia Nasal");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(4,"HCG en orina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(4,"HCG en sangre");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(4,"HCG cuantitativo");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"Parcial de orina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"Proteina de Bence Jones");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"Proteinuria de 24Hrs");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"Calciuria");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"BK de orina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"Microalbuminuria");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(5,"17-OH progesterona");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"MDA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"Test de vitamina C");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"Test de indicam");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"Test adrenal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"Test de zinc");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(6,"pH en salidva");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Glucosa en ayunas");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Tolerancia a la glucosa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"HB glucosalida");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Urea");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"BUN");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Creatinina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Clearence de creatinina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Acido urico");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Proteinas totales");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Albumina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Globulina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Relacion A/G");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Lipidos totales");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Amilasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Lipasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Amonio");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(7,"Electroferesis de proteinas");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(8,"Hierro serico");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(8,"Ferritina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(8,"TIBC");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(8,"% Saturacion");


INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Colesterol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"HDL colesterol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"LDL colesterol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"VLDL colesterol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Trigliceridos");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Riesgo cardiaco");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Apolipoproteina A-1");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Apolipoproteina B-100");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Homosistenia");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"PCR ultrasensible");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Troponina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"CPK total");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Mioblobina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"Deshidrogenasa lactica");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(9,"CPK mb");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"Bilirrubinas");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"GOT");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"GPT");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"Fosfatasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"CGT");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(10,"Ceruloplasmina");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Parasitologico");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Parasitologico seriado");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Parasitologico concentrado");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Sangre oculta");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Citologia moco fecal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Test de Graham");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Rotavirus");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Adenavirus");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Grasa fecal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Prueba de intolerancia a la lactosa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"pH azucares reductores");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Helicobacter pylori");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Elisa para giardia");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Elisa para ameba");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(11,"Coproflora funcional");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Reaccion de Widal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"RPR");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"VDRL");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Proteina C reactiva");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"A.S.T.O.");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Chagas elisa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Toxoplasmosis elisa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Chlamydia elisa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"H Pylori elisa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Hepatitis A");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Hepatitis B Hbs");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Hepatitis B Hbc");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Hepatitis C");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Citomegalovirus");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Herpes");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"HIV");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Complemento C3");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Complemento C4");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Anti DNA elisa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Anricardiolipinas");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Antifosfolipidos");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"Perfil ENA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"P-ANCA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"C-ANCA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"IL-6");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"ANA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"ELISA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(12,"IFI");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Elastasa fecal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Calprotectina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"C. Difficle");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Antigliadina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Antitransglutaminasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Antiendomisio");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Antimitocondriales");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Antitripsina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(13,"Test de Betaina");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"Espermograma");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"LCR");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"Liquido pleural");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"Liquido ascitico");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"Liquido sinovial");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(14,"Citologia nasal");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(15,"HLB");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(16,"Catalasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(16,"Glutation pbroxidasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(16,"Superoxido dismutasa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(16,"Mielope roxidasa");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"PSA ultrasensible");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"PSA total");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"PSA libre");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"CEA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"AFP");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"CA-125");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"CA-15-3");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"CA-19-9");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"Tiroglobulina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(17,"B-2 Microglobulina");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"T3");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"T3L");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"T3R");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"T4");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"T4L");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"PTH");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"ACTH");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"TSH ultra");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"H de crecimiento");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"TSH neonatal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"a-TPO");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"a-TG");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Estradiol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Estrona");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"LH");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"FSH");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Estrogenos totales");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Antimullerina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Progesterona");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"170H Progesterona");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Testosterona");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Testosterona libre");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Prolactina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"SHBG");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"DHEA-S");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"DHEA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Cortisol");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"AM");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"PM");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Insulina basal");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Post carga");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Peptido C");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Indice homa");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Grelina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(18,"Leptina");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(19,"Dopamina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(19,"GABA");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(19,"Serotonina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(19,"Norepinefrina");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(19,"Epinefrina");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(20,"Vitamina B6");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(20,"Vitamina B12");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(20,"Vitamina D");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(20,"Acido folico");

INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Tincion de gram");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Tincion de Ziehl Neelsen");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Baciloscopia seriada");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Secresion vaginal en fresco");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Secresion vaginal tincion de gram");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Secresion vaginal cultivo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Urocultivo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Exudado faringeo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Esputo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Hemocultivo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Seriado");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Micologico directo");
INSERT INTO subcategoria_analisis(id_categoria_analisis, nombre_subcategoria) VALUES(21,"Cultivo para hongos");

INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,1,"A","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,2,"B","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,3,"B","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,4,"C","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,5,"C","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,6,"C","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,7,"D","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,8,"D","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,9,"D","a");
INSERT INTO solicitud_analisis(id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis) VALUES (1,10,"D","a");

INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (1,1,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (2,2,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (3,3,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (4,4,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (5,5,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (6,6,"1");
INSERT INTO detalle_subanalisis(id_solicitud_analisis, id_subcategoria_analisis, resultado) VALUES (7,7,"1");






CREATE TABLE grupo (
  id_grupo int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(124) UNIQUE,
  descripcion text,
  codigo_acceso varchar(50),
  id_usuario_medico int(11),
  fecha_creacion date DEFAULT CURRENT_DATE,
  FOREIGN KEY (id_usuario_medico) REFERENCES usuario(id_usuario)
);

CREATE TABLE grupo_estudiante (
  id_grupo int(11) NOT NULL,
  id_usuario_estudiante int(11) NOT NULL,
  fecha_matriculacion date DEFAULT CURRENT_DATE,
  PRIMARY KEY (id_grupo, id_usuario_estudiante),
  FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
  FOREIGN KEY (id_usuario_estudiante) REFERENCES usuario(id_usuario)
);

CREATE TABLE categoria_imagenologia (
    id_categoria_imagenologia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(128)
);

CREATE TABLE imagenologia (
    id_imagenologia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria_imagenologia INT,
	nombre VARCHAR(128),
    descripcion TEXT,
    FOREIGN KEY (id_categoria_imagenologia) REFERENCES categoria_imagenologia(id_categoria_imagenologia)
);

CREATE TABLE estudios_imagenologia (
    id_estudios_imagenologia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_imagenologia INT,
    id_historia_clinica INT,
    interpretacion TEXT,
    path VARCHAR(128),
	feed_estudios_imagenologia TEXT,
    puntaje_estudios_imagenologia VARCHAR(2),
    FOREIGN KEY (id_imagenologia) REFERENCES imagenologia(id_imagenologia),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
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


CREATE TABLE categoria_procedimiento (
    id_categoria_procedimiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(128)
);

CREATE TABLE procedimiento (
    id_procedimiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria_procedimiento INT,
	nombre VARCHAR(128),
    descripcion TEXT,
    FOREIGN KEY (id_categoria_procedimiento) REFERENCES categoria_procedimiento(id_categoria_procedimiento)
);

CREATE TABLE procedimiento_asignado (
    id_procedimiento_asignado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_procedimiento INT,
    id_historia_clinica INT,
	feed_procedimiento_asignado TEXT,
    puntaje_procedimiento_asignado VARCHAR(2),
    FOREIGN KEY (id_procedimiento) REFERENCES procedimiento(id_procedimiento),
    FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);



tegumentario, feed_tegumentario, puntaje_tegumentario, img_tegumentario, cardiovascular, feed_cardiovascular, puntaje_cardiovascular, img_cardiovascular, gastrointestinal, feed_gastrointestinal, puntaje_gastrointestinal, img_gastrointestinal, genitourinario, feed_genitourinario, puntaje_genitourinario, img_genitourinario, respiratorio, feed_respiratorio, puntaje_respiratorio, img_repiratorio, neurologico, feed_neurologico, puntaje_neurologico, img_neurologico, locomotor, feed_locomotor, puntaje_locomotor, img_locomotor, endocrino, feed_endocrino, puntaje_endocrino, img_endocrino, hematico, feed_hematico, puntaje_hematico, img_hematico, psiquiatrico, feed_psiquiatrico, puntaje_psiquiatrico, img_psiquiatrico,

cabeza , feed_cabeza , puntaje_cabeza , img_cabeza ,ello , feed_cuello , puntaje_cuello , img_cuello ,rax , feed_torax  , puntaje_torax  , img_torax ,razon , feed_corazon , puntaje_corazon , img_corazon ,mas , feed_mamas , puntaje_mamas , img_mamas ,domen , feed_abdomen , puntaje_abdomen , img_abdomes ,nitourinario , feed_genitourinario , puntaje_genitourinario , img_genitourinario ,tremidades , feed_extremidades , puntaje_extremidades , img_extremidades ,urologico , feed_neurologico , puntaje_neurologico , img_neurologico ,