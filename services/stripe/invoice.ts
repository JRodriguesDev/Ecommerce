import 'server-only'

import stripe from '@/lib/stripe/index'

export const listInvoices = async (customerId: string, subscriptionId: string) => {
    const invoice = await stripe.invoices.list({
        customer: customerId,
        subscription: subscriptionId
    })
    return invoice.data.map(invoice => ({
        id: invoice.id,
        displayAmount: (invoice.total / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
        rawAmount: invoice.total,
        date: new Date(invoice.created * 1000).toLocaleDateString('pt-BR'),
        status: invoice.status,
        hosted_invoice_url: invoice.hosted_invoice_url,
        pdfUrl: invoice.invoice_pdf
    }))
}