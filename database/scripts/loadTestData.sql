-- Script para popular tabelas restantes do schema

-- 2. Inserir usuários
INSERT INTO usuario (id, nome, cargo, matricula, cpf, email, usuario_tipo_id) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dr. João Silva', 'Médico', 'M001', '11111111111', 'joao.silva@hospital.com', 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Enf. Maria Souza', 'Enfermeira', 'E001', '22222222222', 'maria.souza@hospital.com', 2),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Dr. Carlos Oliveira', 'Médico', 'M002', '33333333333', 'carlos.oliveira@hospital.com', 1),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Enf. Ana Santos', 'Enfermeira', 'E002', '44444444444', 'ana.santos@hospital.com', 2),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Tec. Pedro Costa', 'Técnico de Enfermagem', 'T001', '55555555555', 'pedro.costa@hospital.com', 2);

-- 3. Inserir credenciais de acesso
INSERT INTO acesso (usuario_id, senha) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '$2a$10$xJwL5v5Jz5U5Z5U5Z5U5Ze'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '$2a$10$xJwL5v5Jz5U5Z5U5Z5U5Ze'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '$2a$10$xJwL5v5Jz5U5Z5U5Z5U5Ze'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '$2a$10$xJwL5v5Jz5U5Z5U5Z5U5Ze'),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '$2a$10$xJwL5v5Jz5U5Z5U5Z5U5Ze');

-- 4. Inserir fichas SPA
INSERT INTO ficha_spa (unidade_id, usuario_responsavel_preenchimento_id, data_da_ficha) VALUES
(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2023-01-15'),
(1, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2023-01-15'),
(2, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '2023-01-16'),
(3, 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '2023-01-17'),
(4, 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '2023-01-18');

-- 5. Inserir recepção de pacientes
INSERT INTO ficha_spa_recepcao (ficha_spa_id, hora_da_recepcao, nao_identificado, nome_paciente, genero, data_de_nascimento, cartao_sus_ou_cpf, municipio_rg_id, raca_cor, procedencia, municipio_procedencia_interior_id) VALUES
(1, '08:15:00', false, 'José da Silva', 'M', '1980-05-10', '123456789012345', 1, 'PARDA', 'DEMANDA_ESPONTANEA_SAO_LUIS', NULL),
(2, '09:30:00', false, 'Maria Oliveira', 'F', '1975-11-20', '234567890123456', 2, 'BRANCA', 'REFERENCIADO_UPAS', NULL),
(3, '10:45:00', false, 'Carlos Santos', 'M', '1990-03-15', '345678901234567', 3, 'PRETA', 'DEMANDA_ESPONTANEA_INTERIOR', 10),
(4, '11:20:00', false, 'Ana Costa', 'F', '1985-07-22', '456789012345678', 4, 'AMARELA', 'REFERENCIADO_APS', NULL),
(5, '14:10:00', false, 'Pedro Souza', 'M', '1970-12-05', '567890123456789', 5, 'INDIGENA', 'OUTROS', NULL);

-- 6. Inserir classificações
INSERT INTO ficha_spa_classificacao (ficha_spa_id, hora_da_classificacao, retornou_com_menos_ou_igual_48h, causa_externa_id, manchester) VALUES
(1, '08:30:00', false, 1, 'VERMELHO'),
(2, '09:45:00', true, 2, 'LARANJA'),
(3, '11:00:00', false, 3, 'AMARELO'),
(4, '11:40:00', false, 4, 'VERDE'),
(5, '14:30:00', true, 5, 'AZUL');

-- 7. Inserir doenças pré-existentes
INSERT INTO ficha_spa_doenca_preexistente (ficha_spa_classificacao_id, has, dm, drc, outros) VALUES
(1, true, false, false, 'Hipertensão controlada'),
(2, false, true, false, 'Diabetes tipo 2'),
(3, true, true, true, 'Doença renal crônica estágio 3'),
(4, false, false, false, NULL),
(5, false, false, false, 'Asma');

-- 8. Inserir protocolos e condições especiais
INSERT INTO ficha_spa_protocolo_e_condicao_especial (ficha_spa_classificacao_id, sepse, dor_toracica, avc, notificacao, notificacao_agravo_id) VALUES
(1, true, false, false, true, 1),
(2, false, true, false, false, NULL),
(3, false, false, true, true, 2),
(4, false, false, false, false, NULL),
(5, false, false, false, false, NULL);

-- 9. Inserir queixas
INSERT INTO ficha_spa_queixa (ficha_spa_classificacao_id, causa_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- 10. Inserir atendimentos médicos
INSERT INTO ficha_spa_atendimento_medico (horario_do_atendimento_medico, ficha_spa_id) VALUES
('09:00:00', 1),
('10:15:00', 2),
('11:30:00', 3),
('12:00:00', 4),
('15:00:00', 5);

-- 11. Inserir exames solicitados
INSERT INTO ficha_spa_exame_solicitado (ficha_spa_atendimento_medico_id, raio_x, tomografia, ecg, ultrassonografia, laboratorio) VALUES
(1, true, false, true, false, true),
(2, false, true, false, true, false),
(3, true, true, false, false, true),
(4, false, false, true, false, false),
(5, true, false, false, true, true);

-- 12. Inserir planos terapêuticos
INSERT INTO ficha_spa_plano_terapeutico (ficha_spa_id, horario_do_atentimento_na_medicacao_observacao) VALUES
(1, '09:30:00'),
(2, '10:45:00'),
(3, '12:00:00'),
(4, '12:30:00'),
(5, '15:30:00');

-- 13. Inserir destinos finais
INSERT INTO ficha_spa_destino_final_do_paciente (ficha_spa_id, horario_da_saida, destino_final, unidade_transferida_id, horario_da_saida_para_o_setor_de_internacao) VALUES
(1, '10:00:00', 'INTERNADO', 2, '10:15:00'),
(2, '11:30:00', 'ALTA', NULL, NULL),
(3, '12:30:00', 'TRANSFERIDO', 3, NULL),
(4, '13:00:00', 'ALTA_COM_ATESTADO_MEDICO', NULL, NULL),
(5, '16:00:00', 'ALTA', NULL, NULL);

-- 14. Inserir encaminhamentos
INSERT INTO ficha_spa_encaminhamento (ficha_spa_classificacao_id, encaminhado_para_1, encaminhado_para_2, hora_da_realizacao_ecg) VALUES
(1, 'CLINICO', 'ECG', '08:45:00'),
(2, 'ESTABILIZACAO', 'ODONTOLOGIA', NULL),
(3, 'CURATIVO', 'SUTURA', NULL),
(4, 'CLINICO', 'TROCA_DE_SONDA', NULL),
(5, 'ESTABILIZACAO', 'VACIONA_ANTIRRABICA', NULL);

-- 15. Inserir boletins de síndrome gripal
INSERT INTO boletim_sindrome_gripal (unidade_id, usuario_responsavel_preenchimento_id, referente_ao_dia, total_atendimentos_sd_com_queixa_gripal, total_atendimentos_sd_sem_queixa_gripal, total_atendimentos_sn_com_queixa_gripal, total_atendimentos_sn_sem_queixa_gripal, total_internacoes_apos_atendimento_urgencia_com_queixa_gripal, total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal, total_obitos, total_transferencias) VALUES
(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2023-01-15', 12, 45, 8, 30, 2, 5, 0, 1),
(2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2023-01-16', 8, 38, 5, 25, 1, 3, 1, 0),
(3, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '2023-01-17', 15, 50, 10, 35, 3, 6, 0, 2),
(4, 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '2023-01-18', 10, 42, 7, 28, 2, 4, 0, 1),
(5, 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '2023-01-19', 18, 55, 12, 40, 4, 7, 1, 3);

-- 16. Inserir boletins de admissão
INSERT INTO boletim_internacao_admissao (unidade_id, usuario_responsavel_preenchimento_id, referente_ao_dia) VALUES
(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2023-01-15'),
(2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2023-01-16'),
(3, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '2023-01-17'),
(4, 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '2023-01-18'),
(5, 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '2023-01-19');

-- 17. Inserir itens de admissão
INSERT INTO boletim_internacao_admissao_item (boletim_internacao_admissao_id, numero_de_admissoes, cid_id, faixa_etaria, genero) VALUES
(1, 2, 1, '30-39', 'M'),
(1, 1, 2, '40-49', 'F'),
(2, 3, 3, '50-59', 'M'),
(2, 2, 4, '60-69', 'F'),
(3, 1, 5, '70-79', 'M'),
(3, 2, 6, '20-29', 'F'),
(4, 3, 7, '30-39', 'M'),
(4, 1, 8, '40-49', 'F'),
(5, 2, 9, '50-59', 'M'),
(5, 1, 10, '60-69', 'F');

-- 18. Inserir boletins de ocupação
INSERT INTO boletim_internacao_ocupacao (unidade_id, usuario_responsavel_preenchimento_id, referente_ao_dia, pacientes_uti, pacientes_uti_isolamento, pacientes_enfermaria, pacientes_enfermaria_isolamento, pacientes_lsvp, pacientes_estabilizacao_vermelha) VALUES
(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2023-01-15', 5, 1, 20, 3, 2, 1),
(2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2023-01-16', 4, 0, 18, 2, 1, 0),
(3, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '2023-01-17', 6, 2, 22, 4, 3, 2),
(4, 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '2023-01-18', 5, 1, 21, 3, 2, 1),
(5, 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '2023-01-19', 7, 3, 25, 5, 4, 3);

-- 19. Inserir boletins de saída
INSERT INTO boletim_saida (unidade_id, usuario_responsavel_preenchimento_id, referente_ao_dia) VALUES
(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2023-01-15'),
(2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2023-01-16'),
(3, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '2023-01-17'),
(4, 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '2023-01-18'),
(5, 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '2023-01-19');

-- 20. Inserir itens de saída
INSERT INTO boletim_saida_item (boletim_saida_id, local_de_saida, tipo_da_saida, unidade_destino_id, leito_de_destino, total_de_saida) VALUES
(1, 'PORTA', 'ALTA', 1, NULL, 15),
(1, 'INTERNACAO', 'TRANSFERENCIA', 2, 'UTI', 2),
(2, 'PORTA', 'ALTA', 2, NULL, 12),
(2, 'INTERNACAO', 'OBITO', NULL, NULL, 1),
(3, 'PORTA', 'ALTA', 3, NULL, 18),
(3, 'INTERNACAO', 'TRANSFERENCIA', 3, 'ENFERMARIA_CLINICA', 3),
(4, 'PORTA', 'ALTA', 4, NULL, 14),
(4, 'INTERNACAO', 'EVASAO', NULL, NULL, 1),
(5, 'PORTA', 'ALTA', 5, NULL, 20),
(5, 'INTERNACAO', 'TRANSFERENCIA', 4, 'HEMODINAMICA', 2);

-- 21. Inserir tokens de acesso
INSERT INTO token_de_acesso (acesso_id, token, valido_ate) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2023-12-31 23:59:59'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlhIFNvdXphIiwiaWF0IjoxNTE2MjM5MDIyfQ.5mhBHQ4Zv5h3Z3J6k7f8g9h0j1k2l3m4n5o6p7q8r9s', '2023-12-31 23:59:59'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhcmxvcyBPbGl2ZWlyYSIsImlhdCI6MTUxNjIzOTAyMn0.9i8j7k6l5m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b9c', '2023-12-31 23:59:59'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuYSBTYW50b3MiLCJpYXQiOjE1MTYyMzkwMjJ9.8d7e6f5g4h3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x', '2023-12-31 23:59:59'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBlZHJvIENvc3RhIiwiaWF0IjoxNTE2MjM5MDIyfQ.7c6b5a4d3e2f1g0h9i8j7k6l5m4n3o2p1q0r9s8t', '2023-12-31 23:59:59');