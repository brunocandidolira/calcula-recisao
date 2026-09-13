export function PracticalGuide() {
  return (
    <section aria-labelledby="orientacoes" className="guides">
      <p className="eyebrow">INFORMAÇÃO QUE AJUDA</p>
      <h2 id="orientacoes" className="text-xl font-semibold mb-4">
        Entenda melhor antes de decidir
      </h2>
      <div className="guide-grid">
        <article>
          <h3 className="font-semibold text-white mb-1">Acordo e pedido de demissão são diferentes</h3>
          <p>
            A forma de encerrar o contrato muda as verbas da rescisão.
            Escolha a opção que corresponde à sua situação para que a
            estimativa faça sentido.
          </p>
        </article>
        <article>
          <h3 className="font-semibold text-white mb-1">Tenha seus documentos por perto</h3>
          <p>
            Consulte seus holerites, as datas do contrato e o extrato do
            FGTS ao preencher. Eles também ajudam a comparar a simulação
            com as informações apresentadas pela empresa.
          </p>
        </article>
        <article>
          <h3 className="font-semibold text-white mb-1">Transforme a estimativa em perguntas</h3>
          <p>
            Encontrou uma diferença? Anote suas dúvidas e peça o detalhamento
            ao RH. Para avaliar seu caso, procure um contador, seu sindicato
            ou um profissional habilitado.
          </p>
        </article>
        <p className="sources">
          Para continuar lendo, consulte as{' '}
          <a
            href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/proteja/duvidas-frequentes"
            className="text-zinc-200 underline underline-offset-4 hover:text-white"
          >
            perguntas frequentes do Ministério do Trabalho e Emprego
          </a>{' '}
          e as{' '}
          <a
            href="https://www.fgts.gov.br/Paginas/subpaginas/saque-rescisao-contrato-de-trabalho-por-acordo.aspx"
            className="text-zinc-200 underline underline-offset-4 hover:text-white"
          >
            orientações sobre FGTS na rescisão por acordo
          </a>.
          {' '}São fontes públicas para leitura complementar; este site não
          tem vínculo com esses órgãos.
        </p>
      </div>
    </section>
  );
}
