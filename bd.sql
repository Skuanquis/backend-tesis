CREATE TABLE paciente (
	id_paciente INT NOT NULL PRIMARY KEY,
	paterno VARCHAR(50),
	materno VARCHAR(50),
	nombre VARCHAR(50),
	ci VARCHAR(20),
	edad INT,
	fecha_nacimiento DATE,
	historia_clinica VARCHAR(20),
	sexo VARCHAR(10)
);

CREATE TABLE historia_clinica (
    id_historia_clinica INT NOT NULL PRIMARY KEY,
    descripcion TEXT,
    historia_enfermedad_actual TEXT,
    id_paciente INT,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);

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

CREATE TABLE antecedentes_patologicos (
	id_antecedente_patologico INT NOT NULL PRIMARY KEY,
	app VARCHAR(255),
	afp VARCHAR(255),
	alergias VARCHAR(255),
	cirugias VARCHAR(255),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE motivo_consulta (
	id_motivo_consulta INT NOT NULL PRIMARY KEY,
	motivo VARCHAR(255),
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

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

CREATE TABLE examen_orina (
	id_examen_orina INT NOT NULL PRIMARY KEY,
	id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

CREATE TABLE examen_fisico_orina (
	id_examen_fisico_orina INT NOT NULL PRIMARY KEY,
	color VARCHAR(20),
	aspecto VARCHAR(30),
	volumen VARCHAR(15),
	id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

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

CREATE TABLE examenes_especiales_orina (
    id_examen_especial_orina INT NOT NULL PRIMARY KEY,
    proteurinaria VARCHAR(10),
    creatinuria VARCHAR(10),
    microalbuminuria VARCHAR(10),
    clearence_creatinina VARCHAR(10),
    id_examen_orina INT,
	FOREIGN KEY (id_examen_orina) REFERENCES examen_orina(id_examen_orina)
);

CREATE TABLE examen_hematologico (
    id_examen_hematologico INT NOT NULL PRIMARY KEY,
    grupo_sanguineo VARCHAR(5),
    factor_rh VARCHAR(15),
    observaciones VARCHAR(256),
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

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

CREATE TABLE indices_eritrocitarios_hematico (
    id_indices_eritrocitarios_hematico INT NOT NULL PRIMARY KEY,
    vcm VARCHAR(10),
    hbcm VARCHAR(10),
    chbcm VARCHAR(10),
    id_examen_hematologico INT,
	FOREIGN KEY (id_examen_hematologico) REFERENCES examen_hematologico(id_examen_hematologico)
);

CREATE TABLE examen_sanguineo (
    id_examen_sanguineo INT NOT NULL PRIMARY KEY,
    observaciones VARCHAR(256),
    id_historia_clinica INT,
	FOREIGN KEY (id_historia_clinica) REFERENCES historia_clinica(id_historia_clinica)
);

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



-- Insert para la tabla paciente
INSERT INTO paciente (id_paciente, paterno, materno, nombre, ci, edad, fecha_nacimiento, historia_clinica, sexo) 
VALUES ( , '', '', '', '', , '', '', '');

-- Insert para la tabla historia_clinica
INSERT INTO historia_clinica (id_historia_clinica, descripcion, historia_enfermedad_actual, id_paciente) 
VALUES ( , '', '', );

-- Insert para la tabla antecedentes_gineco_obstetricos
INSERT INTO antecedentes_gineco_obstetricos (id_antecedente_gineco_obstetrico, menarca, fum, fpp, gestaciones, partos, abortos, cesarias, cpn, id_historia_clinica) 
VALUES ( , '', '', '', , , , , , );

-- Insert para la tabla antecedentes_patologicos
INSERT INTO antecedentes_patologicos (id_antecedente_patologico, app, afp, alergias, cirugias, id_historia_clinica) 
VALUES ( , '', '', '', '', );

-- Insert para la tabla motivo_consulta
INSERT INTO motivo_consulta (id_motivo_consulta, motivo, id_historia_clinica) 
VALUES ( , '', );

-- Insert para la tabla examen_fisico_general
INSERT INTO examen_fisico_general (id_examen_fisico_general, descripcion, pa, fc, fr, temperatura, saturacion, peso, talla, imc, id_historia_clinica) 
VALUES ( , '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla examen_fisico_segmentario
INSERT INTO examen_fisico_segmentario (id_examen_fisico_segmentario, cabeza, cuello, torax, corazon, mamas, abdomen, genitourinario, extremidades, neurologico, id_historia_clinica) 
VALUES ( , '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla examen_obstetrico
INSERT INTO examen_obstetrico (id_examen_obstetrico, presentacion, dorso, afu, fcf, paf, monitorizacion, dilatacion, borramiento, membranas, plano, au, pelvis, vp, id_historia_clinica) 
VALUES ( , '', '', '', '', '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla examen_orina
INSERT INTO examen_orina (id_examen_orina, id_historia_clinica) 
VALUES ( , );

-- Insert para la tabla examen_fisico_orina
INSERT INTO examen_fisico_orina (id_examen_fisico_orina, color, aspecto, volumen, id_examen_orina) 
VALUES ( , '', '', '', );

-- Insert para la tabla sedimento_urinario
INSERT INTO sedimento_urinario (id_sedimento_urinario, hematies, leucocitos, piocitos, celulas_epiteliales, celulas_renales, cilindro_cereo, cilindros_hialianos, cilindros_granulosos, cilindros_leucocitarios, flora_bacteriana, cristales, filamento_mucoso, hifas, levaduras, otros, id_examen_orina) 
VALUES ( , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla examen_quimico_urinario
INSERT INTO examen_quimico_urinario (id_examen_quimico_urinario, ph, densidad, proteinas, sangre, glucosa, cetonas, urobilinogeno, bilirrubina, pigmentos_biliares, nitritos, leucocitos, id_examen_orina) 
VALUES ( , '', '', '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla examenes_especiales_orina
INSERT INTO examenes_especiales_orina (id_examen_especial_orina, proteurinaria, creatinuria, microalbuminuria, clearence_creatinina, id_examen_orina) 
VALUES ( , '', '', '', '', );

-- Insert para la tabla examen_hematologico
INSERT INTO examen_hematologico (id_examen_hematologico, grupo_sanguineo, factor_rh, observaciones, id_historia_clinica) 
VALUES ( , '', '', '', );

-- Insert para la tabla biometria_hematica
INSERT INTO biometria_hematica (id_biometria_hematica, globulos_rojos, globulos_blancos, hemoglobina, hematocrito, ves, id_examen_hematologico) 
VALUES ( , '', '', '', '', '', );

-- Insert para la tabla recuento_diferencial_hematico
INSERT INTO recuento_diferencial_hematico (id_recuento_diferencial_hematico, cayados_relativo, cayados_absoluto, linfocitos_relativo, linfocitos_absoluto, eosinofilos_relativo, eosinofilos_absoluto, basofilos_relativo, basofilos_absoluto, segmentados_relativo, segmentados_absoluto, monocitos_relativo, monocitos_absoluto, recuento_plaquetas, recuento_reticulos, id_examen_hematologico) 
VALUES ( , '', '', '', '', '', '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla indices_eritrocitarios_hematico
INSERT INTO indices_eritrocitarios_hematico (id_indices_eritrocitarios_hematico, vcm, hbcm, chbcm, id_examen_hematologico) 
VALUES ( , '', '', '', );

-- Insert para la tabla examen_sanguineo
INSERT INTO examen_sanguineo (id_examen_sanguineo, observaciones, id_historia_clinica) 
VALUES ( , '', );

-- Insert para la tabla quimica_sanguinea
INSERT INTO quimica_sanguinea (id_quimica_sanguinea, glicemia, creatinina, nitrogeno_ureico, urea, acido_urico, bilirrubina_total, bilirrubina_directa, bilirrubina_indirecta, transaminasa_gpt, transaminasa_got, lactato_deshidrogenasa, fosfatasa_alcalina, proteinas_totales, albumina, globulina, relacion_alb_glo, colesterol_total, trigliceridos, hdl_colesterol, ldl_colesterol, vldl_colesterol, glicemia_rn, hemoglobina_glicosilada, id_examen_sanguineo) 
VALUES ( , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla hemostasia_sanguinea
INSERT INTO hemostasia_sanguinea (id_hemostasia_sanguinea, tiempo_coagulacion, tiempo_sangria, tiempo_protrombina, actividad_protrombinica, inr, tiempo_control, tiempo_tromboplastina_parcial, dimero_d, fibrinogeno, id_examen_sanguineo) 
VALUES ( , '', '', '', '', '', '', '', '', '', );

-- Insert para la tabla serologia_sanguinea
INSERT INTO serologia_sanguinea (id_serologia_sanguinea, proteina_c, factor_reumatico, rpr_sifilis, prueba_sifilis, prueba_vih_sida, prueba_hepatitis_b, id_examen_sanguineo) 
VALUES ( , '', '', '', '', '', '', );

-- Insert para la tabla electrolitos_sanguineos
INSERT INTO electrolitos_sanguineos (id_electrolito_sanguineo, calcio, sodio, potasio, cloro, fosforo, magnesio, id_examen_sanguineo) 
VALUES ( , '', '', '', '', '', '', );
