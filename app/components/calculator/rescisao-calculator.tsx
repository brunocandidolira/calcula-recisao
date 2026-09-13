'use client';

import { useRescisaoCalculator } from '@/app/hooks/use-rescisao-calculator';
import { RescisaoForm } from './rescisao-form';
import { RescisaoResultPanel } from './rescisao-result';

export function RescisaoCalculator() {
  const { result, error, ...form } = useRescisaoCalculator();

  return (
    <div id="calculadora" className="calculator-card">
      <div className="calculator-heading">
        <div><p className="eyebrow">SIMULADOR CLT</p><h2>Calcule sua estimativa</h2></div>
        <span className="estimate-badge">Estimativa</span>
      </div>
      <p className="form-description">Comece pelas informações do seu contrato.</p>

      {error && <p role="alert" className="calculator-error">{error}</p>}
      <RescisaoForm {...form} />
      <p className="form-note">Valores aproximados. A conferência final deve ser feita com um profissional habilitado.</p>

      {result && <RescisaoResultPanel result={result} />}

    </div>
  );
}
