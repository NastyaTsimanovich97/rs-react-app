'use client';
import React from 'react';
import CardDetails from '../../../components/CardDetails';

export default function CardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <CardDetails params={params} />;
}
