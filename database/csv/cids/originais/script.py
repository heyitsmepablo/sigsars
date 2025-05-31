import pandas as pd

# 1. Lê os CSVs com separador correto: ponto e vírgula
grupos = pd.read_csv('grupos.csv', sep=';')
categorias = pd.read_csv('categorias.csv', sep=';')
subcategorias = pd.read_csv('subcategorias.csv', sep=';')

# 2. Remove espaços extras das colunas (boa prática)
grupos.columns = grupos.columns.str.strip()
categorias.columns = categorias.columns.str.strip()
subcategorias.columns = subcategorias.columns.str.strip()

# 3. Adiciona ID artificial aos grupos
grupos['id'] = range(1, len(grupos) + 1)

# 4. Relaciona categoria ao grupo
def encontrar_grupo_id(cat):
    for _, row in grupos.iterrows():
        if row['cat_ini'] <= cat <= row['cat_fim']:
            return row['id']
    return None

categorias['grupo_id'] = categorias['categoria'].apply(encontrar_grupo_id)
categorias['id'] = range(1, len(categorias) + 1)

# 5. Relaciona subcategoria à categoria
def encontrar_categoria_id(subcat):
    cat = subcat[:3]  # Assume que subcategoria começa com a categoria de 3 letras
    row = categorias[categorias['categoria'] == cat]
    if not row.empty:
        return row.iloc[0]['id']
    return None

subcategorias['categoria_id'] = subcategorias['codigo'].apply(encontrar_categoria_id)
subcategorias['id'] = range(1, len(subcategorias) + 1)

# 6. Exporta para novos CSVs
grupos[['id', 'categoria_ini', 'cat_fim', 'descricao']].to_csv('grupos_rel.csv', index=False)
categorias[['id', 'grupo_id', 'categoria', 'descricao']].to_csv('categorias_rel.csv', index=False)
subcategorias[['id', 'categoria_id', 'codigo', 'patologia']].to_csv('subcategorias_rel.csv', index=False)

print("Arquivos gerados com sucesso!")
