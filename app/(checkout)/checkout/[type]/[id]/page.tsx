import {retrieveCheckoutSessionAction} from './actions'
import { redirect } from 'next/navigation'

const Return = async ({params}: {params: Promise<{id: string}>}) => {
    const {id: sessionId} = await params
    if (!sessionId) throw new Error('Please provide a valid session_id (`cs_test_...`)')
    const {
        status,
        customer_details: {email: customerEmail}
    } = await retrieveCheckoutSessionAction(sessionId)

    if (status == 'open') redirect('/dashboard/cart')
    if (status == 'complete') {
        return (
            <section id="success">
                <p>
                We appreciate your business! A confirmation email will be sent to{' '}
                {customerEmail}. If you have any questions, please email{' '}
                </p>
                <a href="mailto:orders@example.com">orders@example.com</a>.
            </section>
        )
    }
}

export default Return