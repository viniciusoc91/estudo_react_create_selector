
import { createSelector } from 'reselect';
import './SelectorMemorization.css'


const selectColaboradores = state => state.colaboradores;

const selectAtivos = createSelector(
    [selectColaboradores],
    colaboradores =>
        colaboradores.filter(
            colaborador => colaborador.ativo
        )
);

const selectFolhaPagamento =
    createSelector(
        [selectColaboradores],
        colaboradores =>
            colaboradores.reduce(
                (total, colaborador) =>
                    total + colaborador.salario,
                0
            )
    );

const selectMaiorSalario =
    createSelector(
        [selectColaboradores],
        colaboradores =>
            colaboradores.reduce(
                (maiorSalario, colaborador) => 
                    maiorSalario < colaborador.salario?maiorSalario=colaborador.salario:maiorSalario,
                0
            )
    );

const selectColaboradoresPorTime =
    createSelector(
        [selectColaboradores],
        colaboradores => {

            const agrupados = {};

            colaboradores.forEach(c => {

                if (!agrupados[c.time]) {
                    agrupados[c.time] = [];
                }

                agrupados[c.time].push(c);

            });

            return agrupados;

        }
    );

const selectOrdenados =
    createSelector(
        [selectColaboradores],
        colaboradores =>
            colaboradores
                .sort(
                    (a, b) =>
                        a.nome.localeCompare(b.nome)
                )
    );

const SelectorMemorization = ({ state }) => {

    const colaboradoresAtivos =
        selectAtivos(state);

    const colaboradoresPorTime =
        selectColaboradoresPorTime(state);

    const folhaPagamento =
        selectFolhaPagamento(state);

    const maiorSalario =
        selectMaiorSalario(state);

    const ordenados =
        selectOrdenados(state);

    return (
        <div className='selectorMemorization'>
            <div style={{backgroundColor: '#E8F8FF'}}>
                <h1 className='h1' style={{color: '#82CFFA'}}>SelectorMemorization</h1>
                {colaboradoresAtivos.map(colaborador => (
                    <div style={{color: '#82CFFA'}} key={colaborador.id} className="colaboradores">
                        <h3 className='h3'>{colaborador.nome}</h3>

                        <p>
                            <strong>ID:</strong> {colaborador.id}
                        </p>

                        <p>
                            <strong>Salário:</strong> R$ {colaborador.salario}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {colaborador.ativo ? ' Ativo' : ' Inativo'}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{backgroundColor: '#F0F8E2'}}>
                <h1 className='h1' style={{color: '#A6D157'}}>Por Time</h1>
                <div style={styles.container}>
                    {Object.entries(colaboradoresPorTime).map(([time, colaboradores]) => (
                        <div key={time} style={styles.timeCard}>
                            <h2 style={styles.timeTitle}>{time}</h2>

                            <ul style={styles.list}>
                                {colaboradores.map((colaborador, index) => (
                                    <li key={colaborador.id || index} style={styles.item}>
                                        <strong>{colaborador.nome}</strong>
                                        {colaborador.cargo && (
                                            <span style={styles.subtitle}> — {colaborador.cargo}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{backgroundColor: '#FDE7E8'}}>
                <h1 className='h1' style={{color: '#E06B69'}}>Folha Pagamentos</h1>
                    <div style={{color: '#E06B69'}} key='folhaPagamentosH1' className="colaboradores">
                        <h3 className='h3'>{folhaPagamento}</h3>
                    </div>
                
            </div>
            <div style={{backgroundColor: '#FAE9F5'}}>
                <h1 className='h1' style={{color: '#DB6EBF'}}>Ordenados</h1>
                {ordenados.map(colaborador => (
                    <div style={{color: '#DB6EBF'}} key={colaborador.id} className="colaboradores">
                        <h3 className='h3'>{colaborador.nome}</h3>

                        <p>
                            <strong>ID:</strong> {colaborador.id}
                        </p>

                        <p>
                            <strong>Salário:</strong> R$ {colaborador.salario}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {colaborador.ativo ? ' Ativo' : ' Inativo'}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{backgroundColor: '#FFF5D9'}}>
                <h1 className='h1' style={{color: '#FFBA05'}}>Maior Salário</h1>
                    <div style={{color: '#FFBA05'}} key='folhaPagamentosH1' className="colaboradores">
                        <h3 className='h3'>{maiorSalario}</h3>
                    </div>
                
            </div>
        </div>
    )
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
    padding: "16px",
    color: "#A6D157",
  },
  timeCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
  },
  timeTitle: {
    margin: "0 0 10px 0",
    fontSize: "18px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    padding: "6px 0",
  },
  subtitle: {
    color: "#666",
    fontSize: "12px",
  },
};

export default SelectorMemorization