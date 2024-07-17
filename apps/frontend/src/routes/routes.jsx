import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Agendamentos from '../pages/Agendamentos';
import CriarAgendamento from '../pages/CriarAgendamento';
import AtualizarAgendamento from '../pages/AtualizarAgendamento';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route path="/agendamentos">
        <Route element={<Agendamentos />} index />
        <Route element={<CriarAgendamento />} path="novo" />
        <Route element={<AtualizarAgendamento />} path=":id/editar" />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
