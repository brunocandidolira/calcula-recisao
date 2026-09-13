'use client';

import { useState } from 'react';
import { calculateRescisao } from '@/app/services/calculate-recisao';
import type { RescisaoResult, TerminationType } from '@/app/types/recisao';

export function useRescisaoCalculator() {
  const [salary, setSalary] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const [terminationType, setTerminationType] =
    useState<TerminationType>('demissaoSemJustaCausa');
  const [fgtsBalance, setFgtsBalance] = useState('');
  const [result, setResult] = useState<RescisaoResult | null>(null);

  function handleCalculate() {
    const rescisao = calculateRescisao({
      salary: Number(salary),
      admissionDate: new Date(`${admissionDate}T00:00:00`),
      terminationDate: new Date(`${terminationDate}T00:00:00`),
      terminationType,
      fgtsBalance: Number(fgtsBalance),
    });

    setResult(rescisao);
    setSalary('');
    setAdmissionDate('');
    setTerminationDate('');
    setTerminationType('demissaoSemJustaCausa');
    setFgtsBalance('');
  }

  return {
    salary, setSalary,
    admissionDate, setAdmissionDate,
    terminationDate, setTerminationDate,
    terminationType, setTerminationType,
    fgtsBalance, setFgtsBalance,
    result, handleCalculate,
  };
}
