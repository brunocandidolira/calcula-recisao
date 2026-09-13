export function FrequentlyAskedQuestions() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div><p className="eyebrow">SEM COMPLICAÇÃO</p><h2 id="faq-title">Dúvidas frequentes</h2></div>
      <div className="faq-items">
        <details><summary>Esse é o valor exato que vou receber?</summary><p>Não. O resultado é aproximado. Descontos, verbas pendentes e particularidades do contrato podem alterar o valor final.</p></details>
        <details><summary>A simulação substitui um contador?</summary><p>Não. Ela ajuda a ter uma primeira noção. A conferência dos valores e dos documentos deve ser feita com um profissional habilitado.</p></details>
        <details><summary>Posso usar o resultado em um processo?</summary><p>A ferramenta tem finalidade educativa e informativa. O resultado não é um cálculo oficial nem se destina a fins processuais.</p></details>
      </div>
    </section>
  );
}
