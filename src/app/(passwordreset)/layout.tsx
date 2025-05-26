// PROJECT IMPORTS
import SimpleLayout from 'layout/SimpleLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return ( <AuthGuard>
            <SimpleLayout>{children}</SimpleLayout>
           </AuthGuard>);
}
