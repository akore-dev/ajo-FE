import RouteClient from "../../../RouteClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RouteClient screen="transaction-details" transactionId={id} />;
}