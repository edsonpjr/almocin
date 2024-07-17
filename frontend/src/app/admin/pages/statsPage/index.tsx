import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../components/baseLayout";
import { StatsContext } from "../../context/statsContext";
import { StatsFilter } from "../../context/statsContext/types";
import { fetchStats } from "../../context/statsContext/service";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const StatsPage = () => {
  const { state, dispatch } = useContext(StatsContext);

  const getStats = async (filter: StatsFilter) => {
    dispatch({ type: 'GET_STATS', payload: { loading: true } });
    try {
      const data = await fetchStats(filter, localStorage.getItem('token') || '');
      dispatch({ type: 'GET_STATS', payload: { loading: false, ...data.data } });
    } catch (error) {
      dispatch({ type: 'GET_STATS', payload: { loading: false, error: true } });
    }
  };

  useEffect(() => {
    getStats(state.filter);
  }, [state.filter]);

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const filter = event.target.value as StatsFilter;
    dispatch({ type: 'GET_STATS', payload: { filter } });
  };

  return (
    <BaseLayout titlePage="Estatísticas">
      <div className={styles.listContainer}>
        <FormControl variant="outlined" className={styles.filterControl}>
          <InputLabel id="filter-label">Filtro</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={state.filter}
            onChange={handleFilterChange}
            label="Filtro"
          >
            <MenuItem value={StatsFilter.ALL}>Todos</MenuItem>
            <MenuItem value={StatsFilter.MONTH}>Mês Atual</MenuItem>
            <MenuItem value={StatsFilter.MONEY}>Receita</MenuItem>
          </Select>
        </FormControl>
        {state.loading ? (
          <LoadingComponent />
        ) : state.error ? (
          <span>Erro ao carregar estatísticas!</span>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Total de Usuários</TableCell>
                <TableCell>Total de Itens</TableCell>
                <TableCell>Receita Total</TableCell>
                <TableCell>Receita do Mês Atual</TableCell>
                <TableCell>Total de Pedidos</TableCell>
                <TableCell>Pedidos do Mês Atual</TableCell>
                <TableCell>Ticket Médio</TableCell>
                <TableCell>Ticket Médio do Mês Atual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{state.totalUsers}</TableCell>
                <TableCell>{state.totalItems}</TableCell>
                <TableCell>{state.totalRevenue}</TableCell>
                <TableCell>{state.currentMonthRevenue}</TableCell>
                <TableCell>{state.totalOrders}</TableCell>
                <TableCell>{state.monthOrders}</TableCell>
                <TableCell>{state.averageTicket}</TableCell>
                <TableCell>{state.currentMonthAverageTicket}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </BaseLayout>
  );
};

export default StatsPage;
