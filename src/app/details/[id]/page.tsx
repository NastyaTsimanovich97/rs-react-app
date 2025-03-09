'use client';
import { Usable } from 'react';
import CardDetails from '../../../components/CardDetails';

export default function CardDetailsPage({
  params,
}: {
  params: Usable<{ id: string }>;
}) {
  return <CardDetails params={params} />;
}
