import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from './ProviderWrapper';

export const metadata: Metadata = {
  title: 'TCSS 460 Group 4 Front End',
  description: 'TCSS 460 Group 4 Front End'
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
