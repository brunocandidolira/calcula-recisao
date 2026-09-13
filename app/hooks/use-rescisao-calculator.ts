'use client';

import { useState } from 'react';
import { ZodError } from 'zod';
import { calculateRescisao } from '@/app/services/calculate-recisao';
import type { RescisaoResult, TerminationType, NoticeType } from '@/app/types/recisao';

export function useRescisaoCalculator() {
  const [salary, setSalary] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [terminationDate, setTerminationDate] = useState('');
  const [terminationType, setTerminationType] =
    useState<TerminationType>('demissaoSemJustaCausa');
  const [fgtsBalance, setFgtsBalance] = useState('');
  const [result, setResult] = useState<RescisaoResult | null>(null);

  const [noticeType, setNoticeType] = useState<NoticeType | ''>('');
  const [vacationPeriodStart, setVacationPeriodStart] = useState('');
  const initialAdjustments = {
    variableAverage: '', acquiredVacationDays: '', doubledVacationDays: '',
    unworkedNoticeDays: '', inss: '', irrf: '', otherDeductions: '',
  };
  const [adjustments, setAdjustments] = useState(initialAdjustments);
  const [error, setError] = useState<string | null>(null);

  function updateAdjustment(name: keyof typeof adjustments, value: string) {
    setAdjustments(previous => ({ ...previous, [name]: value }));
  }

  function handleCalculate() {
    setError(null);
    try {
    const rescisao = calculateRescisao({
      salary: Number(salary),
      admissionDate: new Date(`${admissionDate}T00:00:00`),
      terminationDate: new Date(`${terminationDate}T00:00:00`),
      terminationType,
      fgtsBalance: Number(fgtsBalance),
      noticeType: noticeType || undefined,
      vacationPeriodStart: vacationPeriodStart ? new Date(`${vacationPeriodStart}T00:00:00`) : undefined,
      variableAverage: Number(adjustments.variableAverage),
      acquiredVacationDays: Number(adjustments.acquiredVacationDays),
      doubledVacationDays: Number(adjustments.doubledVacationDays),
      unworkedNoticeDays: Number(adjustments.unworkedNoticeDays),
      inss: Number(adjustments.inss),
      irrf: Number(adjustments.irrf),
      otherDeductions: Number(adjustments.otherDeductions),
    });

    setResult(rescisao);
    setSalary('');
    setAdmissionDate('');
    setTerminationDate('');
    setTerminationType('demissaoSemJustaCausa');
    setFgtsBalance('');
    setNoticeType('');
    setVacationPeriodStart('');
    setAdjustments(initialAdjustments);
    } catch (failure) {
      setResult(null);
      setError(failure instanceof ZodError
        ? 'Confira os dados: valores não negativos e finitos, datas válidas e aviso compatível com a modalidade.'
        : 'Confira o início do período aquisitivo atual; períodos anteriores devem ser informados como férias adquiridas.');
    }
  }

  return {
    salary, setSalary,
    admissionDate, setAdmissionDate,
    terminationDate, setTerminationDate,
    terminationType, setTerminationType,
    fgtsBalance, setFgtsBalance,
    result, error, handleCalculate,
    noticeType, setNoticeType, vacationPeriodStart, setVacationPeriodStart,
    adjustments, updateAdjustment,
  };
}
