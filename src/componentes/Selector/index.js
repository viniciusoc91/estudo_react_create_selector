import './Selector.css'

const Selector = (props) => {
    return (
        <div className='selector'>
            <div style={{backgroundColor: '#D9F7E9'}}>
                <h1 className='h1'>Selector</h1>
                {props.colaboradores.filter(colaborador => colaborador.ativo)
                    .map(colaborador => (
                        <div style={{color: '#57C278'}} key={colaborador.id} className="colaboradores">
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
        </div>
    )
}

export default Selector