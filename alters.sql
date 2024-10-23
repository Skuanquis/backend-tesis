ALTER TABLE anamnesis_sistemas ADD COLUMN feed_tegumentario TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_tegumentario VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_cardiovascular TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_cardiovascular VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_gastrointestinal TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_gastrointestinal VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_genitourinario TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_genitourinario VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_respiratorio TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_respiratorio VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_neurologico TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_neurologico VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_locomotor TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_locomotor VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_endocrino TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_endocrino VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_hematico TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_hematico VARCHAR(2);
ALTER TABLE anamnesis_sistemas ADD COLUMN feed_psiquiatrico TEXT;
ALTER TABLE anamnesis_sistemas ADD COLUMN puntaje_psiquiatrico VARCHAR(2);

ALTER TABLE examen_fisico_general ADD COLUMN feed_examen_fisico TEXT;
ALTER TABLE examen_fisico_general ADD COLUMN puntaje_examen_fisico VARCHAR(2);

ALTER TABLE examen_fisico_general ADD COLUMN feed_ TEXT;
ALTER TABLE examen_fisico_general ADD COLUMN puntaje_ VARCHAR(2);

ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_cabeza TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_cabeza VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_cuello TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_cuello VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_torax TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_torax VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_corazon TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_corazon VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_mamas TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_mamas VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_abdomen TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_abdomen VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_genitourinario TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_genitourinario VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_extremidades TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_extremidades VARCHAR(2);
ALTER TABLE examen_fisico_segmentario ADD COLUMN feed_neurologico TEXT;
ALTER TABLE examen_fisico_segmentario ADD COLUMN puntaje_neurologico VARCHAR(2);

ALTER TABLE examen_obstetrico ADD COLUMN feed_examen_obstetrico TEXT;
ALTER TABLE examen_obstetrico ADD COLUMN puntaje_examen_obstetrico VARCHAR(2);

ALTER TABLE examen_fisico_orina ADD COLUMN feed_examen_fisico_orina TEXT;
ALTER TABLE examen_fisico_orina ADD COLUMN puntaje_examen_fisico_orina VARCHAR(2);

ALTER TABLE examen_quimico_urinario ADD COLUMN feed_examen_quimico_urinario TEXT;
ALTER TABLE examen_quimico_urinario ADD COLUMN puntaje_examen_quimico_urinario VARCHAR(2);

ALTER TABLE examenes_especiales_orina ADD COLUMN feed_examen_especial_orina TEXT;
ALTER TABLE examenes_especiales_orina ADD COLUMN puntaje_examen_especial_orina VARCHAR(2);

ALTER TABLE examen_hematologico ADD COLUMN feed_examen_hematologico TEXT;
ALTER TABLE examen_hematologico ADD COLUMN puntaje_examen_hematologico VARCHAR(2);

ALTER TABLE biometria_hematica ADD COLUMN feed_examen_biometria_hematica TEXT;
ALTER TABLE biometria_hematica ADD COLUMN puntaje_examen_biometria_hematica VARCHAR(2);

ALTER TABLE recuento_diferencial_hematico ADD COLUMN feed_recuento_diferencial_hematico TEXT;
ALTER TABLE recuento_diferencial_hematico ADD COLUMN puntaje_recuento_diferencial_hematico VARCHAR(2);

ALTER TABLE indices_eritrocitarios_hematico ADD COLUMN feed_indices_eritrocitarios TEXT;
ALTER TABLE indices_eritrocitarios_hematico ADD COLUMN puntaje_indices_eritrocitarios VARCHAR(2);

ALTER TABLE quimica_sanguinea ADD COLUMN feed_quimica_sanguinea TEXT;
ALTER TABLE quimica_sanguinea ADD COLUMN puntaje_quimica_sanguinea VARCHAR(2);

ALTER TABLE hemostasia_sanguinea ADD COLUMN feed_hemostasia_sanguinea TEXT;
ALTER TABLE hemostasia_sanguinea ADD COLUMN puntaje_hemostasia_sanguinea VARCHAR(2);

ALTER TABLE serologia_sanguinea ADD COLUMN feed_serologia_sanguinea TEXT;
ALTER TABLE serologia_sanguinea ADD COLUMN puntaje_serologia_sanguinea VARCHAR(2);

ALTER TABLE electrolitos_sanguineos ADD COLUMN feed_electrolitos_sanguineos TEXT;
ALTER TABLE electrolitos_sanguineos ADD COLUMN puntaje_electrolitos_sanguineos VARCHAR(2);

ALTER TABLE electrolitos_sanguineos ADD COLUMN feed_electrolitos_sanguineos TEXT;
ALTER TABLE electrolitos_sanguineos ADD COLUMN puntaje_electrolitos_sanguineos VARCHAR(2);

INSERT INTO categoria_diferencial VALUES (1, 4, "Alergia/Inmunologico");
INSERT INTO categoria_diferencial VALUES (2, 4, "Cardiovascular");
INSERT INTO categoria_diferencial VALUES (3, 4, "Dermatologico");
INSERT INTO categoria_diferencial VALUES (4, 4, "Endocrino/Metabolico");

INSERT INTO diagnostico VALUES (1,1,"Anafilaxia", "");
INSERT INTO diagnostico VALUES (2,1,"Enfermedad de behcet", "");
INSERT INTO diagnostico VALUES (3,1,"Sindrome de kawasaki", "");
INSERT INTO diagnostico VALUES (4,1,"Glomerulonefritis post-estreptocócica", "");
INSERT INTO diagnostico VALUES (5,2,"Ruptura Aguda de la Válvula Mitral", "");
INSERT INTO diagnostico VALUES (6,2,"Edema Pulmonar Agudo", "");
INSERT INTO diagnostico VALUES (7,2,"Síncope Arritmógeno", "");
INSERT INTO diagnostico VALUES (8,2,"Fibrilación Auricular con Respuesta Ventricular Rápida", "");
INSERT INTO diagnostico VALUES (9,2,"Dolor Torácico Atípico", "");
INSERT INTO diagnostico VALUES (10,2,"Bloqueo AV - 2º grado tipo 1", "");
INSERT INTO diagnostico VALUES (11,2,"Bloqueo AV - 2º grado tipo 2", "");
INSERT INTO diagnostico VALUES (12,2,"Bloqueo AV - 3º grado", "");
INSERT INTO diagnostico VALUES (13,2,"Taponamiento Cardíaco", "");
INSERT INTO diagnostico VALUES (14,2,"Miocardiopatía", "");
INSERT INTO diagnostico VALUES (15,2,"Estenosis Aórtica Crítica", "");
INSERT INTO diagnostico VALUES (16,2,"Infarto de Miocardio", "");
INSERT INTO diagnostico VALUES (17,2,"Miocarditis", "");
INSERT INTO diagnostico VALUES (18,2,"Pericarditis", "");
INSERT INTO diagnostico VALUES (19,2,"Taquicardia Supraventricular", "");
INSERT INTO diagnostico VALUES (20,2,"Angina Vasoespástica (Prinzmetal)", "");
INSERT INTO diagnostico VALUES (21,2,"Síncope Vasovagal", "");
INSERT INTO diagnostico VALUES (22,2,"Fibrilación Ventricular", "");
INSERT INTO diagnostico VALUES (23,3,"Celulitis", "");
INSERT INTO diagnostico VALUES (24,3,"Fascitis Necrosante", "");
INSERT INTO diagnostico VALUES (25,3,"Síndrome de Stevens-Johnson", "");
INSERT INTO diagnostico VALUES (26,4,"Crisis Suprarrenal", "");
INSERT INTO diagnostico VALUES (27,4,"Cetoacidosis Diabética", "");
INSERT INTO diagnostico VALUES (28,4,"Hipercalcemia", "");
INSERT INTO diagnostico VALUES (29,4,"Hiperpotasemia", "");
INSERT INTO diagnostico VALUES (30,4,"Hipernatremia", "");
INSERT INTO diagnostico VALUES (31,4,"Coma Hiperosmolar", "");
INSERT INTO diagnostico VALUES (32,4,"Hipertiroidismo", "");
INSERT INTO diagnostico VALUES (33,4,"Hipoglucemia", "");
INSERT INTO diagnostico VALUES (34,4,"Hiponatremia", "");


ALTER TABLE anamnesis_sistemas DROP COLUMN img_tegumentario;   
ALTER TABLE anamnesis_sistemas DROP COLUMN img_cardiovascular; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_endocrino; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_gastrointestinal; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_genitourinario; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_respiratorio; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_neurologico; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_locomotor; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_hematico; 
ALTER TABLE anamnesis_sistemas DROP COLUMN img_neurologico; 


ALTER TABLE examen_fisico_segmentario ADD COLUMN img_cabeza VARCHAR(200);   
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_cuello VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_corazon VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_torax VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_mamas VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_abdomen VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_genitourinario VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_extremidades VARCHAR(200); 
ALTER TABLE examen_fisico_segmentario ADD COLUMN img_neurologico VARCHAR(200);

ALTER TABLE traspaso ADD COLUMN opcion_cuatro TEXT;
ALTER TABLE traspaso ADD COLUMN feed_opcion_cuatro TEXT;
ALTER TABLE traspaso ADD COLUMN puntaje_opcion_cuatro VARCHAR(2);