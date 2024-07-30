Feature: Statistics
    As an administrator
    I want to view various performance metrics
    So that I can monitor and analyze the system's usage and its profitability.

  Scenario: Usuário logado acessa a página de Estatísticas e verifica o título
    Given o usuário está logado com o email "admin" e senha "admin"
    When acesso a página Estatística
    Then estou na página de título "Estatísticas"

  Scenario: Usuário seleciona o filtro "Todos" na página de Estatísticas
    Given estou na página Estatística
    When seleciono o filtro todos
    Then posso ver todas as estatíticas 

  Scenario: Usuário seleciona o filtro "Mês Atual" na página de Estatísticas
    Given estou na página Estatística
    When seleciono o filtro mês atual
    Then posso ver as estatíticas do mês atual

  Scenario: Usuário seleciona o filtro "Receita" na página de Estatísticas
    Given estou na página Estatística
    When seleciono o filtro receita
    Then posso ver as estatíticas de receita
