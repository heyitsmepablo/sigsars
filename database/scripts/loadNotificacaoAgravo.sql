INSERT INTO "notificacao_agravo" (
  nome_agravo, tipo_notificacao, sistema_notificacao,
  servicos_permitidos, observacoes
) VALUES
  (
    'Violência doméstica', 'Imediata', 'SINAN (Ficha específica de Violência)',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'ATENCAO_PRIMARIA'::tipo_servico, 'HOSPITALAR'::tipo_servico],
    ''
  ),
  (
    'Violência sexual', 'Imediata', 'SINAN',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'HOSPITALAR'::tipo_servico],
    ''
  ),
  (
    'Acidente de trabalho', 'Imediata ou até 24h', 'SINAN',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'ATENCAO_PRIMARIA'::tipo_servico, 'HOSPITALAR'::tipo_servico],
    ''
  ),
  (
    'Agravo antirrábico (mordedura de animal)', 'Imediata', 'SINAN',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'HOSPITALAR'::tipo_servico],
    ''
  ),
  (
    'Sífilis (gestacional, congênita, adquirida)', 'Imediata / Semanal', 'SINAN',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'ATENCAO_PRIMARIA'::tipo_servico, 'HOSPITALAR'::tipo_servico, 'LABORATORIO'::tipo_servico],
    'Gestacional e congênita: Imediata; adquirida: Semanal'
  ),
  (
    'Arboviroses (Dengue, Chikungunya, Zika)', 'Imediata / Semanal', 'SINAN',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'ATENCAO_PRIMARIA'::tipo_servico, 'HOSPITALAR'::tipo_servico, 'LABORATORIO'::tipo_servico],
    'Graves: Imediata; Leves: Semanal'
  ),
  (
    'Síndromes gripais (SG e SRAG)', 'Imediata / Semanal', 'SIVEP-Gripe / e-SUS Notifica',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'HOSPITALAR'::tipo_servico, 'LABORATORIO'::tipo_servico],
    'SRAG: Imediata; SG: Semanal'
  ),
  (
    'Outros agravos compulsórios', 'Conforme agravo', 'SINAN / e-SUS Notifica',
    ARRAY['URGENCIA_EMERGENCIA'::tipo_servico, 'ATENCAO_PRIMARIA'::tipo_servico, 'HOSPITALAR'::tipo_servico, 'LABORATORIO'::tipo_servico],
    ''
  );
