Feature: Statistics

  Scenario: requisitar todas as estatísticas
    Given há um objeto em "/stats":
    """
      {
        "totalUsers": number;
        "totalItems": number;
        "totalRevenue": number;
        "currentMonthRevenue": number;
        "totalOrders": number;
        "monthOrders": number;
        "averageTicket": number;
        "currentMonthAverageTicket": number;
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "all"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalUsers  |  totalItems  |  totalRevenue  |  currentMonthRevenue  |  totalOrders  |  monthOrders  |  averageTicket  |  currentMonthAverageTicket  |
      | "totalUsers" | "totalItems" | "totalRevenue" | "currentMonthRevenue" | "totalOrders" | "monthOrders" | "averageTicket" | "currentMonthAverageTicket" |
    
  Scenario: requisitar as estatísticas de arrecadação
    Given há um objeto em "/stats":
    """
      {
        "totalUsers": number;
        "totalItems": number;
        "totalRevenue": number;
        "currentMonthRevenue": number;
        "totalOrders": number;
        "monthOrders": number;
        "averageTicket": number;
        "currentMonthAverageTicket": number;
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "money"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalRevenue  |  currentMonthRevenue  |  currentMonthAverageTicket  |  averageTicket  |
      | "totalRevenue" | "currentMonthRevenue" | "currentMonthAverageTicket" | "averageTicket" |

  Scenario: requisitar as estatísticas de mensais
    Given há um objeto em "/stats":
    """
      {
        "totalUsers": number;
        "totalItems": number;
        "totalRevenue": number;
        "currentMonthRevenue": number;
        "totalOrders": number;
        "monthOrders": number;
        "averageTicket": number;
        "currentMonthAverageTicket": number;
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "month"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  currentMonthRevenue  |  monthOrders  |  currentMonthAverageTicket  |
      | "currentMonthRevenue" | "monthOrders" | "currentMonthAverageTicket" |
    
