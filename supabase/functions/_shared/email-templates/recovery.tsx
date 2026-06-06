/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
  token?: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
  token,
}: RecoveryEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Bem-vindo, Breda — seu código de acesso</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Bem-vindo, Breda 👋</Heading>
        <Text style={text}>
          Use o código abaixo para entrar no painel. Ele expira em alguns minutos.
        </Text>
        {token && <Text style={codeStyle}>{token}</Text>}
        <Text style={footer}>
          Se você não solicitou este acesso, pode ignorar este e-mail.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '480px' }
const h1 = {
  fontSize: '22px',
  fontWeight: '600' as const,
  color: '#0f172a',
  margin: '0 0 16px',
  letterSpacing: '-0.01em',
}
const text = {
  fontSize: '15px',
  color: '#475569',
  lineHeight: '1.55',
  margin: '0 0 20px',
}
const codeStyle = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '34px',
  fontWeight: '700' as const,
  letterSpacing: '0.4em',
  color: '#0f172a',
  textAlign: 'center' as const,
  padding: '20px 16px',
  backgroundColor: '#f1f5f9',
  borderRadius: '12px',
  margin: '0 0 28px',
}
const button = {
  backgroundColor: '#0f172a',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '500' as const,
  borderRadius: '10px',
  padding: '12px 22px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#94a3b8', margin: '32px 0 0' }
