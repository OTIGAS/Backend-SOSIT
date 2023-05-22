interface PropsQueryResult {
    nomeEmpresa: string;
    nomeAgenda: string;
    diaSemana: string[];
  }

export function QueryResult({ nomeEmpresa, nomeAgenda, diaSemana }: PropsQueryResult) {
    return (
      <div>
        <strong>{nomeEmpresa}</strong>
        <strong>{nomeAgenda}</strong>
        <div>
          {diaSemana.map((dia) => (
            <span key={dia}>{dia}</span>
          ))}
        </div>
      </div>
    );
  }