export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#" className="brand"><span className="brand-mark" aria-hidden="true">=</span> calcula<span className="brand-light">rescisão</span></a>
      <nav aria-label="Navegação principal">
        <a href="#como-funciona">Como funciona</a>
        <a href="#orientacoes">Guia prático</a>
        <a href="#calculadora" className="nav-cta">Simular agora <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
