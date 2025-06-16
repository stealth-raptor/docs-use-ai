import { Toaster } from 'sonner'
import DashboardProvider from './provider.jsx'

const DashboardLayout = ({ children }) => {
    return (
        <div>
        <DashboardProvider>
            <div className='p-10'>
                {children}
                <Toaster/>
            </div>
        </DashboardProvider>
        </div>
    )
}

export default DashboardLayout